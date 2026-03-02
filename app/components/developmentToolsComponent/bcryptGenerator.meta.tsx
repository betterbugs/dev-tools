import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'bcrypt-generator',
  category: 'Category58',
  route: PATHS.BCRYPT_GENERATOR,
  ...{
    hero_section: {
      title: 'Bcrypt Generator',
      description:
        'A free online Bcrypt hash generator and password verifier. Generate secure bcrypt hashes with configurable salt rounds and verify passwords against existing hashes.',
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
      about_title: 'What is the Bcrypt Generator?',
      about_description: [
        {
          description:
            'The Bcrypt Generator is a free online tool that creates secure password hashes using the bcrypt algorithm. It allows you to configure salt rounds for optimal security and performance balance.',
        },
        {
          description:
            'Bcrypt is a password hashing function designed to be slow and computationally expensive, making it resistant to brute-force attacks. It automatically handles salt generation and can be configured with different cost factors.',
        },
        {
          description:
            'This tool also includes a password verification feature to check if a plaintext password matches an existing bcrypt hash, making it useful for testing authentication systems.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the Bcrypt Generator',
      guide_description: 'Using the tool is straightforward:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Password:',
          step_description:
            'Type the password you want to hash in the password field. You can use the sample passwords for quick testing.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Configure Salt Rounds:',
          step_description:
            'Adjust the salt rounds slider (4-16). Higher values are more secure but slower. 10 rounds is recommended for most applications.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate Hash:',
          step_description:
            "Click 'Generate Hash' to create the bcrypt hash. The result can be copied to clipboard for use in your application.",
        },
        {
          step_key: 'Step 4:',
          step_title: 'Verify Password (Optional):',
          step_description:
            'Use the verification section to test if a password matches an existing hash. Enter both the password and hash to check validity.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases for Bcrypt Generator',
      how_use_description: 'Common scenarios where this tool helps:',
      point: [
        {
          title: 'Authentication Development',
          description:
            'Generate secure password hashes for user registration systems and test authentication flows during development.',
        },
        {
          title: 'Database Seeding',
          description:
            'Create hashed passwords for test users in development and staging environments without storing plaintext passwords.',
        },
        {
          title: 'Security Testing',
          description:
            'Test password verification logic and ensure your authentication system correctly handles bcrypt hashes with different salt rounds.',
        },
        {
          title: 'Migration Planning',
          description:
            'Understand hash generation times with different salt rounds to choose optimal settings for your user base and hardware.',
        },
        {
          title: 'Password Policy Testing',
          description:
            'Verify that your password validation works correctly with various password formats and special characters.',
        },
        {
          title: 'API Testing',
          description:
            'Generate test data for authentication endpoints and verify that login/registration APIs handle bcrypt hashes properly.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Bcrypt Generator - Online Password Hash Tool',
      meta_description:
        'Free online bcrypt generator and password verifier. Create secure password hashes with configurable salt rounds and verify existing bcrypt hashes.',
      og_title: 'Bcrypt Generator - Secure Password Hashing Tool',
      og_description:
        'Generate and verify bcrypt password hashes online. Configurable salt rounds for optimal security and performance balance.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
