#!/usr/bin/env python3
# -*- coding: utf-8 -*-


import glob
import re
import json

def extractZSTRs(filename):
  p = re.compile('.*i18n[.]t\\(\'([^=]+)=(.+)\'\\)')
  result = dict()
  with open(filename) as f:
    for line in f.readlines():
      m = p.match(line)
      if (m):
        value = m.group(2).replace("\\'", "'")
        result["{key}={value}".format(key=m.group(1), value=value)] = value
  return result
      
allKeys = dict()

for filename in glob.iglob('src/**/*.ts', recursive=True):
  allKeys.update(extractZSTRs(filename))

for filename in glob.iglob('src/**/*.tsx', recursive=True):
  allKeys.update(extractZSTRs(filename))

with open('src/translations/global.json') as inputFile:
  translations = json.load(inputFile)
en = translations['en']
for k in allKeys:
  if k not in en:
    en[k] = allKeys[k]
translations['en'] = en

zz = dict()
for k in allKeys:
  zz[k] = 'テスト' + allKeys[k] + 'テスト'
translations['zz'] = zz

print(json.dumps(translations, sort_keys=True, indent=4))
with open('src/translations/global.json', 'w') as outputFile:
  outputFile.write(json.dumps(translations, sort_keys=True, indent=4))
