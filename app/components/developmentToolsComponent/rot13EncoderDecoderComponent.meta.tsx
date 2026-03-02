import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'rot13-encoder-decoder',
  category: 'Category47',
  route: PATHS.ROT13_ENCODER_DECODER,
  ...{
    hero_section: {
      title: 'ROT13 Encoder/Decoder',
      description:
        'Encode or decode text using ROT13 instantly. ROT13 is a simple letter substitution cipher that rotates each letter by 13 places.',
    },
    development_tools_list: [
      {
        tool: 'Text to Uppercase Converter',
        url: PATHS.TEXT_UPPERCASE_CONVERTER,
      },
      {
        tool: 'Text to Lowercase Converter',
        url: PATHS.TEXT_LOWERCASE_CONVERTER,
      },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Counter', url: PATHS.CHARACTER_COUNT_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is ROT13?',
      about_description: [
        {
          description:
            'ROT13 (rotate by 13 places) is a substitution cipher used to obfuscate text by replacing each letter with the letter 13 positions after it in the alphabet.',
        },
        {
          description:
            'Applying ROT13 twice returns the original text, making it useful for reversible obfuscation.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the ROT13 Encoder/Decoder',
      guide_description: 'Quick steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter text:',
          step_description: 'Type or paste your text in the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Get ROT13:',
          step_description: 'The ROT13 output appears instantly on the right.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy:',
          step_description: 'Copy input or output using the copy buttons.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Use Cases',
      how_use_description: 'When to use ROT13:',
      point: [
        {
          title: 'Spoiler text',
          description: 'Hide spoilers in forums or chats.',
        },
        {
          title: 'Light obfuscation',
          description:
            'Obfuscate text where reversible transformation is acceptable.',
        },
        {
          title: 'Education',
          description: 'Demonstrate basic substitution ciphers.',
        },
      ],
    },
    meta_data: {
      meta_title: 'ROT13 Encoder/Decoder - Developer Utility Tools',
      meta_description:
        'Encode or decode text with ROT13 instantly. Simple reversible substitution cipher. Free online tool on BetterBugs.io.',
      og_title: 'ROT13 Encoder/Decoder - Developer Utility Tools',
      og_description:
        'Use the free ROT13 encoder/decoder tool on BetterBugs.io to obfuscate or reveal text.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
