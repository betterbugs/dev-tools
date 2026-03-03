import { PATHS } from '@/app/libs/paths';

export const meta = {
  slug: 'yaml-formatter-and-beautifier',
  category: 'Category81',
  route: PATHS.YAML_FORMATTER_AND_BEAUTIFIER,
  hero_section: {
    title: 'YAML Formatter and Beautifier',
    description:
      'Format and beautify YAML with configurable indent, spacing, and cleanup options.',
  },
  development_tools_list: [
    { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
    { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
    { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
    { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
    { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
  ],
  development_tools_about_details: {
    about_title: 'What is the YAML Formatter and Beautifier?',
    about_description: [
      {
        description:
          'This tool cleans and formats YAML: normalize indentation, ensure spacing after colons and dashes, collapse extra blank lines, and trim trailing whitespace.',
      },
      {
        description:
          'It is dependency-free and suitable for quick readability improvements. For strict YAML parsing/serialization, consider a dedicated parser.',
      },
    ],
  },
  development_tools_steps_guide: {
    guide_title: 'Using the YAML Formatter and Beautifier',
    guide_description: 'Format in a few steps:',
    steps: [
      {
        step_key: 'Step 1:',
        step_title: 'Paste YAML:',
        step_description: 'Paste or type YAML content to format.',
      },
      {
        step_key: 'Step 2:',
        step_title: 'Choose options:',
        step_description:
          'Indent size, tabs-to-spaces, colon spacing, dash spacing, and cleanup options.',
      },
      {
        step_key: 'Step 3:',
        step_title: 'Format:',
        step_description: 'Click Format to beautify the YAML.',
      },
      {
        step_key: 'Step 4:',
        step_title: 'Copy/Clear:',
        step_description: 'Copy the result or clear to start again.',
      },
    ],
  },
  development_tools_how_use: {
    how_use_title: 'How It’s Used',
    how_use_description: 'Common use cases:',
    point: [
      {
        title: 'Config files',
        description:
          'Clean up YAML for CI/CD pipelines, Docker Compose, and Kubernetes manifests.',
      },
      {
        title: 'Documentation',
        description:
          'Improve readability of YAML snippets in READMEs and wikis.',
      },
      {
        title: 'Quick reviews',
        description:
          'Beautify pasted YAML before sharing or committing changes.',
      },
    ],
  },
  meta_data: {
    meta_title: 'YAML Formatter & Beautifier – Clean and Format YAML Online',
    meta_description:
      'Format YAML with configurable indentation and spacing. Collapse blanks, trim whitespace, and improve readability.',
    og_title: 'YAML Formatter & Beautifier – Online',
    og_description:
      'Paste YAML and format it instantly. Options for indentation and cleanup.',
    og_image: '/images/og-images/Cover.png',
  },
};
