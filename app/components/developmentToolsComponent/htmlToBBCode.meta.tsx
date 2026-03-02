import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-to-bbcode',
  category: 'Category173',
  route: PATHS.HTML_TO_BBCODE,
  ...{
    hero_section: {
      title: 'HTML to BBCode Converter',
      description:
        'Convert HTML markup into forum-friendly BBCode. Supports bold/italic, lists, links/images, and headings.',
    },
    development_tools_list: [
      { tool: 'Markdown to HTML', url: '/development-tools/markdown-to-html' },
      { tool: 'HTML to Markdown', url: '/development-tools/html-to-markdown' },
      { tool: 'HTML Prettify', url: '/development-tools/html-prettify' },
    ],
    development_tools_about_details: {
      about_title: 'What is the HTML to BBCode Converter?',
      about_description: [
        {
          description:
            'This tool transforms common HTML tags into equivalent BBCode used by many forums and bulletin boards.',
        },
        {
          description:
            'Options let you include headings, lists, links, images, and inline styles such as bold and italic.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML to BBCode Converter',
      guide_description: 'Paste HTML and convert it to BBCode in seconds:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste HTML:',
          step_description: 'Paste or upload your HTML.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose options:',
          step_description:
            'Toggle lists, links/images, headings, and inline formatting.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert or enable Auto-update.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Download:',
          step_description: 'Copy the BBCode or download as a .txt file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Ideal for posting content on BBCode-based forums or migrating docs.',
      point: [
        {
          title: 'Forum Posts',
          description: 'Convert blog snippets to BBCode for forums.',
        },
        {
          title: 'Docs Migration',
          description: 'Transform HTML docs to BBCode formats.',
        },
        {
          title: 'Education',
          description: 'Learn mapping between HTML and BBCode tags.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML to BBCode – Convert HTML to BBCode Online',
      meta_description:
        'Convert HTML into BBCode for forums. Supports headings, lists, links, images, and inline formatting.',
      og_title: 'HTML to BBCode – Free Online Tool',
      og_description: 'Paste HTML and get forum-ready BBCode instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
