now=$(date +"%m-%d-%y %H:%M:%S")
commit_msg="Deployment $now"
current_branch="$(git rev-parse --abbrev-ref HEAD)"

echo "Deploying branch $current_branch ($commit_msg)"

git checkout -B gh-pages
npm run build
git add -f build
git commit -am "$commit"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
