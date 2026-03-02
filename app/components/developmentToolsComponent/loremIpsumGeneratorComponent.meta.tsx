import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'lorem-ipsum-generator',
  category: 'Category10',
  route: PATHS.LOREM_IPSUM_GENERATOR,
  ...{
    hero_section: {
      title: 'Lorem Ipsum Text Generator',
      description:
        'The Lorem Ipsum Generator is a free online utility on BetterBugs.io that enables you to quickly generate placeholder text for website layouts and application pages.',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'JSON Prettifier', url: PATHS.JSON_PRETTIFIER },
      { tool: 'Java Script Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'Sentence Count Tool', url: PATHS.SENTENCE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Lorem Ipsum Generator?',
      about_description: [
        {
          description:
            'The Lorem Ipsum Text Generator tool allows you to create placeholder text, commonly known as “Lorem Ipsum”. This filler text is ideal for website or application pages where the original content will eventually be placed. ',
        },
        {
          description:
            'You can use the Lorem Ipsum text as placeholders when designing website layouts, generating dummy text while writing applications, or creating mock text data while testing software.',
        },
        {
          description:
            'Here on BetterBugs.io, the Lorem Ipsum text generator is absolutely free to use.',
        },
        {
          description:
            'You can also customize the generator to get the required number (max upto 99) for the placeholder:',
        },
      ],
      placeholder: [
        { title: 'Paragraphs' },
        { title: 'Characters' },
        { title: 'Words' },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Lorem Ipsum Generator',
      guide_description: 'To use the generator, you simply have to:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Select the Text Type: ',
          step_description:
            'Open the “Generate By” dropdown and select the dummy text type (Paragraph, Character, or Word) you want to use.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select Count (Max Upto 99): ',
          step_description:
            'Enter the required paragraph, character, or word count for your text.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate and Use Text: ',
          step_description:
            'Hit the “Generate” button to get the text instantly. Use the “Copy All to Clipboard” button to copy text and use it wherever needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why It’s Used',
      how_use_description:
        'You can use the generator for various purposes while working with software, such as:',
      point: [
        {
          description:
            'Getting a visual representation of text in a layout. Designers and developers can use this to see how the final content will appear on a website or app.',
        },
        {
          description:
            'Ensuring that the design and layout work well with different amounts of text on UI mockups and prototypes.',
        },
        {
          description:
            'Helping in testing how the application handles text content and confirming that there are no issues with text overflow, alignment, or spacing.',
        },
        {
          description:
            'Getting mock data for software testers to use during testing.',
        },
        {
          description:
            'Making it easier for team members to review and give feedback on designs and functionality without needing the finalized content.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Lorem Ipsum Generator - Developer Utility Tools',
      meta_description:
        'Get placeholder text for your UI with the BetterBugs online Lorem Ipsum generator. Get dummy text based on paragraphs, words, or word count. Perfect while working with UI, mockups, and design prototypes.',
      og_title: 'Lorem Ipsum Generator - Developer Utility Tools',
      og_description:
        'This article covers the Lorem Ipsum text generator dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
