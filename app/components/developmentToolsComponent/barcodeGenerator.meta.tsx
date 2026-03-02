import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'barcode-generator',
  category: 'Category141',
  route: PATHS.BARCODE_GENERATOR,
  ...{
    hero_section: {
      title: 'Barcode Generator',
      description:
        'Generate barcodes instantly in multiple formats (Code128, EAN, UPC, QR, and more) – perfect for businesses, inventory management, and developers.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Barcode Generator?',
      about_description: [
        {
          description:
            'The Barcode Generator creates scannable barcodes in popular formats like Code128, EAN, UPC, and QR codes.',
        },
        {
          description:
            'It’s useful for product labeling, inventory tracking, retail, logistics, and digital asset management.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Barcode Generator',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter data:',
          step_description:
            'Type or paste the text, number, or code you want to encode into a barcode.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select format:',
          step_description:
            'Choose a barcode type (e.g., Code128, EAN, UPC, QR).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate barcode:',
          step_description:
            'Click the generate button to instantly create your barcode image.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Download or print:',
          step_description:
            'Save the barcode image for labels, packaging, or digital use.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Business & Retail',
          description:
            'Generate barcodes for products, packaging, and point-of-sale systems.',
        },
        {
          title: 'Inventory Management',
          description:
            'Track items and stock efficiently with scannable barcodes.',
        },
        {
          title: 'Logistics & Shipping',
          description:
            'Create barcodes for parcels, warehouse tracking, and delivery systems.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Barcode Generator – Create Barcodes Online',
      meta_description:
        'Generate barcodes in Code128, UPC, EAN, QR, and more formats instantly. Free online barcode generator for business, inventory, and retail use.',
      og_title: 'Barcode Generator – Free Online Tool',
      og_description:
        'Easily create barcodes for products, inventory, or shipping. Supports multiple barcode formats including UPC, EAN, and QR.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
