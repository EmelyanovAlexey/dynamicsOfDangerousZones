from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps
import io


posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "Как я повысил свою продуктивность с помощью простых привычек",
    "body": "Долгое время я боролся с управлением временем, но после внедрения нескольких простых изменений моя продуктивность значительно выросла. Вот, что я сделал..."
  },
  {
    "userId": 1,
    "id": 2,
    "title": "Полное руководство по веб-разработке в 2024 году",
    "body": "Мир веб-разработки постоянно меняется. В этом руководстве я расскажу о последних трендах, инструментах и фреймворках, которые стоит знать в 2024 году."
  },
  {
    "userId": 1,
    "id": 3,
    "title": "Как управлять удалённой командой эффективно",
    "body": "Работа с удалённой командой требует особого подхода. Вот несколько советов, которые помогут наладить коммуникацию и повысить продуктивность в вашей команде."
  },
  {
    "userId": 2,
    "id": 4,
    "title": "Лучшие приложения для планирования дня",
    "body": "Использование правильных инструментов для планирования может значительно облегчить вашу жизнь. В этой статье я расскажу о лучших приложениях для планирования дня."
  },
  {
    "userId": 2,
    "id": 5,
    "title": "Как начать свой путь в программировании",
    "body": "Многие люди хотят научиться программировать, но не знают с чего начать. В этой статье я расскажу, как сделать первые шаги в этой области."
  },
  {
    "userId": 2,
    "id": 6,
    "title": "Почему важно учиться каждый день",
    "body": "В современном мире очень важно постоянно обучаться и развиваться. В этой статье я расскажу, как ежедневное обучение может помочь вам добиться успеха."
  },
  {
    "userId": 3,
    "id": 7,
    "title": "10 ошибок, которых стоит избегать в карьере программиста",
    "body": "Программисты часто совершают ошибки, которые могут негативно повлиять на их карьеру. В этой статье я поделюсь опытом и расскажу, как избежать таких ошибок."
  },
  {
    "userId": 3,
    "id": 8,
    "title": "Преимущества работы в стартапе",
    "body": "Работа в стартапе может предложить много возможностей для роста и развития. В этой статье я расскажу, почему стоит рассмотреть такой вариант для своей карьеры."
  },
  {
    "userId": 3,
    "id": 9,
    "title": "Как автоматизировать рутинные задачи на работе",
    "body": "Рутина может занимать слишком много времени. В этой статье я расскажу, как с помощью простых инструментов можно автоматизировать повседневные задачи и сэкономить время."
  },
  {
    "userId": 1,
    "id": 10,
    "title": "optio molestias id quia eum",
    "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
  },
  {
    "userId": 2,
    "id": 11,
    "title": "et ea vero quia laudantium autem",
    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
  },
  {
    "userId": 2,
    "id": 12,
    "title": "in quibusdam tempore odit est dolorem",
    "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
  },
  {
    "userId": 2,
    "id": 13,
    "title": "dolorum ut in voluptas mollitia et saepe quo animi",
    "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
  },
  {
    "userId": 2,
    "id": 14,
    "title": "voluptatem eligendi optio",
    "body": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
  },
  {
    "userId": 2,
    "id": 15,
    "title": "eveniet quod temporibus",
    "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
  },
  {
    "userId": 2,
    "id": 16,
    "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
    "body": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
  },
  {
    "userId": 2,
    "id": 17,
    "title": "fugit voluptas sed molestias voluptatem provident",
    "body": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
  },
  {
    "userId": 2,
    "id": 18,
    "title": "voluptate et itaque vero tempora molestiae",
    "body": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
  },
  {
    "userId": 2,
    "id": 19,
    "title": "adipisci placeat illum aut reiciendis qui",
    "body": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
  },
  {
    "userId": 2,
    "id": 20,
    "title": "doloribus ad provident suscipit at",
    "body": "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
  },
  {
    "userId": 3,
    "id": 21,
    "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
    "body": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
  },
  {
    "userId": 3,
    "id": 22,
    "title": "dolor sint quo a velit explicabo quia nam",
    "body": "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"
  },
  {
    "userId": 3,
    "id": 23,
    "title": "maxime id vitae nihil numquam",
    "body": "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis"
  },
  {
    "userId": 3,
    "id": 24,
    "title": "autem hic labore sunt dolores incidunt",
    "body": "enim et ex nulla\nomnis voluptas quia qui\nvoluptatem consequatur numquam aliquam sunt\ntotam recusandae id dignissimos aut sed asperiores deserunt"
  },
  {
    "userId": 3,
    "id": 25,
    "title": "rem alias distinctio quo quis",
    "body": "ullam consequatur ut\nomnis quis sit vel consequuntur\nipsa eligendi ipsum molestiae et omnis error nostrum\nmolestiae illo tempore quia et distinctio"
  },
  {
    "userId": 3,
    "id": 26,
    "title": "est et quae odit qui non",
    "body": "similique esse doloribus nihil accusamus\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\nperspiciatis cum ut laudantium\nomnis aut molestiae vel vero"
  },
  {
    "userId": 3,
    "id": 27,
    "title": "quasi id et eos tenetur aut quo autem",
    "body": "eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"
  },
  {
    "userId": 3,
    "id": 28,
    "title": "delectus ullam et corporis nulla voluptas sequi",
    "body": "non et quaerat ex quae ad maiores\nmaiores recusandae totam aut blanditiis mollitia quas illo\nut voluptatibus voluptatem\nsimilique nostrum eum"
  },
  {
    "userId": 3,
    "id": 29,
    "title": "iusto eius quod necessitatibus culpa ea",
    "body": "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores"
  },
  {
    "userId": 3,
    "id": 30,
    "title": "a quo magni similique perferendis",
    "body": "alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia"
  },
]

app = FastAPI()

# указываем список источников, которым разрешено обращаться к серверу
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL вашего React-приложения
    allow_credentials=True,
    allow_methods=["*"],  # разрешаем любые методы (GET, POST и т.д.)
    allow_headers=["*"],  # разрешаем любые заголовки
)

# получить посты
@app.get("/posts")
def get_posts():
    return posts

# получить пост по id
@app.get("/posts/{post_id}")
def get_post_id(post_id: int):
    return [post for post in posts if post.get("id") == post_id]

# получить инверсию изображения
@app.post("/invert-image/")
async def invert_image(file: UploadFile = File(...)):
    image = Image.open(file.file)
    inverted_image = ImageOps.invert(image.convert("RGB"))
    img_byte_arr = io.BytesIO()
    inverted_image.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)
    return StreamingResponse(img_byte_arr, media_type="image/png")



# Старт
# uvicorn main:app --reload

# Свагер
# http://127.0.0.1:8000/docs