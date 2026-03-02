import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-tester',
  category: 'Category160',
  route: PATHS.HTML_TESTER,
  ...{
    hero_section: {
      title: 'HTML Tester',
      description:
        'Test and validate your HTML code with our comprehensive HTML tester. Write, preview, and validate HTML in real-time with built-in error detection and best practices guidance.',
    },
    development_tools_list: [
      { tool: 'HTML Validator', url: PATHS.HTML_VALIDATOR },
      { tool: 'HTML Prettify', url: PATHS.HTML_PRETTIFY },
      { tool: 'HTML Minify', url: PATHS.HTML_MINIFY },
      { tool: 'HTML Escape', url: PATHS.HTML_ESCAPE },
      { tool: 'HTML Unescape', url: PATHS.HTML_UNESCAPE },
      { tool: 'HTML Viewer', url: PATHS.HTML_VIEWER },
    ],
    development_tools_about_details: {
      about_title: 'What is HTML Testing?',
      about_description: [
        {
          description:
            'HTML testing is the process of writing, validating, and previewing HTML code to ensure it works correctly and follows best practices. This tool provides a complete development environment for HTML.',
        },
        {
          description:
            'The tool includes real-time preview, validation, error detection, and helpful tips to improve your HTML code quality and accessibility.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML Tester',
      guide_description: 'Using our HTML tester is simple and intuitive:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Write HTML Code',
          step_description:
            'Enter your HTML code in the editor on the left side. The tool includes syntax highlighting and line numbers for better coding experience.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Preview in Real-Time',
          step_description:
            'See your HTML rendered instantly in the preview panel on the right. Changes are reflected immediately as you type.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Validate Your Code',
          step_description:
            "Click the 'Validate HTML' button to check for errors, warnings, and best practices. Get detailed feedback on your code quality.",
        },
        {
          step_key: 'Step 4:',
          step_title: 'Export or Download',
          step_description:
            'Copy your code to clipboard or download as an HTML file for use in your projects.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases for HTML Testing',
      how_use_description:
        'HTML testing is essential for web development and learning:',
      point: [
        {
          title: 'Learning HTML',
          description:
            'Perfect for beginners learning HTML syntax, structure, and best practices with immediate visual feedback.',
        },
        {
          title: 'Prototyping',
          description:
            'Quickly prototype HTML layouts, forms, and components before integrating into larger projects.',
        },
        {
          title: 'Code Validation',
          description:
            'Validate HTML code for errors, accessibility issues, and compliance with web standards.',
        },
        {
          title: 'Testing Snippets',
          description:
            'Test small HTML snippets, CSS styles, and JavaScript functionality in isolation.',
        },
        {
          title: 'Educational Purposes',
          description:
            'Teach HTML concepts with hands-on examples and immediate visual results.',
        },
        {
          title: 'Quick Debugging',
          description:
            'Debug HTML issues by testing code changes and seeing results instantly.',
        },
        {
          title: 'Responsive Design Testing',
          description:
            'Test how HTML layouts respond to different screen sizes and devices.',
        },
        {
          title: 'Accessibility Testing',
          description:
            'Check HTML for accessibility issues and ensure proper semantic markup.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML Tester - Online HTML Code Editor and Validator',
      meta_description:
        'Test and validate your HTML code with our comprehensive HTML tester. Write, preview, and validate HTML in real-time with built-in error detection and best practices guidance.',
      og_title: 'HTML Tester - Free Online HTML Editor',
      og_description:
        'Write, test, and validate HTML code with our free online HTML tester. Real-time preview, validation, and best practices guidance.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
