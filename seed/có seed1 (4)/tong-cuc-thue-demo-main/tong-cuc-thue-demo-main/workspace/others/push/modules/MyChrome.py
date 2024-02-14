from modules.MyExecuteString import MyExecuteString
from modules.MyError import MyError


def MyChrome():
    cmd = f"git remote -v"
    result = MyExecuteString(cmd)
    if result.returncode == 0:
        remote_info = result.stdout
        lines = remote_info.split('\n')
        push_url = None
        for line in lines:
            if "(push)" in line:
                parts = line.split()
                if len(parts) >= 2:
                    push_url = parts[1]
        if push_url:
            cmd = f"start Chrome  {push_url}"
            MyExecuteString(cmd)

        else:
            MyError("Không tìm thấy URL")
    else:
        MyError(f"Lỗi tìm thấy URL")
