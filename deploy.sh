set -e

npm run build

cd dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:misi96/tic-tac-toe-with-gravels.git master:gh-pages

cd -
