#!/usr/bin/env python3
"""Preview under the same repository subpath used by GitHub Pages."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
PREFIX = '/udupi-observatory/'
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs): super().__init__(*args,directory=str(ROOT),**kwargs)
    def do_GET(self):
        if self.path == '/':
            self.send_response(302); self.send_header('Location',PREFIX); self.end_headers(); return
        if not urlsplit(self.path).path.startswith(PREFIX):
            self.send_error(404); return
        self.path = '/' + self.path[len(PREFIX):]
        super().do_GET()

print('Local: http://127.0.0.1:4173/udupi-observatory/',flush=True)
ThreadingHTTPServer(('127.0.0.1',4173),Handler).serve_forever()
