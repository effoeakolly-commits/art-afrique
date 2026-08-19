import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Use Python zipfile with filters to exclude node_modules, dist, .git
const pyScript = `
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
`;

fs.writeFileSync('create_zip.py', pyScript);
try {
  execSync('python3 create_zip.py', { stdio: 'inherit' });
  execSync('mkdir -p public && cp nkora-frontend-complete.zip public/', { stdio: 'inherit' });
  console.log("Zip copied to public/nkora-frontend-complete.zip");
} catch (e) {
  console.error("Error creating zip:", e);
}
