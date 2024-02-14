from datetime import datetime


def MyNow():
    return datetime.now().strftime('%Y_%m_%d_%H_%M_%S_%f')
