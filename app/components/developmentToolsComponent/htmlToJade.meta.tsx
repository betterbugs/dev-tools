import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-to-jade',
  category: 'Category175',
  route: PATHS.HTML_TO_JADE,
  ...{
    hero_section: {
      title: 'HTML to Jade (Pug) Converter',
      description:
        'Convert clean HTML into Jade/Pug syntax instantly. Preserve ids/classes, attributes, text, and common void tags.',
    },
    development_tools_list: [
      { tool: 'HTML to Markdown', url: '/development-tools/html-to-markdown' },
      { tool: 'Markdown to HTML', url: '/development-tools/markdown-to-html' },
      { tool: 'HTML Prettify', url: '/development-tools/html-prettify' },
    ],
    development_tools_about_details: {
      about_title: 'What is the HTML to Jade Converter?',
      about_description: [
        {
          description:
            'This tool parses your HTML and converts it to Jade (now called Pug), a whitespace‑sensitive templating language used in Node.js projects.',
        },
        {
          description:
            'It supports id/class shorthand, attributes, text nodes (using the “|” operator), and self‑closing (void) tags like img, br, and input.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML to Jade Converter',
      guide_description: 'Turn HTML into easy‑to‑read Jade/Pug in seconds:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste HTML:',
          step_description: 'Paste or upload your HTML snippet or file.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose options:',
          step_description: 'Pick indentation size and whitespace handling.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description:
            'Click Convert or enable Auto‑update to see results live.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy / Download:',
          step_description:
            'Copy the Jade/Pug output or download it as a .jade file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Great for migrating HTML snippets to Pug templates and learning Jade/Pug syntax.',
      point: [
        {
          title: 'Template Migration',
          description:
            'Move existing HTML partials into Pug‑based view layers.',
        },
        {
          title: 'Rapid Prototyping',
          description:
            'Quickly reformat HTML into concise Pug for Node/Express apps.',
        },
        {
          title: 'Education',
          description:
            'Understand how ids/classes/attributes map to Jade/Pug shorthand.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML to Jade (Pug) – Convert HTML to Pug Online',
      meta_description:
        'Convert HTML into Jade/Pug syntax online. Supports ids/classes, attributes, text nodes, and void tags. Copy or download instantly.',
      og_title: 'HTML to Jade (Pug) – Free Online Converter',
      og_description:
        'Paste HTML and get Jade/Pug output instantly with clean indentation.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
