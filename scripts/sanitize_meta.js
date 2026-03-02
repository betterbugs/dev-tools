const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'app', 'components', 'developmentToolsComponent');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.meta.tsx'));

files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Find the start of the 'export const meta' block
    const metaIndex = content.indexOf('export const meta = {');
    if (metaIndex !== -1) {
        const metaPart = content.substring(metaIndex);
        const newContent = `import { PATHS } from '@/app/libs/constants';\nimport React from 'react';\n\n${metaPart}`;
        fs.writeFileSync(filePath, newContent, 'utf-8');
    }
});

console.log('Sanitized ' + files.length + ' meta files.');
