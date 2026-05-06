"""抓取 EA 战地风云 6 新闻，输出为 JSON"""
import json, re, urllib.request, sys, os, time

EA_URL = 'https://www.ea.com/zh-hans/games/battlefield/battlefield-6/news'
OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else 'dist/news'
os.makedirs(OUT_DIR, exist_ok=True)

def fetch_page(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    })
    return urllib.request.urlopen(req, timeout=15).read().decode('utf-8')

def parse_articles(html):
    m = re.search(r'<script[^>]*id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if not m: return [], 0
    data = json.loads(m.group(1))
    fallback = data['props']['pageProps']['newsDataFallback']
    items = fallback.get('items', [])
    total = fallback.get('totalItems', 0)
    return items, total

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
    }

# Fetch page 1
html = fetch_page(EA_URL)
articles, total = parse_articles(html)
print(f'Page 1: {len(articles)} articles (total: {total})')

# Dedup by slug
seen = set()
all_articles = []
for a in articles:
    slug = a.get('slug', '')
    if slug and slug not in seen:
        seen.add(slug)
        all_articles.append(extract_article(a))

# Fetch remaining pages (up to 8, 13 items per page)
per_page = len(articles) or 13
total_pages = min(8, (total + per_page - 1) // per_page) if total else 1

for page in range(2, total_pages + 1):
    try:
        url = f'{EA_URL}?page={page}'
        html = fetch_page(url)
        items, _ = parse_articles(html)
        for a in items:
            slug = a.get('slug', '')
            if slug and slug not in seen:
                seen.add(slug)
                all_articles.append(extract_article(a))
        print(f'Page {page}: {len(items)} articles')
        time.sleep(1)  # rate limit
    except Exception as e:
        print(f'Page {page} failed: {e}')

print(f'Total unique articles: {len(all_articles)}')

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

print(f'Written {total_pages_out} page files + index.json to {OUT_DIR}/')
