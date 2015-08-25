#!/bin/sh

set -e

# http://stackoverflow.com/a/5413029/247243
# http://stackoverflow.com/a/4332530/247243
GREEN=$(tput setaf 2)
MAGENTA=$(tput setaf 5)
NORMAL=$(tput sgr0)

printf "${GREEN}-------------------------------\n"
printf "${GREEN}   Deploying to GitHub pages\n"
printf "${GREEN}-------------------------------\n${NORMAL}"

printf "${MAGENTA}Checking out the gh-pages branch\n${NORMAL}"
git checkout gh-pages

printf "${MAGENTA}Pulling the latest gh-pages from origin\n${NORMAL}"
git pull origin gh-pages

printf "${MAGENTA}Merging master in\n${NORMAL}"
git merge master --no-edit

printf "${MAGENTA}Building the app\n${NORMAL}"
npm run build

printf "${MAGENTA}Deleting old app files from the root directory\n${NORMAL}"
rm index.html app.css icons.css index.js favicon.png
rm -rf fonts

printf "${MAGENTA}Copying the app to the root directory\n${NORMAL}"
cp -r dist/* .

printf "${MAGENTA}Adding files to commit\n${NORMAL}"
git add index.html app.css icons.css index.js favicon.png fonts/AccessibleColors.eot fonts/AccessibleColors.svg fonts/AccessibleColors.ttf fonts/AccessibleColors.woff

printf "${MAGENTA}Committing\n${NORMAL}"
git commit -m 'Update gh-pages files'

printf "${MAGENTA}Pushing to origin\n${NORMAL}"
git push origin gh-pages

printf "${MAGENTA}Switching back to master\n${NORMAL}"
git checkout master

printf "${GREEN}--------------------------\n"
printf "${GREEN}   Deployment succeeded\n"
printf "${GREEN}--------------------------\n${NORMAL}"
