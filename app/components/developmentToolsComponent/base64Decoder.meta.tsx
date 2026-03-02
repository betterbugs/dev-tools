import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'base64-decoder',
  category: 'Category59',
  route: PATHS.BASE64_DECODER,
  ...{
    hero_section: {
      title: 'Base64 Decoder',
      description:
        'Paste Base64 text or choose a file and decode to readable text (UTF‑8).',
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
      about_title: 'What is the Base64 Decoder?',
      about_description: [
        {
          description:
            'The Base64 Decoder converts Base64‑encoded strings or files back into their original text content using UTF‑8 decoding.',
        },
        {
          description:
            'Useful for reversing data encoded for transport or embedding (e.g., in JSON, URLs, or HTML).',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Base64 Decoder',
      guide_description: 'To decode Base64:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or Upload:',
          step_description:
            'Paste your Base64 text or choose a file containing Base64.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Decode:',
          step_description:
            'Click the Decode button to convert Base64 to UTF‑8 text.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or Clear:',
          step_description: 'Copy the decoded result or clear to start over.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Reverse encoded payloads',
          description:
            'Decode Base64 strings sent via APIs, environment variables, or emails.',
        },
        {
          title: 'Recover embedded text',
          description:
            'Extract readable content embedded in HTML, JSON, or data URIs.',
        },
        {
          title: 'Debugging',
          description:
            'Quickly inspect encoded logs or tokens during troubleshooting.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Base64 Decoder – Decode Base64 to Text | Developer Tools',
      meta_description:
        'Decode Base64 online. Paste text or upload a file and convert Base64 to UTF‑8 instantly.',
      og_title: 'Base64 Decoder – Free Online Tool',
      og_description:
        'Decode Base64 strings or files to readable text. Fast, simple, and secure.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
