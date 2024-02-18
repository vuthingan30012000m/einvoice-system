import os
import subprocess

def format(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as file:
                contents = file.read()
            while "  " in contents:
                contents = contents.replace("  ", " ")
            # contents = contents.replace("token", " ")
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(contents)
list_code=[
"/home/vvn20206205/Desktop/einvoice-system/microservices/api-gateway/src",
"/home/vvn20206205/Desktop/einvoice-system/microservices/user-service/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/tct-demo/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/invoice-service/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/report-service/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/vuvannghia/src",
]
for code in list_code:
    format(code)

