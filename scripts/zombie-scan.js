const fs = require('fs');
const blogs = JSON.parse(fs.readFileSync('src/data/seo-blog.json', 'utf-8'));
let hasZombies = false;
blogs.forEach(b => {
  if (!b.slug || !b.title) {
    console.log('Zombie found!', b);
    hasZombies = true;
  }
});
if (!hasZombies) console.log('No 4xx zombies found in blog data.');
