import os
import subprocess
from time import sleep
# prettier --write  file_path
# pip install pyautogui
import pyautogui 

def format(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            subprocess.run(["code",   file_path], check=True)
            sleep(1)
            pyautogui.hotkey('alt', 'shift', 'o')
            sleep(1)


            

list_code=[
"/home/vvn20206205/Desktop/einvoice-system/microservices/api-gateway/src",
"/home/vvn20206205/Desktop/einvoice-system/microservices/user-service/src",
"/home/vvn20206205/Desktop/einvoice-system/microservices/invoice-service/src",
"/home/vvn20206205/Desktop/einvoice-system/microservices/tct-demo/src",
"/home/vvn20206205/Desktop/vuvannghia/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/report-service/src",
]
for code in list_code:
    format(code)
