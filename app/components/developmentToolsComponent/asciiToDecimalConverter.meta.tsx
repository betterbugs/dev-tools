import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'ascii-to-decimal-converter',
  category: 'Category57',
  route: PATHS.ASCII_TO_DECIMAL_CONVERTER,
  ...{
    hero_section: {
      title: 'ASCII to Decimal Converter',
      description:
        'A free online tool to convert ASCII characters to decimal values. Ideal for debugging text processing and character encoding.',
    },
    development_tools_list: [
      { tool: 'Decimal to ASCII', url: PATHS.DECIMAL_TO_ASCII_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'Sentence Count Tool', url: PATHS.SENTENCE_COUNTER_TOOL },
      { tool: 'JS Minify Tool', url: PATHS.JAVASCRIPT_MINIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What is the ASCII to Decimal Converter?',
      about_description: [
        {
          description:
            'The ASCII to Decimal Converter converts ASCII text into its decimal character codes. Helpful for debugging encoding, analyzing data streams, and educational exploration of ASCII.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-by-Step Guide',
      guide_description:
        'Using the ASCII to Decimal Converter is straightforward:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Your Input:',
          step_description:
            'Enter ASCII text to convert to decimal character codes.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert and Copy:',
          step_description:
            "Click 'Convert' to generate decimal codes. Use 'Copy' to copy the result.",
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: "Here's How it's Used:",
      how_use_description:
        'Use ASCII to Decimal for encoding debugging, API testing, and data analysis.',
      point: [
        {
          title: 'Encoding Debugging',
          description:
            'Inspect decimal codes for characters when debugging encoding and parsing.',
        },
        {
          title: 'Data Analysis',
          description:
            'Translate text to decimal codes when analyzing logs and byte streams.',
        },
        {
          title: 'Education',
          description:
            'Learn ASCII by mapping characters to their decimal values.',
        },
      ],
    },
    meta_data: {
      meta_title: 'ASCII to Decimal Converter - Developer Utility Tools',
      meta_description:
        'Free online ASCII to decimal converter. Convert text to decimal codes for debugging and analysis.',
      og_title: 'ASCII to Decimal Converter - Developer Utility Tools',
      og_description:
        'Use this guide to convert ASCII text to decimal character codes and learn use cases.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
