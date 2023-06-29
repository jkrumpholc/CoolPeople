import sys
from datetime import datetime, timedelta

targets = {}


def calculate(csv_string: str):
    number, start_time, end_time = csv_string.split(",")
    start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
    end_time = datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S")
    delta_time = (end_time - start_time - timedelta(seconds=1))
    if not (number in targets.keys()):
        targets[number] = {}
    cost = 0
    targets[number][start_time] = {"time": delta_time, "cost": cost}


if __name__ == '__main__':
    csv_file = sys.argv[1]
    with open(csv_file) as file:
        for i in file:
            calculate(i.strip())
