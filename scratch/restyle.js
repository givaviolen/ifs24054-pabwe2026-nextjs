const fs = require('fs');
const path = require('path');

const map = {
  // Backgrounds
  'bg-white': 'bg-slate-900',
  'bg-gray-50': 'bg-slate-800',
  'bg-gray-100': 'bg-slate-800',
  'bg-blue-600': 'bg-indigo-600',
  'hover:bg-blue-700': 'hover:bg-indigo-500',
  'bg-blue-100': 'bg-indigo-900',
  'hover:bg-gray-100': 'hover:bg-slate-700',
  'hover:bg-gray-50': 'hover:bg-slate-700',
  'bg-red-50': 'bg-red-900/30',
  'hover:bg-red-50': 'hover:bg-red-900/30',
  'bg-gray-800': 'bg-slate-100',
  'hover:bg-gray-900': 'hover:bg-slate-200',
  'from-blue-50': 'from-slate-900',
  'to-indigo-100': 'to-slate-800',
  'shadow-blue-500/30': 'shadow-indigo-500/30',

  // Text colors
  'text-gray-900': 'text-slate-50',
  'text-gray-800': 'text-slate-100',
  'text-gray-700': 'text-slate-200',
  'text-gray-600': 'text-slate-300',
  'text-gray-500': 'text-slate-400',
  'text-gray-400': 'text-slate-500',
  'text-gray-300': 'text-slate-600',
  'text-blue-600': 'text-indigo-400',
  'hover:text-blue-600': 'hover:text-indigo-300',

  // Border colors
  'border-gray-100': 'border-slate-800',
  'border-gray-200': 'border-slate-700',
  'border-gray-300': 'border-slate-600',
  'border-gray-50': 'border-slate-800',
  'border-white': 'border-slate-900',

  // Shapes & Shadows
  'rounded-2xl': 'rounded-none',
  'rounded-xl': 'rounded-none',
  'rounded-lg': 'rounded-none',
  'rounded-full': 'rounded-sm', // make avatars square
  'shadow-sm': 'shadow-lg shadow-indigo-500/10',
  'shadow-xs': 'shadow-md shadow-indigo-500/10',
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
      
      // We will do a word boundary replace for the keys
      for (const [key, value] of Object.entries(map)) {
        // Need to escape keys for regex
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // match class names correctly (surrounded by space, quote, or backtick)
        const regex = new RegExp(`(?<=["'\\s\`])` + escapedKey + `(?=["'\\s\`])`, 'g');
        content = content.replace(regex, value);
      }
      
      // additional custom replaces for inputs
      content = content.replace(/border border-slate-700/g, 'border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400');


      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('src');
