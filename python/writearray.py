from selenium import webdriver
from selenium.webdriver.common.by import By
import json

driver = webdriver.Firefox()
driver.get("https://genshin-impact-map.appsample.com/help/embed")
lis = driver.find_elements(By.CSS_SELECTOR, "#__next > div > ul:nth-child(10) > li")
liahs = []
for li in lis:
    a = li.find_element(By.TAG_NAME, "a")
    img = li.find_element(By.TAG_NAME, "img")
    href = a.get_attribute("href")
    alt = img.get_attribute("alt")
    liah = [alt, href]
    liahs.append(liah)
driver.close()
with open("python/data.json", "w") as f:
    json.dump(liahs, f)
