import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'text-to-html-entities-convertor',
  category: 'Category107',
  route: PATHS.TEXT_TO_HTML_ENTITIES_CONVERTOR,
  ...{
    hero_section: {
      title: 'Text to HTML Entities Converter',
      description:
        'Convert any text into HTML entities instantly for safe web usage or encoding special characters.',
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
      about_title: 'What is the Text to HTML Entities Converter?',
      about_description: [
        {
          description:
            'This tool converts your plain text into HTML entities, ensuring that special characters like <, >, &, and quotes are safely encoded for web pages.',
        },
        {
          description:
            'It helps prevent rendering issues, XSS vulnerabilities, or data corruption when displaying user input or dynamic content in HTML.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Text to HTML Entities Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter your text:',
          step_description: 'Type or paste your text into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to HTML entities:',
          step_description:
            'Click the convert button to transform all special characters into their corresponding HTML entities.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View & copy output:',
          step_description:
            'Check the generated HTML entity code and copy it for use in your projects.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Clear or modify:',
          step_description:
            'Edit your input or clear it to start a new conversion anytime.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Web development',
          description:
            'Ensure text with special characters displays correctly in HTML pages.',
        },
        {
          title: 'Security',
          description:
            'Encode user input to prevent XSS attacks in web applications.',
        },
        {
          title: 'Content migration',
          description:
            'Safely copy-paste content from documents or editors into HTML without breaking formatting.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Text to HTML Entities Converter – Encode Special Characters Online',
      meta_description:
        'Convert plain text into HTML entities safely and instantly. Encode special characters for web pages and applications.',
      og_title: 'Text to HTML Entities Converter – Online Tool',
      og_description:
        'Quickly convert text into HTML entities to prevent rendering issues or XSS vulnerabilities. Copy the result instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
