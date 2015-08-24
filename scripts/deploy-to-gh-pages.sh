#!/bin/bash

set -e

git checkout gh-pages
git pull origin gh-pages
git merge master --no-edit
npm run build
cp -r dist/* .
git add index.html app.css icons.css index.js favicon.png fonts/AccessibleColor.eot fonts/AccessibleColor.svg fonts/AccessibleColor.ttf fonts/ccessibleColor.woff
git commit -m 'Update gh-pages files'
git push origin gh-pages
git checkout master
