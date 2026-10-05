const fs = require('fs');
const path = require('path');

const map = {
  // Background gradients
  'bg-gray-50': 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-50 to-amber-100',
  'bg-white': 'bg-white/70 backdrop-blur-xl',
  
  // Buttons & Accents
  'bg-violet-600': 'bg-gradient-to-r from-rose-400 to-orange-400 hover:scale-105 hover:shadow-lg',
  'hover:bg-violet-700': 'hover:from-rose-500 hover:to-orange-500',
  'text-violet-600': 'text-rose-500',
  'text-violet-500': 'text-rose-400',
  'bg-violet-100': 'bg-rose-100',
  'bg-violet-50': 'bg-rose-50',
  
  // Borders
  'border-gray-100': 'border-white/50 border',
  'border-gray-200': 'border-white/60 border-2',
  'border-gray-300': 'border-rose-200/50 border-2',
  
  // Shapes & Shadows
  'rounded-xl': 'rounded-3xl',
  'rounded-2xl': 'rounded-3xl',
  'rounded-lg': 'rounded-full',
  'shadow-sm': 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
  'shadow-md': 'shadow-[0_20px_50px_rgb(0,0,0,0.06)]',
  
  // Inputs focus
  'focus:ring-violet-500': 'focus:ring-rose-400',
  'focus:border-violet-500': 'focus:border-rose-400',
  'focus:ring-blue-500': 'focus:ring-rose-400',
  'focus:border-blue-500': 'focus:border-rose-400',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [key, value] of Object.entries(map)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<=["'\\s\`])` + escapedKey + `(?=["'\\s\`])`, 'g');
        content = content.replace(regex, value);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('src');
