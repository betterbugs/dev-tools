import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'word-count-tool',
  category: 'Category3',
  route: PATHS.WORD_COUNT_TOOL,
  ...{
    hero_section: {
      title: 'Word Count Tool',
      description:
        'The word count tool instantly shows the word count of your entire text content. It’s a free-to-use utility tool here on BetterBugs.io',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'Sentence Count Tool', url: PATHS.SENTENCE_COUNTER_TOOL },
      { tool: 'JS Minify Tool', url: PATHS.JAVASCRIPT_MINIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What is the Word Count Tool?',
      about_description: [
        {
          description:
            'The word count tool is a simple utility for checking word count while working with text. Software professionals, writers, and academic students can use it to keep their word limit in check.',
        },
        {
          description:
            'You can use the word counter absolutely free on the BetterBugs.io platform.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-by-Step Guide',
      guide_description: 'For using the text to lowercase converter,',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Type or Paste Your Text:',
          step_description:
            'Copy and paste your text in the input area. Or, you can directly type into the text box.',
        },
        {
          step_description:
            'There’s no step two. You get the word count instantly in the Word Count display. Also, the word count displays dynamically as you type.',
          step_description2:
            'Note that any leading or trailing spaces are ignored by the counter.',
        },
        {
          step_description:
            'To clear your input, you have the “Clear text” button.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Here’s How it’s Used:',
      how_use_description: 'You can use the word counter for several purposes:',
      point: [
        {
          title: 'UI/UX Designers Can Make Adjustments for Application Layouts',
          description:
            'UI/UX designers can then use word counters to specify requirements for developers regarding the appropriate word count for UI elements, input size, or other uses. ',
        },
        {
          title: 'QA Testing ',
          description:
            'While testing software, QA professionals can validate error message lengths, input and output size, or the user interface text to adhere to specified length constraints.',
        },
        {
          title: 'Web Content Review',
          description:
            'Helps evaluate website copy text to ensure that the landing and other website pages for concise and effective messaging for visitors.',
        },
        {
          title: 'Essay Writing by Academic Students',
          description:
            'Students can ensure that their essays and academic paper lengths are well within the boundaries of the word limits.',
        },
        {
          title: 'Editing, Proofreading, and Online Publishing',
          description:
            'Ensures that the content follows the word limit guidelines specified.',
        },
        {
          title: 'Content Writing',
          description:
            'Bloggers and content marketers can use it to optimize their article size for SEO purposes.',
        },
        {
          title: 'Script Length Management',
          description:
            'Helps estimate the video duration while working with video scripts. You can adjust the video pace and timing based on the word count.',
        },
        {
          title: 'Optimizing SEO Elements',
          description:
            'Helps optimize SEO elements for webpages, such as ensuring a character limit for meta descriptions, meta titles, and OG descriptions.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Word Count Tool - Developer Utility Tools',
      meta_description:
        'Check the word count of text instantly for free with the BetterBugs online word count tool. You can use it while writing online content, reviewing and validating articles for publishing, and more.',
      og_title: 'Word Count Tool - Developer Utility Tools',
      og_description:
        'This article covers the word counter dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
