now=$(date +"%m-%d-%y %H:%M:%S")
commit_msg="Deployment from CircleCI $now"
current_branch="$(git rev-parse --abbrev-ref HEAD)"

echo "Deploying branch $current_branch ($commit_msg)"

compass compile
yarn build

git config user.name "CircleCI"
git config user.email "circleci@reccam.io"

git checkout -B gh-pages
git add -f build
git commit -am "$commit_msg"
git checkout .
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
