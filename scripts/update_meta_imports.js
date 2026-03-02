const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'app', 'components', 'developmentToolsComponent');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.meta.tsx'));

files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace import { PATHS } from '@/app/libs/constants';
    // with import { PATHS } from '@/app/libs/paths';
    content = content.replace(
        "import { PATHS } from '@/app/libs/constants';",
        "import { PATHS } from '@/app/libs/paths';"
    );

    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Updated ' + files.length + ' meta files to use @/app/libs/paths.');
