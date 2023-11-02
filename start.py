import subprocess

def is_node_installed():
    try:
        # Run the 'node -v' command to check if Node.js is installed
        subprocess.check_output(["node", "-v"])
        return True
    except subprocess.CalledProcessError:
        return False

if not is_node_installed():
    print("Node.js is not installed.")
    exit

print("Node.js is installed.")
# TODO