const fs = require('fs');

const pkgPath = 'package.json';
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.scripts['test:e2e'] = "node scripts/run_e2e_tests.js";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
