from PIL import Image, ImageOps
import io

def getInvertImg(file):
    image = Image.open(file.file)
    inverted_image = ImageOps.invert(image.convert("RGB"))
    img_byte_arr = io.BytesIO()
    inverted_image.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    return img_byte_arr