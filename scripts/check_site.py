"""Dependency-free checks for the static GitHub Pages portfolio.

Run from any directory: python scripts/check_site.py
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parent.parent


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.references = []
        self.elements = []
        self.h1_count = 0
        self.errors = []
        self.stack = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.h1_count += 1
        for key in ('href', 'src'):
            if key in attrs:
                self.references.append(attrs[key])
        if tag == 'img' and not attrs.get('alt'):
            self.errors.append('Image lacks meaningful alternative text')
        if tag == 'a' and attrs.get('target') == '_blank':
            if 'noopener' not in attrs.get('rel', '').split():
                self.errors.append('External tab link lacks noopener')
        if any(key.startswith('on') for key in attrs):
            self.errors.append('Inline event handler: ' + tag)
        void = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                'link', 'meta', 'param', 'source', 'track', 'wbr'}
        if tag not in void:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            self.errors.append('Unbalanced closing tag: ' + tag)
        else:
            self.stack.pop()


def check():
    errors = []
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    document = Document()
    document.feed(html)
    errors.extend(document.errors)
    if document.stack:
        errors.append('Unclosed HTML tags: ' + ', '.join(document.stack))
    errors.extend('Duplicate id: ' + key for key, count in Counter(document.ids).items() if count > 1)
    if document.h1_count != 1:
        errors.append('Expected exactly one h1')
    for reference in document.references:
        parsed = urlsplit(reference)
        if not parsed.scheme and not parsed.netloc:
            if parsed.fragment and parsed.fragment not in document.ids:
                errors.append('Broken anchor: ' + reference)
            if parsed.path and not (ROOT / unquote(parsed.path)).is_file():
                errors.append('Missing local asset: ' + reference)
    for tag, attrs in document.elements:
        for key in ('aria-labelledby', 'aria-describedby', 'aria-controls'):
            for target in attrs.get(key, '').split():
                if target not in document.ids:
                    errors.append('Missing accessibility target: ' + target)
    required = ['home', 'about', 'research', 'featured', 'projects', 'skills',
                'education', 'certifications', 'portfolio', 'console', 'contact']
    errors.extend('Missing section: ' + section for section in required if section not in document.ids)
    courses = [attrs for tag, attrs in document.elements if 'course' in attrs.get('class', '').split()]
    if len(courses) != 9:
        errors.append('Expected nine unique completed course records')
    if html.count('Credential details pending') != 3:
        errors.append('Expected three pending credential records')
    for credential in ['XZQ8R4MSAHP2', 'D2APYDJB5CXV', '6BQA9DYZBRYE',
                       'BMIMCLU0WZEO', 'E4AC9MM87BDW', '9CICCCM0WZZT']:
        if html.count(credential) != 1:
            errors.append('Missing or duplicated existing credential: ' + credential)
    if re.search(r'third.year|3rd.year', html, re.I):
        errors.append('Outdated student year')
    if 'https://github.com/SileHam' not in document.references:
        errors.append('Missing current GitHub profile')
    if 'https://github.com/Hvma0' in document.references:
        errors.append('Old GitHub profile remains')
    featured = html.split('id="featured"', 1)[1].split('</section>', 1)[0]
    if 'github.com' in featured or '<img' in featured:
        errors.append('Featured private project has an unexpected repository or image')
    if 'Conceptual diagram' not in featured or 'not publicly shared' not in featured:
        errors.append('Missing confidentiality or diagram labeling')
    legacy = (ROOT / 'hamza_portfolio.html').read_text(encoding='utf-8')
    if 'url=./index.html' not in legacy or 'window.location.replace("./index.html")' not in legacy:
        errors.append('Legacy redirect changed')
    if errors:
        raise SystemExit('\n'.join('FAIL: ' + error for error in errors))
    print('PASS: HTML structure, local assets, anchors, accessible references, nine courses,')
    print('      existing credentials, academic profile, confidentiality and legacy redirect.')


if __name__ == '__main__':
    check()
