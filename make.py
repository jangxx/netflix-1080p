#!/usr/bin/env python3
# This script is only required for creating a clean folder to build a crx file from
# You can load the whole directory as an unpacked extension without any problems

OUTPUT_DIR = "dist"

# Specify files to be included in the packed extension here:
INCLUDE_FILES = [
    "img/*",
    "pages/*",
    "background.js",
    "cadmium-playercore-6.0044.268.911-patched.js",
    "content_script.js",
    "manifest.json",
    "netflix_max_bitrate.js",
    "LICENSE",
]

import glob, os, shutil, sys

if not os.path.isdir(OUTPUT_DIR):
    os.mkdir(OUTPUT_DIR)
elif os.path.isdir(OUTPUT_DIR):
    for fname in os.listdir(OUTPUT_DIR):
        full_path = os.path.join(OUTPUT_DIR, fname)

        if os.path.isfile(full_path) or os.path.islink(full_path):
            os.unlink(full_path)
        elif os.path.isdir(full_path):
            shutil.rmtree(full_path)
else:
    print("Output dir is not a directory")
    sys.exit(1)

for include_glob in INCLUDE_FILES:
    for copy_file in glob.glob(include_glob, recursive=True):
        os.makedirs(os.path.dirname(os.path.join(OUTPUT_DIR, copy_file)), exist_ok=True)
        shutil.copy(copy_file, os.path.join(OUTPUT_DIR, copy_file))