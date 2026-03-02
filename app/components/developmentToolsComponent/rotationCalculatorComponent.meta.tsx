import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'rotation-calculator',
  category: 'Category46',
  route: PATHS.ROTATION_CALCULATOR,
  ...{
    hero_section: {
      title: 'Rotation Calculator',
      description:
        'Calculate resulting rotation angles with unit conversions. Convert between degrees, radians, turns, and gradians.',
    },
    development_tools_list: [
      {
        tool: 'Text to Uppercase Converter',
        url: PATHS.TEXT_UPPERCASE_CONVERTER,
      },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Counter', url: PATHS.CHARACTER_COUNT_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What does the Rotation Calculator do?',
      about_description: [
        {
          description:
            'Compute the final angle after applying a rotation delta to a base angle. View the result in degrees, radians, turns, and gradians.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Rotation Calculator',
      guide_description: 'Steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Base Angle',
          step_description: 'Provide a base angle and select its unit.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Enter Rotation Delta',
          step_description: 'Provide a rotation delta and select its unit.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Read Results',
          step_description:
            'The resulting angle is normalized and shown in all units.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'Common scenarios:',
      point: [
        {
          title: 'CSS transforms',
          description: 'Translate between deg and turn for rotate().',
        },
        {
          title: 'Math/Geometry',
          description: 'Quick conversions between degrees and radians.',
        },
        {
          title: 'Graphics/Canvas',
          description: 'Compute combined rotations and normalize to [0, 360).',
        },
      ],
    },
    meta_data: {
      meta_title: 'Rotation Calculator - Developer Utility Tools',
      meta_description:
        'Calculate resulting angles and convert between degrees, radians, turns, and gradians.',
      og_title: 'Rotation Calculator - Developer Utility Tools',
      og_description:
        'Compute final rotation with unit conversions using the free Rotation Calculator on BetterBugs.io.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
