import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'bcd-to-decimal-converter',
  category: 'Category172',
  route: PATHS.BCD_TO_DECIMAL_CONVERTER,
  ...{
    hero_section: {
      title: 'BCD to Decimal Converter',
      description:
        'Convert Binary Coded Decimal (BCD) to a plain decimal number. Spaces allowed; validates each nibble.',
    },
    development_tools_list: [
      {
        tool: 'Binary to Decimal',
        url: '/development-tools/binary-to-decimal',
      },
      {
        tool: 'Decimal to Binary',
        url: '/development-tools/decimal-to-binary',
      },
      { tool: 'Hex to Binary', url: '/development-tools/hex-to-binary' },
    ],
    development_tools_about_details: {
      about_title: 'What is BCD?',
      about_description: [
        {
          description:
            'Binary Coded Decimal represents each decimal digit using four bits (a nibble). For example, decimal 123 is 0001 0010 0011 in BCD.',
        },
        {
          description:
            'This tool decodes valid 4‑bit groups (0–9) and reports errors for invalid nibbles or non‑binary characters.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the BCD to Decimal Converter',
      guide_description: 'Convert BCD to decimal in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or type BCD:',
          step_description:
            'Enter bits in groups of 4 (e.g., 0001 0010 0011). Spaces are allowed.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert:',
          step_description:
            'Click Convert or enable Auto‑update to see results instantly.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or download:',
          step_description: 'Copy the decimal result or download a .txt file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Helpful for embedded systems, legacy data formats, and quick decoding checks.',
      point: [
        {
          title: 'Firmware & Embedded',
          description: 'Interpret sensor or device BCD outputs.',
        },
        {
          title: 'Data Migration',
          description: 'Decode legacy storage formats into decimal.',
        },
        {
          title: 'Education',
          description: 'Understand how BCD maps to human‑readable numbers.',
        },
      ],
    },
    meta_data: {
      meta_title: 'BCD to Decimal Converter – Convert BCD to Number Online',
      meta_description:
        'Convert Binary Coded Decimal (BCD) to decimal online. Validates 4‑bit nibbles and preserves leading zeros.',
      og_title: 'BCD to Decimal Converter – Free Online Tool',
      og_description: 'Paste BCD bits and get the decimal value instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
