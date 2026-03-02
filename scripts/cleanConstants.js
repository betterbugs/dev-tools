const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, '..', 'app', 'libs', 'constants.tsx');
let lines = fs.readFileSync(constantsPath, 'utf-8').split('\n');

// 1. Remove all imports from 'developmentToolsComponent'
lines = lines.filter(line => !/^import\s+.*?\s+from\s+['"]\.\.\/components\/developmentToolsComponent\/.*?['"];?$/.test(line.trim()));

// 2. Remove developmentToolsCategoryContent object
let catStartIndex = lines.findIndex(l => l.startsWith('export const developmentToolsCategoryContent'));
if (catStartIndex !== -1) {
    let catEndIndex = -1;
    for (let i = catStartIndex + 1; i < lines.length; i++) {
        if (lines[i].startsWith('};')) {
            catEndIndex = i;
            break;
        }
    }
    if (catEndIndex !== -1) {
        lines.splice(catStartIndex, catEndIndex - catStartIndex + 1);
    }
}

// 3. Remove developmentToolsRoutes array
let routeStartIndex = lines.findIndex(l => l.startsWith('export const developmentToolsRoutes'));
if (routeStartIndex !== -1) {
    let routeEndIndex = -1;
    for (let i = routeStartIndex + 1; i < lines.length; i++) {
        if (lines[i].startsWith('];')) {
            routeEndIndex = i;
            break;
        }
    }
    if (routeEndIndex !== -1) {
        lines.splice(routeStartIndex, routeEndIndex - routeStartIndex + 1);
    }
}

// 4. Append re-export for the deleted variables
lines.push(`export { developmentToolsCategoryContent, developmentToolsRoutes } from './developmentToolsRegistry';`);

fs.writeFileSync(constantsPath, lines.join('\n'), 'utf-8');
console.log('constants.tsx updated to use the auto-generated registry.');

// 5. Update developmentToolsConstant.tsx
const devPath = path.join(__dirname, '..', 'app', 'libs', 'developmentToolsConstant.tsx');
const newDevToolsContent = `export { DEVELOPMENTTOOLS } from './developmentToolsRegistry';\n`;
fs.writeFileSync(devPath, newDevToolsContent, 'utf-8');
console.log('developmentToolsConstant.tsx updated.');
