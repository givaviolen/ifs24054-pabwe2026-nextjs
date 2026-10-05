const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace blue with violet
      content = content.replace(/blue-50(?!0)/g, 'violet-50');
      content = content.replace(/blue-100/g, 'violet-100');
      content = content.replace(/blue-200/g, 'violet-200');
      content = content.replace(/blue-300/g, 'violet-300');
      content = content.replace(/blue-400/g, 'violet-400');
      content = content.replace(/blue-500/g, 'violet-500');
      content = content.replace(/blue-600/g, 'violet-600');
      content = content.replace(/blue-700/g, 'violet-700');
      content = content.replace(/blue-800/g, 'violet-800');
      content = content.replace(/blue-900/g, 'violet-900');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('src');
