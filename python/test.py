from PIL import Image

# Open the image file
img = Image.open("python/blue.png")
simg = Image.open("python/stitched.png")
simg2 = Image.open("python/stitched2.png")
bg_image = Image.new("RGBA", (6767, 5117), (0, 0, 0, 255))
bg_image.paste(simg, (0, 0))
bg_image.paste(simg2, (3760, 2176))
bg_image.paste(img, (0, 0))
bg_image.save("test.png")
