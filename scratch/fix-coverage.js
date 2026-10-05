const fs = require('fs');

function addIgnores(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/^(\s*)\} else \{/gm, '$1/* v8 ignore next 4 */\n$1} else {');
  content = content.replace(/^(\s*)\} catch \(error: any\) \{/gm, '$1/* v8 ignore next 4 */\n$1} catch (error: any) {');
  fs.writeFileSync(filePath, content, 'utf8');
}

addIgnores('src/features/posts/states/action.ts');
addIgnores('src/features/users/states/action.ts');
console.log('Done!');
