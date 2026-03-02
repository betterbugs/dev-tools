import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-java-do-i-have',
  category: 'Category150',
  route: PATHS.WHAT_VERSION_OF_JAVA,
  ...{
    hero_section: {
      title: 'What version of Java is installed?',
      description:
        'Find your Java/JDK version using quick terminal commands across Windows, macOS, and Linux.',
    },
    development_tools_list: [
      {
        tool: 'What version of Windows do I have?',
        url: PATHS.WHAT_VERSION_OF_WINDOWS_DO_I_HAVE,
      },
      {
        tool: 'What OS do I have?',
        url: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
      },
      { tool: 'What is my User Agent', url: PATHS.WHAT_IS_MY_USER_AGENT },
    ],
    development_tools_about_details: {
      about_title: 'What is this tool?',
      about_description: [
        {
          description:
            'A simple guide with copyable commands to check your installed Java runtime and compiler versions.',
        },
        {
          description:
            'Useful for setup verification, build errors, or confirming JDK compatibility.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to check',
      guide_description: 'Try these commands:',
      steps: [
        {
          step_key: '1.',
          step_title: 'java -version',
          step_description: 'Shows the Java runtime version.',
        },
        {
          step_key: '2.',
          step_title: 'javac -version',
          step_description: 'Shows the Java compiler (JDK) version.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'When this helps:',
      point: [
        {
          title: 'Build Setup',
          description: 'Confirm JDK version for Gradle/Maven projects.',
        },
        {
          title: 'Troubleshooting',
          description: 'Resolve PATH/JAVA_HOME configuration issues.',
        },
        {
          title: 'Compatibility',
          description: 'Ensure project requirements match your installed JDK.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of Java is installed? – Quick Commands',
      meta_description:
        'Check Java/JDK version with java -version and javac -version on Windows, macOS, and Linux.',
      og_title: 'What version of Java is installed?',
      og_description:
        'Copy commands to verify Java runtime and compiler versions across operating systems.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
