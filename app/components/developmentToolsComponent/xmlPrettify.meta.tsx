import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'xml-prettify',
  category: 'Category75',
  route: PATHS.XML_PRETTIFY,
  ...{
    hero_section: {
      title: 'XML Prettify',
      description:
        'Format and indent XML for readability. Choose spaces or tabs and keep the XML declaration.',
    },
    development_tools_list: [
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the XML Prettifier?',
      about_description: [
        {
          description:
            'The XML Prettifier reformats XML with clean indentation and line breaks, making complex structures easy to read and review.',
        },
        {
          description:
            'Choose indentation size or tabs and optionally keep the XML declaration at the top.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the XML Prettifier',
      guide_description: 'To prettify your XML:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste XML:',
          step_description: 'Paste your XML into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Indentation:',
          step_description:
            'Select 2 or 4 spaces, or enable tabs. Optionally keep the XML declaration.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Prettify:',
          step_description: 'Click the Prettify button to format the XML.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or Clear:',
          step_description:
            'Copy the result to the clipboard or clear inputs to start over.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Debugging & QA',
          description:
            'Quickly understand deeply nested XML structures during debugging and testing.',
        },
        {
          title: 'Code reviews',
          description:
            'Share readable XML in PRs to simplify reviews and reduce misunderstandings.',
        },
        {
          title: 'Version control',
          description:
            'Generate consistent formatting for cleaner diffs across commits.',
        },
        {
          title: 'Documentation & demos',
          description:
            'Present well‑formatted XML in guides, examples, and teaching materials.',
        },
      ],
    },
    meta_data: {
      meta_title: 'XML Prettify – Format XML Online | Developer Utility Tools',
      meta_description:
        'Prettify XML online: format with spaces or tabs, keep XML declaration, and improve readability instantly.',
      og_title: 'XML Prettify – Free Online XML Formatter',
      og_description:
        'Paste XML and format it with clean indentation. Options for tab/space indentation and declaration handling.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
