import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sentence-counter-tool',
  category: 'Category6',
  route: PATHS.SENTENCE_COUNTER_TOOL,
  ...{
    hero_section: {
      title: 'Sentence Count Tool',
      description:
        'The sentence counter is a free-to-use utility tool on BetterBugs.io to check the number of sentences in your input text.',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Minify Tool', url: PATHS.JAVASCRIPT_MINIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What is the Sentence Count Tool?',
      about_description: [
        {
          description:
            'The sentence counter is a simple utility tool that allows you to count the number of sentences in the given text. ',
        },
        {
          description:
            'It’s completely free to use on the BetterBugs.io website.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use it',
      steps: [
        {
          step_description:
            'For using the sentence counter, “type in or paste your text” into the input text area. This gives you the sentence count instantly. As you keep adding lines, the counter gets dynamically updated.',
        },
        {
          step_description: 'Hit the “Clear Text” button to clear your input.',
        },
        {
          step_description:
            'Note that the sentences are identified by splitting texts at:',
        },
        {
          steps_points: [
            {
              steps_points_description: 'Periods (.)',
            },
            {
              steps_points_description: 'Exclamation marks (!)',
            },
            {
              steps_points_description: 'Question marks (?)',
            },
          ],
        },
        {
          step_description:
            'Also, the leading or trailing spaces are completely ignored by the counter.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Here’s How it’s Used:',
      how_use_description: 'You can use the counter for:',
      point: [
        {
          title: 'String Data Parsing',
          description:
            'Analyze sentence count in text-based data fields for better data validation and processing.',
        },
        {
          title: 'Bug Report Summaries',
          description:
            'Validate that bug reports contain sufficient detail by checking sentence count.',
        },
        {
          title: 'Content and SEO Optimization',
          description:
            'Ensure blog posts, articles, and social media content meet sentence count guidelines. Also, you can use it to maintain optimal sentence counts for better search engine ranking and user engagement.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Sentence Counter - Developer Utility Tools',
      meta_description:
        'Count the number of sentences in your text easily with the BetterBugs online sentence counter. Use it while working with string data, bug report summaries, and content plus SEO optimization.',
      og_title: 'Sentence Counter - Developer Utility Tools',
      og_description:
        'This article covers the sentence counter dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
