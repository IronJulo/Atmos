import random
data = []

for i in range (1,60):
    data.append([1646001338 + i*10000, random.randint(0,50)])
print (data)
