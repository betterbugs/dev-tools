import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'js-obfuscator',
  category: 'Category13',
  route: PATHS.JS_OBFUSCATOR,
  ...{
    hero_section: {
      title: 'JavaScript Obfuscator',
      description:
        'The JavaScript Obfuscator is a free online tool on BetterBugs.io. It converts your JS code into a format that’s hard for humans to read or understand, making it extremely difficult to tamper with while still remaining executable by computers without issues.',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Lorem Ipsum Generator', url: PATHS.LOREM_IPSUM_GENERATOR },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
      // { tool: "Css To Tailwind", url: PATHS.CSS_TO_TAILWIND },
    ],
    development_tools_about_details: {
      about_title: 'What is the JavaScript Obfuscator?',
      about_description: [
        {
          description:
            "The JavaScript Obfuscator is a free online tool available on BetterBugs.io that converts JavaScript code into a format that's hard for humans to read and understand but still functions correctly for computers.",
        },
        {
          description:
            'You can use the JS obfuscator to protect your JavaScript code from being easily copied, understood, or tampered with, enhancing security and safeguarding intellectual property. It does this by performing several transformations on your original code, such as renaming variables and functions with meaningless names, removing whitespace and comments, and using complex expressions. This makes the code look like gibberish to anyone trying to read it, while still remaining fully executable by computers without any errors.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the JavaScript Obfuscator',
      guide_description: 'Here are the steps for using it.',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Add JavaScript Code or Upload the JS File:',
          step_description: 'You can:',
        },
        {
          steps_points: [
            {
              steps_points_description:
                'Copy and paste your JavaScript code into the “JavaScript Input” box.',
            },
            {
              steps_points_description:
                'Or, you can upload a JavaScript(.js) file from your device with the “Upload JavaScript File” button.',
            },
          ],
        },
        {
          step_key: 'Step 2:',
          step_title: 'Getting the Output:',
          step_description:
            'Click the “Obfuscate” button to get the obfuscated code in the “Obfuscated Output” box.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Using the Code:',
          step_description:
            'Download the output in a .js file format with the “Download Obfuscated File” button.',
        },
        {
          step_description: 'To clear everything, hit the “Clear” button.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What is Obfuscation and What It’s Used For',
      how_use_description:
        'Obfuscation is a technique used in programming to deliberately make code difficult for humans to read and understand.',
      point: [
        {
          description:
            'Software development teams often use this to protect their proprietary code, which helps safeguard intellectual property, improve security, and prevent reverse engineering. However, the obfuscated code remains fully functional and executable by computers.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JavaScript Obfuscator Tool - Developer Utility Tools',
      meta_description:
        'Protect your JavaScript code from unauthorized access and tampering with the BetterBugs JavaScript Obfuscator free online tool. Use it to protect your proprietary code and improve code security.',
      og_title: 'JavaScript Obfuscator Tool - Developer Utility Tools',
      og_description:
        'This article covers the JavaScript Obfuscator dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
