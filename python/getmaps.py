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
dragDistanceX = -1500  # pans left
dragDistanceY = -900  # pans down
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
    dragTime = 0.5
    sleepTime = 0.1
    xoffsign, yoffsign = -1, -1
    if xoff >= 0:
        startX = 0
        xoffsign = 1
    if yoff >= 0:
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
            print(startX, startY)
            pyautogui.moveTo(startX, startY)
            pyautogui.mouseDown()
            print(startX + xoffsign * 1920, startY)
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


# zoom in
zoomIn.click()
time.sleep(1)
zoomIn.click()
# delete unnecessary elements
driver.execute_script("arguments[0].style.display='none';", grayBox)
driver.execute_script("arguments[0].style.display='none';", topNav)
driver.execute_script("arguments[0].style.display='none';", zoomBox)
# click desired button

driver.execute_script("arguments[0].style.visibility='hidden';", mapSidebar)


# move map to starting position
time.sleep(1)
pan(2460, 1200)
screenshot_To_Cv()
# screenshot pan repeat - convert to for loops when finished
for _ in range(3):
    pan(dragDistanceX)
    screenshot_To_Cv()  # 00 -> 03
pan(0, dragDistanceY)
screenshot_To_Cv()
for _ in range(3):
    pan(-1 * dragDistanceX)
    screenshot_To_Cv()  # 13 -> 10
pan(0, dragDistanceY)
screenshot_To_Cv()
for _ in range(3):
    pan(dragDistanceX)
    screenshot_To_Cv()  # 20 -> 23
pan(0, dragDistanceY)
screenshot_To_Cv()
for _ in range(3):
    pan(-1 * dragDistanceX)
    screenshot_To_Cv()  # 33 -> 30
pan(0, dragDistanceY)
screenshot_To_Cv()
for _ in range(3):
    pan(dragDistanceX)
    screenshot_To_Cv()  # 40 -> 43
pan(0, dragDistanceY)
screenshot_To_Cv()
time.sleep(1)
driver.close()
time.sleep(2)
status, stitched = stitcher.stitch(images)
cv2.imwrite("python/maps/stitched.png", stitched)
