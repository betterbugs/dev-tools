import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'xml-escape',
  category: 'Category164',
  route: PATHS.XML_ESCAPE,
  ...{
    hero_section: {
      title: 'XML Escape',
      description:
        'Escape and unescape XML entities (&, <, >, " and \'). Make content safe for XML/HTML contexts.',
    },
    development_tools_list: [
      { tool: 'HTML Escape', url: PATHS.HTML_ESCAPE },
      { tool: 'HTML Unescape', url: PATHS.HTML_UNESCAPE },
      { tool: 'XML Validator', url: PATHS.XML_COMPARE },
      { tool: 'Text to One Line', url: PATHS.TEXT_TO_ONE_LINE },
    ],
    development_tools_about_details: {
      about_title: 'What is XML Escaping?',
      about_description: [
        {
          description:
            'XML escaping replaces reserved characters like &, <, >, " and \' with their corresponding entities to avoid breaking XML markup.',
        },
        {
          description:
            'This tool works locally in your browser and supports Escape and Unescape modes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Two simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Pick Mode',
          step_description: 'Choose Escape or Unescape.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Paste & Copy',
          step_description:
            'Paste input on the left; copy the output on the right.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'Common scenarios:',
      point: [
        {
          title: 'Embed in XML/HTML',
          description:
            'Safely include dynamic strings inside XML/HTML content.',
        },
        {
          title: 'Sanitize Data',
          description: 'Prevent broken markup from user-provided values.',
        },
        {
          title: 'APIs & Configs',
          description:
            'Prepare values for XML-based APIs and configuration files.',
        },
      ],
    },
    meta_data: {
      meta_title: 'XML Escape - Escape/Unescape XML Entities',
      meta_description:
        'Escape or unescape XML characters (&, <, >, " and \'). Works entirely in-browser.',
      og_title: 'XML Escape - Developer Utility Tool',
      og_description: 'Quickly convert between raw text and XML-safe entities.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
