import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'qr-code-generator',
  category: 'Category92',
  route: PATHS.QR_CODE_GENERATOR,
  ...{
    hero_section: {
      title: 'QR Code Generator',
      description:
        'Generate QR codes from text or URLs instantly. Customize size, format, and download for print or digital use.',
    },
    development_tools_list: [
      { tool: 'Barcode Generator', url: PATHS.BARCODE_GENERATOR },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the QR Code Generator?',
      about_description: [
        {
          description:
            'The QR code generator creates scannable QR codes from any text or URL. You can set size and format and download the image.',
        },
        {
          description:
            'Useful for sharing links, contact info, Wi‑Fi credentials, or small payloads in print, apps, and web.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the QR Code Generator',
      guide_description: 'Create a QR code in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter content:',
          step_description:
            'Type or paste the text or URL you want to encode in the QR code.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set options:',
          step_description:
            'Choose size, error correction level, and format (PNG/SVG) if available.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate and download:',
          step_description:
            'Click Generate to create the QR code. Download or copy the image for use.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Links and URLs',
          description:
            'Encode URLs for flyers, packaging, or in-app “scan to open” flows.',
        },
        {
          title: 'Contact and Wi‑Fi',
          description:
            'Generate vCard or Wi‑Fi QR codes for easy sharing of contact or network details.',
        },
        {
          title: 'Testing and demos',
          description:
            'Create QR codes for testing scanner apps or demo flows.',
        },
      ],
    },
    meta_data: {
      meta_title: 'QR Code Generator – Create QR Codes Online',
      meta_description:
        'Generate QR codes from text or URLs. Customize size and format and download for print or digital use.',
      og_title: 'QR Code Generator – Developer Utility',
      og_description:
        'Create QR codes instantly. Perfect for links, contact info, and testing.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
