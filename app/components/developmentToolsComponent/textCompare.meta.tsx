import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'text-compare',
  category: 'Category104',
  route: PATHS.TEXT_COMPARE,
  ...{
    hero_section: {
      title: 'Text Compare',
      description:
        'Compare two text snippets or files side by side. Highlight differences, additions, and removals instantly.',
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
      about_title: 'What is the Text Compare tool?',
      about_description: [
        {
          description:
            'The Text Compare tool shows differences between two text snippets or documents side by side. It highlights added, removed, and modified lines so you can quickly see what changed.',
        },
        {
          description:
            'Use it for comparing code, configuration files, documentation, or any plain text content without needing a full diff client.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the Text Compare tool',
      guide_description: 'Compare two pieces of text in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste original text:',
          step_description:
            'Add the original or older version of the text to the left input.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Paste modified text:',
          step_description: 'Add the new or updated text to the right input.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Run comparison:',
          step_description:
            'Click the compare button to generate a side‑by‑side diff with highlights.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Review changes:',
          step_description:
            'Scroll through the diff to inspect additions, deletions, and modifications.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Code & config reviews',
          description:
            'Compare code snippets or config files when reviewing pull requests or investigating issues.',
        },
        {
          title: 'Document revisions',
          description:
            'See what changed between two versions of copy, specs, or documentation.',
        },
        {
          title: 'Content QA',
          description:
            'Verify edits from teammates or tools by diffing text before publishing.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Text Compare – Online Text Diff Tool',
      meta_description:
        'Compare two text snippets or documents side by side and highlight differences instantly.',
      og_title: 'Text Compare – Free Online Diff',
      og_description:
        'Visualize differences between two pieces of text. Highlight additions, removals, and changes for faster reviews.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
