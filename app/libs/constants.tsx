import CharacterCounterComponent from '../components/developmentToolsComponent/characterCounterComponent';
import CodeCompareTool from '../components/developmentToolsComponent/codeCompareTool';
import CreditCardGeneratorComponent from '../components/developmentToolsComponent/creditCardGeneratorComponent';
import CreditCardValidatorComponent from '../components/developmentToolsComponent/creditCardValidatorComponent';
import CsvToTextConverter from '../components/developmentToolsComponent/csvToTextConverter';
import HtmlToMarkDownComponent from '../components/developmentToolsComponent/htmlToMarkDownComponent';
import HTMLValidator from '../components/developmentToolsComponent/htmlValidator';
import JavascriptMinifierComponent from '../components/developmentToolsComponent/javascriptMinifierComponent';
import JsObfuscatorComponent from '../components/developmentToolsComponent/jsObfuscatorComponent';
import JsonMinifierComponent from '../components/developmentToolsComponent/jsonMinifierComponent';
import JsonPrettifierComponent from '../components/developmentToolsComponent/jsonPrittifierComponent';
import JsonToTxt from '../components/developmentToolsComponent/jsonToTxt';
import JsonValidator from '../components/developmentToolsComponent/jsonValidator';
import LineCounterComponent from '../components/developmentToolsComponent/lineCounterComponent';
import LoremIpsumGeneratorComponent from '../components/developmentToolsComponent/loremIpsumGeneratorComponent';
import LowerCaseConverterComponent from '../components/developmentToolsComponent/lowerCaseConverterComponent';
import MarkDownToHtmlComponent from '../components/developmentToolsComponent/markDownToHTMLComponent';
import PhoneNumberExtractor from '../components/developmentToolsComponent/phoneNumberExtractor';
import RandomClockTimeGenerator from '../components/developmentToolsComponent/randomClockTimeGenerator';
import RandomColorGenerator from '../components/developmentToolsComponent/randomColorGenerator';
import RandomDateGenerator from '../components/developmentToolsComponent/randomDateGenerator';
import RandomDecimalNumberGenerator from '../components/developmentToolsComponent/randomDecimalNumberGenerator';
import RandomJsonDataGenerator from '../components/developmentToolsComponent/randomJsonDataGenerator';
import RandomNumberGenerator from '../components/developmentToolsComponent/randomNumberGenerator';
import RandomParagraphGenerator from '../components/developmentToolsComponent/randomParagraphGenerator';
import RandomPasswardGenerator from '../components/developmentToolsComponent/randomPasswardGenerator';
import RandomSentanceGenerator from '../components/developmentToolsComponent/randomSentanceGenerator';
import RandomStringGenerator from '../components/developmentToolsComponent/randomStringGenerator';
import RandomUsernameGenerator from '../components/developmentToolsComponent/randomUsernameGenerator';
import RandomWordGenerator from '../components/developmentToolsComponent/randomWordGenerator';
import RemoveSpaces from '../components/developmentToolsComponent/removeSpaces';
import ReverseTextGenerator from '../components/developmentToolsComponent/reverseTextGenerator';
import RoundingCalculator from '../components/developmentToolsComponent/roundingCalculator';
import SentenceCounterComponent from '../components/developmentToolsComponent/sentenceCounterComponent';
import SortNumbers from '../components/developmentToolsComponent/sortNumbers';
import SortWords from '../components/developmentToolsComponent/sortWords';
import TextToOneLine from '../components/developmentToolsComponent/textToOneLine';
import TxtToCsvConverter from '../components/developmentToolsComponent/txtToCsvConverter';
import UpperCaseConverterComponent from '../components/developmentToolsComponent/upperCaseConverterComponent';
import WhatIsMyUserAgent from '../components/developmentToolsComponent/whatIsMyUserAgent';
import WordCounterComponent from '../components/developmentToolsComponent/wordCounterComponent';
import WordsToNumbers from '../components/developmentToolsComponent/wordsToNumbers';
import AsanaIcon from '../components/theme/Icon/asanaIcon';
import { AzureBoardIcon } from '../components/theme/Icon/azureBoardIcon';
import ClickupIcon from '../components/theme/Icon/clickupIcon';
import GithubIcon from '../components/theme/Icon/githubIcon';
import JiraIcon from '../components/theme/Icon/jiraIcon';
import LinearIcon from '../components/theme/Icon/linearIcon';
import MSTeamsIcon from '../components/theme/Icon/msTeamsIcon';
import { SentryIcon } from '../components/theme/Icon/sentryIcon';
import SlackIcon from '../components/theme/Icon/slackIcon';
import TrelloIcon from '../components/theme/Icon/trelloIcon';
import { detectBrowser } from './helpers';

// import WordsToNumbers from '../components/developmentToolsComponent/wordsToNumbers';
import AmIUsingTor from '../components/developmentToolsComponent/amIUsingTor';
import ApiKeyGenerator from '../components/developmentToolsComponent/apiKeyGenerator';
import AsciiToDecimalConverter from '../components/developmentToolsComponent/asciiToDecimalConverter';
import AsciiToUnicodeConverter from '../components/developmentToolsComponent/asciiToUnicodeConverter';
import BarcodeGenerator from '../components/developmentToolsComponent/barcodeGenerator';
import Base64Decoder from '../components/developmentToolsComponent/base64Decoder';
import Base64Encoder from '../components/developmentToolsComponent/base64Encoder';
import BcdToDecimalConverter from '../components/developmentToolsComponent/bcdToDecimalConverter';
import BcryptGenerator from '../components/developmentToolsComponent/bcryptGenerator';
import BinaryToDecimalConverter from '../components/developmentToolsComponent/binaryToDecimalConverter';
import BitwiseCalculator from '../components/developmentToolsComponent/bitwiseCalculator';
import CelsiusFahrenheitConverter from '../components/developmentToolsComponent/celsiusFahrenheitConverter';
import CmykToHexConverter from '../components/developmentToolsComponent/cmykToHexConverter';
import CmykToRgbConverter from '../components/developmentToolsComponent/cmykToRgbConverter';
import ColorInvertor from '../components/developmentToolsComponent/colorInvertor';
import ColorPickerTool from '../components/developmentToolsComponent/colorPickerTool';
import CrontabGenerator from '../components/developmentToolsComponent/crontabGenerator';
import CssMinify from '../components/developmentToolsComponent/cssMinify';
import CssPrettify from '../components/developmentToolsComponent/cssPrettify';
import CssToLess from '../components/developmentToolsComponent/cssToLess';
import CssToSass from '../components/developmentToolsComponent/cssToSass';
import CSSToSCSSConverter from '../components/developmentToolsComponent/cssToScssConverter';
import CssToStylus from '../components/developmentToolsComponent/cssToStylus';
import CssValidator from '../components/developmentToolsComponent/cssValidator';
import CsvToExcelFileConvertor from '../components/developmentToolsComponent/csvToExcelFileConvertor';
import CSVToJSON from '../components/developmentToolsComponent/csvToJson';
import DecimalToAsciiConverter from '../components/developmentToolsComponent/decimalToAsciiConverter';
import DecimalToBinaryConverter from '../components/developmentToolsComponent/decimalToBinaryConverter';
import DecimalToGrayCode from '../components/developmentToolsComponent/decimalToGrayCode';
import DecimalToHexConverter from '../components/developmentToolsComponent/decimalToHexConverter';
import DecimalToOctalConverter from '../components/developmentToolsComponent/decimalToOctalConverter';
import ExcelCompare from '../components/developmentToolsComponent/excelCompare';
import FibonacciCalculator from '../components/developmentToolsComponent/fibonacciCalculator';
import FindAndReplaceString from '../components/developmentToolsComponent/findAndReplaceString';
import GraphQLFormatter from '../components/developmentToolsComponent/graphqlFormatter';
import GreyCodeToDecimal from '../components/developmentToolsComponent/greyCodeToDesimal';
import HexToAscii from '../components/developmentToolsComponent/hexToAscii';
import HexToBinaryConverter from '../components/developmentToolsComponent/hexToBinaryConverter';
import HexToCmykConverter from '../components/developmentToolsComponent/hexToCmykConverter';
import HexToPantone from '../components/developmentToolsComponent/hexToPantone';
import HexToRGBConverter from '../components/developmentToolsComponent/hexToRGBConverter';
import HoursToSecounds from '../components/developmentToolsComponent/hoursToSecounds';
import HtmlCodeGenerator from '../components/developmentToolsComponent/htmlCodeGenerator';
import HtmlEntitiesToTextConverter from '../components/developmentToolsComponent/htmlEntitiesToTextConverter';
import HtmlEscape from '../components/developmentToolsComponent/htmlEscape';
import HtmlMinify from '../components/developmentToolsComponent/htmlMinify';
import HtmlPrettify from '../components/developmentToolsComponent/htmlPrettify';
import HtmlTester from '../components/developmentToolsComponent/htmlTester';
import HtmlToBBCode from '../components/developmentToolsComponent/htmlToBBCode';
import HtmlToJade from '../components/developmentToolsComponent/htmlToJade';
import HtmlUnescape from '../components/developmentToolsComponent/htmlUnescape';
import HtmlViewer from '../components/developmentToolsComponent/htmlViewer';
import IdnDecode from '../components/developmentToolsComponent/idnDecode';
import IdnEncode from '../components/developmentToolsComponent/idnEncode';
import InternetSpeedTest from '../components/developmentToolsComponent/internetSpeedTest';
import IpToHexConverter from '../components/developmentToolsComponent/ipToHexConverter';
import JavaScriptEscape from '../components/developmentToolsComponent/javascriptEscape';
import JavascriptRegexTester from '../components/developmentToolsComponent/javascriptRegexTester';
import JavaScriptTester from '../components/developmentToolsComponent/javascriptTester';
import JavaScriptValidatorLinter from '../components/developmentToolsComponent/javascriptValidatorLinter';
import JSONCompare from '../components/developmentToolsComponent/jsonCompare';
import JsonToTypeScript from '../components/developmentToolsComponent/jsonToTypeScript';
import JsonToXmlConverter from '../components/developmentToolsComponent/jsonToXmlConverter';
import JsonToYamlConverter from '../components/developmentToolsComponent/jsonToYamlConverter';
import JwtDecoder from '../components/developmentToolsComponent/jwtDecoder';
import KmToMilesConverter from '../components/developmentToolsComponent/kmToMilesConverter';
import MarkdownFormatter from '../components/developmentToolsComponent/markdownFormatter';
import MilesToKmConverter from '../components/developmentToolsComponent/milesToKmConverter';
import MorseCodeTranslator from '../components/developmentToolsComponent/morseCodeTranslator';
import NumbersToWordsConverter from '../components/developmentToolsComponent/numbersToWordsConverter';
import OctalToBinaryConverter from '../components/developmentToolsComponent/octalToBinaryConverter';
import OctalToDecimalConverter from '../components/developmentToolsComponent/octalToDecimalConverter';
import PHPFormatter from '../components/developmentToolsComponent/phpFormatter';
import PlaceholderImageGenerator from '../components/developmentToolsComponent/placeholderImageGenerator';
import PxToRemConverter from '../components/developmentToolsComponent/pxToRemConverter';
import PythonFormatter from '../components/developmentToolsComponent/pythonFormatter';
import QRCodeGenerator from '../components/developmentToolsComponent/qrCodeGenerator';
import RandomAddressGenerator from '../components/developmentToolsComponent/randomAddressGenerator';
import RandomCharacterGenerator from '../components/developmentToolsComponent/randomCharacterGenerator';
import RandomCSVGenerator from '../components/developmentToolsComponent/randomCSVGenerator';
import RandomGUIDGenerator from '../components/developmentToolsComponent/randomGUIDGenerator';
import RandomIPGenerator from '../components/developmentToolsComponent/randomIPGenerator';
import RandomTextFromRegEX from '../components/developmentToolsComponent/randomTextFromRegEX';
import RandomXMLGenerator from '../components/developmentToolsComponent/randomXMLGenerator';
import RemToPxConverter from '../components/developmentToolsComponent/remToPxConverter';
import RgbToCmykConverter from '../components/developmentToolsComponent/rgbToCmykConverter';
import RgbToHexConverter from '../components/developmentToolsComponent/rgbToHexConverter';
import Rot13EncoderDecoderComponent from '../components/developmentToolsComponent/rot13EncoderDecoderComponent';
import RotateImageTool from '../components/developmentToolsComponent/rotateImageTool';
import RotationCalculatorComponent from '../components/developmentToolsComponent/rotationCalculatorComponent';
import ScssToCssConverter from '../components/developmentToolsComponent/scssToCssConverter';
import ShuffleLetters from '../components/developmentToolsComponent/shuffleLetters';
import ShuffleTextLines from '../components/developmentToolsComponent/shuffleTextLines';
import SortingList from '../components/developmentToolsComponent/sortingList';
import SqlFormatterAndBeautifier from '../components/developmentToolsComponent/sqlFormatterAndBeautifier';
import SqlMinify from '../components/developmentToolsComponent/sqlMinify';
import SqlToCsvConverter from '../components/developmentToolsComponent/sqlToCsvConverter';
import SqlToJson from '../components/developmentToolsComponent/sqlToJson';
import StringDiffrenceChecker from '../components/developmentToolsComponent/stringDiffrenceChecker';
import StripHTML from '../components/developmentToolsComponent/stripHTML';
import TextCompare from '../components/developmentToolsComponent/textCompare';
import TextRepeater from '../components/developmentToolsComponent/textRepeater';
import TextToCsv from '../components/developmentToolsComponent/textToCsv';
import TextToHtmlEntitiesConvertor from '../components/developmentToolsComponent/textToHtmlEntitiesConvertor';
import TypescriptFormatter from '../components/developmentToolsComponent/typescriptFormatter';
import UnicodeToAsciiConverter from '../components/developmentToolsComponent/unicodeToAsciiConverter';
import URLDecode from '../components/developmentToolsComponent/urlDecode';
import URLEncode from '../components/developmentToolsComponent/urlEncode';
import Utf8Decode from '../components/developmentToolsComponent/utf8Decode';
import Utf8Encode from '../components/developmentToolsComponent/utf8Encode';
import WhatIsMyBrowser from '../components/developmentToolsComponent/whatIsMyBrowser';
import WhatIsMyISP from '../components/developmentToolsComponent/whatIsMyISP';
import WhatIsMyLocalIPAddress from '../components/developmentToolsComponent/whatIsMyLocalIPAddress';
import WhatOperatingSystemDoIHave from '../components/developmentToolsComponent/whatOperatingSystemDoIHave';
import WhatsMyBrowserSize from '../components/developmentToolsComponent/whatsMyBrowserSize';
import WhatVersionOfAndroidDoIHave from '../components/developmentToolsComponent/whatVersionOfAndroidDoIHave';
import WhatVersionOfChromeDoIHave from '../components/developmentToolsComponent/whatVersionOfChromeDoIHave';
import WhatVersionOfFirefoxDoIHave from '../components/developmentToolsComponent/whatVersionOfFirefoxDoIHave';
import WhatVersionOfFlashDoIHave from '../components/developmentToolsComponent/whatVersionOfFlashDoIHave';
import WhatVersionOfIOSDoIHave from '../components/developmentToolsComponent/whatVersionOfIOSDoIHave';
import WhatVersionOfJavaDoIHave from '../components/developmentToolsComponent/whatVersionOfJavaDoIHave';
import WhatVersionOfMacOSDoIHave from '../components/developmentToolsComponent/whatVersionOfMacOSDoIHave';
import WhatVersionOfSafariDoIHave from '../components/developmentToolsComponent/whatVersionOfSafariDoIHave';
import WhatVersionOfWindowsDoIHave from '../components/developmentToolsComponent/whatVersionOfWindowsDoIHave';
import XmlCompare from '../components/developmentToolsComponent/xmlCompare';
import XMLEscape from '../components/developmentToolsComponent/xmlEscape';
import XmlMinify from '../components/developmentToolsComponent/xmlMinify';
import XmlPrettify from '../components/developmentToolsComponent/xmlPrettify';
import XmlToJsonConverter from '../components/developmentToolsComponent/xmlToJsonConverter';
import XorCalculator from '../components/developmentToolsComponent/xorCalculator';
import CurlToCodeConverter from '../components/developmentToolsComponent/curlToCodeConverter';
import YAMLFormatterAndBeautifier from '../components/developmentToolsComponent/yamlFormatterAndBeautifier';

