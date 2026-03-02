import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-viewer',
  category: 'Category95',
  route: PATHS.HTML_VIEWER,
  ...{
    hero_section: {
      title: 'HTML Viewer',
      description:
        'Render HTML in a live preview. Paste or type HTML and see the result instantly in the browser.',
    },
    development_tools_list: [
      { tool: 'HTML Validator', url: PATHS.HTML_VALIDATOR },
      { tool: 'HTML Prettify', url: PATHS.HTML_PRETTIFY },
      { tool: 'HTML Code Generator', url: PATHS.HTML_CODE_GENERATOR },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'HTML to Markdown', url: PATHS.HTML_TO_MARKDOWN },
      { tool: 'Strip HTML', url: PATHS.STRIP_HTML },
    ],
    development_tools_about_details: {
      about_title: 'What is the HTML Viewer?',
      about_description: [
        {
          description:
            'The HTML viewer renders your HTML markup in a live preview so you can see how it looks without leaving the page. Paste or type HTML and view the result in real time.',
        },
        {
          description:
            'Useful for debugging markup, checking layout and styles, and quickly testing snippets in a sandboxed iframe.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML Viewer',
      guide_description: 'Preview HTML in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or type HTML:',
          step_description:
            'Add your HTML code to the input area. The preview updates as you type.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'View result:',
          step_description:
            'Check the live preview panel to see how your HTML renders.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or edit:',
          step_description:
            'Copy the HTML for use elsewhere or edit it and refresh the preview.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Debugging markup',
          description:
            'See how HTML and inline styles render without deploying.',
        },
        {
          title: 'Snippet testing',
          description:
            'Test small HTML fragments before adding them to a full page.',
        },
        {
          title: 'Learning',
          description:
            'Experiment with HTML and CSS and see results immediately.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML Viewer – Live HTML Preview Online',
      meta_description:
        'Render HTML in a live preview. Paste or type HTML and see the result instantly. Free tool on BetterBugs.io.',
      og_title: 'HTML Viewer – Developer Utility',
      og_description:
        'Preview HTML in real time. No uploads, runs in your browser.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
