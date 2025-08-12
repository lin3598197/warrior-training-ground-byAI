from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).parent

class RootHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # 確保根目錄為專案資料夾
        new_path = ROOT / path.lstrip("/")
        if new_path.is_dir():
            index = new_path / "index.html"
            if index.exists():
                return str(index)
        return str(new_path)

if __name__ == "__main__":
    addr = ("127.0.0.1", 8000)
    print(f"Serving on http://{addr[0]}:{addr[1]}")
    ThreadingHTTPServer(addr, RootHandler).serve_forever()
