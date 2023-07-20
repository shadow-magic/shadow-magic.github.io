from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from PIL import Image
from io import BytesIO
import cv2
import numpy as np
import pyautogui
import time

pyautogui.FAILSAFE = False
stitcher = cv2.Stitcher.create()
images = []
dragDistanceX = -1300  # pans left
dragDistanceY = -950  # pans down
chromeOptions = Options()
chromeOptions.add_experimental_option("excludeSwitches", ["enable-automation"])
driver = webdriver.Chrome(options=chromeOptions)
driver.get("https://genshin-impact-map.appsample.com/")
driver.fullscreen_window()
time.sleep(1.7)  # wait for page to load
mapSidebar = driver.find_element(
    By.CSS_SELECTOR,
    "#__next > div > div.MapLayout_Sidebar",
)
topNav = driver.find_element(
    By.CSS_SELECTOR, "#__next > div > div.TopNav.fixed.hide-on-phone"
)
grayBox = driver.find_element(By.CSS_SELECTOR, "#__next > div > div.MapLayout_0426")
zoomBox = driver.find_element(
    By.CSS_SELECTOR, "#mapDiv > div:nth-child(1) > div > div:nth-child(12) > div > div"
)
zoomIn = driver.find_element(
    By.CSS_SELECTOR,
    "#mapDiv > div:nth-child(1) > div > div:nth-child(12) > div > div > div > button:nth-child(1)",
)


def pan(xoff, yoff=0):
    # positive xoff = move right & positive yoff = move down
    quotientX, remainderX = divmod(abs(xoff), 1920)
    quotientY, remainderY = divmod(abs(yoff), 1080)
    startX = 1920
    startY = 1080
    dragTime = 0.33
    sleepTime = 0.1
    xoffsign, yoffsign = -1, -1
    if xoff >= 0:
        startX = 0
        xoffsign = 1
    if yoff > 0:
        startY = 0
        yoffsign = 1
    while quotientX > 0 or quotientY > 0 or remainderX != 0 or remainderY != 0:
        if quotientX > 0 and quotientY > 0:
            pyautogui.moveTo(startX, startY)
            pyautogui.mouseDown()
            pyautogui.moveTo(
                startX + xoffsign * 1920, startY + yoffsign * 1080, dragTime
            )
            time.sleep(sleepTime)
            pyautogui.mouseUp()
            quotientX -= 1
            quotientY -= 1
        elif quotientX == 0 and quotientY > 0:
            pyautogui.moveTo(startX, startY)
            pyautogui.mouseDown()
            pyautogui.moveTo(startX, startY + yoffsign * 1080, dragTime)
            time.sleep(sleepTime)
            pyautogui.mouseUp()
            quotientY -= 1
        elif quotientX > 0 and quotientY == 0:
            pyautogui.moveTo(startX, startY)
            pyautogui.mouseDown()
            pyautogui.moveTo(startX + xoffsign * 1920, startY, dragTime)
            time.sleep(sleepTime)
            pyautogui.mouseUp()
            quotientX -= 1
        else:
            # remainderX or remainderY or both not zero
            pyautogui.moveTo(startX, startY)
            pyautogui.mouseDown()
            pyautogui.moveTo(
                startX + xoffsign * remainderX, startY + yoffsign * remainderY, dragTime
            )
            time.sleep(sleepTime)
            pyautogui.mouseUp()
            remainderX, remainderY = 0, 0


def screenshot_To_Cv():
    image_stream = BytesIO(driver.get_screenshot_as_png())
    pil_image = Image.open(image_stream)
    img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    images.append(img)


# get list items in mapSidebar
markerGroups = driver.find_elements(
    By.XPATH, '//*[@id="__next"]/div/div[1]/div[1]/div/div/div[1]/div/div'
)
time.sleep(5)
# run for loop on list
# for item in list:
# click desired button
# zoom in
zoomIn.click()
time.sleep(1)
zoomIn.click()
# delete unnecessary elements
driver.execute_script("arguments[0].style.display='none';", grayBox)
driver.execute_script("arguments[0].style.display='none';", topNav)
driver.execute_script("arguments[0].style.display='none';", zoomBox)


driver.execute_script("arguments[0].style.visibility='hidden';", mapSidebar)


# move map to starting position
time.sleep(1)
pan(50, 1300)
screenshot_To_Cv()
pan(dragDistanceX)
screenshot_To_Cv()  # 03
pan(0, dragDistanceY)
screenshot_To_Cv()  # 03
# screenshot pan repeat - convert to for loops when finished
for _ in range(3):
    pan(-1 * dragDistanceX)
    screenshot_To_Cv()  # 13 -> 10
pan(0, dragDistanceY)
screenshot_To_Cv()
for _ in range(3):
    pan(dragDistanceX)
    screenshot_To_Cv()  # 20 -> 23
pan(3300, dragDistanceY)
screenshot_To_Cv()  # 30
pan(dragDistanceX)
screenshot_To_Cv()  # 31
status, stitched = stitcher.stitch(images)
images = []
# inazuma
pan(-2700, 100)
screenshot_To_Cv()
pan(dragDistanceX)
screenshot_To_Cv()
pan(0, dragDistanceY)
screenshot_To_Cv()
pan(-1 * dragDistanceX)
screenshot_To_Cv()
pan(-700, -400)
screenshot_To_Cv()
pan(300, -500)
screenshot_To_Cv()
pan(0, -400)
screenshot_To_Cv()
status, stitched2 = stitcher.stitch(images)

stitched_image_rgb = cv2.cvtColor(stitched, cv2.COLOR_BGR2RGB)
stitched_image = Image.fromarray(stitched_image_rgb).convert("RGBA")

stitched2_image_rgb = cv2.cvtColor(stitched2, cv2.COLOR_BGR2RGB)
stitched2_image = Image.fromarray(stitched2_image_rgb).convert("RGBA")

ocean = Image.open("python/blue.png")

bg_image = Image.new("RGBA", (6767, 5117), (0, 0, 0, 255))
bg_image.paste(stitched_image, (0, 0))
bg_image.paste(stitched2_image, (3760, 2176))
bg_image.paste(ocean, (0, 0), mask=ocean)
bg_image = bg_image.convert("RGB")
bg_image.save("python/maps/combined.jpeg", "JPEG", optimize=True, quality=90)
