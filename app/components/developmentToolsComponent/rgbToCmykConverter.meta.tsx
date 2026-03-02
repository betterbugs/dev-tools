import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'rgb-to-cmk-convertor',
  category: 'Category51',
  route: PATHS.RGB_TO_CMYK_CONVERTER,
  ...{
    hero_section: {
      title: 'RGB to CMYK Converter',
      description:
        'Convert RGB colors to print‑friendly CMYK values. Paste RGB or rgb(), choose precision, and copy the cmyk() output.',
    },
    development_tools_list: [
      { tool: 'Hex to RGB', url: '/development-tools/hex-to-rgb-converter' },
      { tool: 'RGB to Hex', url: '/development-tools/rgb-to-hex-converter' },
      {
        tool: 'Random Color Generator',
        url: '/development-tools/random-color-generator',
      },
    ],
    development_tools_about_details: {
      about_title: 'What is RGB to CMYK?',
      about_description: [
        {
          description:
            'RGB is an additive color model used for screens, while CMYK is subtractive for print. This tool converts between them for quick prepress checks.',
        },
        {
          description:
            'Values are computed using a standard formula with configurable precision; optionally show percentages (0–100%).',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the RGB to CMYK Converter',
      guide_description: 'Convert RGB to CMYK in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter RGB:',
          step_description: "Use 'R, G, B' (0–255) or rgb(R,G,B).",
        },
        {
          step_key: 'Step 2:',
          step_title: 'Options:',
          step_description: 'Toggle percent output and set decimal precision.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert or enable Auto‑update.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Download:',
          step_description: 'Copy cmyk() or download as .txt.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Useful for designers preparing on‑screen colors for printing and quick comparisons.',
      point: [
        {
          title: 'Prepress',
          description: 'Preview CMYK values for brand colors.',
        },
        {
          title: 'Design Handoff',
          description: 'Share RGB and CMYK equivalents with print vendors.',
        },
        {
          title: 'Education',
          description: 'Explain additive vs subtractive color models.',
        },
      ],
    },
    meta_data: {
      meta_title: 'RGB to CMYK – Convert RGB Color to CMYK Online',
      meta_description:
        "Convert RGB to CMYK online. Paste 'R, G, B' or rgb() and get cmyk() with adjustable precision and percent output.",
      og_title: 'RGB to CMYK – Free Online Converter',
      og_description: 'Quickly convert RGB colors to CMYK for print workflows.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
