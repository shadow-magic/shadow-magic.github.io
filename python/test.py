import math


def pan(xoff, yoff):
    # positive xoff = move right & positive yoff = move down
    quotientX, remainderX = divmod(abs(xoff), 1920)
    quotientY, remainderY = divmod(abs(yoff), 1080)
    testX, testY = 0, 0
    # print(f"quotientX:{quotientX} quotientY:{quotientY} remainderX:{remainderX} remainderY:{remainderY}")
    startX = 1920
    startY = 1080
    xoffsign, yoffsign = -1, -1
    if xoff >= 0:
        startX = 0
        xoffsign = 1
    if yoff >= 0:
        startY = 0
        yoffsign = 1
    # print(xoffsign, yoffsign)
    while quotientX > 0 or quotientY > 0 or remainderX != 0 or remainderY != 0:
        if quotientX > 0 and quotientY > 0:
            print("1")
            print(startX, startY)
            print("displaced by")
            print(xoffsign * 1920, yoffsign * 1080)
            print("finished")
            testX += xoffsign * 1920
            testY += yoffsign * 1080
            quotientX -= 1
            quotientY -= 1
        elif quotientX == 0 and quotientY > 0:
            print(startX, startY)
            print("displaced by")
            print("0", yoffsign * 1080)
            print("finished")
            testY += yoffsign * 1080
            quotientY -= 1
        elif quotientX > 0 and quotientY == 0:
            print(startX, startY)
            print("displaced by")
            print(xoffsign * 1920, "0")
            print("finished")
            testX += xoffsign * 1920
            quotientX -= 1
        else:
            # remainderX or remainderY or both not zero
            print(startX, startY)
            print("displaced by")
            print(xoffsign * remainderX, yoffsign * remainderY)
            print("finished")
            testX += xoffsign * remainderX
            testY += yoffsign * remainderY
            remainderX, remainderY = 0, 0
    return testX, testY


xtest, ytest = pan(-10000, 10000)
print(f"displaced by {xtest}, {ytest}")
