"""Verify portable links, research integrity and publication completeness."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
ROOT=Path(__file__).resolve().parents[1]/'public'/'briefs'
class Document(HTMLParser):
    def __init__(self): super().__init__(); self.refs=[]; self.ids=[]; self.main=False; self.title=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='main':self.main=True
        if tag=='title':self.title=True
        if tag=='img':assert a.get('alt'), 'Missing image alt text'
        for attr in ('href','src'):
            if attr in a:self.refs.append(a[attr])
docs={}
for file in ROOT.glob('*.html'):
    doc=Document();doc.feed(file.read_text());docs[file.name]=doc
    assert doc.main and doc.title, file.name
    assert len(doc.ids)==len(set(doc.ids)), f'Duplicate IDs in {file.name}'
for name,doc in docs.items():
    for ref in doc.refs:
        parts=urlsplit(ref)
        if parts.scheme or parts.netloc:continue
        assert not parts.path.startswith('/'), f'Root absolute URL breaks Pages subpath: {name}: {ref}'
        path=ROOT/unquote(parts.path) if parts.path else ROOT/name
        assert path.exists(),f'Broken local link: {name}: {ref}'
        if parts.fragment and path.suffix=='.html':
            assert parts.fragment in docs[path.name].ids,f'Broken anchor: {name}: {ref}'
market=json.loads((ROOT/'research/market.json').read_text())
ids=[s['id'] for s in market['samples']]
assert len(ids)==len(set(ids))==21
assert all(s['market'] in ['Udupi','Manipal','Malpe'] for s in market['samples'])
assert market['unit_conversions']['cent_sqft']==435.6
assert 'P-C-ARCHIVE' not in (ROOT/'assets/data.js').read_text()
for page in ['index','dashboard','markets','discovery','atlas','playbooks','risks','scenarios','sources','chronicle']:
    assert page+'.html' in docs
assert (ROOT/'assets/malpe.jpg').stat().st_size<500000
print(f'PASS: {len(docs)} HTML files, portable links/anchors, 21 unique triad records, archive separation and image budget')
