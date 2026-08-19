
import os
import zipfile

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        # Exclude unwanted folders
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', '.next', '.turbo', '.cache']]
        for file in files:
            if file.endswith('.zip') or file == '.DS_Store':
                continue
            filePath = os.path.join(root, file)
            arcname = os.path.relpath(filePath, path)
            ziph.write(filePath, arcname)

with zipfile.ZipFile('nkora-frontend-complete.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipdir('.', zipf)

print("ZIP successfully created!")
