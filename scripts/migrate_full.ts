import fs from 'fs';
import path from 'path';
import { DEVELOPMENTTOOLS } from '../app/libs/tempDevToolsConstant';

const componentsDir = path.join(process.cwd(), 'app', 'components', 'developmentToolsComponent');
const files = fs.readdirSync(componentsDir);

let count = 0;
for (const file of files) {
    if (file.endsWith('.meta.ts')) {
        const metaPath = path.join(componentsDir, file);
        const content = fs.readFileSync(metaPath, 'utf-8');

        const slugMatch = content.match(/slug:\s*'([^']+)'/);
        if (!slugMatch) continue;

        const slug = slugMatch[1];

        const titleMatch = content.match(/title:\s*'([^']*)'/);
        const descriptionMatch = content.match(/description:\s*'([^']*)'/);
        const categoryMatch = content.match(/category:\s*'([^']*)'/);

        const baseMeta = {
            slug,
            title: titleMatch ? titleMatch[1] : '',
            description: descriptionMatch ? descriptionMatch[1] : '',
            category: categoryMatch ? categoryMatch[1] : ''
        };

        const extraData = DEVELOPMENTTOOLS[slug] || {};

        const exportData = {
            ...baseMeta,
            ...extraData
        };

        const tsContent = `export const meta = ${JSON.stringify(exportData, null, 2)};\n`;
        fs.writeFileSync(metaPath, tsContent, 'utf-8');
        count++;
    }
}
console.log(`Updated ${count} files with full metadata.`);
