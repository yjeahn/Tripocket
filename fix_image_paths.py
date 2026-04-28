import os
import re
import shutil

TARGET_DIR = "images"

if not os.path.exists(TARGET_DIR):
    os.makedirs(TARGET_DIR)

files_to_process = ["index.html", "app.js", "style.css"]

def process_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all file:/// paths
    # Match something like file:///C:/Users/yja02/.gemini/antigravity/brain/.../filename.ext
    pattern = r'file:///(C:/Users/yja02/\.gemini/antigravity/brain/[^/]+/[^"\'>\s]+\.(?:png|jpg|jpeg|svg|gif))'
    matches = re.findall(pattern, content)

    for match in matches:
        source_path = match.replace('/', '\\')
        filename = os.path.basename(source_path)
        dest_path = os.path.join(TARGET_DIR, filename)

        if os.path.exists(source_path):
            shutil.copy2(source_path, dest_path)
            print(f"Copied: {filename}")
        else:
            print(f"File not found: {source_path}")

        # Replace in content
        original_string = "file:///" + match
        new_string = f"./{TARGET_DIR}/{filename}"
        content = content.replace(original_string, new_string)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Updated paths in: {filepath}")

for f in files_to_process:
    process_file(f)

print("Done!")
