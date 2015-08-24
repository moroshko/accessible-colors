#!/bin/bash

set -e

git checkout gh-pages
git pull origin gh-pages
git merge master --no-edit
npm run build
cp -r dist/* .
git add index.html app.css icons.css index.js favicon.png fonts/AccessibleColor.eot AccessibleColor.svg AccessibleColor.ttf AccessibleColor.woff
git commit -m 'Update gh-pages files'
git push origin gh-pages
git checkout master