export const WEB_URL = 'https://www.betterbugs.io';

// Default to Chrome URL during SSR/build, will be correctly determined on client side
export const Extension_URL =
  typeof window !== 'undefined' && detectBrowser() === 'edge'
    ? 'https://microsoftedge.microsoft.com/addons/detail/betterbugs-a-fresh-appro/cbojiblepdmdpjngajmompgkadipidfb'
    : 'https://chrome.google.com/webstore/detail/betterbugs-a-fresh-approa/mdljmlgokccncglfobogbfjgcijldnaj';

export const SEO_META = {
  developmentTools: {
    title: 'Developer Utility Tools - BetterBugs.io',
    description:
      'A suite of free utility tools for developers, QA, support teams, and those working with software. Simplify your everyday tasks with the dev utility tools available completely free on the BetterBugs.io website.',
    ogTitle: 'Developer Utility Tools - BetterBugs.io',
    ogDescription:
      'Checkout the free developer utility tools to simplify your everyday development, QA, and other software-related tasks.',
    ogImage: '/images/og-images/Cover.png',
  },
  not_Found: {
    title: '404 Not Found',
    description: '404 Not Found',
    ogImage: '/images/og-images/error-page.png',
  },
};

export const integrationTools = [
  { name: 'Jira', icon: <JiraIcon />, url: `${WEB_URL}/integration/jira` },
  {
    name: 'Trello',
    icon: <TrelloIcon />,
    url: `${WEB_URL}/integration/trello`,
  },
  {
    name: 'ClickUp',
    icon: <ClickupIcon />,
    url: `${WEB_URL}/integration/clickup`,
  },
  { name: 'Asana', icon: <AsanaIcon />, url: `${WEB_URL}/integration/asana` },
  { name: 'Slack', icon: <SlackIcon />, url: `${WEB_URL}/integration/slack` },
  {
    name: 'GitHub',
    icon: <GithubIcon />,
    url: `${WEB_URL}/integration/github`,
  },
  {
    name: 'Linear',
    icon: <LinearIcon />,
    url: `${WEB_URL}/integration/linear`,
  },
  {
    name: 'Azure Boards',
    icon: <AzureBoardIcon />,
    url: `${WEB_URL}/integration/azure-boards`,
  },
  {
    name: 'MS Teams',
    icon: <MSTeamsIcon />,
    url: `${WEB_URL}/integration/teams`,
  },
  {
    name: 'Sentry',
    icon: <SentryIcon />,
    url: `${WEB_URL}/integration/sentry`,
  },
];

