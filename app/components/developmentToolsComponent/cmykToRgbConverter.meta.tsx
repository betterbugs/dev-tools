import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'cmyk-to-rgb-converter',
  category: 'Category52',
  route: PATHS.CMYK_TO_RGB_CONVERTER,
  ...{
    hero_section: {
      title: 'CMYK to RGB Converter',
      description:
        'Convert CMYK values to screen‑ready RGB. Paste cmyk() or comma values, choose % or fraction input, then copy rgb().',
    },
    development_tools_list: [
      { tool: 'RGB to CMYK', url: '/development-tools/rgb-to-cmk-convertor' },
      { tool: 'Hex to RGB', url: '/development-tools/hex-to-rgb-converter' },
      { tool: 'RGB to Hex', url: '/development-tools/rgb-to-hex-converter' },
    ],
    development_tools_about_details: {
      about_title: 'What is CMYK to RGB?',
      about_description: [
        {
          description:
            'CMYK is a subtractive color model used for printing, while RGB is additive for displays. This tool translates printable CMYK ink ratios into on‑screen RGB values.',
        },
        {
          description:
            'Enter CMYK as percentages (0–100%) or fractions (0–1). The converter outputs rgb(R, G, B) with integer components 0–255.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the CMYK to RGB Converter',
      guide_description: 'Convert CMYK to RGB in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter CMYK:',
          step_description: "Use 'C, M, Y, K' or cmyk(C,M,Y,K).",
        },
        {
          step_key: 'Step 2:',
          step_title: 'Options:',
          step_description: 'Toggle Percent input for 0–100% or fractions 0–1.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert or enable Auto‑update.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Download:',
          step_description: 'Copy rgb() or download as .txt.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Helpful for previewing print colors on screens and ensuring brand consistency across media.',
      point: [
        {
          title: 'Design Review',
          description: 'Visualize print CMYK colors in digital comps.',
        },
        {
          title: 'Brand Consistency',
          description: 'Derive RGB references from CMYK brand guides.',
        },
        {
          title: 'Education',
          description: 'Demonstrate subtractive vs additive color models.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CMYK to RGB – Convert CMYK Color to RGB Online',
      meta_description:
        'Convert CMYK to RGB online. Paste cmyk() or comma values and get rgb() instantly with an option for percent or fraction input.',
      og_title: 'CMYK to RGB – Free Online Converter',
      og_description:
        'Quickly convert CMYK ink ratios to RGB for on‑screen use.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
