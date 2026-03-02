import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'markdown-to-html',
  category: 'Category12',
  route: PATHS.MARKDOWN_TO_HTML,
  ...{
    hero_section: {
      title: 'Markdown to HTML Converter',
      description:
        'The Markdown to HTML converter is a free-to-use utility tool on BetterBugs.io that enables you to convert Markdown text to an HTML format.',
    },
    development_tools_list: [
      { tool: 'Java Script Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'JSON Prettifier', url: PATHS.JSON_PRETTIFIER },
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Lorem Ipsum Generator', url: PATHS.LOREM_IPSUM_GENERATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Markdown to HTML Converter?',
      about_description: [
        {
          description:
            'The Markdown to HTML converter allows you to turn Markdown text into an HTML code format. You can use the converter to get a web-ready code that stays true to your original Markdown. The converter can handle different element types, styles, links, hyperlinks, and other elements in your Markdown file and instantly convert it to a formatted HTML code.',
        },
        {
          description:
            'The Markdown to HTML converter is a free-to-use dev utility on the BetterBugs.io platform.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Converter',
      guide_description:
        'Here are the steps to use the Markdown to HTML Converter.',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: ' Add Markdown text or Upload the Markdown File:',
          step_description: 'You can:',
        },
        {
          steps_points: [
            {
              steps_points_description:
                'Copy and paste your Markdown text into the “Markdown Input” box.',
            },
            {
              steps_points_description:
                'To upload a Markdown (.md) file from your device, you have the “Upload Markdown File” button.',
            },
          ],
        },
        {
          step_key: 'Step 2:',
          step_title: 'Getting the Output:',
          step_description:
            'Press the “Convert” button to get the HTML code in the “HTML Output” box.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Using the Code:',
          step_description: ' To use the output code:',
        },
        {
          steps_points: [
            {
              steps_points_description:
                'Hit the “Copy to Clipboard” button and paste the HTML code wherever required.',
            },
            {
              steps_points_description:
                'You can also download the output as a .html file with the “Download HTML” button.',
            },
          ],
        },
        {
          step_description: 'To clear all fields, you have the “Clear” button.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What You Can Use It For',
      how_use_description:
        'You can use the converter for various purposes, such as:',
      point: [
        {
          title: 'Syntax Formatting',
          description:
            'Ensure your Markdown content is accurately converted to HTML, maintaining the original structure and formatting.',
        },
        {
          title: 'Creating Web Elements',
          description:
            'Allows you to generate HTML code from Markdown to use in your web projects.',
        },
        {
          title: 'Embed Content',
          description:
            'Easily embed Markdown content into websites, emails, or other platforms that support HTML.',
        },
        {
          title: 'Documentation Related Works',
          description:
            'Enables you to turn your Markdown documentation into HTML format for better readability and presentation on web-based platforms. This is ideal for creating user manuals, API documentation, and technical guides.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Markdown to HTML Converter - Developer Utility Tools',
      meta_description:
        'Quickly turn your Markdown text to HTML with the BetterBugs Markdown to HTML online converter. It’s perfect for syntax formatting, embedding content on the web, and documentation works. Learn more.',
      og_title: 'Markdown to HTML Converter - Developer Utility Tools',
      og_description:
        'This article covers the Markdown to HTML converter dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