// Development tools constants
export const developmentToolsCategoryContent: any = {
  Category1: [
    {
      url: '/text-uppercase-converter',
      title: 'Text to Uppercase Converter',
      description: 'Convert any text to UPPERCASE instantly.',
    },
  ],
  Category2: [
    {
      url: '/text-lowercase-converter',
      title: 'Text to Lowercase Converter',
      description: 'Convert any text to lowercase instantly.',
    },
  ],
  Category3: [
    {
      url: '/word-count-tool',
      title: 'Word Count Tool',
      description: 'Count words in your text instantly.',
    },
  ],
  Category4: [
    {
      url: '/character-count-tool',
      title: 'Character Counter',
      description: 'Count characters in your text instantly.',
    },
  ],
  Category5: [
    {
      url: '/line-counter-tool',
      title: 'Line Counter',
      description: 'Count lines in your text instantly.',
    },
  ],
  Category6: [
    {
      url: '/sentence-counter-tool',
      title: 'Sentence Counter',
      description: 'Count sentences in your text instantly.',
    },
  ],
  Category7: [
    {
      url: '/javascript-minifier',
      title: 'JavaScript Minifier',
      description: 'Minify JavaScript by removing unnecessary characters.',
    },
  ],
  Category8: [
    {
      url: '/json-minifier',
      title: 'JSON Minifier',
      description: 'Minify JSON to reduce size and speed up parsing.',
    },
  ],
  Category9: [
    {
      // icon: <JsonPrettifierToolIcon />,
      url: '/json-prettifier',
      title: 'JSON Prettifier',
      description: 'Format JSON to make it human-readable.',
    },
  ],
  Category10: [
    {
      // icon: <LoremIpsumTextGeneratorIcon />,
      url: '/lorem-ipsum-generator',
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder Lorem Ipsum text quickly.',
    },
  ],
  Category11: [
    {
      // icon: <LoremIpsumTextGeneratorIcon />,
      url: '/html-to-markdown',
      title: 'HTML To Markdown',
      description: 'Convert HTML to Markdown.',
    },
  ],
  Category12: [
    {
      // icon: <LoremIpsumTextGeneratorIcon />,
      url: '/markdown-to-html',
      title: 'Markdown To HTML',
      description: 'Convert Markdown to HTML.',
    },
  ],
  Category13: [
    {
      // icon: <LoremIpsumTextGeneratorIcon />,
      url: '/js-obfuscator',
      title: 'JS Obfuscator',
      description: 'Obfuscate JavaScript to make code hard to read.',
    },
  ],
  Category14: [
    {
      url: '/credit-card-generator',
      title: 'Credit Card Generator',
      description: 'Generate dummy credit card details for testing.',
    },
  ],
  Category15: [
    {
      url: '/credit-card-validator',
      title: 'Credit Card Validator',
      description: 'Validate credit card numbers (Luhn check).',
    },
  ],
  Category16: [
    {
      url: '/json-generator',
      title: 'JSON Generator',
      description:
        'The JSON Generator is a free online utility tool on BetterBugs.io.',
    },
  ],
  Category17: [
    {
      url: '/random-decimal-number-generator',
      title: 'Random Decimal Number Generator',
      description:
        'The random decimal number generator is a free online tool on BetterBugs.io that generates random floating‑point numbers in standard, scientific, and engineering formats.',
    },
  ],
  Category18: [
    {
      url: '/random-date-generator',
      title: 'Random Date Generator',
      description:
        'The random date generator that instantly generates random date(s) within a specified range',
    },
  ],
  Category19: [
    {
      url: '/random-time-generator',
      title: 'Random Time Generator',
      description:
        'Generate a list of random clock time(s) instantly with the random time generator tool. It’s a free tool on BetterBugs.io,',
    },
  ],
  Category20: [
    {
      url: '/random-color-generator',
      title: 'Random Color Generator',
      description:
        'The random color generator is a free online utility tool on BetterBugs.io that instantly generates random color values in HEX, RGB, and HSL formats.',
    },
  ],
  Category21: [
    {
      url: '/random-paragraph-generator',
      title: 'Random Paragraph Generator',
      description:
        'The paragraph generator tool enables you to instantly generate random text paragraphs or meaningful paragraphs, perfect for using as UI/UX placeholders while designing layouts and testing purposes.',
    },
  ],
  Category22: [
    {
      url: '/random-string-generator',
      title: 'Random String Generator',
      description:
        'Generate random string values instantly with the random string generator tool. It’s a simple and free tool on BetterBugs.io site, perfect for generating strings to use as unique identifiers, testing input validation, and populating test environments with realistic data.',
    },
  ],
  Category23: [
    {
      url: '/random-sentence-generator',
      title: 'AI Sentence Generator',
      description:
        'The AI sentence generator tool is a free online tool on BetterBugs.io that enables you to generate random text sentences or meaningful AI sentences in one click.',
    },
  ],
  Category24: [
    {
      url: '/random-password-generator',
      title: 'Random Password Generator',
      description:
        'Generate random, secure, and fully customized random passwords with the password generator tool. It’s a lightweight and free tool on BetterBugs.io, perfect for generating random passwords that use a mix of different letter cases, numbers, and symbols.',
    },
  ],
  Category25: [
    {
      url: '/random-number-generator',
      title: 'Random Number Generator',
      description:
        'The random number generator is a free online tool on BetterBugs.io to instantly generate random and unique numbers within a specified range.',
    },
  ],
  Category26: [
    {
      url: '/random-word-generator',
      title: 'Random Word Generator',
      description:
        'The random number generator is a free online tool on BetterBugs.io to instantly generate random and unique words within a specified character count.',
    },
  ],
  Category27: [
    {
      url: '/random-username-generator',
      title: 'Random Username Generator',
      description:
        'The random username generator is a free-to-use online tool on BetterBugs.io that enables you to generate unique usernames instantly; perfect for creating usernames in bulk for general usage, software testing, and QA purposes.',
    },
  ],
  Category28: [
    {
      url: '/sort-number',
      title: 'Sort Numbers Online',
      description:
        'The sort numbers online tool is a free-to-use utility on BetterBugs.io website. You can use it for data organization, sorting large number datasets, and mathematical and statistical purposes.',
    },
  ],
  Category29: [
    {
      url: '/sort-word',
      title: 'Online Alphabetizer: Sort Words Alphabetically',
      description:
        'The online alphabetizer is a simple utility tool on BetterBugs.io that enables you to sort words in ascending or descending order and in three other modes. You can also set preferences for the sorting order. ',
    },
  ],
  Category30: [
    {
      url: '/phone-number-extractor',
      title: 'Phone Number Extractor',
      description:
        'The phone number extractor tool is a simple utility tool on BetterBugs.io that enables you to instantly grab all the phone numbers from a text string.',
    },
  ],
  Category31: [
    {
      url: '/reverse-text-generator',
      title: 'Reverse Text Generator',
      description:
        'The reverse text generator is a simple free-to-use online tool on BetterBugs.io. You can use the tool to flip, reverse, or mirror text in several ways; perfect for fun, puzzles, or creative text formatting activities.',
    },
  ],
  Category32: [
    {
      url: '/word-to-number',
      title: 'Words to Number Online Converter',
      description:
        'The words to number online converter is a simple utility tool on BetterBugs.io that enables you to instantly convert numbers described as words to their corresponding numeric values.',
    },
  ],
  Category33: [
    {
      url: '/remove-spaces',
      title: 'Remove Spaces from Text',
      description:
        'The space remover tool enables you to easily remove spaces from your text content. It’s a free tool on BetterBugs.io website. You can use it for data cleaning, text formatting or processing purposes. ',
    },
  ],
  Category34: [
    {
      url: '/text-to-one-line',
      title: 'Text to One Line Online Converter',
      description:
        'The text to one line converter is a simple and free tool on BetterBugs.io that enables you to instantly convert your text content to a single line. You can use it for text processing, text formatting, and several other purposes in software. ',
    },
  ],
  Category35: [
    {
      url: '/csv-to-text-converter',
      title: 'CSV to TXT Converter',
      description:
        'The CSV to TXT converter is a free-to-use online tool on BetterBugs.io that enables you to instantly convert CSV data to various text formats, such as table, simple text, JSON, XML, and YAML formats.',
    },
  ],
  Category36: [
    {
      url: '/rounding-calculator',
      title: 'Rounding Calculator Online',
      description:
        'The rounding calculator is a simple utility tool that enables you to quickly round numbers to your preferred rounded formats, such as round up or round down, floor, ceil, and others. You can use it completely free on the BetterBugs.io website.',
    },
  ],
  Category37: [
    {
      url: '/txt-to-csv-converter',
      title: 'TXT to CSV Converter',
      description:
        'The txt to csv converter is a simple utility tool on BetterBugs.io that enables you to instantly convert text data into CSV format; perfect for your everyday data-related and software development tasks.',
    },
  ],
  Category38: [
    {
      url: '/json-to-text',
      title: 'JSON to TXT Online Converter',
      description:
        'The JSON to TXT converter is a simple utility tool that enables you to instantly convert JSON data to human-readable text formats. Use it absolutely free on the BetterBugs.io website.',
    },
  ],
  Category39: [
    {
      url: '/html-validator',
      title: 'HTML Validator Online',
      description:
        'The HTML validator online is a free-to-use utility tool on BetterBugs.io that enables you to instantly detect any syntax errors or issues with your HTML code, validate it, provide warnings (if any) and check that it adheres to the W3C HTML standards/guidelines.',
    },
  ],
  Category40: [
    {
      url: '/json-validator',
      title: 'JSON Validator Online',
      description:
        'JSON validator is a free dev utility tool on BetterBugs.io that enables you to instantly validate your JSON data or file in seconds. Use the tool to check correctness in your JSON data, schema validation , and similar other purposes in software.',
    },
  ],
  Category41: [
    {
      url: '/code-compare-tool',
      title: 'Code Compare Online Tool',
      description:
        'The code compare tool is a free-to-use dev utility on BetterBugs.io that enables you to instantly compare two code files or snippets of code in JavaScript, TypeScript, Python, and many other languages and code formats; perfect for diff checking, code reviews, spotting changes and potential code errors, or version control tasks.',
    },
  ],
  Category42: [
    {
      url: '/what-is-my-user-agent',
      title: 'What is My User Agent',
      description:
        'What is my user agent is a free-to-use dev utility tool on BetterBugs.io that automatically grabs and displays info about your user agent, including browser and OS details in a string format.',
    },
  ],

  Category43: [
    {
      url: '/random-character-generator',
      title: 'Random Character Generator',
      description:
        'Create random characters from selected sets (letters, digits, symbols) with custom length.',
    },
  ],
  Category44: [
    {
      url: '/scss-to-css',
      title: 'SCSS to CSS Converter',
      description:
        'Compile SCSS to CSS; supports variables, mixins, imports, and nesting.',
    },
  ],
  Category45: [
    {
      url: '/css-to-scss',
      title: 'CSS to SCSS Converter',
      description:
        'Transform CSS into SCSS syntax with nesting and variables where applicable.',
    },
  ],

  Category46: [
    {
      url: '/rotation-calculator',
      title: 'Rotation Calculator',
      description:
        'Calculate the rotation of a given angle in degrees, radians, turns, or gradians.',
    },
  ],
  Category47: [
    {
      url: '/rot13-encoder-decoder',
      title: 'ROT13 Encoder/Decoder',
      description: 'Encode or decode text with ROT13 instantly.',
    },
  ],
  Category48: [
    {
      url: '/cmyk-to-hex',
      title: 'CMYK to HEX Converter',
      description:
        'The CMYK to HEX converter is a free online utility tool on BetterBugs.io that instantly converts CMYK color values to HEX format for digital design and web development.',
    },
  ],
  Category49: [
    {
      url: '/hex-to-cmyk',
      title: 'HEX to CMYK Converter',
      description:
        'The HEX to CMYK converter is a free online utility tool on BetterBugs.io that instantly converts HEX color codes to CMYK format for print design and professional color management.',
    },
  ],
  Category50: [
    {
      url: '/hex-to-pantone',
      title: 'Hex to Pantone',
      description: 'Convert HEX color codes to Pantone values.',
    },
  ],
  Category51: [
    {
      url: '/rgb-to-cmk-convertor',
      title: 'RGB to CMYK Converter',
      description:
        'Convert RGB colors to print‑friendly CMYK values. Paste RGB or rgb(), choose precision, and copy the cmyk() output.',
    },
  ],
  Category52: [
    {
      url: '/cmyk-to-rgb-converter',
      title: 'CMYK to RGB Converter',
      description:
        'Convert CMYK colors to RGB values. Paste CMYK or cmyk(), choose precision, and copy the rgb() output.',
    },
  ],
  Category53: [
    {
      url: '/css-to-stylus',
      title: 'CSS to Stylus Converter',
      description:
        'The CSS to Stylus converter that instantly converts CSS to Stylus',
    },
  ],
  Category54: [
    {
      url: '/ascii-to-unicode-converter',
      title: 'ASCII to Unicode',
      description:
        'The ASCII to Unicode converter that instantly converts ASCII characters to Unicode characters',
    },
  ],
  Category55: [
    {
      url: '/unicode-to-ascii-converter',
      title: 'Unicode to ASCII',
      description:
        'The Unicode to ASCII converter that instantly converts Unicode characters to ASCII characters',
    },
  ],
  Category56: [
    {
      url: '/decimal-to-ascii-converter',
      title: 'Decimal to ASCII Converter',
      description:
        'The decimal to ASCII converter that instantly converts decimal numbers to ASCII characters',
    },
  ],
  Category57: [
    {
      url: '/ascii-to-decimal-converter',
      title: 'ASCII to Decimal Converter',
      description:
        'The ASCII to decimal converter that instantly converts ASCII characters to decimal numbers',
    },
  ],
  Category58: [
    {
      url: '/bcrypt-generator',
      title: 'Bcrypt Generator',
      description: 'Generate bcrypt hashes for your passwords.',
    },
  ],
  Category59: [
    {
      url: '/base64-decoder',
      title: 'Base64 Decoder',
      description: 'Decode Base64 text or files to UTF-8.',
    },
  ],
  Category60: [
    {
      url: '/base64-encoder',
      title: 'Base64 Encoder',
      description: 'Encode text or files to Base64.',
    },
  ],
  Category61: [
    {
      url: '/hours-to-seconds',
      title: 'Hours to Seconds',
      description: 'Convert hours, minutes, and seconds to total seconds.',
    },
  ],
  Category62: [
    {
      url: '/px-to-rem-converter',
      title: 'PX to REM Converter',
      description: 'Convert px values to rem using a base font size.',
    },
  ],
  Category63: [
    {
      url: '/rem-to-px-converter',
      title: 'REM to PX Converter',
      description: 'Convert rem values to pixels using a base font size.',
    },
  ],
  Category64: [
    {
      url: '/placeholder-image-generator',
      title: 'Placeholder Image Generator',
      description:
        'Create placeholder images with custom size, background/text colors, and overlay text.',
    },
  ],
  Category65: [
    {
      url: '/color-picker-tool',
      title: 'Color Picker Tool',
      description:
        'Pick colors from the screen and get HEX, RGB, and HSL values with quick copy.',
    },
  ],
  Category66: [
    {
      url: '/rotate-image-tool',
      title: 'Rotate Image Tool',
      description:
        'Rotate images left/right or by a custom angle; download the rotated PNG/JPG.',
    },
  ],
  Category67: [
    {
      url: '/csv-to-excel-file-convertor',
      title: 'CSV to Excel File Convertor',
      description:
        'Convert CSV files to Excel (XLSX) while preserving delimiters, headers, and encodings.',
    },
  ],
  Category68: [
    {
      url: '/random-xml-generator',
      title: 'Random XML Generator',
      description:
        'Generate sample XML with configurable elements, attributes, and depth for testing.',
    },
  ],
  Category69: [
    {
      url: '/sql-to-csv-converter',
      title: 'SQL to CSV Converter',
      description:
        'Convert SQL data or query results into clean CSV files for analysis or export.',
    },
  ],
  Category70: [
    {
      url: '/html-prettify',
      title: 'HTML Prettify',
      description:
        'Format and beautify HTML with consistent indentation and spacing for readability.',
    },
  ],
  Category71: [
    {
      url: '/css-prettify',
      title: 'CSS Prettify',
      description:
        'Beautify CSS with tidy indentation, line breaks, and consistent formatting.',
    },
  ],
  Category72: [
    {
      url: '/html-minify',
      title: 'HTML Minify',
      description:
        'Minify HTML code by removing unnecessary whitespace and comments for smaller file sizes and faster loading.',
    },
  ],
  Category73: [
    {
      url: '/css-minify',
      title: 'CSS Minify',
      description:
        'Minify CSS code by removing unnecessary whitespace and comments for optimized stylesheets.',
    },
  ],
  Category74: [
    {
      url: '/xml-minify',
      title: 'XML Minify',
      description:
        'Minify XML by removing redundant whitespace and comments without changing structure.',
    },
  ],
  Category75: [
    {
      url: '/xml-prettify',
      title: 'XML Prettify',
      description:
        'Pretty‑print XML with clear indentation and line breaks for easier reading.',
    },
  ],
  Category76: [
    {
      url: '/sql-minify',
      title: 'SQL Minify',
      description:
        'Minify SQL by stripping comments and extra whitespace while keeping queries valid.',
    },
  ],
  Category77: [
    {
      url: '/hex-to-rgb-converter',
      title: 'Hex to RGB Converter',
      description:
        'Convert HEX color codes to RGB/RGBA with live preview and quick copy.',
    },
  ],
  Category78: [
    {
      url: '/rgb-to-hex-converter',
      title: 'RGB to Hex Converter',
      description:
        'Convert RGB/RGBA values to HEX, including alpha transparency when applicable.',
    },
  ],
  Category79: [
    {
      url: '/grey-code-to-decimal',
      title: 'Grey Code to Decimal',
      description:
        'Convert Gray code to decimal; view binary conversion steps and intermediate values.',
    },
  ],
  Category80: [
    {
      url: '/decimal-to-grey-code',
      title: 'Decimal to Grey Code',
      description:
        'Convert decimal numbers to Gray code with a step‑by‑step binary/XOR breakdown.',
    },
  ],
  Category81: [
    {
      url: '/yaml-formatter-and-beautifier',
      title: 'YAML Formatter and Beautifier',
      description:
        'Format YAML with consistent indentation and spacing; highlight syntax issues.',
    },
  ],
  Category82: [
    {
      url: '/sql-formatter-and-beautifier',
      title: 'SQL Formatter and Beautifier',
      description:
        'Format SQL queries with standard indentation, capitalization, and line breaks.',
    },
  ],
  Category83: [
    {
      url: '/what-is-my-browser',
      title: 'What is My Browser',
      description:
        'Detect your browser name, version, rendering engine, and key capabilities.',
    },
  ],
  Category84: [
    {
      url: '/what-version-of-windows-do-i-have',
      title: 'What Version of Windows Do I Have',
      description:
        'Identify your Windows edition, version, build number, and system architecture.',
    },
  ],
  Category85: [
    {
      url: '/what-operating-system-do-i-have',
      title: 'What Operating System Do I Have',
      description:
        'Detect your OS name, version, architecture, and device details.',
    },
  ],
  Category86: [
    {
      url: '/what-version-of-chrome-do-i-have',
      title: 'What Version of Chrome Do I Have',
      description:
        'Show your Google Chrome version, build, and update channel information.',
    },
  ],

  Category87: [
    {
      url: '/json-to-typescript',
      title: 'Json to Typescript Converter',
      description:
        'Generate TypeScript interfaces/types from JSON, including arrays and nested objects.',
    },
  ],
  Category88: [
    {
      url: '/random-csv-generator',
      title: 'Random CSV Generator',
      description:
        'Create sample CSV data with configurable columns, data types, and row counts.',
    },
  ],
  Category89: [
    {
      url: '/random-guid-generator',
      title: 'Random GUID Generator',
      description:
        'Generate one or many RFC 4122 UUIDs (v4) with quick copy or export.',
    },
  ],
  Category90: [
    {
      url: '/random-text-from-regex',
      title: 'Random Text From Regex',
      description:
        'Generate strings that match a given regular expression pattern.',
    },
  ],
  Category91: [
    {
      url: '/javascript-regex-tester',
      title: 'JavaScript Regex Tester',
      description:
        'Test JavaScript regular expressions with flags, matches, and replacements.',
    },
  ],
  Category92: [
    {
      url: '/qr-code-generator',
      title: 'QR Code Generator',
      description: 'Create QR codes from text or URLs; download as PNG or SVG.',
    },
  ],
  Category93: [
    {
      url: '/random-address-generator',
      title: 'Random Address Generator',
      description:
        'Generate realistic addresses including street, city, state, ZIP, and country.',
    },
  ],
  Category94: [
    {
      url: '/html-code-generator',
      title: 'HTML Code Generator',
      description:
        'Generate common HTML snippets (tables, forms, buttons) with customizable attributes.',
    },
  ],
  Category95: [
    {
      url: '/html-viewer',
      title: 'HTML Viewer',
      description:
        'Preview HTML markup in a live viewer to see rendered output instantly.',
    },
  ],
  Category96: [
    {
      url: '/color-inverter',
      title: 'Color Inverter',
      description:
        'Invert colors for HEX/RGB/HSL values with side‑by‑side preview and copy.',
    },
  ],

  Category97: [
    {
      url: '/string-difference-checker',
      title: 'String Difference Checker',
      description:
        'Compare two texts and highlight additions, deletions, and changes clearly.',
    },
  ],
  Category98: [
    {
      url: '/text-repeater',
      title: 'Text Repeater',
      description:
        'Repeat text a chosen number of times with custom separators and line breaks.',
    },
  ],
  Category99: [
    {
      url: '/sorting-list',
      title: 'Sorting List',
      description:
        'Sort lines ascending/descending, remove duplicates, and toggle case sensitivity.',
    },
  ],
  Category100: [
    {
      url: '/shuffle-letters',
      title: 'Shuffle Letters',
      description:
        'Randomly shuffle characters in your text; preserve case and whitespace options.',
    },
  ],
  Category101: [
    {
      url: '/shuffle-text-lines',
      title: 'Shuffle Text Lines',
      description: 'Shuffle lines randomly; keep header lines fixed if needed.',
    },
  ],

  Category102: [
    {
      url: '/random-ip-generator',
      title: 'Random IP Generator',
      description:
        'Generate valid IPv4/IPv6 addresses; set quantity and optional ranges.',
    },
  ],
  Category103: [
    {
      url: '/json-compare',
      title: 'JSON Compare',
      description:
        'Deep-compare two JSON objects; see added, removed, and changed paths.',
    },
  ],
  Category104: [
    {
      url: '/text-compare',
      title: 'Text Compare',
      description:
        'Compare plain text in line or word mode with side‑by‑side view.',
    },
  ],
  Category105: [
    {
      url: '/url-decode',
      title: 'URL Decode',
      description:
        'Decode percent‑encoded URLs safely; support UTF‑8 and reserved characters.',
    },
  ],
  Category106: [
    {
      url: '/url-encode',
      title: 'URL Encode',
      description:
        'Encode text for safe use in URLs; choose component or full URL encoding.',
    },
  ],
  Category107: [
    {
      url: '/text-to-html-entities-convertor',
      title: 'Text to HTML Entities Convertor',
      description:
        'Convert characters to HTML entities (named, numeric, hex) with copy support.',
    },
  ],
  Category108: [
    {
      url: '/html-entities-to-text-converter',
      title: 'HTML Entities to Text Converter',
      description: 'Decode HTML entities back to plain text accurately.',
    },
  ],
  Category109: [
    {
      url: '/csv-to-json',
      title: 'CSV to JSON Converter',
      description:
        'Convert CSV to JSON; set delimiter, header row, and basic type inference.',
    },
  ],
  Category110: [
    {
      url: '/markdown-formatter',
      title: 'Markdown Formatter',
      description:
        'Beautify Markdown: normalize headings, lists, code blocks, and spacing.',
    },
  ],
  Category111: [
    {
      url: '/typeScript-formatter',
      title: 'TypeScript Formatter',
      description:
        'Format TypeScript code with standard styling and optional import organizing.',
    },
  ],

  Category112: [
    {
      url: '/text-to-csv',
      title: 'Text to CSV',
      description:
        'Convert delimited text to CSV; set delimiter and quoting rules.',
    },
  ],
  Category113: [
    {
      url: '/internet-speed-test',
      title: 'Internet Speed Test',
      description:
        'Measure download/upload speeds, latency, and jitter with shareable results.',
    },
  ],
  Category114: [
    {
      url: '/php-formatter',
      title: 'PHP Formatter',
      description:
        'Format PHP code with PSR‑12 style: indentation, braces, and spacing.',
    },
  ],
  Category115: [
    {
      url: '/python-formatter',
      title: 'Python Formatter',
      description:
        'Format Python code to PEP 8 style: indentation, spacing, and line length.',
    },
  ],
  Category116: [
    {
      url: '/xml-compare',
      title: 'XML Compare',
      description:
        'Structure-aware diff of two XML files: elements, attributes, and text nodes.',
    },
  ],
  Category117: [
    {
      url: '/idn-encode',
      title: 'IDN Encode',
      description:
        'Convert Unicode domain names to Punycode (IDNA) for DNS compatibility.',
    },
  ],
  Category118: [
    {
      url: '/idn-decode',
      title: 'IDN Decode',
      description: 'Convert Punycode (IDNA) domains back to readable Unicode.',
    },
  ],
  Category119: [
    {
      url: '/json-to-xml-converter',
      title: 'JSON to XML Converter',
      description: 'Convert JSON data into properly formatted XML format.',
    },
  ],
  Category120: [
    {
      url: '/json-to-yaml-converter',
      title: 'JSON to YAML Converter',
      description: 'Convert JSON data into properly formatted YAML format.',
    },
  ],
  Category121: [
    {
      url: '/utf8-decode',
      title: 'UTF8 Decode',
      description: 'Decode UTF8 text or files to UTF-8.',
    },
  ],
  Category122: [
    {
      url: '/utf8-encode',
      title: 'UTF8 Encode',
      description: 'Encode UTF8 text or files to UTF-8.',
    },
  ],
  Category123: [
    {
      url: '/xor-calculator',
      title: 'XOR Calculator',
      description: 'Calculate XOR of text or files.',
    },
  ],
  Category124: [
    {
      url: '/binary-to-decimal-converter',
      title: 'Binary to Decimal Converter',
      description: 'Convert binary numbers to decimal values.',
    },
  ],
  Category125: [
    {
      url: '/decimal-to-binary-converter',
      title: 'Decimal to Binary Converter',
      description: 'Convert decimal numbers to binary values.',
    },
  ],
  Category126: [
    {
      url: '/octal-to-decimal-converter',
      title: 'Octal to Decimal Converter',
      description: 'Convert octal numbers to decimal values.',
    },
  ],
  Category127: [
    {
      url: '/decimal-to-octal-converter',
      title: 'Decimal to Octal Converter',
      description: 'Convert decimal numbers to octal values.',
    },
  ],
  Category128: [
    {
      url: '/decimal-to-hex',
      title: 'Decimal to Hex Converter',
      description: 'Convert decimal numbers to hex values.',
    },
  ],
  Category129: [
    {
      url: '/hex-to-binary',
      title: 'Hex to Binary Converter',
      description: 'Convert hex numbers to binary values.',
    },
  ],
  Category130: [
    {
      url: '/octal-to-binary',
      title: 'Octal to Binary Converter',
      description: 'Convert octal numbers to binary values.',
    },
  ],
  Category131: [
    {
      url: '/miles-to-kilometers',
      title: 'Miles to Kilometers Converter',
      description: 'Convert miles to kilometers.',
    },
  ],
  Category132: [
    {
      url: '/kilometers-to-miles',
      title: 'Kilometers to Miles Converter',
      description: 'Convert kilometers to miles.',
    },
  ],
  Category133: [
    {
      url: '/jwt-decoder',
      title: 'JWT Decoder',
      description: 'Decode JWT tokens into readable format.',
    },
  ],
  Category134: [
    {
      url: '/ip-to-hex',
      title: 'IP to Hex Converter',
      description: 'Convert IP addresses to hexadecimal values.',
    },
  ],
  Category135: [
    {
      url: '/words-to-numbers',
      title: 'Words to Numbers Converter',
      description: 'Convert words to numbers.',
    },
  ],
  Category136: [
    {
      url: '/numbers-to-words',
      title: 'Numbers to Words Converter',
      description: 'Convert numbers to words.',
    },
  ],
  Category137: [
    {
      url: '/fabonacci-calculator',
      title: 'Fabonacci Calculator',
      description: 'Calculate Fabonacci numbers.',
    },
  ],
  Category138: [
    {
      url: '/bitwise-calculator',
      title: 'Bitwise Calculator',
      description: 'Calculate Bitwise numbers.',
    },
  ],
  Category139: [
    {
      url: '/graphql-formatter',
      title: 'GraphQL Formatter',
      description: 'Format GraphQL numbers.',
    },
  ],
  Category140: [
    {
      url: '/celcius-to-fahrenheit',
      title: 'Celcius to Fahrenheit Converter',
      description: 'Convert Celcius to Fahrenheit.',
    },
  ],
  Category141: [
    {
      url: '/barcode-generator',
      title: 'Barcode Generator',
      description: 'Generate Barcodes.',
    },
  ],
  Category142: [
    {
      url: '/find-and-replace-string',
      title: 'Find and Replace String',
      description: 'Find and Replace String.',
    },
  ],
  Category143: [
    {
      url: '/api-key-generator',
      title: 'API Key Generator',
      description: 'Generate API Keys.',
    },
  ],
  Category144: [
    {
      url: '/html-escape',
      title: 'HTML Escape',
      description: 'Escape HTML.',
    },
  ],
  Category145: [
    {
      url: '/html-unescape',
      title: 'HTML Unescape',
      description: 'Unescape HTML.',
    },
  ],
  Category146: [
    {
      url: '/javascript-regex-tester',
      title: 'JavaScript Regex Tester',
      description:
        'Test and validate JavaScript regular expressions with real-time results and match highlighting.',
    },
  ],
  Category147: [
    {
      url: '/strip-html',
      title: 'Strip HTML',
      description: 'Remove all HTML tags and scripts, output plain text.',
    },
  ],
  Category148: [
    {
      url: '/what-is-my-local-ip-address',
      title: 'What Is My Local IP Address',
      description:
        'Discover local IPv4/IPv6 addresses via WebRTC ICE candidates.',
    },
  ],
  Category149: [
    {
      url: '/javascript-tester',
      title: 'JavaScript Tester',
      description: 'Write and run JavaScript with console output in a sandbox.',
    },
  ],
  Category150: [
    {
      url: '/what-version-of-java-do-i-have',
      title: 'What version of Java is installed?',
      description: 'Quick commands to check your Java/JDK version on any OS.',
    },
  ],
  Category151: [
    {
      url: '/what-version-of-macos-do-i-have',
      title: 'What version of macOS do I have?',
      description:
        'Detect macOS from browser UA and show manual steps to verify.',
    },
  ],
  Category152: [
    {
      url: '/what-version-of-firefox-do-i-have',
      title: 'What version of Firefox do I have?',
      description:
        'Detect Firefox version from user agent with manual steps to confirm.',
    },
  ],
  Category153: [
    {
      url: '/what-version-of-ios-do-i-have',
      title: 'What version of iOS do I have?',
      description:
        'Detect iOS version from user agent and show Settings steps.',
    },
  ],
  Category154: [
    {
      url: '/whats-my-browser-size',
      title: "What's My Browser Size?",
      description: 'View live viewport/window size and device pixel ratio.',
    },
  ],
  Category155: [
    {
      url: '/what-version-of-safari-do-i-have',
      title: 'What version of Safari do I have?',
      description:
        'Detect Safari version from user agent with manual steps to confirm.',
    },
  ],
  Category156: [
    {
      url: '/what-version-of-android-do-i-have',
      title: 'What version of Android do I have?',
      description:
        'Detect Android version from user agent and show Settings steps.',
    },
  ],
  Category157: [
    {
      url: '/what-version-of-flash-do-i-have',
      title: 'What version of Flash do I have?',
      description:
        'Detect Flash version from user agent with manual steps to confirm.',
    },
  ],
  Category158: [
    {
      url: '/what-is-my-isp',
      title: 'What is My ISP',
      description: 'Detect ISP from user agent with manual steps to confirm.',
    },
  ],
  Category159: [
    {
      url: '/am-i-using-tor',
      title: 'Am I Using Tor',
      description: 'Detect if you are using Tor with manual steps to confirm.',
    },
  ],
  Category160: [
    {
      url: '/html-tester',
      title: 'HTML Tester',
      description:
        'Test HTML code with real-time results and match highlighting.',
    },
  ],
  Category161: [
    {
      url: '/excel-compare',
      title: 'Excel Compare',
      description: 'Compare two Excel files and find the differences.',
    },
  ],
  Category162: [
    {
      url: '/javascript-escape',
      title: 'JavaScript Escape',
      description: 'Escape JavaScript.',
    },
  ],
  Category163: [
    {
      url: '/javascript-validator-linter',
      title: 'JavaScript Validator & Linter',
      description: 'Validate and lint JavaScript.',
    },
  ],
  Category164: [
    {
      url: '/xml-escape',
      title: 'XML Escape',
      description: 'Escape XML.',
    },
  ],
  Category165: [
    {
      url: '/css-validator',
      title: 'CSS Validator',
      description: 'Validate CSS.',
    },
  ],
  Category166: [
    {
      url: '/css-to-sass',
      title: 'CSS to SASS',
      description: 'Convert CSS to SASS.',
    },
  ],
  Category167: [
    {
      url: '/css-to-less',
      title: 'CSS to LESS',
      description: 'Convert CSS to LESS.',
    },
  ],
  Category168: [
    {
      url: '/crontab-generator',
      title: 'Crontab Generator',
      description: 'Generate Crontab.',
    },
  ],
  Category169: [
    {
      url: '/morse-code-translator',
      title: 'Morse Code Translator',
      description: 'Translate Morse Code.',
    },
  ],
  Category170: [
    {
      url: '/hex-to-ascii-converter',
      title: 'Hex to ASCII Converter',
      description: 'Convert Hex to ASCII.',
    },
  ],
  Category171: [
    {
      url: '/xml-to-json-converter',
      title: 'XML to JSON Converter',
      description: 'Convert XML to JSON.',
    },
  ],
  Category172: [
    {
      url: '/bcd-to-decimal-converter',
      title: 'BCD to Decimal Converter',
      description: 'Convert BCD to Decimal.',
    },
  ],
  Category173: [
    {
      url: '/html-to-bbcode',
      title: 'HTML to BBCode',
      description: 'Convert HTML to BBCode.',
    },
  ],
  Category174: [
    {
      url: '/sql-to-json',
      title: 'SQL to JSON',
      description: 'Convert SQL to JSON.',
    },
  ],
  Category175: [
    {
      url: '/html-to-jade',
      title: 'HTML To Jade',
      description: 'Convert HTML to Jade.',
    },
  ],
  Category176: [
    {
      url: '/curl-to-code-converter',
      title: 'cURL to Code Converter',
      description:
        'Convert cURL commands to JavaScript (Fetch/Axios), Python Requests, Go, or Node.js code instantly.',
    },
  ],
};

