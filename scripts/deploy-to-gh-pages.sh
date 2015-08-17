#!/bin/bash

set -e

git checkout gh-pages
git pull origin gh-pages
git merge master --no-edit
npm run build
cp dist/*.* .
git add index.html app.css index.js favicon.png
git commit -m 'Update gh-pages files'
git push origin gh-pages
git checkout master
