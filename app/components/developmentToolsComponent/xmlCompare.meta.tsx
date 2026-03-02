import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'xml-compare',
  category: 'Category116',
  route: PATHS.XML_COMPARE,
  ...{
    hero_section: {
      title: 'XML Compare',
      description:
        'Compare two XML files or code snippets side by side – highlighting differences in structure, tags, attributes, and values.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the XML Compare Tool?',
      about_description: [
        {
          description:
            'The XML Compare tool allows you to analyze and compare two XML documents side by side.',
        },
        {
          description:
            'It highlights differences in nodes, attributes, and values, making it easier to identify changes, errors, or mismatches.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the XML Compare Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste XML files:',
          step_description:
            'Copy and paste the two XML documents you want to compare into the input boxes.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Run comparison:',
          step_description:
            'Click the compare button to analyze both XML files.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View differences:',
          step_description:
            'Check highlighted differences in structure, tags, or attributes side by side.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Export results:',
          step_description:
            'Copy or download the comparison results for documentation or debugging.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Debugging XML',
          description:
            'Identify issues in XML structure when working with APIs or configuration files.',
        },
        {
          title: 'Version comparison',
          description:
            'Compare two versions of an XML file to detect changes or updates.',
        },
        {
          title: 'Data validation',
          description:
            'Ensure XML files are consistent before importing them into databases or applications.',
        },
      ],
    },
    meta_data: {
      meta_title: 'XML Compare – Compare XML Files Online',
      meta_description:
        'Compare two XML files or snippets online. Highlight differences in structure, attributes, and values instantly.',
      og_title: 'XML Compare – Free Online Tool',
      og_description:
        'Easily compare XML files side by side. Perfect for debugging, validation, and version tracking.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
