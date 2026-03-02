import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-code-generator',
  category: 'Category94',
  route: PATHS.HTML_CODE_GENERATOR,
  ...{
    hero_section: {
      title: 'HTML Code Generator',
      description:
        'Generate HTML code from structured input or templates. Build markup for forms, tables, and common elements quickly.',
    },
    development_tools_list: [
      { tool: 'HTML Validator', url: PATHS.HTML_VALIDATOR },
      { tool: 'HTML Prettify', url: PATHS.HTML_PRETTIFY },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'HTML to Markdown', url: PATHS.HTML_TO_MARKDOWN },
      { tool: 'HTML Escape', url: PATHS.HTML_ESCAPE },
      { tool: 'HTML Viewer', url: PATHS.HTML_VIEWER },
    ],
    development_tools_about_details: {
      about_title: 'What is the HTML Code Generator?',
      about_description: [
        {
          description:
            'The HTML code generator helps you create valid HTML markup from structured options or templates, so you can build forms, tables, and common sections without writing every tag by hand.',
        },
        {
          description:
            'Useful for prototyping, learning HTML structure, and quickly producing boilerplate markup for integration into larger projects.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML Code Generator',
      guide_description: 'Generate HTML in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Choose type:',
          step_description:
            'Select the kind of HTML you want (e.g. form, table, list) and set options.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Generate:',
          step_description:
            'Click Generate to create the HTML code in the output area.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or edit:',
          step_description:
            'Copy the generated HTML into your project or edit it further in the editor.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Prototyping',
          description:
            'Quickly create HTML snippets for forms, tables, or layouts.',
        },
        {
          title: 'Learning',
          description:
            'See how structured options map to HTML markup for study and reference.',
        },
        {
          title: 'Boilerplate',
          description:
            'Generate standard markup to paste into CMS or codebases.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML Code Generator – Create HTML Markup Online',
      meta_description:
        'Generate HTML code from structured input. Build forms, tables, and common elements quickly. Free tool on BetterBugs.io.',
      og_title: 'HTML Code Generator – Developer Utility',
      og_description:
        'Create valid HTML markup from templates and options. No coding required.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
