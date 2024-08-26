import requests

ttlText = requests.get('https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl').text
with open('comments.ttl', 'r') as f:
    fileText = f.read()
if fileText != ttlText:
    with open('comments.ttl', 'w') as f:
        f.write(ttlText)

