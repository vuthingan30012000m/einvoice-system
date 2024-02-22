import os
import subprocess
# prettier --write  file_path

def format(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as file:
                contents = file.read()
            while "  " in contents:
                contents = contents.replace("  ", " ")
            contents = contents.replace("process.env['", "process.env.")
            contents = contents.replace("process.env[\"", "process.env.")
            contents = contents.replace("return { error: error.message };", "return { message: error.message };") 
            # contents = contents.replace("@vuvannghia/common", "@vuvannghia") 
            # contents = contents.replace("src", "../") //
            # contents = contents.replace("//", "") 
            # contents = contents.replace("🚀", "")   
            contents = contents.replace("throw new Error", "throw new xxxxxxxxxxxxxxxxxxx")  
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(contents)
# prettier --write  file_path
            # subprocess.run(["prettier", "--write", file_path], check=True)
            # subprocess.run(["prettier", "--write", file_path], check=True)

list_code=[
# "/home/vvn20206205/Desktop/einvoice-system/microservices/api-gateway/src",
"/home/vvn20206205/Desktop/einvoice-system/microservices/user-service/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/invoice-service/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/tct-demo/src",
# "/home/vvn20206205/Desktop/vuvannghia/src",
# "/home/vvn20206205/Desktop/einvoice-system/microservices/report-service/src",
]
for code in list_code:
    format(code)
