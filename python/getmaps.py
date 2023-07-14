from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions.action_builder import ActionBuilder
import json
from PIL import Image
import time

driver = webdriver.Firefox()
actions = ActionChains(driver)
action = ActionBuilder(driver)
with open("python/data.json", "r") as f:
    liahs = json.load(f)


def panRight(map, xoff=-640, yoff=0):
    actions.move_to_element_with_offset(map, 1060, 500).click_and_hold().move_by_offset(
        xoff, yoff
    ).release().perform()


for liah in liahs:
    alt = liah[0]
    href = liah[1] + "&no_heading=1"
    driver.get(href)
    time.sleep(1)
    zoom = driver.find_element(
        By.CSS_SELECTOR,
        "#mapDiv > div.leaflet-control-container > div.leaflet-bottom.leaflet-right > div > a.leaflet-control-zoom-in",
    )
    zoomContainer = driver.find_element(
        By.CSS_SELECTOR,
        "#mapDiv > div.leaflet-control-container > div.leaflet-bottom.leaflet-right > div",
    )
    tileContainer = driver.find_element(
        By.CSS_SELECTOR,
        "#mapDiv > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-tile-pane > div",
    )
    tileTL = driver.find_element(
        By.CSS_SELECTOR,
        "#mapDiv > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-tile-pane > div > div > img:nth-child(6)",
    )
    header = driver.find_element(By.CSS_SELECTOR, "#overlay")
    driver.execute_script("arguments[0].remove()", header)
    actions.click_and_hold(tileTL).move_to_element_with_offset(
        zoom, -200, -160
    ).release().perform()
    zoom.click()
    time.sleep(0.25)
    zoom.click()
    driver.execute_script("arguments[0].remove()", zoomContainer)
    time.sleep(0.25)
    driver.save_screenshot(f"python/maps/00{alt}.png")
    panRight(tileContainer)
    time.sleep(2)
    panRight(tileContainer)
    time.sleep(0.25)
    driver.save_screenshot(f"python/maps/10{alt}.png")
    # panRight(tileContainer)
    # time.sleep(0.25)
    # driver.save_screenshot(f"python/maps/20{alt}.png")
    time.sleep(10)
driver.close()
