"""
run.py — Local development launcher (Windows / macOS / Linux).

This project is a Next.js + PostgreSQL application. This script simply
provides a familiar `python run.py` entrypoint:

    1. Verifies that Node.js is installed.
    2. Runs `npm install` the first time (or when node_modules is missing).
    3. Starts the dev server via `npm run dev` (http://localhost:3000).

Database configuration is read from the `.env` file (DATABASE_URL) —
no cloud-specific paths or hardcoded hosts are used anywhere.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
IS_WINDOWS = os.name == "nt"


def run(cmd: list[str]) -> int:
    """Run a command from the project root, npm needs the shell on Windows."""
    printable = " ".join(cmd)
    print(f"\n▶  {printable}\n")
    # npm/npx are .cmd shims on Windows → require shell=True there.
    return subprocess.call(cmd, cwd=ROOT, shell=IS_WINDOWS)


def main() -> int:
    if shutil.which("node") is None:
        print("✖  Node.js is not installed or not on PATH.")
        print("   Download it from https://nodejs.org and try again.")
        return 1

    npm = "npm.cmd" if IS_WINDOWS else "npm"

    if not os.path.isdir(os.path.join(ROOT, "node_modules")):
        print("…  node_modules not found — installing dependencies first.")
        code = run([npm, "install"])
        if code != 0:
            print("✖  npm install failed.")
            return code

    print("…  Starting the development server (Ctrl+C to stop).")
    print("…  Arabic:  http://localhost:3000/ar")
    print("…  English: http://localhost:3000/en\n")
    try:
        return run([npm, "run", "dev"])
    except KeyboardInterrupt:
        print("\n⏹  Server stopped. Bye!")
        return 0


if __name__ == "__main__":
    sys.exit(main())
