import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'excel-compare',
  category: 'Category161',
  route: PATHS.EXCEL_COMPARE,
  ...{
    hero_section: {
      title: 'Excel Compare',
      description:
        'Compare two Excel-exported CSV files side-by-side and highlight differences at a cell level.',
    },
    development_tools_list: [
      { tool: 'CSV Compare', url: PATHS.CSV_TO_JSON },
      { tool: 'JSON Compare', url: PATHS.JSON_COMPARE },
      { tool: 'Text Compare', url: PATHS.TEXT_COMPARE },
      { tool: 'Code Compare', url: PATHS.CODE_COMPARE_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is Excel Compare?',
      about_description: [
        {
          description:
            'Excel Compare helps you quickly find differences between two spreadsheets (when exported as CSV). It highlights added, removed, and changed cells.',
        },
        {
          description:
            'For native .xlsx files, export each sheet to CSV first. This tool works entirely in your browser—no data is uploaded.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Follow these steps to compare two spreadsheets:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Export to CSV',
          step_description: 'Export both Excel sheets as CSV files.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Upload Files',
          step_description: 'Select File 1 and File 2 and wait for parsing.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Review Differences',
          step_description:
            'Cells are colored for added, removed, and changed values.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Download Diff',
          step_description: 'Optionally export a diff CSV with inline markers.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'Common scenarios where Excel Compare helps:',
      point: [
        {
          title: 'Data QA',
          description: 'Verify changes between data exports or ETL outputs.',
        },
        {
          title: 'Release Audits',
          description: 'Confirm spreadsheet updates before publishing.',
        },
        {
          title: 'Collaboration',
          description:
            'Resolve conflicts between versions shared by teammates.',
        },
        {
          title: 'Compliance',
          description: 'Track modifications for regulated reports.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Excel Compare - Highlight Spreadsheet Differences',
      meta_description:
        'Compare two spreadsheet CSV files and highlight differences at cell-level. Works in-browser with no uploads.',
      og_title: 'Excel Compare - Free Online Tool',
      og_description:
        'Upload two CSV files to compare and visualize differences quickly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
