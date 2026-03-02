import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'morse-code-translator',
  category: 'Category169',
  route: PATHS.MORSE_CODE_TRANSLATOR,
  ...{
    hero_section: {
      title: 'Morse Code Translator',
      description:
        'Translate between text and Morse code, and play audio beeps for dots and dashes.',
    },
    development_tools_list: [
      { tool: 'Text Uppercase', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Text Lowercase', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Regex Tester', url: PATHS.JAVASCRIPT_REGEX_TESTER },
    ],
    development_tools_about_details: {
      about_title: 'About Morse Code',
      about_description: [
        {
          description:
            'Morse code encodes characters as sequences of dots and dashes. This tool converts text to Morse (and back), following common ITU mappings.',
        },
        {
          description:
            'Features: Bidirectional translation (Text → Morse, Morse → Text), instant updates while typing, copy input/output, audio playback with Play/Stop, and support for letters, digits, and common punctuation (.,?\'/!()-&:@=+_-"$).',
        },
        {
          description:
            'Formatting rules: a single space separates letters, and a forward slash / separates words. Unknown characters are skipped to keep the output valid.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Translate and play Morse:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Choose mode',
          step_description: 'Pick Text → Morse or Morse → Text.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Enter input',
          step_description:
            'Type or paste content. Use a space between letters and / between words for Morse.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Translate & copy',
          step_description:
            'Output appears instantly. Copy input or output with one click.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Play audio (optional)',
          step_description:
            'In Text → Morse mode, press Play to hear dots and dashes; Stop to halt.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'When this tool helps:',
      point: [
        {
          title: 'Learning',
          description:
            'Practice and memorize Morse with visual and audio feedback.',
        },
        {
          title: 'Education',
          description: 'Demonstrate encoding/decoding concepts in classrooms.',
        },
        {
          title: 'Debugging',
          description: 'Verify or decode Morse messages from other sources.',
        },
        {
          title: 'Fun',
          description: 'Create and share short beeping messages with friends.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Morse Code Translator - Online Tool',
      meta_description:
        'Translate between text and Morse code and play audio beeps in the browser.',
      og_title: 'Morse Code Translator - Developer Utility',
      og_description: 'Convert text to Morse and back, with audio playback.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
