from fastapi import FastAPI, UploadFile, HTTPException, Depends, Body, File, Header
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import select, insert, update, join, Integer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from jose import jwt, ExpiredSignatureError, JWTError
from datetime import datetime, timezone

# Models
from models.models import pages, kpi, users
from models.posts import getPost, getPostId
from models.img import getInvertImg
from models.user import Token, UserCreate, UserLogin, hash_password, create_access_token, verify_password
from database import AsyncSessionLocal

# Старт
# uvicorn main:app --reload

# Свагер
# http://127.0.0.1:8000/docs

# http://localhost:3000/home

app = FastAPI()

# указываем список источников, которым разрешено обращаться к серверу
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL вашего React-приложения
    allow_credentials=True,
    allow_methods=["*"],  # разрешаем любые методы (GET, POST и т.д.)
    allow_headers=["*"],  # разрешаем любые заголовки
)

# Зависимость для получения асинхронной сессии
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

# ====================================================================================
# JWT авторизация и регистрация

@app.post("/register", response_model=Token)
async def register(user_data: UserCreate, session: AsyncSession = Depends(get_db)):
    query = select(users).where(users.c.email == user_data.email)
    existing_user = await session.execute(query)

    if existing_user.scalar():
        raise HTTPException(status_code=400, detail=f"Пользователь с почтой {user_data.email} уже существует.")
    
    hashed_password = hash_password(user_data.password).encode("utf-8")
    new_user = {
        "email": user_data.email,
        "password": hashed_password,
        "role_id": user_data.role_id,
    }

    await session.execute(users.insert().values(new_user))
    await session.commit()

    access_token = create_access_token(data={"user": user_data.email, "role": 1})
    
    return {"access_token": access_token, "token_type": "Bearer"}


@app.post("/login", response_model=Token)
async def login(user_data: UserLogin, session: AsyncSession = Depends(get_db)):
    query = select(users).where(users.c.email == user_data.email)
    existing_user = await session.execute(query)
    user_result = existing_user.first()  # выбирает запись или None

    if not user_result:
        raise HTTPException(status_code=400, detail=f"Пользователь {user_data.email} не существует.")

    hashed_password = user_result[2]

    if not verify_password(user_data.password, hashed_password):
        raise HTTPException(status_code=400, detail="Неверные пароль")
    
    access_token = create_access_token(data={"user": user_data.email, "role": user_result[3]})

    return {"access_token": access_token, "token_type": "Bearer"}

@app.post("/update-role")
async def update_role(email: str, new_role_id: int, session: AsyncSession = Depends(get_db)):
    query = update(users).where(users.c.email == email).values(role_id=new_role_id)
    await session.execute(query)
    await session.commit()
    
    return {"message": f"Роль пользователя с email {email} успешно обновлена до {new_role_id}"}

# ======================================================================================


def parse_jwt_token(authorization: str = Header(None)):
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing Authorization header",
        )
    
    # Убираем префикс 'Bearer ' и получаем сам токен
    token = authorization.split(" ")[1]
    
    try:
        # Извлекаем полезную нагрузку (payload) без проверки подписи
        payload = jwt.get_unverified_claims(token)
        
        # Проверяем наличие поля exp
        exp = payload.get("exp")
        if exp is None:
            raise HTTPException(
                status_code=401,
                detail="Token missing expiration (exp) claim",
            )
        
        # Конвертируем exp в datetime
        exp_datetime = datetime.fromtimestamp(exp, tz=timezone.utc)

        print(exp_datetime, datetime.now(tz=timezone.utc), datetime.now(tz=timezone.utc) >= exp_datetime)
        
        # Сравниваем текущую дату с exp
        if datetime.now(tz=timezone.utc) >= exp_datetime:
            raise HTTPException(
                status_code=401,
                detail="Token has expired",
            )
        
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid token format",
        )

    return payload  # Возвращаем полезную нагрузку токена

# ПОСТЫ
# получить посты
@app.get("/posts")
def get_posts(authorization: str = Header(None)):
    parse_jwt_token(authorization)
    return getPost()

# получить пост по id
@app.get("/posts/{post_id}")
def get_post_id(post_id: int):
    return getPostId(post_id)

# получить инверсию изображения
@app.post("/invert-image/")
async def invert_image(file: UploadFile = File(...)):
    return StreamingResponse(getInvertImg(file), media_type="image/png")

# создать страницу
@app.post("/create-page/")
async def create_page(name: str, session: AsyncSession = Depends(get_db)):
    query = select(pages).where(pages.c.name == name)
    existing_page = await session.execute(query)
    if existing_page.scalar():
        raise HTTPException(status_code=400, detail="Страница с таким именем уже существует.")

    # Создание новой страницы
    new_page = {
        "name": name
    }
    await session.execute(pages.insert().values(new_page))
    await session.commit()

    # Получение ID новой страницы
    new_page_id = await session.execute(select(pages.c.id).where(pages.c.name == name))
    new_page_id = new_page_id.scalar()

    # Создание записи KPI для новой страницы
    new_kpi = {
        "link": str(new_page_id),
        "count": 0  # Начальное значение count
    }
    await session.execute(kpi.insert().values(new_kpi))
    await session.commit()

    return {"id": new_page_id, "name": name}

@app.get("/get-page/{page_id}/")
async def get_page(page_id: int, session: AsyncSession = Depends(get_db)):
    query = await session.execute(select(pages).where(pages.c.id == page_id))
    page = query.scalar_one_or_none()
    if page:
        return {"id": page.id, "name": page.name}
    return {"message": "Page not found"}

@app.post("/update-time-page/")
async def update_time_page(
    page_id: int = Body(...),
    time_spent: int = Body(...),
    session: AsyncSession = Depends(get_db)
):
    # Получаем текущую запись в таблице kpi по page_id
    query = select(kpi).where(kpi.c.link == str(page_id))
    result = await session.execute(query)
    kpi_entry = result.fetchone()  # Получаем строку

    if not kpi_entry:
        raise HTTPException(status_code=404, detail="Page not found")

    # Извлекаем данные из записи
    current_count = kpi_entry[2]  # Индекс 2 соответствует столбцу 'count'
    current_time_spent = kpi_entry[3] if len(kpi_entry) > 3 else 0  # Индекс 3 соответствует 'countSec'

    # Обновляем счетчик и время
    new_count = current_count + 1  # Увеличиваем счетчик посещений
    new_time_spent = current_time_spent + time_spent  # Обновляем общее время

    # Обновляем запись
    update_stmt = (
        update(kpi)
        .where(kpi.c.link == str(page_id))
        .values(count=new_count, countSec=new_time_spent, date_at=func.now())  # Обновляем countSec
    )

    await session.execute(update_stmt)
    await session.commit()

    return {"message": "Time and count updated successfully"}

@app.get("/kpi/")
async def get_kpi(session: AsyncSession = Depends(get_db)):
    stmt = (
        select(kpi.c.link, kpi.c.count, kpi.c.countSec, kpi.c.date_at, pages.c.name)
        .select_from(
            join(kpi, pages, kpi.c.link.cast(Integer) == pages.c.id)
        )
    )
    
    result = await session.execute(stmt)
    kpis = result.fetchall()  # Получаем все строки

    return [
        {
            "page_name": k[4], 
            "link": k[0],
            "count": k[1],
            "countSec": k[2],
            "date_at": k[3],
        }
        for k in kpis
    ]