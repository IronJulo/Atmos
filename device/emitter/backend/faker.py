import requests
import random
import time

url = 'http://localhost:3005/'

def generateData():
    return {
        "collectorId": "67addd4a-a827",
        "co2": random.randint(380, 450),
        "air_quality": random.randint(20, 50),
        "humidity": random.randint(10, 20),
        "temperature": random.randint(20, 25),
        "pm1_0": random.randint(10, 20),
        "pm2_5": random.randint(5, 20),
        "pm10_0": random.randint(20, 50),
    }



for i in range(1, 240) :
    obj = generateData()
    x = requests.post(url, obj)
    time.sleep(1)
    print("sent #{}".format(i))