export const PATHS = {
  TEXT_UPPERCASE_CONVERTER: '/text-uppercase-converter',
  TEXT_LOWERCASE_CONVERTER: '/text-lowercase-converter',
  WORD_COUNT_TOOL: '/word-count-tool',
  CHARACTER_COUNT_TOOL: '/character-count-tool',
  LINE_COUNTER_TOOL: '/line-counter-tool',
  SENTENCE_COUNTER_TOOL: '/sentence-counter-tool',
  JAVASCRIPT_MINIFIER: '/javascript-minifier',
  JSON_MINIFIER: '/json-minifier',
  JSON_PRETTIFIER: '/json-prettifier',
  LOREM_IPSUM_GENERATOR: '/lorem-ipsum-generator',
  HTML_TO_MARKDOWN: '/html-to-markdown',
  MARKDOWN_TO_HTML: '/markdown-to-html',
  JS_OBFUSCATOR: '/js-obfuscator',
  CREDIT_CARD_GENERATOR: '/credit-card-generator',
  CREDIT_CARD_VALIDATOR: '/credit-card-validator',
  RANDOM_JSON_DATA_GENERATOR: '/json-generator',
  RANDOM_DECIMAL_NUMBER_GENERATOR: '/random-decimal-number-generator',
  RANDOM_DATE_GENERATOR: '/random-date-generator',
  RANDOM_CLOCK_TIME_GENERATOR: '/random-time-generator',
  RANDOM_COLOR_GENERATOR: '/random-color-generator',
  RANDOM_PARAGRAPH_GENERATOR: '/random-paragraph-generator',
  RANDOM_STRING_GENERATOR: '/random-string-generator',
  RANDOM_SENTENCE_GENERATOR: '/random-sentence-generator',
  RANDOM_PASSWORD_GENERATOR: '/random-password-generator',
  RANDOM_NUMBER_GENERATOR: '/random-number-generator',
  RANDOM_WORD_GENERATOR: '/random-word-generator',
  RANDOM_USERNAME_GENERATOR: '/random-username-generator',
  SORT_NUMBER: '/sort-number',
  SORT_WORD: '/sort-word',
  PHONE_NUMBER_EXTRACTOR: '/phone-number-extractor',
  REVERSE_TEXT_GENERATOR: '/reverse-text-generator',
  WORD_TO_NUMBER: '/word-to-number',
  REMOVE_SPACES: '/remove-spaces',
  TEXT_TO_ONE_LINE: '/text-to-one-line',
  ROUNDING_CALCULATOR: '/rounding-calculator',
  CSV_TO_TEXT_CONVERTER: '/csv-to-text-converter',
  TXT_TO_CSV_CONVERTER: '/txt-to-csv-converter',
  JSON_TO_TEXT: '/json-to-text',
  HTML_VALIDATOR: '/html-validator',
  JSON_VALIDATOR: '/json-validator',
  CODE_COMPARE_TOOL: '/code-compare-tool',
  WHAT_IS_MY_USER_AGENT: '/what-is-my-user-agent',

  ROTATION_CALCULATOR: '/rotation-calculator',
  ROT13_ENCODER_DECODER: '/rot13-encoder-decoder',
  CMYK_TO_HEX: '/cmyk-to-hex',
  HEX_TO_CMYK: '/hex-to-cmyk',
  HEX_TO_PANTONE: '/hex-to-pantone',
  RGB_TO_CMYK_CONVERTER: '/rgb-to-cmk-convertor',
  CMYK_TO_RGB_CONVERTER: '/cmyk-to-rgb-converter',
  CSS_TO_STYLUS: '/css-to-stylus',
  HTML_TO_JADE: '/html-to-jade',
  SQL_TO_JSON: '/sql-to-json',
  HTML_TO_BBCODE: '/html-to-bbcode',
  BCD_TO_DECIMAL_CONVERTER: '/bcd-to-decimal-converter',
  XML_TO_JSON_CONVERTER: '/xml-to-json-converter',
  DECIMAL_TO_ASCII_CONVERTER: '/decimal-to-ascii-converter',
  ASCII_TO_DECIMAL_CONVERTER: '/ascii-to-decimal-converter',
  UNICODE_TO_ASCII_CONVERTER: '/unicode-to-ascii-converter',
  ASCII_TO_UNICODE_CONVERTER: '/ascii-to-unicode-converter',
  HEX_TO_ASCII_CONVERTER: '/hex-to-ascii-converter',
  BCRYPT_GENERATOR: '/bcrypt-generator',
  BASE64_DECODER: '/base64-decoder',
  BASE64_ENCODER: '/base64-encoder',
  HOURS_TO_SECONDS: '/hours-to-seconds',
  PX_TO_REM_CONVERTER: '/px-to-rem-converter',
  REM_TO_PX_CONVERTER: '/rem-to-px-converter',
  RANDOM_CHARACTER_GENERATOR: '/random-character-generator',
  PLACEHOLDER_IMAGE_GENERATOR: '/placeholder-image-generator',
  COLOR_PICKER_TOOL: '/color-picker-tool',
  ROTATE_IMAGE_TOOL: '/rotate-image-tool',
  CSV_TO_EXCEL_FILE_CONVERTOR: '/csv-to-excel-file-convertor',
  RANDOM_XML_GENERATOR: '/random-xml-generator',
  SQL_TO_CSV_CONVERTER: '/sql-to-csv-converter',
  HTML_PRETTIFY: '/html-prettify',
  CSS_PRETTIFY: '/css-prettify',
  HTML_MINIFY: '/html-minify',
  CSS_MINIFY: '/css-minify',
  XML_MINIFY: '/xml-minify',
  XML_PRETTIFY: '/xml-prettify',
  SQL_MINIFY: '/sql-minify',
  HEX_TO_RGB_CONVERTER: '/hex-to-rgb-converter',
  RGB_TO_HEX_CONVERTER: '/rgb-to-hex-converter',
  GREY_CODE_TO_DECIMAL: '/grey-code-to-decimal',
  DECIMAL_TO_GREY_CODE: '/decimal-to-grey-code',
  YAML_FORMATTER_AND_BEAUTIFIER: '/yaml-formatter-and-beautifier',
  SQL_FORMATTER_AND_BEAUTIFIER: '/sql-formatter-and-beautifier',
  WHAT_IS_MY_BROWSER: '/what-is-my-browser',
  WHAT_VERSION_OF_WINDOWS_DO_I_HAVE: '/what-version-of-windows-do-i-have',
  WHAT_OPERATING_SYSTEM_DO_I_HAVE: '/what-operating-system-do-i-have',
  WHAT_VERSION_OF_CHROME_DO_I_HAVE: '/what-version-of-chrome-do-i-have',
  JSON_TO_TYPESCRIPT: '/json-to-typescript',
  RANDOM_CSV_GENERATOR: '/random-csv-generator',
  RANDOM_GUID_GENERATOR: '/random-guid-generator',
  RANDOM_TEXT_FROM_REGEX: '/random-text-from-regex',
  QR_CODE_GENERATOR: '/qr-code-generator',
  RANDOM_ADDRESS_GENERATOR: '/random-address-generator',
  HTML_CODE_GENERATOR: '/html-code-generator',
  HTML_VIEWER: '/html-viewer',
  COLOR_INVERTOR: '/color-inverter',
  STRING_DIFFERENCE_CHECKER: '/string-difference-checker',
  TEXT_REPEATER: '/text-repeater',
  SORTING_LIST: '/sorting-list',
  SHUFFLE_LETTERS: '/shuffle-letters',
  SHUFFLE_TEXT_LINES: '/shuffle-text-lines',
  RANDOM_IP_GENERATOR: '/random-ip-generator',
  JSON_COMPARE: '/json-compare',
  TEXT_COMPARE: '/text-compare',
  URL_DECODE: '/url-decode',
  URL_ENCODE: '/url-encode',
  TEXT_TO_HTML_ENTITIES_CONVERTOR: '/text-to-html-entities-convertor',
  HTML_ENTITIES_TO_TEXT_CONVERTER: '/html-entities-to-text-converter',
  CSV_TO_JSON: '/csv-to-json',
  CSS_TO_SCSS: '/css-to-scss',
  SCSS_TO_CSS: '/scss-to-css',
  MARKDOWN_FORMATTER: '/markdown-formatter',
  TYPE_SCRIPT_FORMATTER: '/typeScript-formatter',
  TEXT_TO_CSV: '/text-to-csv',
  INTERNET_SPEED_TEST: '/internet-speed-test',
  PHP_FORMATTER: '/php-formatter',
  PYTHON_FORMATTER: '/python-formatter',
  XML_COMPARE: '/xml-compare',
  IDN_ENCODE: '/idn-encode',
  IDN_DECODE: '/idn-decode',
  JSON_TO_XML_CONVERTER: '/json-to-xml-converter',
  JSON_TO_YAML_CONVERTER: '/json-to-yaml-converter',
  UTF8_DECODE: '/utf8-decode',
  UTF8_ENCODE: '/utf8-encode',
  XOR_CALCULATOR: '/xor-calculator',
  BINARY_TO_DECIMAL_CONVERTER: '/binary-to-decimal-converter',
  DECIMAL_TO_BINARY_CONVERTER: '/decimal-to-binary-converter',
  OCTAL_TO_DECIMAL_CONVERTER: '/octal-to-decimal-converter',
  DECIMAL_TO_OCTAL_CONVERTER: '/decimal-to-octal-converter',
  DECIMAL_TO_HEX: '/decimal-to-hex',
  HEX_TO_BINARY: '/hex-to-binary',
  OCTAL_TO_BINARY: '/octal-to-binary',
  MILES_TO_KILOMETERS: '/miles-to-kilometers',
  KILOMETERS_TO_MILES: '/kilometers-to-miles',
  JWT_DECODER: '/jwt-decoder',
  IP_TO_HEX: '/ip-to-hex',
  WORDS_TO_NUMBERS: '/words-to-numbers',
  NUMBERS_TO_WORDS: '/numbers-to-words',
  FABONACCI_CALCULATOR: '/fabonacci-calculator',
  BITWISE_CALCULATOR: '/bitwise-calculator',
  GRAPHQL_FORMATTER: '/graphql-formatter',
  CELCIUS_TO_FAHRENHEIT: '/celcius-to-fahrenheit',
  BARCODE_GENERATOR: '/barcode-generator',
  FIND_AND_REPLACE_STRING: '/find-and-replace-string',
  API_KEY_GENERATOR: '/api-key-generator',
  HTML_ESCAPE: '/html-escape',
  HTML_UNESCAPE: '/html-unescape',
  JAVASCRIPT_REGEX_TESTER: '/javascript-regex-tester',
  STRIP_HTML: '/strip-html',
  WHAT_IS_MY_LOCAL_IP_ADDRESS: '/what-is-my-local-ip-address',
  JAVASCRIPT_TESTER: '/javascript-tester',
  WHAT_VERSION_OF_JAVA: '/what-version-of-java-do-i-have',
  WHAT_VERSION_OF_MACOS: '/what-version-of-macos-do-i-have',
  WHAT_VERSION_OF_FIREFOX: '/what-version-of-firefox-do-i-have',
  WHAT_VERSION_OF_IOS: '/what-version-of-ios-do-i-have',
  WHATS_MY_BROWSER_SIZE: '/whats-my-browser-size',
  WHAT_VERSION_OF_SAFARI: '/what-version-of-safari-do-i-have',
  WHAT_VERSION_OF_ANDROID: '/what-version-of-android-do-i-have',
  WHAT_VERSION_OF_FLASH: '/what-version-of-flash-do-i-have',
  WHAT_IS_MY_ISP: '/what-is-my-isp',
  AM_I_USING_TOR: '/am-i-using-tor',
  HTML_TESTER: '/html-tester',
  EXCEL_COMPARE: '/excel-compare',
  JAVASCRIPT_ESCAPE: '/javascript-escape',
  JAVASCRIPT_VALIDATOR_LINTER: '/javascript-validator-linter',
  XML_ESCAPE: '/xml-escape',
  CSS_VALIDATOR: '/css-validator',
  CSS_TO_SASS: '/css-to-sass',
  CSS_TO_LESS: '/css-to-less',
  CRONTAB_GENERATOR: '/crontab-generator',
  MORSE_CODE_TRANSLATOR: '/morse-code-translator',
  CURL_TO_CODE_CONVERTER: '/curl-to-code-converter',
};

