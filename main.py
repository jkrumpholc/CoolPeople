import math
import sys
from datetime import datetime, timedelta, time

targets = {}
daytime_minute_cost = 1
daytime_start = time(hour=8)
daytime_end = time(hour=16)
night_minute_cost = 0.5
five_min_bonus = 0.2


def calculate(csv_string: str):
    number, start_datetime, end_datetime = csv_string.split(",")
    start_datetime = datetime.strptime(start_datetime, "%Y-%m-%d %H:%M:%S")
    end_datetime = datetime.strptime(end_datetime, "%Y-%m-%d %H:%M:%S")
    delta_time = (end_datetime - start_datetime - timedelta(seconds=1))
    if not (number in targets.keys()):
        targets[number] = {}
        targets[number]["total_cost"] = 0
    cost = 0
    temp_daytime_minute_cost = daytime_minute_cost
    temp_night_minute_cost = night_minute_cost
    for j in range(math.ceil(delta_time.seconds / 60)):
        if j == 5:
            temp_daytime_minute_cost += five_min_bonus
            temp_night_minute_cost += five_min_bonus
        test_time = start_datetime + timedelta(minutes=j)
        if daytime_start <= test_time.time() < daytime_end:
            cost += temp_daytime_minute_cost
        else:
            cost += temp_night_minute_cost
    targets[number][start_datetime] = {"time": delta_time, "cost": float(cost)}
    targets[number]["total_cost"] += float(cost)


def total_cost() -> int:
    total = 0
    most_called = list(targets.keys())[list(targets.values()).index(max(targets.values(), key=len))]
    targets.pop(most_called)
    for j in targets:
        total += targets[j]["total_cost"]
    return total


if __name__ == '__main__':
    csv_file = sys.argv[1]
    with open(csv_file) as file:
        for i in file:
            calculate(i.strip())
    print(f"Total cost: {total_cost()} CZK")
