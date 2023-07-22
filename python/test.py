import os

files = []
for file in os.listdir("python/maps"):
    file = file.replace("\xa0", " ")
    file = os.path.splitext(file)[0]
    files.append(file)
print("Exquisite Chest" in ["Exquisite Chest"])
