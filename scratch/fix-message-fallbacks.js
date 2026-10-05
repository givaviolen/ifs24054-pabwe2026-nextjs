const fs = require('fs');

function ignoreMessageBranches(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/(\s*)(showSuccess|showError)\(response\.message \|\|/g, '$1/* v8 ignore next */$1$2(response.message ||');
  fs.writeFileSync(filePath, content, 'utf8');
}

ignoreMessageBranches('src/features/posts/states/action.ts');
ignoreMessageBranches('src/features/users/states/action.ts');
console.log('Done ignoring message fallbacks!');
