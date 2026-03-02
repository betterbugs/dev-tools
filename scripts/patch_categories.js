const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, '..', 'app', 'libs', 'constants.tsx');
const componentsDir = path.join(__dirname, '..', 'app', 'components', 'developmentToolsComponent');

const constantsContent = fs.readFileSync(constantsPath, 'utf-8');

const pathsRegex = /([A-Z0-9_]+):\s*['"](\/[^'"]+)['"]/g;
const pathKeyToUrl = {};
let match;
while ((match = pathsRegex.exec(constantsContent)) !== null) {
    pathKeyToUrl[match[1]] = match[2];
}

const categoryRegex = /(Category\w+):\s*\[([\s\S]*?)(?=\n\s*(?:Category\w+:|\]\s*,))/g;
const urlToCategory = {};
while ((match = categoryRegex.exec(constantsContent)) !== null) {
    const categoryName = match[1];
    const itemsBlock = match[2];

    // Look for either url: '/path' or url: PATHS.X
    const itemRegex = /url:\s*(?:PATHS\.([A-Z0-9_]+)|['"]([^'"]+)['"])/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(itemsBlock)) !== null) {
        let url = itemMatch[2];
        if (itemMatch[1]) {
            url = pathKeyToUrl[itemMatch[1]];
        }
        if (url) {
            urlToCategory[url] = categoryName;
        }
    }
}

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.meta.tsx'));
let skippedUrl = [];

for (const file of files) {
    const metaPath = path.join(componentsDir, file);
    let content = fs.readFileSync(metaPath, 'utf-8');

    // Find route: PATHS.X
    const routeMatch = content.match(/route:\s*PATHS\.([A-Z0-9_]+)/);
    if (routeMatch) {
        const url = pathKeyToUrl[routeMatch[1]];
        const cat = urlToCategory[url] || 'Category1';

        // Check if category is already there
        if (!content.includes('category:')) {
            content = content.replace(/slug:\s*'([^']+)',\n/, `slug: '$1',\n  category: '${cat}',\n`);
            fs.writeFileSync(metaPath, content, 'utf-8');
        }
    } else {
        // try finding string route
        const stringRouteMatch = content.match(/route:\s*'([^']+)'/);
        if (stringRouteMatch) {
            const url = stringRouteMatch[1];
            const cat = urlToCategory[url] || 'Category1';
            if (!content.includes('category:')) {
                content = content.replace(/slug:\s*'([^']+)',\n/, `slug: '$1',\n  category: '${cat}',\n`);
                fs.writeFileSync(metaPath, content, 'utf-8');
            }
        }
    }
}

console.log("Patched all meta files with categories!");
