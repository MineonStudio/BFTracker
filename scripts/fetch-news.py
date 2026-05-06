"""抓取 EA 战地风云 6 新闻（通过 drop-api），输出为 JSON"""
import json, urllib.request, sys, os, time, re

API_BASE = 'https://drop-api.ea.com/news-articles'
OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else 'public/news'
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Origin': 'https://www.ea.com',
    'x-feature': '9837974469060592000',
    'drop-referrer': 'https://www.ea.com/zh-hans/games/battlefield/battlefield-6/news',
    'Accept': '*/*',
}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    return json.loads(urllib.request.urlopen(req, timeout=15).read())

def extract_article(a):
    img = a.get('image') or {}
    return {
        'title': a.get('title', ''),
        'summary': a.get('summary', ''),
        'slug': a.get('slug', ''),
        'type': a.get('type', ''),
        'date': a.get('publishingDate', ''),
        'img': img.get('ar16X9', img.get('ar3X1', img.get('ar2X1', img.get('ar1X1', '')))),
        'featured': a.get('featured', False),
        'tags': a.get('tags', []),
        'body': '',
    }

def fetch_detail(item):
    """Fetch article body from detail API"""
    slug = item['slug']
    try:
        url = f'{API_BASE}/{slug}?locale=zh-hans'
        detail = fetch(url)
        item['body'] = detail.get('body', '')
        time.sleep(0.3)  # rate limit
        print(f'  ✓ {slug[:40]}')
    except Exception as e:
        print(f'  ✗ {slug[:40]} ({e})')
    return item

# Types to fetch
TYPES = {
    'latest':         'related-entity-slugs=battlefield-6&linked-to-level=Game&include-featured=true',
    'game-updates':   'article-types=game-updates&related-entity-slugs=battlefield-6&linked-to-level=Game&include-featured=true',
    'bf6-guides':     'article-types=bf6-guides&related-entity-slugs=battlefield-6&linked-to-level=Game&include-featured=true',
    'news-article':   'article-types=news-article&related-entity-slugs=battlefield-6&linked-to-level=Game&include-featured=true',
}

all_articles = []
seen = set()

for type_key, params in TYPES.items():
    page = 0
    while True:
        url = f'{API_BASE}/list?locale=zh-hans&limit=13&offset={page*13}&{params}'
        try:
            data = fetch(url)
            items = data.get('items', [])
            if not items:
                break
            for a in items:
                slug = a.get('slug', '')
                if slug and slug not in seen:
                    seen.add(slug)
                    all_articles.append(extract_article(a))
            print(f'{type_key}: page {page+1} → {len(items)} items')
            page += 1
            time.sleep(0.5)
        except Exception as e:
            print(f'{type_key}: page {page+1} error: {e}')
            break

print(f'\nTotal unique articles: {len(all_articles)}')

# Fetch detail bodies (top 50 articles to keep build time reasonable)
print('\nFetching article details...')
for i, item in enumerate(all_articles):
    if i >= 50:
        print(f'  (skipped {len(all_articles) - 50}, limit reached)')
        break
    fetch_detail(item)

# Sort by date descending
all_articles.sort(key=lambda a: a.get('date', ''), reverse=True)

# Write per-page JSON files
per_page_out = 12
total_pages_out = (len(all_articles) + per_page_out - 1) // per_page_out
for p in range(1, total_pages_out + 1):
    start = (p - 1) * per_page_out
    end = start + per_page_out
    page_data = {
        'page': p,
        'totalPages': total_pages_out,
        'totalItems': len(all_articles),
        'articles': all_articles[start:end],
    }
    with open(os.path.join(OUT_DIR, f'page-{p}.json'), 'w', encoding='utf-8') as f:
        json.dump(page_data, f, ensure_ascii=False, indent=2)

with open(os.path.join(OUT_DIR, 'index.json'), 'w', encoding='utf-8') as f:
    json.dump({
        'totalItems': len(all_articles),
        'totalPages': total_pages_out,
        'perPage': per_page_out,
    }, f, ensure_ascii=False, indent=2)

print(f'\nDone! {len(all_articles)} articles, {total_pages_out} pages → {OUT_DIR}/')
