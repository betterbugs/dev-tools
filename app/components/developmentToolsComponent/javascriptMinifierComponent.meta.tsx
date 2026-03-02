import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'javascript-minifier',
  category: 'Category7',
  route: PATHS.JAVASCRIPT_MINIFIER,
  ...{
    hero_section: {
      title: 'JS Minify Tool',
      description:
        'The JavaScript minifier is a free-to-use dev utility tool on BetterBugs.io that removes all unnecessary characters from your JS code without affecting its functionality.',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'Sentence Count Tool', url: PATHS.SENTENCE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the JS Minify Tool?',
      about_description: [
        {
          description:
            'JS minifier is a free-to-use dev utility tool on BetterBugs.io that allows you to shorten your JavaScript code by removing all the unnecessary characters from your code without affecting its functionality.',
        },
        {
          description: 'It uses the Terser library to minify your JS code.',
        },
      ],
    },
    development_tools_what: {
      about_title: 'What is Minifying JavaScript?',
      what_description: [
        {
          descriptions:
            'Minifying JavaScript refers to the process of removing all unnecessary characters from the code without changing or affecting the way it works.',
        },
        {
          descriptions:
            'The characters that are typically removed include whitespace, comments, and line breaks. You can even shorten parameter names using the JS minifier. It’s a crucial optimization technique to make the code lightweight and faster to run, parse, and get executed by the JS engine.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-By-Step Guide',
      guide_description: 'Using the JS minify tool is super simple:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your JS code: ',
          step_description: 'Add the JavaScript code in the input text area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Minify the Code:',
          step_description: 'Hit the “Minify Code” button.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy Code and Use:',
          step_description: 'Hit the “Copy to Clipboard” button.',
        },
        {
          step_description:
            'You’ll get a success toast notification “Copied to clipboard” in the top right of the screen and you’re good to go.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why It’s Used',
      how_use_description: 'With minified JS code, you can:',
      point: [
        {
          description: 'Ensure faster load times due to smaller file sizes.',
        },
        {
          description:
            'Improve the performance of your apps as it helps minimize resource usage and bandwidth requirements.',
        },
        {
          description: 'Reduce server load with smaller files to serve.',
        },
      ],
    },
    development_tools_Comparison: {
      title: 'Minification vs. Compression',
      description: [
        {
          desc: 'While both minification and compression reduce file sizes, they aren’t the same.',
        },
        {
          desc: 'Minification, as described, removes unnecessary characters from the code itself without affecting its functionality. This process typically occurs before the file is served to the user.',
        },
        {
          desc: 'Compression, on the other hand, involves encoding the entire file using algorithms like GZIP or Brotli to reduce its size. This process is usually handled by the server and browser and occurs during the transfer of the file over the Internet. The compressed file is then decompressed by the browser before execution.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JavaScript Minifier - Developer Utility Tools',
      meta_description:
        'Optimize your JavaScript code with the BetterBugs free online JavaScript Minifier. It’s perfect for ensuring faster file load times, improving app performance, and reducing file size for servers.',
      og_title: 'JavaScript Minifier - Developer Utility Tools',
      og_description:
        'This article covers the JavaScript Minifier dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
