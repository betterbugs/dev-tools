import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'base64-encoder',
  category: 'Category60',
  route: PATHS.BASE64_ENCODER,
  ...{
    hero_section: {
      title: 'Base64 Encoder',
      description:
        'Paste text or choose a file and encode to Base64 for transport and embedding.',
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
      about_title: 'What is the Base64 Encoder?',
      about_description: [
        {
          description:
            'The Base64 Encoder converts text or file content into Base64 so it can be safely transported in URLs, JSON, and HTML.',
        },
        {
          description:
            'Base64 is widely used to embed small assets or serialize binary/text within text‑only protocols.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Base64 Encoder',
      guide_description: 'To encode to Base64:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or Upload:',
          step_description: 'Provide the text or choose a file to encode.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Encode:',
          step_description:
            'Click the Encode button to generate the Base64 string.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or Clear:',
          step_description: 'Copy the encoded result or clear to start over.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Embed assets',
          description:
            'Convert small images or files to Base64 and embed in CSS, HTML, or JSON.',
        },
        {
          title: 'Safe transport',
          description:
            'Serialize binary/text data to move through text‑only systems and APIs.',
        },
        {
          title: 'Prototyping',
          description:
            'Quickly generate Base64 for demos, mockups, and testing.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Base64 Encoder – Encode Text to Base64 | Developer Tools',
      meta_description:
        'Encode text or files to Base64 online. Ideal for embedding resources and safe data transport.',
      og_title: 'Base64 Encoder – Free Online Tool',
      og_description:
        'Generate Base64 strings from text or files. Fast and reliable.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
