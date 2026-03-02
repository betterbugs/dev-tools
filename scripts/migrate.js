const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, '..', 'app', 'libs', 'constants.tsx');
const componentsDir = path.join(__dirname, '..', 'app', 'components', 'developmentToolsComponent');

console.log("Reading constants.tsx...");
const constantsContent = fs.readFileSync(constantsPath, 'utf-8');

// 1. Extract imports: filename -> ComponentName
// Example: import UpperCaseConverterComponent from '../components/developmentToolsComponent/upperCaseConverterComponent';
const importRegex = /import\s+(\w+)\s+from\s+['"]\.\.\/components\/developmentToolsComponent\/([^'"]+)['"]/g;
const filenameToComponent = {};
const componentToFilename = {};
let match;
while ((match = importRegex.exec(constantsContent)) !== null) {
    const componentName = match[1];
    const filename = match[2];
    filenameToComponent[filename] = componentName;
    componentToFilename[componentName] = filename;
}

// 2. Extract PATHS: PathKey -> RouteUrl
// Example: TEXT_UPPERCASE_CONVERTER: '/text-uppercase-converter',
const pathsRegex = /([A-Z0-9_]+):\s*['"](\/[^'"]+)['"]/g;
const pathKeyToUrl = {};
const urlToPathKey = {};
while ((match = pathsRegex.exec(constantsContent)) !== null) {
    pathKeyToUrl[match[1]] = match[2];
    urlToPathKey[match[2]] = match[1];
}

// 3. Extract routes: PathKey -> ComponentName
// Example: path: PATHS.TEXT_UPPERCASE_CONVERTER, component: <UpperCaseConverterComponent />,
const routesRegex = /path:\s*PATHS\.([A-Z0-9_]+),\s*component:\s*<([^ />]+)\s*\/>/g;
const componentToUrl = {};
while ((match = routesRegex.exec(constantsContent)) !== null) {
    const pathKey = match[1];
    const componentName = match[2];
    const url = pathKeyToUrl[pathKey];
    if (url) {
        componentToUrl[componentName] = url;
    }
}

// 4. Extract Category -> Url
// Example: Category1: [ { url: '/text-uppercase-converter', category_title: '...', category_description: '...' } ]
const categoryRegex = /(Category\w+):\s*\[([\s\S]*?)(?=\n\s*(?:Category\w+:|\]\s*,))/g;

const urlToCategoryData = {};
while ((match = categoryRegex.exec(constantsContent)) !== null) {
    const categoryName = match[1];
    const itemsBlock = match[2];

    // Extract items within this block
    const itemRegex = /{\s*url:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*description:\s*['"]([^'"]+)['"]/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(itemsBlock)) !== null) {
        const url = itemMatch[1];
        urlToCategoryData[url] = {
            category: categoryName,
            short_title: itemMatch[2],
            short_description: itemMatch[3]
        };
    }
}

console.log("Generating metadata files...");
let generatedCount = 0;

for (const [componentName, filename] of Object.entries(componentToFilename)) {
    const url = componentToUrl[componentName];
    if (!url) {
        console.warn(`Warning: No route found for component ${componentName} (${filename})`);
        continue;
    }

    const categoryData = urlToCategoryData[url] || {};
    const slug = url.substring(1); // remove leading slash

    const metaContent = `export const meta = {
  slug: '${slug}',
  title: '${categoryData.short_title || ''}',
  description: '${categoryData.short_description || ''}',
  category: '${categoryData.category || ''}'
};
`;

    const metaFilename = `${filename}.meta.ts`;
    const metaPath = path.join(componentsDir, metaFilename);
    fs.writeFileSync(metaPath, metaContent, 'utf-8');
    generatedCount++;
}

console.log(`Successfully created ${generatedCount} meta files.`);