export const developmentToolsRoutes = [
  {
    path: PATHS.TEXT_UPPERCASE_CONVERTER,
    component: <UpperCaseConverterComponent />,
  },
  {
    path: PATHS.TEXT_LOWERCASE_CONVERTER,
    component: <LowerCaseConverterComponent />,
  },
  { path: PATHS.WORD_COUNT_TOOL, component: <WordCounterComponent /> },
  {
    path: PATHS.CHARACTER_COUNT_TOOL,
    component: <CharacterCounterComponent />,
  },
  { path: PATHS.LINE_COUNTER_TOOL, component: <LineCounterComponent /> },
  {
    path: PATHS.SENTENCE_COUNTER_TOOL,
    component: <SentenceCounterComponent />,
  },
  {
    path: PATHS.JAVASCRIPT_MINIFIER,
    component: <JavascriptMinifierComponent />,
  },
  {
    path: PATHS.JSON_MINIFIER,
    component: <JsonMinifierComponent />,
  },
  {
    path: PATHS.JSON_PRETTIFIER,
    component: <JsonPrettifierComponent />,
  },
  {
    path: PATHS.LOREM_IPSUM_GENERATOR,
    component: <LoremIpsumGeneratorComponent />,
  },
  {
    path: PATHS.HTML_TO_MARKDOWN,
    component: <HtmlToMarkDownComponent />,
  },
  {
    path: PATHS.MARKDOWN_TO_HTML,
    component: <MarkDownToHtmlComponent />,
  },
  {
    path: PATHS.JS_OBFUSCATOR,
    component: <JsObfuscatorComponent />,
  },
  {
    path: PATHS.CREDIT_CARD_GENERATOR,
    component: <CreditCardGeneratorComponent />,
  },
  {
    path: PATHS.CREDIT_CARD_VALIDATOR,
    component: <CreditCardValidatorComponent />,
  },
  {
    path: PATHS.RANDOM_JSON_DATA_GENERATOR,
    component: <RandomJsonDataGenerator />,
  },
  {
    path: PATHS.RANDOM_DECIMAL_NUMBER_GENERATOR,
    component: <RandomDecimalNumberGenerator />,
  },
  {
    path: PATHS.RANDOM_DATE_GENERATOR,
    component: <RandomDateGenerator />,
  },
  {
    path: PATHS.RANDOM_CLOCK_TIME_GENERATOR,
    component: <RandomClockTimeGenerator />,
  },
  {
    path: PATHS.RANDOM_COLOR_GENERATOR,
    component: <RandomColorGenerator />,
  },
  {
    path: PATHS.RANDOM_PARAGRAPH_GENERATOR,
    component: <RandomParagraphGenerator />,
  },
  {
    path: PATHS.RANDOM_STRING_GENERATOR,
    component: <RandomStringGenerator />,
  },
  {
    path: PATHS.RANDOM_SENTENCE_GENERATOR,
    component: <RandomSentanceGenerator />,
  },
  {
    path: PATHS.RANDOM_PASSWORD_GENERATOR,
    component: <RandomPasswardGenerator />,
  },
  {
    path: PATHS.RANDOM_NUMBER_GENERATOR,
    component: <RandomNumberGenerator />,
  },
  {
    path: PATHS.RANDOM_WORD_GENERATOR,
    component: <RandomWordGenerator />,
  },
  {
    path: PATHS.RANDOM_USERNAME_GENERATOR,
    component: <RandomUsernameGenerator />,
  },
  {
    path: PATHS.SORT_NUMBER,
    component: <SortNumbers />,
  },
  {
    path: PATHS.SORT_WORD,
    component: <SortWords />,
  },
  {
    path: PATHS.PHONE_NUMBER_EXTRACTOR,
    component: <PhoneNumberExtractor />,
  },
  {
    path: PATHS.REVERSE_TEXT_GENERATOR,
    component: <ReverseTextGenerator />,
  },
  {
    path: PATHS.WORD_TO_NUMBER,
    component: <WordsToNumbers />,
  },
  {
    path: PATHS.REMOVE_SPACES,
    component: <RemoveSpaces />,
  },
  {
    path: PATHS.TEXT_TO_ONE_LINE,
    component: <TextToOneLine />,
  },
  {
    path: PATHS.CSV_TO_TEXT_CONVERTER,
    component: <CsvToTextConverter />,
  },
  {
    path: PATHS.ROUNDING_CALCULATOR,
    component: <RoundingCalculator />,
  },
  {
    path: PATHS.TXT_TO_CSV_CONVERTER,
    component: <TxtToCsvConverter />,
  },
  {
    path: PATHS.JSON_TO_TEXT,
    component: <JsonToTxt />,
  },
  {
    path: PATHS.HTML_VALIDATOR,
    component: <HTMLValidator />,
  },
  {
    path: PATHS.JSON_VALIDATOR,
    component: <JsonValidator />,
  },
  {
    path: PATHS.CODE_COMPARE_TOOL,
    component: <CodeCompareTool />,
  },
  {
    path: PATHS.WHAT_IS_MY_USER_AGENT,
    component: <WhatIsMyUserAgent />,
  },

  {
    path: PATHS.ROTATION_CALCULATOR,
    component: <RotationCalculatorComponent />,
  },
  {
    path: PATHS.ROT13_ENCODER_DECODER,
    component: <Rot13EncoderDecoderComponent />,
  },
  {
    path: PATHS.CMYK_TO_HEX,
    component: <CmykToHexConverter />,
  },
  {
    path: PATHS.HEX_TO_CMYK,
    component: <HexToCmykConverter />,
  },
  {
    path: PATHS.HEX_TO_PANTONE,
    component: <HexToPantone />,
  },
  {
    path: PATHS.RGB_TO_CMYK_CONVERTER,
    component: <RgbToCmykConverter />,
  },
  {
    path: PATHS.CMYK_TO_RGB_CONVERTER,
    component: <CmykToRgbConverter />,
  },
  {
    path: PATHS.CSS_TO_STYLUS,
    component: <CssToStylus />,
  },
  {
    path: PATHS.UNICODE_TO_ASCII_CONVERTER,
    component: <UnicodeToAsciiConverter />,
  },
  {
    path: PATHS.ASCII_TO_UNICODE_CONVERTER,
    component: <AsciiToUnicodeConverter />,
  },
  {
    path: PATHS.DECIMAL_TO_ASCII_CONVERTER,
    component: <DecimalToAsciiConverter />,
  },
  {
    path: PATHS.ASCII_TO_DECIMAL_CONVERTER,
    component: <AsciiToDecimalConverter />,
  },
  {
    path: PATHS.BCRYPT_GENERATOR,
    component: <BcryptGenerator />,
  },
  {
    path: PATHS.HEX_TO_ASCII_CONVERTER,
    component: <HexToAscii />,
  },
  {
    path: PATHS.BASE64_DECODER,
    component: <Base64Decoder />,
  },
  {
    path: PATHS.BASE64_ENCODER,
    component: <Base64Encoder />,
  },
  {
    path: PATHS.HOURS_TO_SECONDS,
    component: <HoursToSecounds />,
  },
  {
    path: PATHS.PX_TO_REM_CONVERTER,
    component: <PxToRemConverter />,
  },
  {
    path: PATHS.REM_TO_PX_CONVERTER,
    component: <RemToPxConverter />,
  },
  {
    path: PATHS.RANDOM_CHARACTER_GENERATOR,
    component: <RandomCharacterGenerator />,
  },
  {
    path: PATHS.PLACEHOLDER_IMAGE_GENERATOR,
    component: <PlaceholderImageGenerator />,
  },
  {
    path: PATHS.COLOR_PICKER_TOOL,
    component: <ColorPickerTool />,
  },
  {
    path: PATHS.ROTATE_IMAGE_TOOL,
    component: <RotateImageTool />,
  },
  {
    path: PATHS.CSV_TO_EXCEL_FILE_CONVERTOR,
    component: <CsvToExcelFileConvertor />,
  },
  {
    path: PATHS.RANDOM_XML_GENERATOR,
    component: <RandomXMLGenerator />,
  },
  {
    path: PATHS.SQL_TO_CSV_CONVERTER,
    component: <SqlToCsvConverter />,
  },
  {
    path: PATHS.HTML_PRETTIFY,
    component: <HtmlPrettify />,
  },
  {
    path: PATHS.CSS_PRETTIFY,
    component: <CssPrettify />,
  },
  {
    path: PATHS.HTML_MINIFY,
    component: <HtmlMinify />,
  },
  {
    path: PATHS.CSS_MINIFY,
    component: <CssMinify />,
  },
  {
    path: PATHS.XML_MINIFY,
    component: <XmlMinify />,
  },
  {
    path: PATHS.XML_PRETTIFY,
    component: <XmlPrettify />,
  },
  {
    path: PATHS.SQL_MINIFY,
    component: <SqlMinify />,
  },
  {
    path: PATHS.HEX_TO_RGB_CONVERTER,
    component: <HexToRGBConverter />,
  },
  {
    path: PATHS.RGB_TO_HEX_CONVERTER,
    component: <RgbToHexConverter />,
  },
  {
    path: PATHS.GREY_CODE_TO_DECIMAL,
    component: <GreyCodeToDecimal />,
  },
  {
    path: PATHS.DECIMAL_TO_GREY_CODE,
    component: <DecimalToGrayCode />,
  },
  {
    path: PATHS.YAML_FORMATTER_AND_BEAUTIFIER,
    component: <YAMLFormatterAndBeautifier />,
  },
  {
    path: PATHS.SQL_FORMATTER_AND_BEAUTIFIER,
    component: <SqlFormatterAndBeautifier />,
  },
  {
    path: PATHS.WHAT_IS_MY_BROWSER,
    component: <WhatIsMyBrowser />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_WINDOWS_DO_I_HAVE,
    component: <WhatVersionOfWindowsDoIHave />,
  },
  {
    path: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
    component: <WhatOperatingSystemDoIHave />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_CHROME_DO_I_HAVE,
    component: <WhatVersionOfChromeDoIHave />,
  },

  {
    path: PATHS.JSON_TO_TYPESCRIPT,
    component: <JsonToTypeScript />,
  },
  {
    path: PATHS.RANDOM_CSV_GENERATOR,
    component: <RandomCSVGenerator />,
  },
  {
    path: PATHS.RANDOM_GUID_GENERATOR,
    component: <RandomGUIDGenerator />,
  },
  {
    path: PATHS.RANDOM_TEXT_FROM_REGEX,
    component: <RandomTextFromRegEX />,
  },
  {
    path: PATHS.QR_CODE_GENERATOR,
    component: <QRCodeGenerator />,
  },
  {
    path: PATHS.RANDOM_ADDRESS_GENERATOR,
    component: <RandomAddressGenerator />,
  },
  {
    path: PATHS.HTML_CODE_GENERATOR,
    component: <HtmlCodeGenerator />,
  },
  {
    path: PATHS.HTML_VIEWER,
    component: <HtmlViewer />,
  },
  {
    path: PATHS.COLOR_INVERTOR,
    component: <ColorInvertor />,
  },

  {
    path: PATHS.STRING_DIFFERENCE_CHECKER,
    component: <StringDiffrenceChecker />,
  },
  {
    path: PATHS.TEXT_REPEATER,
    component: <TextRepeater />,
  },
  {
    path: PATHS.SORTING_LIST,
    component: <SortingList />,
  },
  {
    path: PATHS.SHUFFLE_LETTERS,
    component: <ShuffleLetters />,
  },
  {
    path: PATHS.SHUFFLE_TEXT_LINES,
    component: <ShuffleTextLines />,
  },

  {
    path: PATHS.RANDOM_IP_GENERATOR,
    component: <RandomIPGenerator />,
  },
  {
    path: PATHS.JSON_COMPARE,
    component: <JSONCompare />,
  },
  {
    path: PATHS.TEXT_COMPARE,
    component: <TextCompare />,
  },
  {
    path: PATHS.URL_DECODE,
    component: <URLDecode />,
  },
  {
    path: PATHS.URL_ENCODE,
    component: <URLEncode />,
  },
  {
    path: PATHS.TEXT_TO_HTML_ENTITIES_CONVERTOR,
    component: <TextToHtmlEntitiesConvertor />,
  },
  {
    path: PATHS.HTML_ENTITIES_TO_TEXT_CONVERTER,
    component: <HtmlEntitiesToTextConverter />,
  },
  {
    path: PATHS.CSV_TO_JSON,
    component: <CSVToJSON />,
  },
  {
    path: PATHS.CSS_TO_SCSS,
    component: <CSSToSCSSConverter />,
  },
  {
    path: PATHS.SCSS_TO_CSS,
    component: <ScssToCssConverter />,
  },

  {
    path: PATHS.MARKDOWN_FORMATTER,
    component: <MarkdownFormatter />,
  },
  {
    path: PATHS.TYPE_SCRIPT_FORMATTER,
    component: <TypescriptFormatter />,
  },

  {
    path: PATHS.TEXT_TO_CSV,
    component: <TextToCsv />,
  },
  {
    path: PATHS.INTERNET_SPEED_TEST,
    component: <InternetSpeedTest />,
  },
  {
    path: PATHS.PHP_FORMATTER,
    component: <PHPFormatter />,
  },
  {
    path: PATHS.PYTHON_FORMATTER,
    component: <PythonFormatter />,
  },
  {
    path: PATHS.XML_COMPARE,
    component: <XmlCompare />,
  },
  {
    path: PATHS.IDN_ENCODE,
    component: <IdnEncode />,
  },
  {
    path: PATHS.IDN_DECODE,
    component: <IdnDecode />,
  },
  {
    path: PATHS.JSON_TO_XML_CONVERTER,
    component: <JsonToXmlConverter />,
  },
  {
    path: PATHS.JSON_TO_YAML_CONVERTER,
    component: <JsonToYamlConverter />,
  },
  {
    path: PATHS.UTF8_DECODE,
    component: <Utf8Decode />,
  },
  {
    path: PATHS.UTF8_ENCODE,
    component: <Utf8Encode />,
  },
  {
    path: PATHS.XOR_CALCULATOR,
    component: <XorCalculator />,
  },
  {
    path: PATHS.BINARY_TO_DECIMAL_CONVERTER,
    component: <BinaryToDecimalConverter />,
  },
  {
    path: PATHS.DECIMAL_TO_BINARY_CONVERTER,
    component: <DecimalToBinaryConverter />,
  },
  {
    path: PATHS.OCTAL_TO_DECIMAL_CONVERTER,
    component: <OctalToDecimalConverter />,
  },
  {
    path: PATHS.DECIMAL_TO_OCTAL_CONVERTER,
    component: <DecimalToOctalConverter />,
  },
  {
    path: PATHS.DECIMAL_TO_HEX,
    component: <DecimalToHexConverter />,
  },
  {
    path: PATHS.HEX_TO_BINARY,
    component: <HexToBinaryConverter />,
  },
  {
    path: PATHS.OCTAL_TO_BINARY,
    component: <OctalToBinaryConverter />,
  },
  {
    path: PATHS.MILES_TO_KILOMETERS,
    component: <MilesToKmConverter />,
  },
  {
    path: PATHS.KILOMETERS_TO_MILES,
    component: <KmToMilesConverter />,
  },
  {
    path: PATHS.JWT_DECODER,
    component: <JwtDecoder />,
  },
  {
    path: PATHS.IP_TO_HEX,
    component: <IpToHexConverter />,
  },
  {
    path: PATHS.WORDS_TO_NUMBERS,
    component: <WordsToNumbers />,
  },
  {
    path: PATHS.NUMBERS_TO_WORDS,
    component: <NumbersToWordsConverter />,
  },
  {
    path: PATHS.FABONACCI_CALCULATOR,
    component: <FibonacciCalculator />,
  },
  {
    path: PATHS.BITWISE_CALCULATOR,
    component: <BitwiseCalculator />,
  },
  {
    path: PATHS.GRAPHQL_FORMATTER,
    component: <GraphQLFormatter />,
  },
  {
    path: PATHS.CELCIUS_TO_FAHRENHEIT,
    component: <CelsiusFahrenheitConverter />,
  },
  {
    path: PATHS.BARCODE_GENERATOR,
    component: <BarcodeGenerator />,
  },
  {
    path: PATHS.FIND_AND_REPLACE_STRING,
    component: <FindAndReplaceString />,
  },
  {
    path: PATHS.API_KEY_GENERATOR,
    component: <ApiKeyGenerator />,
  },
  {
    path: PATHS.HTML_ESCAPE,
    component: <HtmlEscape />,
  },
  {
    path: PATHS.HTML_UNESCAPE,
    component: <HtmlUnescape />,
  },
  {
    path: PATHS.JAVASCRIPT_REGEX_TESTER,
    component: <JavascriptRegexTester />,
  },
  {
    path: PATHS.STRIP_HTML,
    component: <StripHTML />,
  },
  {
    path: PATHS.WHAT_IS_MY_LOCAL_IP_ADDRESS,
    component: <WhatIsMyLocalIPAddress />,
  },
  {
    path: PATHS.JAVASCRIPT_TESTER,
    component: <JavaScriptTester />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_JAVA,
    component: <WhatVersionOfJavaDoIHave />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_MACOS,
    component: <WhatVersionOfMacOSDoIHave />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_FIREFOX,
    component: <WhatVersionOfFirefoxDoIHave />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_IOS,
    component: <WhatVersionOfIOSDoIHave />,
  },
  {
    path: PATHS.WHATS_MY_BROWSER_SIZE,
    component: <WhatsMyBrowserSize />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_SAFARI,
    component: <WhatVersionOfSafariDoIHave />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_ANDROID,
    component: <WhatVersionOfAndroidDoIHave />,
  },
  {
    path: PATHS.WHAT_VERSION_OF_FLASH,
    component: <WhatVersionOfFlashDoIHave />,
  },
  {
    path: PATHS.WHAT_IS_MY_ISP,
    component: <WhatIsMyISP />,
  },
  {
    path: PATHS.AM_I_USING_TOR,
    component: <AmIUsingTor />,
  },
  {
    path: PATHS.HTML_TESTER,
    component: <HtmlTester />,
  },
  {
    path: PATHS.EXCEL_COMPARE,
    component: <ExcelCompare />,
  },
  {
    path: PATHS.JAVASCRIPT_ESCAPE,
    component: <JavaScriptEscape />,
  },
  {
    path: PATHS.JAVASCRIPT_VALIDATOR_LINTER,
    component: <JavaScriptValidatorLinter />,
  },
  {
    path: PATHS.XML_ESCAPE,
    component: <XMLEscape />,
  },
  {
    path: PATHS.CSS_VALIDATOR,
    component: <CssValidator />,
  },
  {
    path: PATHS.CSS_TO_SASS,
    component: <CssToSass />,
  },
  {
    path: PATHS.CSS_TO_LESS,
    component: <CssToLess />,
  },
  {
    path: PATHS.CRONTAB_GENERATOR,
    component: <CrontabGenerator />,
  },
  {
    path: PATHS.MORSE_CODE_TRANSLATOR,
    component: <MorseCodeTranslator />,
  },
  {
    path: PATHS.XML_TO_JSON_CONVERTER,
    component: <XmlToJsonConverter />,
  },
  {
    path: PATHS.BCD_TO_DECIMAL_CONVERTER,
    component: <BcdToDecimalConverter />,
  },
  {
    path: PATHS.HTML_TO_BBCODE,
    component: <HtmlToBBCode />,
  },
  {
    path: PATHS.SQL_TO_JSON,
    component: <SqlToJson />,
  },
  {
    path: PATHS.HTML_TO_JADE,
    component: <HtmlToJade />,
  },
  {
    path: PATHS.CURL_TO_CODE_CONVERTER,
    component: <CurlToCodeConverter />,
  },
];

// lorem ipsum text
export const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
