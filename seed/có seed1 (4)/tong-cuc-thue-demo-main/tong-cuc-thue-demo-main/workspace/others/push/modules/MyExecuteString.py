import subprocess


def MyExecuteString(cmd):
    return subprocess.run(
        " "+cmd,
        text=True,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True,
        encoding='utf-8'
    )
