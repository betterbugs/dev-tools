const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, '..', 'app', 'libs', 'constants.tsx');
const devToolsPath = path.join(__dirname, '..', 'app', 'libs', 'developmentToolsConstant.tsx');
const componentsDir = path.join(__dirname, '..', 'app', 'components', 'developmentToolsComponent');

console.log("Reading files...");
const constantsContent = fs.readFileSync(constantsPath, 'utf-8');
const devToolsContent = fs.readFileSync(devToolsPath, 'utf-8');

// Extraction logic from constants
const importRegex = /import\s+(\w+)\s+from\s+['"]\.\.\/components\/developmentToolsComponent\/([^'"]+)['"]/g;
const componentToFilename = {};
let match;
while ((match = importRegex.exec(constantsContent)) !== null) {
    componentToFilename[match[1]] = match[2];
}

const pathsRegex = /([A-Z0-9_]+):\s*['"](\/[^'"]+)['"]/g;
const pathKeyToUrl = {};
while ((match = pathsRegex.exec(constantsContent)) !== null) {
    pathKeyToUrl[match[1]] = match[2];
}

const routesRegex = /path:\s*PATHS\.([A-Z0-9_]+),\s*component:\s*<([^ />]+)\s*\/>/g;
const componentToUrl = {};
while ((match = routesRegex.exec(constantsContent)) !== null) {
    const url = pathKeyToUrl[match[1]];
    if (url) componentToUrl[match[2]] = url;
}

const categoryRegex = /(Category\w+):\s*\[([\s\S]*?)(?=\n\s*(?:Category\w+:|\]\s*,))/g;
const urlToCategoryData = {};
while ((match = categoryRegex.exec(constantsContent)) !== null) {
    const categoryName = match[1];
    const itemsBlock = match[2];

    const itemRegex = /{\s*(?:icon:[^,]+,\s*)?url:\s*(?:PATHS\.[A-Z0-9_]+|['"]([^'"]+)['"]),\s*title:\s*['"]([^'"]+)['"](?:,\s*description:\s*['"]([^'"]+)['"])?/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(itemsBlock)) !== null) {
        let url = itemMatch[1];
        if (!url) {
            // It might be a PATHS reference, need to match differently or just fallback to generic 
            // This is okay, most fall back. Let's do a more robust regex for url inside itemsBlock
        }
    }
}

// Fallback: we just use the AST parser to grab [slug]: { ... } block
let count = 0;
for (const [componentName, filename] of Object.entries(componentToFilename)) {
    const url = componentToUrl[componentName];
    if (!url) continue;
    const slug = url.substring(1);

    // Find `[slug]: {` OR `'slug': {` etc
    // We can search for the slug in devToolsContent
    const slugIndex = devToolsContent.indexOf(`[\`${slug}\`]: {`);
    const slugIndex2 = devToolsContent.indexOf(`'${slug}': {`);
    const slugIndex3 = devToolsContent.indexOf(`"${slug}": {`);

    let startIndex = -1;
    if (slugIndex !== -1) startIndex = slugIndex + `[\`${slug}\`]: `.length;
    else if (slugIndex2 !== -1) startIndex = slugIndex2 + `'${slug}': `.length;
    else if (slugIndex3 !== -1) startIndex = slugIndex3 + `"${slug}": `.length;

    if (startIndex === -1) {
        // If not found, skip
        continue;
    }

    // bracket matching
    let openBrackets = 0;
    let endIndex = -1;
    let started = false;

    for (let i = startIndex; i < devToolsContent.length; i++) {
        if (devToolsContent[i] === '{') {
            openBrackets++;
            started = true;
        } else if (devToolsContent[i] === '}') {
            openBrackets--;
        }

        if (started && openBrackets === 0) {
            endIndex = i;
            break;
        }
    }

    if (endIndex !== -1) {
        const rawObjectCode = devToolsContent.substring(startIndex, endIndex + 1);

        // Check if there are React components used, to inject import
        const hasReact = /<[A-Z]/.test(rawObjectCode) || /React\./.test(rawObjectCode);
        const reactImport = hasReact ? `import React from 'react';\nimport { PATHS } from '../../libs/constants';\n\n` : `import { PATHS } from '../../libs/constants';\n\n`;

        const requiredImports = [reactImport];
        // Need to find any unresolved icon imports in the object, e.g. StarGardientIcon etc
        // Let's just blindly push all imports from developmentToolsConstant.tsx that might be needed.
        const metaContent = `import { PATHS } from '@/app/libs/constants';
import React from 'react';
import StarGardientIcon from '@/app/components/theme/Icon/starGradientIcon';
import ShareGradientIcon from '@/app/components/theme/Icon/shareGradientIcon';
import RecorderGradientIcon from '@/app/components/theme/Icon/recorderGradientIcon';
import PowerCircleIcon from '@/app/components/theme/Icon/powerCircleIcon';
import LogsGradientIcon from '@/app/components/theme/Icon/logsGradientIcon';
import DevelopmentToolsStyles from '@/app/developmentToolsStyles.module.scss';
import ComparisonsStyles from '@/app/components/comparisonsComponent/comparisonsStyles.module.scss';
import { Button } from 'antd';
import Link from 'next/link';

export const meta = {
  slug: '${slug}',
  route: PATHS.${Object.keys(pathKeyToUrl).find(k => pathKeyToUrl[k] === url) || 'UNKNOWN'},
  ...${rawObjectCode}
};
`;

        const metaFilename = `${filename}.meta.tsx`;
        const metaPath = path.join(componentsDir, metaFilename);
        fs.writeFileSync(metaPath, metaContent, 'utf-8');
        count++;
    }
}

console.log(`Successfully created ${count} meta files.`);
