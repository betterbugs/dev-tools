import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-entities-to-text-converter',
  category: 'Category108',
  route: PATHS.HTML_ENTITIES_TO_TEXT_CONVERTER,
  ...{
    hero_section: {
      title: 'HTML Entities to Text Converter',
      description:
        'Decode HTML entities into readable text instantly for web content or documents.',
    },
    development_tools_list: [
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      {
        tool: 'Text to HTML Entities',
        url: PATHS.BASE64_DECODER,
      },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the HTML Entities to Text Converter?',
      about_description: [
        {
          description:
            'This tool converts HTML entities like &amp;, &lt;, &gt;, &quot;, &#39; back into their corresponding readable text characters.',
        },
        {
          description:
            'It ensures content copied from HTML sources or encoded files can be safely displayed or edited as plain text.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML Entities to Text Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste HTML-encoded text:',
          step_description:
            'Insert your HTML entities text into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to plain text:',
          step_description:
            'Click the decode button to transform HTML entities back into readable text.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View & copy output:',
          step_description:
            'Check the converted text and copy it for use in documents or web pages.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Clear or edit:',
          step_description:
            'Modify the input or clear it to decode new HTML content anytime.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Web content editing',
          description:
            'Convert HTML-encoded text back to readable format for editing or publishing.',
        },
        {
          title: 'Data migration',
          description:
            'Decode text copied from HTML files or web sources for plain-text processing.',
        },
        {
          title: 'Debugging',
          description:
            'Easily read and troubleshoot HTML-encoded content from databases or logs.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'HTML Entities to Text Converter – Decode HTML Characters Online',
      meta_description:
        'Convert HTML entities like &amp;, &lt;, &gt; back into readable text instantly for web content, documents, or debugging.',
      og_title: 'HTML Entities to Text Converter – Online Tool',
      og_description:
        'Quickly decode HTML-encoded content to plain text. Copy the readable text instantly for web, documents, or coding purposes.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
