const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'app', 'components', 'developmentToolsComponent');
const registryFile = path.join(__dirname, '..', 'app', 'libs', 'developmentToolsRegistry.tsx');

const files = fs.readdirSync(componentsDir);
const metaFiles = files.filter(f => f.endsWith('.meta.tsx'));

let importsStr = `/* eslint-disable react/display-name */\nimport dynamic from 'next/dynamic';\n`;
let devToolsMapStr = `export const DEVELOPMENTTOOLS: Record<string, any> = {};\n`;
let categoryMapStr = `export const developmentToolsCategoryContent: Record<string, any[]> = {};\n`;
let routesArrayStr = `export const developmentToolsRoutes: any[] = [\n`;

let initStr = `\nconst allMeta = [\n`;

metaFiles.forEach((file, index) => {
  const componentName = file.replace('.meta.tsx', '');
  const importName = `Meta${index}`;
  importsStr += `import { meta as ${importName} } from '../components/developmentToolsComponent/${componentName}.meta';\n`;

  initStr += `  ${importName},\n`;

  routesArrayStr += `  {
    path: ${importName}.route,
    component: dynamic(() => import('../components/developmentToolsComponent/${componentName}')),
  },\n`;
});

initStr += `];\n\n`;
initStr += `allMeta.forEach((m: any) => {
  const meta: any = m;
  DEVELOPMENTTOOLS[meta.slug] = meta;
  const cat = meta.category || 'Category1';
  if (!developmentToolsCategoryContent[cat]) {
    developmentToolsCategoryContent[cat] = [];
  }
  developmentToolsCategoryContent[cat].push({
    url: meta.route,
    title: meta.title || meta.hero_section?.title || '',
    description: meta.description || meta.hero_section?.description || '',
    isNew: false
  });
});\n\n`;

routesArrayStr += `];\n`;

const finalCode = importsStr + devToolsMapStr + categoryMapStr + initStr + routesArrayStr;

fs.writeFileSync(registryFile, finalCode, 'utf-8');
console.log('Registry generated successfully at app/libs/developmentToolsRegistry.tsx');
