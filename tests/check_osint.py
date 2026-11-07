"""Check geographic/data scope and that production never contains owner credentials."""
import json
from pathlib import Path
from collections import Counter
ROOT=Path(__file__).resolve().parents[1]
geo=json.loads((ROOT/'data/geo/udupi-osm-amenities.json').read_text())
assert len(geo['elements'])==471
assert Counter(p['market_core'] for p in geo['elements'])=={'udupi':269,'manipal':125,'malpe':77}
assert len({(p['type'],p['id']) for p in geo['elements']})==471
data=json.loads((ROOT/'research/osint.json').read_text())
assert len(data['developers'])==8
assert len(data['macro']['worldpop_analysis_box']['years'])==11
assert data['macro']['worldpop_analysis_box']['classification']=='modelled estimate / projection'
assert {x['fiscal_year'] for x in data['macro']['gddp']}=={'2018-19','2019-20','2021-22','2022-23','2023-24'}
assert [x['year'] for x in data['macro']['population']]==[2001,2011]
assert data['nightlights']['display']['year']==2016
assert data['nightlights']['scientific']['local_statistics']==[]
for p in (ROOT/'dist').rglob('*'):
    if p.suffix in ['.js','.html','.json']:
        text=p.read_text()
        assert 'ADMIN_TOKEN' not in text, f'Management secret/config in public build: {p}'
print('PASS: geographic counts, scope/series gaps, developer roster and public credential boundary')
