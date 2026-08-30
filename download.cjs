const fs = require('fs');
const https = require('https');

const icons = [
  { name: 'linkedin', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/linkedin.svg' },
  { name: 'github', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg' },
  { name: 'leetcode', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leetcode.svg' },
  { name: 'whatsapp', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/whatsapp.svg' },
  { name: 'email', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg' },
];

if (!fs.existsSync('public/icons')) {
  fs.mkdirSync('public/icons');
}

icons.forEach(icon => {
  https.get(icon.url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync(`public/icons/${icon.name}.svg`, data);
      console.log(`Downloaded ${icon.name}.svg`);
    });
  });
});
