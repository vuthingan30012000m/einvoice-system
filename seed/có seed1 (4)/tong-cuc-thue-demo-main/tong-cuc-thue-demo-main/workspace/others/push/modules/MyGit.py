import os
import subprocess
from modules.MyError import MyError
from modules.MyExecute import MyExecute


class MyGit:
    # def check(message):
    #     try:
    #         cmd = f"git log -1 --pretty=format: %s"
    #         result = MyExecuteString(cmd)
    #         latest_message = result.stdout.strip()
    #         if (message in latest_message):
    #             MyError(f"Message này đã đẩy code trước đó.")
    #             MyError(f"Hãy kiểm tra lại.")
    #             MyError(f"Chưa đẩy code.")
    #             exit()
    #     except subprocess.CalledProcessError as e:
    #         print("Error:", e)

    def add(message):
        try:
            os.chdir("../../../")
            cmd = f"git add ."
            MyExecute(cmd)
        except subprocess.CalledProcessError as e:
            print("Error:", e)

    def commit(message):
        try:
            cmd = f' git  commit -m "{message}"'
            MyExecute(cmd)
        except subprocess.CalledProcessError as e:
            print("Error:", e)

    def push(message):
        try:
            cmd = f"git  push"
            MyExecute(cmd)
            MyError(f"Đẩy code lên GIT thành công.")
        except subprocess.CalledProcessError as e:
            MyError(f"Đẩy code lên GIT không thành công.")
            MyError(f"Hãy kiểm tra lại.")
            MyError(f"Chưa đẩy code.")
            exit()

#     def view_latest():
#         print("Thông điệp của 5 commit gần nhất:")
#         result = MyGit.log(["git", "log", "-5", "--pretty=format:%s"])
#         commit_messages = result.stdout.split('\n')
#         reversed_messages = reversed(commit_messages)
#         for version, message in enumerate(reversed_messages):
#             print(f"\t[{version}] [{message}]")
#     def view_all():
#         print("Hiển thị tất cả commit:")
#         result = MyGit.log(["git", "log", "--pretty=format:%s"])
#         commit_messages = result.stdout.split('\n')
#         reversed_messages = reversed(commit_messages)
#         for version, message in enumerate(reversed_messages):
#             print(f"\t[{version}] [{message}]")
