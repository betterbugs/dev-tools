import CharacterCounterComponent from '../components/developmentToolsComponent/characterCounterComponent';
import JavascriptMinifierComponent from '../components/developmentToolsComponent/javascriptMinifierComponent';
import LineCounterComponent from '../components/developmentToolsComponent/lineCounterComponent';
import LowerCaseConverterComponent from '../components/developmentToolsComponent/lowerCaseConverterComponent';
import SentenceCounterComponent from '../components/developmentToolsComponent/sentenceCounterComponent';
import UpperCaseConverterComponent from '../components/developmentToolsComponent/upperCaseConverterComponent';
import WordCounterComponent from '../components/developmentToolsComponent/wordCounterComponent';
import AsanaIcon from '../components/theme/Icon/asanaIcon';
import { AzureBoardIcon } from '../components/theme/Icon/azureBoardIcon';
import ClickupIcon from '../components/theme/Icon/clickupIcon';
import { FalseIcon } from '../components/theme/Icon/falseIcon';
import GithubIcon from '../components/theme/Icon/githubIcon';
import GreenCheckIcon from '../components/theme/Icon/greenCheckIcon';
import JiraIcon from '../components/theme/Icon/jiraIcon';
import LinearIcon from '../components/theme/Icon/linearIcon';
import MSTeamsIcon from '../components/theme/Icon/msTeamsIcon';
import PurpleCheckIcon from '../components/theme/Icon/purpleCheckIcon';
import RedCheckIcon from '../components/theme/Icon/redCheckIcon';
import { SentryIcon } from '../components/theme/Icon/sentryIcon';
import SlackIcon from '../components/theme/Icon/slackIcon';
import TrelloIcon from '../components/theme/Icon/trelloIcon';
import { TrueIcon } from '../components/theme/Icon/trueIcon';
import JsonMinifierComponent from '../components/developmentToolsComponent/jsonMinifierComponent';
import JsonPrettifierComponent from '../components/developmentToolsComponent/jsonPrittifierComponent';
import LoremIpsumGeneratorComponent from '../components/developmentToolsComponent/loremIpsumGeneratorComponent';
import HtmlToMarkDownComponent from '../components/developmentToolsComponent/htmlToMarkDownComponent';
import MarkDownToHtmlComponent from '../components/developmentToolsComponent/markDownToHTMLComponent';
import JsObfuscatorComponent from '../components/developmentToolsComponent/jsObfuscatorComponent';
import CreditCardGeneratorComponent from '../components/developmentToolsComponent/creditCardGeneratorComponent';
import CreditCardValidatorComponent from '../components/developmentToolsComponent/creditCardValidatorComponent';
import { detectBrowser } from './helpers';
import RandomClockTimeGenerator from '../components/developmentToolsComponent/randomClockTimeGenerator';
import RandomDateGenerator from '../components/developmentToolsComponent/randomDateGenerator';
import RandomDecimalNumberGenerator from '../components/developmentToolsComponent/randomDecimalNumberGenerator';
import RandomJsonDataGenerator from '../components/developmentToolsComponent/randomJsonDataGenerator';
import RandomColorGenerator from '../components/developmentToolsComponent/randomColorGenerator';
import RandomParagraphGenerator from '../components/developmentToolsComponent/randomParagraphGenerator';
import RandomStringGenerator from '../components/developmentToolsComponent/randomStringGenerator';
import RandomSentanceGenerator from '../components/developmentToolsComponent/randomSentanceGenerator';
import RandomPasswardGenerator from '../components/developmentToolsComponent/randomPasswardGenerator';
import RandomNumberGenerator from '../components/developmentToolsComponent/randomNumberGenerator';
import RandomWordGenerator from '../components/developmentToolsComponent/randomWordGenerator';
import RandomUsernameGenerator from '../components/developmentToolsComponent/randomUsernameGenerator';
import SortWords from '../components/developmentToolsComponent/sortWords';
import SortNumbers from '../components/developmentToolsComponent/sortNumbers';
import PhoneNumberExtractor from '../components/developmentToolsComponent/phoneNumberExtractor';
import ReverseTextGenerator from '../components/developmentToolsComponent/reverseTextGenerator';
import WordsToNumbers from '../components/developmentToolsComponent/wordsToNumbers';
import RemoveSpaces from '../components/developmentToolsComponent/removeSpaces';
import TextToOneLine from '../components/developmentToolsComponent/textToOneLine';
import RoundingCalculator from '../components/developmentToolsComponent/roundingCalculator';
import TxtToCsvConverter from '../components/developmentToolsComponent/txtToCsvConverter';
import CsvToTextConverter from '../components/developmentToolsComponent/csvToTextConverter';
import JsonToTxt from '../components/developmentToolsComponent/jsonToTxt';
import HTMLValidator from "../components/developmentToolsComponent/htmlValidator";
import JsonValidator from "../components/developmentToolsComponent/jsonValidator";
import CodeCompareTool from "../components/developmentToolsComponent/codeCompareTool";
import WhatIsMyUserAgent from "../components/developmentToolsComponent/whatIsMyUserAgent";

// import WordsToNumbers from '../components/developmentToolsComponent/wordsToNumbers';
// import RotationCalculatorComponent from "../components/developmentToolsComponent/rotationCalculatorComponent";
// import Rot13EncoderDecoderComponent from "../components/developmentToolsComponent/rot13EncoderDecoderComponent";
// import CmykToHexConverter from "../components/developmentToolsComponent/cmykToHexConverter";
// import HexToCmykConverter from "../components/developmentToolsComponent/hexToCmykConverter";
// import HexToPantone from "../components/developmentToolsComponent/hexToPantone";
// import RgbToCmykConverter from "../components/developmentToolsComponent/rgbToCmykConverter";
// import CmykToRgbConverter from "../components/developmentToolsComponent/cmykToRgbConverter";
// import CssToStylus from "../components/developmentToolsComponent/cssToStylus";
// import Base64Decoder from "../components/developmentToolsComponent/base64Decoder";
// import Base64Encoder from "../components/developmentToolsComponent/base64Encoder";
// import HoursToSecounds from "../components/developmentToolsComponent/hoursToSecounds";
// import PxToRemConverter from "../components/developmentToolsComponent/pxToRemConverter";
// import RemToPxConverter from "../components/developmentToolsComponent/remToPxConverter";
// import DecimalToAsciiConverter from "../components/developmentToolsComponent/decimalToAsciiConverter";
// import AsciiToDecimalConverter from "../components/developmentToolsComponent/asciiToDecimalConverter";
// import RandomCharacterGenerator from "../components/developmentToolsComponent/randomCharacterGenerator";
// import PlaceholderImageGenerator from "../components/developmentToolsComponent/placeholderImageGenerator";
// import ColorPickerTool from "../components/developmentToolsComponent/colorPickerTool";
// import RotateImageTool from "../components/developmentToolsComponent/rotateImageTool";
// import CsvToExcelFileConvertor from "../components/developmentToolsComponent/csvToExcelFileConvertor";
// import RandomXMLGenerator from "../components/developmentToolsComponent/randomXMLGenerator";
// import SqlToCsvConverter from "../components/developmentToolsComponent/sqlToCsvConverter";
// import HtmlPrettify from "../components/developmentToolsComponent/htmlPrettify";
// import HtmlMinify from "../components/developmentToolsComponent/htmlMinify";
// import CssMinify from "../components/developmentToolsComponent/cssMinify";
// import InternetSpeedTest from "../components/developmentToolsComponent/internetSpeedTest";
// import XmlMinify from "../components/developmentToolsComponent/xmlMinify";
// import XmlPrettify from "../components/developmentToolsComponent/xmlPrettify";
// import SqlMinify from "../components/developmentToolsComponent/sqlMinify";
// import HexToRGBConverter from "../components/developmentToolsComponent/hexToRGBConverter";
// import RgbToHexConverter from "../components/developmentToolsComponent/rgbToHexConverter";
// import DecimalToGrayCode from "../components/developmentToolsComponent/decimalToGrayCode";
// import YAMLFormatterAndBeautifier from "../components/developmentToolsComponent/yamlFormatterAndBeautifier";
// import SqlFormatterAndBeautifier from "../components/developmentToolsComponent/sqlFormatterAndBeautifier";
// import WhatIsMyBrowser from "../components/developmentToolsComponent/whatIsMyBrowser";
// import WhatVersionOfWindowsDoIHave from "../components/developmentToolsComponent/whatVersionOfWindowsDoIHave";
// import WhatOperatingSystemDoIHave from "../components/developmentToolsComponent/whatOperatingSystemDoIHave";
// import WhatVersionOfChromeDoIHave from "../components/developmentToolsComponent/whatVersionOfChromeDoIHave";
// import JsonToTypeScript from "../components/developmentToolsComponent/jsonToTypeScript";
// import RandomCSVGenerator from "../components/developmentToolsComponent/randomCSVGenerator";
// import RandomGUIDGenerator from "../components/developmentToolsComponent/randomGUIDGenerator";
// import RandomTextFromRegEX from "../components/developmentToolsComponent/randomTextFromRegEX";
// import QRCodeGenerator from "../components/developmentToolsComponent/qrCodeGenerator";
// import RandomAddressGenerator from "../components/developmentToolsComponent/randomAddressGenerator";
// import HtmlCodeGenerator from "../components/developmentToolsComponent/htmlCodeGenerator";
// import HtmlViewer from "../components/developmentToolsComponent/htmlViewer";
// import ColorInvertor from "../components/developmentToolsComponent/colorInvertor";
// import StringDiffrenceChecker from "../components/developmentToolsComponent/stringDiffrenceChecker";
// import TextRepeater from "../components/developmentToolsComponent/textRepeater";
// import SortingList from "../components/developmentToolsComponent/sortingList";
// import UnicodeToAsciiConverter from "../components/developmentToolsComponent/unicodeToAsciiConverter";
// import AsciiToUnicodeConverter from "../components/developmentToolsComponent/asciiToUnicodeConverter";
// import ShuffleLetters from "../components/developmentToolsComponent/shuffleLetters";
// import ShuffleTextLines from "../components/developmentToolsComponent/shuffleTextLines";
// import RandomIPGenerator from "../components/developmentToolsComponent/randomIPGenerator";
// import JSONCompare from "../components/developmentToolsComponent/jsonCompare";
// import TextCompare from "../components/developmentToolsComponent/textCompare";
// import URLDecode from "../components/developmentToolsComponent/urlDecode";
// import URLEncode from "../components/developmentToolsComponent/urlEncode";
// import TextToHtmlEntitiesConvertor from "../components/developmentToolsComponent/textToHtmlEntitiesConvertor";
// import HtmlEntitiesToTextConverter from "../components/developmentToolsComponent/htmlEntitiesToTextConverter";
// import CSVToJSON from "../components/developmentToolsComponent/csvToJson";
// import CSSToSCSSConverter from "../components/developmentToolsComponent/cssToScssConverter";
// import ScssToCssConverter from "../components/developmentToolsComponent/scssToCssConverter";
// import MarkdownFormatter from "../components/developmentToolsComponent/markdownFormatter";
// import TypescriptFormatter from "../components/developmentToolsComponent/typescriptFormatter";
// import TextToCsv from "../components/developmentToolsComponent/textToCsv";
// import CssPrettify from "../components/developmentToolsComponent/cssPrettify";
// import PHPFormatter from "../components/developmentToolsComponent/phpFormatter";
// import PythonFormatter from "../components/developmentToolsComponent/pythonFormatter";
// import XmlCompare from "../components/developmentToolsComponent/xmlCompare";
// import IdnEncode from "../components/developmentToolsComponent/idnEncode";
// import IdnDecode from "../components/developmentToolsComponent/idnDecode";
// import GreyCodeToDecimal from "../components/developmentToolsComponent/greyCodeToDesimal";
// import JsonToXmlConverter from "../components/developmentToolsComponent/jsonToXmlConverter";
// import JsonToYamlConverter from "../components/developmentToolsComponent/jsonToYamlConverter";
// import XmlToJsonConverter from "../components/developmentToolsComponent/xmlToJsonConverter";
// import Utf8Decode from "../components/developmentToolsComponent/utf8Decode";
// import Utf8Encode from "../components/developmentToolsComponent/utf8Encode";
// import XorCalculator from "../components/developmentToolsComponent/xorCalculator";
// import BinaryToDecimalConverter from "../components/developmentToolsComponent/binaryToDecimalConverter";
// import DecimalToBinaryConverter from "../components/developmentToolsComponent/decimalToBinaryConverter";
// import OctalToDecimalConverter from "../components/developmentToolsComponent/octalToDecimalConverter";
// import DecimalToOctalConverter from "../components/developmentToolsComponent/decimalToOctalConverter";
// import DecimalToHexConverter from "../components/developmentToolsComponent/decimalToHexConverter";
// import HexToBinaryConverter from "../components/developmentToolsComponent/hexToBinaryConverter";
// import OctalToBinaryConverter from "../components/developmentToolsComponent/octalToBinaryConverter";
// import MilesToKmConverter from "../components/developmentToolsComponent/milesToKmConverter";
// import KmToMilesConverter from "../components/developmentToolsComponent/kmToMilesConverter";
// import JwtDecoder from "../components/developmentToolsComponent/jwtDecoder";
// import IpToHexConverter from "../components/developmentToolsComponent/ipToHexConverter";
// import NumbersToWordsConverter from "../components/developmentToolsComponent/numbersToWordsConverter";
// import FibonacciCalculator from "../components/developmentToolsComponent/fibonacciCalculator";
// import BitwiseCalculator from "../components/developmentToolsComponent/bitwiseCalculator";
// import GraphQLFormatter from "../components/developmentToolsComponent/graphqlFormatter";
// import JavascriptRegexTester from "../components/developmentToolsComponent/javascriptRegexTester";
// import StripHTML from "../components/developmentToolsComponent/stripHTML";
// import WhatIsMyLocalIPAddress from "../components/developmentToolsComponent/whatIsMyLocalIPAddress";
// import JavaScriptTester from "../components/developmentToolsComponent/javascriptTester";
// import WhatVersionOfJavaDoIHave from "../components/developmentToolsComponent/whatVersionOfJavaDoIHave";
// import WhatVersionOfMacOSDoIHave from "../components/developmentToolsComponent/whatVersionOfMacOSDoIHave";
// import WhatVersionOfFirefoxDoIHave from "../components/developmentToolsComponent/whatVersionOfFirefoxDoIHave";
// import WhatVersionOfIOSDoIHave from "../components/developmentToolsComponent/whatVersionOfIOSDoIHave";
// import WhatsMyBrowserSize from "../components/developmentToolsComponent/whatsMyBrowserSize";
// import WhatVersionOfSafariDoIHave from "../components/developmentToolsComponent/whatVersionOfSafariDoIHave";
// import WhatVersionOfAndroidDoIHave from "../components/developmentToolsComponent/whatVersionOfAndroidDoIHave";
// import WhatVersionOfFlashDoIHave from "../components/developmentToolsComponent/whatVersionOfFlashDoIHave";
// import WhatIsMyISP from "../components/developmentToolsComponent/whatIsMyISP";
// import AmIUsingTor from "../components/developmentToolsComponent/amIUsingTor";
// import HtmlTester from "../components/developmentToolsComponent/htmlTester";
// import CelsiusFahrenheitConverter from "../components/developmentToolsComponent/celsiusFahrenheitConverter";
// import BarcodeGenerator from "../components/developmentToolsComponent/barcodeGenerator";
// import FindAndReplaceString from "../components/developmentToolsComponent/findAndReplaceString";
// import ApiKeyGenerator from "../components/developmentToolsComponent/apiKeyGenerator";
// import HtmlEscape from "../components/developmentToolsComponent/htmlEscape";
// import HtmlUnescape from "../components/developmentToolsComponent/htmlUnescape";
// import ExcelCompare from "../components/developmentToolsComponent/excelCompare";
// import JavaScriptEscape from "../components/developmentToolsComponent/javascriptEscape";
// import JavaScriptValidatorLinter from "../components/developmentToolsComponent/javascriptValidatorLinter";
// import XMLEscape from "../components/developmentToolsComponent/xmlEscape";
// import CssValidator from "../components/developmentToolsComponent/cssValidator";
// import CssToSass from "../components/developmentToolsComponent/cssToSass";
// import CssToLess from "../components/developmentToolsComponent/cssToLess";
// import CrontabGenerator from "../components/developmentToolsComponent/crontabGenerator";
// import MorseCodeTranslator from "../components/developmentToolsComponent/morseCodeTranslator";
// import HtmlToJade from "../components/developmentToolsComponent/htmlToJade";
// import BcdToDecimalConverter from "../components/developmentToolsComponent/bcdToDecimalConverter";
// import BcryptGenerator from "../components/developmentToolsComponent/bcryptGenerator";
// import HexToAscii from "../components/developmentToolsComponent/hexToAscii";
// import HtmlToBBCode from "../components/developmentToolsComponent/htmlToBBCode";
// import SqlToJson from "../components/developmentToolsComponent/sqlToJson";

export const WEB_URL = 'https://www.betterbugs.io';

// Default to Chrome URL during SSR/build, will be correctly determined on client side
export const Extension_URL =
  typeof window !== 'undefined' && detectBrowser() === 'edge'
    ? 'https://microsoftedge.microsoft.com/addons/detail/betterbugs-a-fresh-appro/cbojiblepdmdpjngajmompgkadipidfb'
    : 'https://chrome.google.com/webstore/detail/betterbugs-a-fresh-approa/mdljmlgokccncglfobogbfjgcijldnaj';

export const Calendly_URL =
  'https://calendly.com/nishil-betterbugs/30min?back=1&month=2024-06';

export const SEO_META = {
  home: {
    title: 'BetterBugs | Precise bug reports with one click.',
    description:
      ' Capture screenshots, record screens, or Rewind the last 2 minutes, anytime, for context-rich bug reports. Get auto-attached developer logs and debug with AI.',
    ogTitle: 'BetterBugs | Precise bug reports with one click.',
    ogDescription:
      ' Capture screenshots, record screens, or Rewind the last 2 minutes, anytime, for context-rich bug reports. Get auto-attached developer logs and debug with AI.',
    ogImage: '/images/og-images/Cover.png',
  },
  aiAssistant: {
    title: ' BetterBugs AI Assistant | Experience AI-Infused Debugging ',
    description:
      'Supercharge your debugging workflows with the BetterBugs AI assistant. Get your software issues analyzed in seconds for blazing-fast bug management sessions.',
    ogTitle: 'BetterBugs AI Assistant | Experience AI-Infused Debugging',
    ogDescription:
      'Supercharge your debugging workflows with the BetterBugs AI assistant. Get your software issues analyzed in seconds for blazing-fast bug management sessions.',
    ogImage: '/images/og-images/Cover.png',
  },
  features: {
    title: 'BetterBugs | Features ',
    description:
      'Check out the top features of BetterBugs. From visual bug reports to AI powered debugging, BetterBugs lets you create technically sound bug reports for devs.',
    ogTitle: 'BetterBugs | Features',
    ogDescription:
      'Check out the top features of BetterBugs. From visual bug reports to AI powered debugging, BetterBugs lets you create technically sound bug reports for devs.',
    ogImage: '/images/og-images/Cover.png',
  },
  use_cases: {
    title: 'BetterBugs | Use Cases',
    description:
      "BetterBugs is designed for you, no matter your software role. Whether you're a QA engineer, developer, project manager, support team member, or a founder.",
    ogTitle: 'BetterBugs | Use Cases',
    ogDescription:
      "BetterBugs is designed for you, no matter your software role. Whether you're a QA engineer, developer, project manager, support team member, or a founder.",
    ogImage: '/images/og-images/Cover.png',
  },
  blog: {
    title: 'BetterBugs | Blog',
    description:
      "Read blogs and articles to get tech insights from the BetterBugs team. Learn what's new with how-to guides, debugging tips, and popular technologies in software.",
    ogTitle: 'BetterBugs | Blog',
    ogDescription:
      "Read blogs and articles to get tech insights from the BetterBugs team. Learn what's new with how-to guides, debugging tips, and popular technologies in software.",
    ogImage: '/images/og-images/Cover.png',
  },
  blogDetails: {
    title: 'BetterBugs | Blog',
    description:
      "Read blogs and articles to get tech insights from the BetterBugs team. Learn what's new with how-to guides, debugging tips, and popular technologies in software.",
    ogTitle: 'BetterBugs | Blog',
    ogDescription:
      "Read blogs and articles to get tech insights from the BetterBugs team. Learn what's new with how-to guides, debugging tips, and popular technologies in software.",
    ogImage: '/images/og-images/Cover.png',
  },
  termsOfService: {
    title: 'Terms of Service- Bug Reporting Tool | BetterBugs ',
    description:
      'Our Terms of Service make it easy to report bugs. It covers everything you need to know, including terms for service and privacy protection.',
    ogTitle: 'Terms of Service | BetterBugs',
    ogDescription:
      'BetterBugs Terms of Service for efficient bug reporting, collaboration, and faster debugging.',
    ogImage: '/images/og-images/Cover.png',
  },
  privacyPolicy: {
    title: 'Privacy Policy- Bug Reporting Tool | BetterBugs ',
    description:
      'Find out how Betterbugs handles your information. Know why we collect data, how we keep it safe, and how to give your consent. Contact us if you have questions.',
    ogTitle: 'Privacy Policy | BetterBugs',
    ogDescription:
      'Our Privacy Policy makes sure that your information is handled with great care and transparency.',
    ogImage: '/images/og-images/Cover.png',
  },
  refundAndCancellation: {
    title: 'BetterBugs | Cancellations & Refunds ',
    description:
      'Get details on the cancellation and refund policy for BetterBugs subscriptions. Learn about the guidelines followed for processing your cancellation requests.',
    ogTitle: 'BetterBugs | Cancellations & Refunds',
    ogDescription:
      'Get details on the cancellation and refund policy for BetterBugs subscriptions. Learn about the guidelines followed for processing your cancellation requests.',
    ogImage: '/images/og-images/Cover.png',
  },
  comparesions: {
    title: ' BetterBugs.io vs BugHerd | Comparison',
    description:
      'Check how BetterBugs.io compares with BugHerd for bug tracking and bug management activities. Learn more about BetterBugs.io offerings.',
    ogTitle: ' BetterBugs.io vs BugHerd | Comparison',
    ogDescription: 'BetterBugs.io vs BugHerd | Comparison',
    ogImage: '/images/og-images/Cover.png',
  },
  customerSupport: {
    title: 'BetterBugs for Customer Support',
    description:
      'Remove guesswork and resolve tickets without back-and-forth. Get complete details of customer issues instantly using BetterBugs.io for customer support. ',
    ogTitle: 'BetterBugs for Customer Support',
    ogDescription:
      'BetterBugs for customer support enables you to get user feedback that bundles screen recording and technical details of user issues for quicker resolutions.',
    ogImage: '/images/og-images/Cover.png',
  },
  welcome: {
    title: 'BetterBugs Welcome Page | BetterBugs',
    description: 'Better Bugs',
    ogTitle: 'BetterBugs Welcome Page | BetterBugs',
    ogDescription: 'BetterBugs',
    ogImage: '/images/og-images/welcome-page.png',
  },
  nestify: {
    title: 'BetterBugs nestify | BetterBugs',
    description: 'Better Bugs',
    ogTitle: 'BetterBugs nestify | BetterBugs',
    ogDescription: 'BetterBugs',
  },
  not_Found: {
    title: '404 Not Found',
    description: '404 Not Found',
    ogImage: '/images/og-images/error-page.png',
  },
  feedback: {
    title: 'BetterBugs feedback | BetterBugs',
    description: 'Better Bugs',
    ogTitle: 'BetterBugs feedback | BetterBugs',
    ogDescription: 'BetterBugs',
    ogImage: '/images/og-images/Cover.png',
  },
  glossary: {
    title: 'glossary | BetterBugs ',
    description: 'glossary',
    ogTitle: 'glossary | BetterBugs',
    ogDescription: 'glossary',
    ogImage: '/images/og-images/Cover.png',
  },
  glossaryDetails: {
    title: 'glossary details page | BetterBugs ',
    description: 'glossary',
    ogTitle: 'glossary details page | BetterBugs',
    ogDescription: 'glossary',
    ogImage: '/images/og-images/Cover.png',
  },
  whatsNew: {
    title: 'whatsNew page | BetterBugs ',
    description: 'whatsNew',
    ogTitle: 'whatsNew page | BetterBugs',
    ogDescription: 'whatsNew',
    ogImage: '/images/og-images/Cover.png',
  },
  pricing: {
    title: 'BetterBugs | Pricing',
    description:
      'Choose a pricing plan that suits your need to build bug-free software. BetterBugs offers three plans: Free, Pro, and Enterprise. See what fits your bill.',
    ogTitle: 'BetterBugs | Pricing',
    ogDescription:
      'Choose a pricing plan that suits your need to build bug-free software. BetterBugs offers three plans: Free, Pro, and Enterprise. See what fits your bill.',
    ogImage: '/images/og-images/Cover.png',
  },
  developmentTools: {
    title: 'Developer Utility Tools - BetterBugs.io',
    description:
      'A suite of free utility tools for developers, QA, support teams, and those working with software. Simplify your everyday tasks with the dev utility tools available completely free on the BetterBugs.io website.',
    ogTitle: 'Developer Utility Tools - BetterBugs.io',
    ogDescription:
      'Checkout the free developer utility tools to simplify your everyday development, QA, and other software-related tasks.',
    ogImage: '/images/og-images/Cover.png',
  },

  story: {
    title: 'Our Story: Crafted for a Tester by a Tester',
    description:
      'The Story Behind BetterBugs: for a Tester by a Tester, bug reporting for faster, simpler, and more effective software improvement—one bug at a time. Join us!',
    ogTitle: 'The Story Behind BetterBugs',
    ogDescription:
      'The story behind BetterBugs, a tool designed for a Tester by a Tester.',
    ogImage: '/images/og-images/Cover.png',
  },
};

//price data
export const priceData = {
  monthly: [
    {
      key: 0,
      title: 'Free',
      subTitle: 'Free forever!',
      tag: [
        { tagName: 'Essential features for small teams' },
        { tagName: 'No credit card required' },
        { tagName: 'Unlimited sessions & projects' },
        { tagName: 'Device information' },
        { tagName: 'Developer logs' },
        { tagName: 'App storage data' },
        { tagName: 'Integrate all project tools' },
        { tagName: 'AI repro steps (upto 15 times)' },
        { tagName: '2-year data retention policy' },
        { tagName: 'Upto 3 users' },
        { tagName: 'Upto 50 Recording Links / month' },
      ],
      btn: 'Get started for free',
      url: 'https://app.betterbugs.io/login',
    },
    {
      key: 1,
      title: 'Team',
      subTitle: '$10/month/user',
      tag: [
        { tagName: 'Better fit for growing teams' },
        { tagName: 'Everything in Free, plus' },
        { tagName: 'Video annotations and blurring' },
        { tagName: 'AI repro steps' },
        { tagName: 'Unlimited integrations with PM tools' },
        { tagName: 'AI Debugger' },
        { tagName: 'Jira 2-way sync' },
        { tagName: 'Support for Sentry integration' },
        { tagName: 'Integrate using Webhook' },
        { tagName: 'Automation with project tools' },
        { tagName: 'Private projects and sessions' },
        { tagName: 'Unlimited guest users' },
        { tagName: 'Upto 100 Recording Links / month' },
      ],
      btn: 'Subscribe now',
      url: 'https://app.betterbugs.io/login',
    },
    {
      key: 2,
      title: 'Enterprise',
      subTitle: 'Custom Pricing',
      tag: [
        { tagName: 'Custom workflows and premium support' },
        { tagName: 'Everything in Team, plus' },
        { tagName: 'Unlimited AI repro steps' },
        { tagName: 'SAML SSO' },
        { tagName: 'Workspace analytics' },
        { tagName: 'Custom data retention policy' },
        { tagName: 'On-premise data storage' },
        { tagName: 'Priority support' },
        { tagName: 'Audit Trail' },
        { tagName: 'Unlimited recording links' },
      ],
      btn: 'Schedule a call with Founder',
      url: 'https://calendly.com/nishil-betterbugs/30min?back=1&month=2024-06',
    },
  ],
  yearly: [
    {
      key: 0,
      title: 'Free',
      subTitle: 'Free forever!',
      tag: [
        { tagName: 'Essential features for small teams' },
        { tagName: 'No credit card required' },
        { tagName: 'Unlimited sessions & projects' },
        { tagName: 'Device information' },
        { tagName: 'Developer logs' },
        { tagName: 'App storage data' },
        { tagName: 'Integrate all project tools' },
        { tagName: 'AI repro steps (upto 15 times)' },
        { tagName: '2-year data retention policy' },
        { tagName: 'Upto 3 users' },
        { tagName: 'Upto 50 Recording Links / month' },
      ],
      btn: 'Get started for free',
      url: 'https://app.betterbugs.io/login',
    },
    {
      key: 1,
      title: 'Team',
      subTitle: '$8/month/user',
      tag: [
        { tagName: 'Better fit for growing teams' },
        { tagName: 'Everything in Free, plus' },
        { tagName: 'Video annotations and blurring' },
        { tagName: 'AI repro steps' },
        { tagName: 'Unlimited integrations with PM tools' },
        { tagName: 'AI Debugger' },
        { tagName: 'Jira 2-way sync' },
        { tagName: 'Support for Sentry integration' },
        { tagName: 'Integrate using Webhook' },
        { tagName: 'Automation with project tools' },
        { tagName: 'Private projects and sessions' },
        { tagName: 'Unlimited guest users' },
        { tagName: 'Upto 100 Recording Links / month' },
      ],
      btn: 'Subscribe now',
      url: 'https://app.betterbugs.io/login',
    },
    {
      key: 2,
      title: 'Enterprise',
      subTitle: 'Custom Pricing',
      tag: [
        { tagName: 'Custom workflows and premium support' },
        { tagName: 'Everything in Team, plus' },
        { tagName: 'Unlimited AI repro steps' },
        { tagName: 'SAML SSO' },
        { tagName: 'Workspace analytics' },
        { tagName: 'Custom data retention policy' },
        { tagName: 'On-premise data storage' },
        { tagName: 'Priority support' },
        { tagName: 'Audit Trail' },
        { tagName: 'Unlimited recording links' },
      ],
      btn: 'Schedule a call with Founder',
      url: 'https://calendly.com/nishil-betterbugs/30min?back=1&month=2024-06',
    },
  ],
};

export const FeaturesList = [
  {
    feature: 'Capture',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Screenshot',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Screen Record',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Rewind Sessions (upto 2 minutes)',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Recording Links',
    free: '50/month',
    team: '100/month',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Webcam and Mic Support',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Unlimited Sessions',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Unlimited Projects',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Screenshot Annotations',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Video Annotations',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Video Blurring',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Technical Information',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Device Information',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Console Logs (errors, logs, warnings, network errors)',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Network Requests',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Page Navigation Steps',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Custom Metadata',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Cookies',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Session Storage Data',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Local Storage Data',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'AI Debugger',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'AI Repro Steps for Sessions',
    free: 'Upto 15 times',
    team: 'Upto 350 times',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Privacy Settings for Data Capture',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Include Attachments for Sessions',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Integrations',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Asana',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Azure Boards',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'ClickUp',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Jira',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Linear',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Trello',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'GitHub',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'MS Teams',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Slack',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Sentry',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Webhook',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Integration Attempts',
    free: 'Limited',
    team: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Two-Way Sync: For Status and Comments',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Jira',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature:
      'Auto-attached Session Links for Performance Monitoring and Analytics Tools',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'LogRocket',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Fullstory',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Automation with Integrated Tools',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Workspace Level Automation',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Project Level Automation',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Team Collaboration Features',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Include Additional Team Members',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Private Sessions',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Private Projects',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Team Access Control for Changing Roles',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'SAML SSO',
    free: '❌',
    team: '❌',
    enterprise: '✔',
  },
  {
    feature: 'Workspace Analytics',
    free: '❌',
    team: '❌',
    enterprise: '✔',
  },
  {
    feature: 'Custom Data Retention Policy',
    free: '❌',
    team: '❌',
    enterprise: '✔',
  },
  {
    feature: 'On-Premise Data Storage',
    free: '❌',
    team: '❌',
    enterprise: '✔',
  },
  {
    feature: 'Priority Support',
    free: '❌',
    team: '❌',
    enterprise: '✔',
  },
  {
    feature: 'Session Management',
    free: '',
    team: '',
    enterprise: '',
    isHeading: true,
  },
  {
    feature: 'Custom Tags for Sessions',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Status Management',
    free: '✔',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Web SDK',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Mobile SDK',
    free: '❌',
    team: '✔',
    enterprise: '✔',
  },
  {
    feature: 'Audit Trail',
    free: '❌',
    team: '❌',
    enterprise: '✔',
  },
];

export const comparisonTableData = {
  headers: ['Features', 'BetterBugs.io', 'BugHerd'],
  rows: [
    {
      feature: 'For',
      betterBugs: { text: '', status: 'green' },
      bugHerd: {
        status: '',
        tagText: [
          { status: 'purple', tag: 'Web Dev Agencies' },
          { status: 'purple', tag: 'Marketing Agencies' },
          { status: 'purple', tag: 'In-house Teams' },
        ],
      },
    },
    {
      feature: 'End-to-End Bug Report',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Both frontend and backend bug state capture in one bundled bug report',
        status: '',
      },
      bugHerd: {
        icon: <PurpleCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Only frontend bug state capture; integrates with LogRocket for console logs',
        status: '',
      },
    },
    {
      feature: 'Time to Value (TTV)',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Instantly ready to use without any setup',
        status: '',
      },
      bugHerd: {
        icon: <PurpleCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Requires manual project setup or adding a JavaScript snippet to the website',
        status: '',
      },
    },
    {
      feature: 'Screen Capture Options',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Flexible: cropped, visible screen, and full-page captures',
        status: '',
      },
      bugHerd: {
        icon: <PurpleCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Only supports visible screen captures',
        status: '',
      },
    },
    {
      feature: 'Screen Recording',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Supports screen recording with microphone and webcam',
        status: '',
      },
      bugHerd: {
        icon: <PurpleCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Supports screen recording with microphone',
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No webcam support',
      },
    },
    {
      feature: 'Rewind Capture (2-min)',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Automatically rewinds  and captures the last two minutes of your session',
      },
      bugHerd: {
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'Feature not available',
      },
    },
    {
      feature: 'Delayed Screenshot',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Capture screenshot with 3- or 6-second delay',
        status: '',
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No delayed screenshot feature',
      },
    },
    {
      feature: 'Incognito Mode Support',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Capture bugs in incognito mode inside Chrome',
        status: '',
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'Feature not available',
      },
    },
    {
      feature: 'Video Annotations',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Allows direct video annotations to highlight and explain issues',
        status: '',
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No video annotation capabilities',
      },
    },
    {
      feature: 'Environment Capture',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Comprehensive capture of URL, OS, network speed, timestamp, browser, and resolution',
      },
      bugHerd: {
        icon: <PurpleCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Partial capture: only URL, OS, browser, and resolution',
      },
    },
    {
      feature: 'Backend Tech Logs',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Complete bug reports with console logs, network requests, and metadata',
      },
      bugHerd: {
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No in-app support for backend logs',
      },
    },
    {
      feature: 'Cookies & Cache Management',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Save cookies, local and session storage, and clear cookies or cache — all with one click through the extension',
      },
      bugHerd: {
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No cookie or cache management tools',
      },
    },
    {
      feature: 'Integration Options',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Free integrations with Slack, Jira, Linear, LogRocket, ClickUp, Azure Boards, Asana, GitHub, and more',
      },
      bugHerd: {
        icon: <PurpleCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Paid integrations for most tools (Slack, Jira, Linear, ClickUp, GitHub, etc.)',
      },
    },
    {
      feature: 'Sentry Backend Logging',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Yes, in-app integration available',
        status: 'green',
        tagText: [{ tag: 'Pro Plan' }],
      },
      bugHerd: {
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No integration available',
      },
    },
    {
      feature: 'AI Repro Steps',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Automatically generates AI-driven bug descriptions',
        status: 'green',
        tagText: [{ tag: 'Pro Plan' }],
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'Feature not available',
      },
    },
    {
      feature: 'AI-Powered Descriptions',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Automatically generates AI-driven bug descriptions',
        status: 'green',
        tagText: [{ tag: 'Pro Plan' }],
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'Feature not available',
      },
    },
    {
      feature: 'On-Premise Storage',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Available for Enterprise users who need dedicated storage',
      },
      bugHerd: {
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No on-premise storage option available',
      },
    },
    {
      feature: 'Workspace Analytics',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Offers advanced analytics for QA team performance',
        status: 'green',
        tagText: [{ tag: 'Enterprise Plan' }],
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No workspace analytics support',
      },
    },
    {
      feature: 'Custom Data Retention Policy',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: ' 2 years',
        status: 'green',
        tagText: [{ tag: 'Pro Plan' }],
      },
      bugHerd: {
        status: '',
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText: 'No data retention options available',
      },
    },
    {
      feature: 'Pricing',
      betterBugs: {
        text: (
          <p>
            Starts at{' '}
            <span className="border-b border-white">$4 per user/month</span>
          </p>
        ),
        status: 'green',
        tagText: [
          { tag: 'Pro Plan' },
          { tag: 'Affordable ' },
          { tag: 'Fully Featured' },
        ],
      },
      bugHerd: {
        text: (
          <p>
            Starts at
            <span className="border-b border-white ml-[2px]">
              ~ $10 per user/month
            </span>
          </p>
        ),
        tagText: [
          { status: 'purple', tag: 'Standard Plan' },
          { status: 'red', tag: 'Higher Cost ' },
          { status: 'red', tag: 'For Fewer Capabilities' },
        ],
      },
    },
    {
      feature: 'Free Version',
      betterBugs: {
        icon: <GreenCheckIcon className="!w-[20px] !h-[20px]" />,
        text: 'Includes a fully functional free version',
      },
      bugHerd: {
        negativeIcon: <RedCheckIcon className="!w-[20px] !h-[20px]" />,
        negativeText:
          'No free version available; only free trial available for a few days',
      },
    },
  ],
};

export const integrationTools = [
  { name: 'Jira', icon: <JiraIcon />, url: '/integration/jira' },
  { name: 'Trello', icon: <TrelloIcon />, url: '/integration/trello' },
  { name: 'ClickUp', icon: <ClickupIcon />, url: '/integration/clickup' },
  { name: 'Asana', icon: <AsanaIcon />, url: '/integration/asana' },
  { name: 'Slack', icon: <SlackIcon />, url: '/integration/slack' },
  { name: 'GitHub', icon: <GithubIcon />, url: '/integration/github' },
  { name: 'Linear', icon: <LinearIcon />, url: '/integration/linear' },
  {
    name: 'Azure Boards',
    icon: <AzureBoardIcon />,
    url: '/integration/azure-boards',
  },
  { name: 'MS Teams', icon: <MSTeamsIcon />, url: '/integration/teams' },
  { name: 'Sentry', icon: <SentryIcon />, url: '/integration/sentry' },
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
      url: "/html-validator",
      title: "HTML Validator Online",
      description:
        "The HTML validator online is a free-to-use utility tool on BetterBugs.io that enables you to instantly detect any syntax errors or issues with your HTML code, validate it, provide warnings (if any) and check that it adheres to the W3C HTML standards/guidelines.",
    },
  ],
  Category40: [
    {
      url: "/json-validator",
      title: "JSON Validator Online",
      description:
        "JSON validator is a free dev utility tool on BetterBugs.io that enables you to instantly validate your JSON data or file in seconds. Use the tool to check correctness in your JSON data, schema validation , and similar other purposes in software.",
    },
  ],
  Category41: [
    {
      url: "/code-compare-tool",
      title: "Code Compare Online Tool",
      description:
        "The code compare tool is a free-to-use dev utility on BetterBugs.io that enables you to instantly compare two code files or snippets of code in JavaScript, TypeScript, Python, and many other languages and code formats; perfect for diff checking, code reviews, spotting changes and potential code errors, or version control tasks.",
    },
  ],
  Category42: [
    {
      url: "/what-is-my-user-agent",
      title: "What is My User Agent",
      description:
        "What is my user agent is a free-to-use dev utility tool on BetterBugs.io that automatically grabs and displays info about your user agent, including browser and OS details in a string format.",
    },
  ],

  // Category27: [
  //   {
  //     url: "/random-character-generator",
  //     title: "Random Character Generator",
  //     description:
  //       "Create random characters from selected sets (letters, digits, symbols) with custom length.",
  //   },
  // ],
  // Category28: [
  //   {
  //     url: "/scss-to-css",
  //     title: "SCSS to CSS Converter",
  //     description:
  //       "Compile SCSS to CSS; supports variables, mixins, imports, and nesting.",
  //   },
  // ],
  // Category29: [
  //     {
  //       url: "/css-to-scss",
  //       title: "CSS to SCSS Converter",
  //       description:
  //         "Transform CSS into SCSS syntax with nesting and variables where applicable.",
  //     },
  //   ],

  // Category21: [
  //   {
  //     url: "/rotation-calculator",
  //     title: "Rotation Calculator",
  //     description: "Calculate the rotation of a given angle in degrees, radians, turns, or gradians.",
  //   },
  // ],
  //   Category21: [
  //   {
  //     url: "/rot13-encoder-decoder",
  //     title: "ROT13 Encoder/Decoder",
  //     description: "Encode or decode text with ROT13 instantly.",
  //   },
  // {
  //   url: "/cmyk-to-hex",
  //   title: "CMYK to HEX Converter",
  //   description:
  //     "The CMYK to HEX converter is a free online utility tool on BetterBugs.io that instantly converts CMYK color values to HEX format for digital design and web development.",
  // },
  // {
  //   url: "/hex-to-cmyk",
  //   title: "HEX to CMYK Converter",
  //   description:
  //     "The HEX to CMYK converter is a free online utility tool on BetterBugs.io that instantly converts HEX color codes to CMYK format for print design and professional color management.",
  // },
  // Category21: [
  //   {
  //     url: "/hex-to-pantone",
  //     title: "Hex to Pantone",
  //     description: "Convert HEX color codes to Pantone values.",
  //   },
  // ],
  // Category21: [
  //   {
  //     url: "/rgb-to-cmk-convertor",
  //     title: "RGB to CMYK Converter",
  //     description:
  //       "Convert RGB colors to print‑friendly CMYK values. Paste RGB or rgb(), choose precision, and copy the cmyk() output.",
  //   },
  // ],
  // Category22: [
  //   {
  //     url: "/cmyk-to-rgb-converter",
  //     title: "CMYK to RGB Converter",
  //     description:
  //       "Convert CMYK colors to RGB values. Paste CMYK or cmyk(), choose precision, and copy the rgb() output.",
  //   },
  // ],
  //   {
  //     url: "/css-to-stylus",
  //     title: "CSS to Stylus Converter",
  //     description: "The CSS to Stylus converter that instantly converts CSS to Stylus",
  //   },
  // ],
  // Category19: [
  //   {
  //     url: "/ascii-to-unicode-converter",
  //     title: "ASCII to Unicode",
  //     description: "The ASCII to Unicode converter that instantly converts ASCII characters to Unicode characters",
  //   },
  // ],
  // Category20: [
  //   {
  //     url: "/unicode-to-ascii-converter",
  //     title: "Unicode to ASCII",
  //     description: "The Unicode to ASCII converter that instantly converts Unicode characters to ASCII characters",
  //   },
  // ],
  // Category19: [
  //   {
  //     url: "/decimal-to-ascii-converter",
  //     title: "Decimal to ASCII Converter",
  //     description: "The decimal to ASCII converter that instantly converts decimal numbers to ASCII characters",
  //   },
  // ],
  // Category20: [
  //   {
  //     url: "/ascii-to-decimal-converter",
  //     title: "ASCII to Decimal Converter",
  //     description: "The ASCII to decimal converter that instantly converts ASCII characters to decimal numbers",
  //   },
  // ],
  // Category17: [
  //   {
  //     url: "/bcrypt-generator",
  //     title: "Bcrypt Generator",
  //     description: "Generate bcrypt hashes for your passwords.",
  //   },
  // ],
  // Category17: [
  //   {
  //     url: "/base64-decoder",
  //     title: "Base64 Decoder",
  //     description: "Decode Base64 text or files to UTF-8.",
  //   },
  // ],
  // Category17: [
  //   {
  //     url: "/base64-encoder",
  //     title: "Base64 Encoder",
  //     description: "Encode text or files to Base64.",
  //   },
  // ],
  // Category18: [
  //   {
  //     url: "/hours-to-seconds",
  //     title: "Hours to Seconds",
  //     description: "Convert hours, minutes, and seconds to total seconds.",
  //   },
  // ],
  // Category19: [
  //   {
  //     url: "/px-to-rem-converter",
  //     title: "PX to REM Converter",
  //     description: "Convert px values to rem using a base font size.",
  //   },
  // ],
  // Category20: [
  //   {
  //     url: "/rem-to-px-converter",
  //     title: "REM to PX Converter",
  //     description: "Convert rem values to pixels using a base font size.",
  //   },
  // ],
  // Category33: [
  //   {
  //     url: "/placeholder-image-generator",
  //     title: "Placeholder Image Generator",
  //     description:
  //       "Create placeholder images with custom size, background/text colors, and overlay text.",
  //   },
  // ],
  // Category35: [
  //   {
  //     url: "/color-picker-tool",
  //     title: "Color Picker Tool",
  //     description:
  //       "Pick colors from the screen and get HEX, RGB, and HSL values with quick copy.",
  //   },
  // ],
  // Category36: [
  //   {
  //     url: "/rotate-image-tool",
  //     title: "Rotate Image Tool",
  //     description:
  //       "Rotate images left/right or by a custom angle; download the rotated PNG/JPG.",
  //   },
  // ],
  // Category37: [
  //   {
  //     url: "/csv-to-excel-file-convertor",
  //     title: "CSV to Excel File Convertor",
  //     description:
  //       "Convert CSV files to Excel (XLSX) while preserving delimiters, headers, and encodings.",
  //   },
  // ],
  // Category38: [
  //   {
  //     url: "/random-xml-generator",
  //     title: "Random XML Generator",
  //     description:
  //       "Generate sample XML with configurable elements, attributes, and depth for testing.",
  //   },
  // ],
  // Category39: [
  //   {
  //     url: "/sql-to-csv-converter",
  //     title: "SQL to CSV Converter",
  //     description:
  //       "Convert SQL data or query results into clean CSV files for analysis or export.",
  //   },
  // ],
  // Category40: [
  //   {
  //     url: "/html-prettify",
  //     title: "HTML Prettify",
  //     description:
  //       "Format and beautify HTML with consistent indentation and spacing for readability.",
  //   },
  // ],
  // Category41: [
  //   {
  //     url: "/css-prettify",
  //     title: "CSS Prettify",
  //     description:
  //       "Beautify CSS with tidy indentation, line breaks, and consistent formatting.",
  //   },
  // ],
  // Category42: [
  //   {
  //     url: "/html-minify",
  //     title: "HTML Minify",
  //     description:
  //       "Minify HTML code by removing unnecessary whitespace and comments for smaller file sizes and faster loading.",
  //   },
  // ],
  // Category43: [
  //   {
  //     url: "/css-minify",
  //     title: "CSS Minify",
  //     description:
  //       "Minify CSS code by removing unnecessary whitespace and comments for optimized stylesheets.",
  //   },
  // ],
  // Category44: [
  //   {
  //     url: "/xml-minify",
  //     title: "XML Minify",
  //     description:
  //       "Minify XML by removing redundant whitespace and comments without changing structure.",
  //   },
  // ],
  // Category45: [
  //   {
  //     url: "/xml-prettify",
  //     title: "XML Prettify",
  //     description:
  //       "Pretty‑print XML with clear indentation and line breaks for easier reading.",
  //   },
  // ],
  // Category46: [
  //   {
  //     url: "/sql-minify",
  //     title: "SQL Minify",
  //     description:
  //       "Minify SQL by stripping comments and extra whitespace while keeping queries valid.",
  //   },
  // ],
  // Category47: [
  //   {
  //     url: "/hex-to-rgb-converter",
  //     title: "Hex to RGB Converter",
  //     description:
  //       "Convert HEX color codes to RGB/RGBA with live preview and quick copy.",
  //   },
  // ],
  // Category48: [
  //   {
  //     url: "/rgb-to-hex-converter",
  //     title: "RGB to Hex Converter",
  //     description:
  //       "Convert RGB/RGBA values to HEX, including alpha transparency when applicable.",
  //   },
  // ],
  // Category49: [
  //   {
  //     url: "/grey-code-to-decimal",
  //     title: "Grey Code to Decimal",
  //     description:
  //       "Convert Gray code to decimal; view binary conversion steps and intermediate values.",
  //   },
  // ],
  // Category50: [
  //   {
  //     url: "/decimal-to-grey-code",
  //     title: "Decimal to Grey Code",
  //     description:
  //       "Convert decimal numbers to Gray code with a step‑by‑step binary/XOR breakdown.",
  //   },
  // ],
  // Category51: [
  //   {
  //     url: "/yaml-formatter-and-beautifier",
  //     title: "YAML Formatter and Beautifier",
  //     description:
  //       "Format YAML with consistent indentation and spacing; highlight syntax issues.",
  //   },
  // ],
  // Category52: [
  //   {
  //     url: "/sql-formatter-and-beautifier",
  //     title: "SQL Formatter and Beautifier",
  //     description:
  //       "Format SQL queries with standard indentation, capitalization, and line breaks.",
  //   },
  // ],
  // Category53: [
  //   {
  //     url: "/what-is-my-browser",
  //     title: "What is My Browser",
  //     description:
  //       "Detect your browser name, version, rendering engine, and key capabilities.",
  //   },
  // ],
  // Category54: [
  //   {
  //     url: "/what-version-of-windows-do-i-have",
  //     title: "What Version of Windows Do I Have",
  //     description:
  //       "Identify your Windows edition, version, build number, and system architecture.",
  //   },
  // ],
  // Category55: [
  //   {
  //     url: "/what-operating-system-do-i-have",
  //     title: "What Operating System Do I Have",
  //     description:
  //       "Detect your OS name, version, architecture, and device details.",
  //   },
  // ],
  // Category56: [
  //   {
  //     url: "/what-version-of-chrome-do-i-have",
  //     title: "What Version of Chrome Do I Have",
  //     description:
  //       "Show your Google Chrome version, build, and update channel information.",
  //   },
  // ],

  // Category59: [
  //   {
  //     url: "/json-to-typescript",
  //     title: "Json to Typescript Converter",
  //     description:
  //       "Generate TypeScript interfaces/types from JSON, including arrays and nested objects.",
  //   },
  // ],
  // Category60: [
  //   {
  //     url: "/random-csv-generator",
  //     title: "Random CSV Generator",
  //     description:
  //       "Create sample CSV data with configurable columns, data types, and row counts.",
  //   },
  // ],
  // Category61: [
  //   {
  //     url: "/random-guid-generator",
  //     title: "Random GUID Generator",
  //     description:
  //       "Generate one or many RFC 4122 UUIDs (v4) with quick copy or export.",
  //   },
  // ],
  // Category62: [
  //   {
  //     url: "/random-text-from-regex",
  //     title: "Random Text From Regex",
  //     description:
  //       "Generate strings that match a given regular expression pattern.",
  //   },
  // ],
  // Category62_1: [
  //   {
  //     url: "/javascript-regex-tester",
  //     title: "JavaScript Regex Tester",
  //     description:
  //       "Test JavaScript regular expressions with flags, matches, and replacements.",
  //   },
  // ],
  // Category63: [
  //   {
  //     url: "/qr-code-generator",
  //     title: "QR Code Generator",
  //     description: "Create QR codes from text or URLs; download as PNG or SVG.",
  //   },
  // ],
  // Category64: [
  //   {
  //     url: "/random-address-generator",
  //     title: "Random Address Generator",
  //     description:
  //       "Generate realistic addresses including street, city, state, ZIP, and country.",
  //   },
  // ],
  // Category65: [
  //   {
  //     url: "/html-code-generator",
  //     title: "HTML Code Generator",
  //     description:
  //       "Generate common HTML snippets (tables, forms, buttons) with customizable attributes.",
  //   },
  // ],
  // Category66: [
  //   {
  //     url: "/html-viewer",
  //     title: "HTML Viewer",
  //     description:
  //       "Preview HTML markup in a live viewer to see rendered output instantly.",
  //   },
  // ],
  // Category68: [
  //   {
  //     url: "/color-inverter",
  //     title: "Color Inverter",
  //     description:
  //       "Invert colors for HEX/RGB/HSL values with side‑by‑side preview and copy.",
  //   },
  // ],
  
  
  // Category71: [
  //   {
  //     url: "/string-difference-checker",
  //     title: "String Difference Checker",
  //     description:
  //       "Compare two texts and highlight additions, deletions, and changes clearly.",
  //   },
  // ],
  // Category72: [
  //   {
  //     url: "/text-repeater",
  //     title: "Text Repeater",
  //     description:
  //       "Repeat text a chosen number of times with custom separators and line breaks.",
  //   },
  // ],
  // Category73: [
  //   {
  //     url: "/sorting-list",
  //     title: "Sorting List",
  //     description:
  //       "Sort lines ascending/descending, remove duplicates, and toggle case sensitivity.",
  //   },
  // ],
  // Category74: [
  //   {
  //     url: "/shuffle-letters",
  //     title: "Shuffle Letters",
  //     description:
  //       "Randomly shuffle characters in your text; preserve case and whitespace options.",
  //   },
  // ],
  // Category75: [
  //   {
  //     url: "/shuffle-text-lines",
  //     title: "Shuffle Text Lines",
  //     description: "Shuffle lines randomly; keep header lines fixed if needed.",
  //   },
  // ],
  
  // Category77: [
  //   {
  //     url: "/random-ip-generator",
  //     title: "Random IP Generator",
  //     description:
  //       "Generate valid IPv4/IPv6 addresses; set quantity and optional ranges.",
  //   },
  // ],
  // Category78: [
  //   {
  //     url: "/json-compare",
  //     title: "JSON Compare",
  //     description:
  //       "Deep-compare two JSON objects; see added, removed, and changed paths.",
  //   },
  // ],
  // Category79: [
  //   {
  //     url: "/text-compare",
  //     title: "Text Compare",
  //     description:
  //       "Compare plain text in line or word mode with side‑by‑side view.",
  //   },
  // ],
  // Category80: [
  //   {
  //     url: "/url-decode",
  //     title: "URL Decode",
  //     description:
  //       "Decode percent‑encoded URLs safely; support UTF‑8 and reserved characters.",
  //   },
  // ],
  // Category81: [
  //   {
  //     url: "/url-encode",
  //     title: "URL Encode",
  //     description:
  //       "Encode text for safe use in URLs; choose component or full URL encoding.",
  //   },
  // ],
  // Category82: [
  //   {
  //     url: "/text-to-html-entities-convertor",
  //     title: "Text to HTML Entities Convertor",
  //     description:
  //       "Convert characters to HTML entities (named, numeric, hex) with copy support.",
  //   },
  // ],
  // Category83: [
  //   {
  //     url: "/html-entities-to-text-converter",
  //     title: "HTML Entities to Text Converter",
  //     description: "Decode HTML entities back to plain text accurately.",
  //   },
  // ],
  // Category84: [
  //   {
  //     url: "/csv-to-json",
  //     title: "CSV to JSON Converter",
  //     description:
  //       "Convert CSV to JSON; set delimiter, header row, and basic type inference.",
  //   },
  // ],
  // Category94: [
  //   {
  //     url: "/markdown-formatter",
  //     title: "Markdown Formatter",
  //     description:
  //       "Beautify Markdown: normalize headings, lists, code blocks, and spacing.",
  //   },
  // ],
  // Category95: [
  //   {
  //     url: "/typeScript-formatter",
  //     title: "TypeScript Formatter",
  //     description:
  //       "Format TypeScript code with standard styling and optional import organizing.",
  //   },
  // ],

  // Category98: [
  //   {
  //     url: "/text-to-csv",
  //     title: "Text to CSV",
  //     description:
  //       "Convert delimited text to CSV; set delimiter and quoting rules.",
  //   },
  // ],
  // Category99: [
  //   {
  //     url: "/internet-speed-test",
  //     title: "Internet Speed Test",
  //     description:
  //       "Measure download/upload speeds, latency, and jitter with shareable results.",
  //   },
  // ],
  // Category100: [
  //   {
  //     url: "/php-formatter",
  //     title: "PHP Formatter",
  //     description:
  //       "Format PHP code with PSR‑12 style: indentation, braces, and spacing.",
  //   },
  // ],
  // Category101: [
  //   {
  //     url: "/python-formatter",
  //     title: "Python Formatter",
  //     description:
  //       "Format Python code to PEP 8 style: indentation, spacing, and line length.",
  //   },
  // ],
  // Category102: [
  //   {
  //     url: "/xml-compare",
  //     title: "XML Compare",
  //     description:
  //       "Structure-aware diff of two XML files: elements, attributes, and text nodes.",
  //   },
  // ],
  // Category103: [
  //   {
  //     url: "/idn-encode",
  //     title: "IDN Encode",
  //     description:
  //       "Convert Unicode domain names to Punycode (IDNA) for DNS compatibility.",
  //   },
  // ],
  // Category104: [
  //   {
  //     url: "/idn-decode",
  //     title: "IDN Decode",
  //     description: "Convert Punycode (IDNA) domains back to readable Unicode.",
  //   },
  // ],
  // Category105: [
  //   {
  //     url: "/json-to-xml-converter",
  //     title: "JSON to XML Converter",
  //     description: "Convert JSON data into properly formatted XML format.",
  //   },
  // ],
  // Category106: [
  //   {
  //     url: "/json-to-yaml-converter",
  //     title: "JSON to YAML Converter",
  //     description: "Convert JSON data into properly formatted YAML format.",
  //   },
  // ],
  // Category107: [
  //   {
  //     url: "/utf8-decode",
  //     title: "UTF8 Decode",
  //     description: "Decode UTF8 text or files to UTF-8.",
  //   },
  // ],
  // Category108: [
  //   {
  //     url: "/utf8-encode",
  //     title: "UTF8 Encode",
  //     description: "Encode UTF8 text or files to UTF-8.",
  //   },
  // ],
  // Category109: [
  //   {
  //     url: "/xor-calculator",
  //     title: "XOR Calculator",
  //     description: "Calculate XOR of text or files.",
  //   },
  // ],
  // Category110: [
  //   {
  //     url: "/binary-to-decimal-converter",
  //     title: "Binary to Decimal Converter",
  //     description: "Convert binary numbers to decimal values.",
  //   },
  // ],
  // Category111: [
  //   {
  //     url: "/decimal-to-binary-converter",
  //     title: "Decimal to Binary Converter",
  //     description: "Convert decimal numbers to binary values.",
  //   },
  // ],
  // Category112: [
  //   {
  //     url: "/octal-to-decimal-converter",
  //     title: "Octal to Decimal Converter",
  //     description: "Convert octal numbers to decimal values.",
  //   },
  // ],
  // Category113: [
  //   {
  //     url: "/decimal-to-octal-converter",
  //     title: "Decimal to Octal Converter",
  //     description: "Convert decimal numbers to octal values.",
  //   },
  // ],
  // Category114: [
  //   {
  //     url: "/decimal-to-hex",
  //     title: "Decimal to Hex Converter",
  //     description: "Convert decimal numbers to hex values.",
  //   },
  // ],
  // Category115: [
  //   {
  //     url: "/hex-to-binary",
  //     title: "Hex to Binary Converter",
  //     description: "Convert hex numbers to binary values.",
  //   },
  // ],
  // Category116: [
  //   {
  //     url: "/octal-to-binary",
  //     title: "Octal to Binary Converter",
  //     description: "Convert octal numbers to binary values.",
  //   },
  // ],
  // Category117: [
  //   {
  //     url: "/miles-to-kilometers",
  //     title: "Miles to Kilometers Converter",
  //     description: "Convert miles to kilometers.",
  //   },
  // ],
  // Category118: [
  //   {
  //     url: "/kilometers-to-miles",
  //     title: "Kilometers to Miles Converter",
  //     description: "Convert kilometers to miles.",
  //   },
  // ],
  // Category119: [
  //   {
  //     url: "/jwt-decoder",
  //     title: "JWT Decoder",
  //     description: "Decode JWT tokens into readable format.",
  //   },
  // ],
  // Category120: [
  //   {
  //     url: "/ip-to-hex",
  //     title: "IP to Hex Converter",
  //     description: "Convert IP addresses to hexadecimal values.",
  //   },
  // ],
  // Category34: [
  //   {
  //     url: "/words-to-numbers",
  //     title: "Words to Numbers Converter",
  //     description: "Convert words to numbers.",
  //   },
  // ],
  // Category122: [
  //   {
  //     url: "/numbers-to-words",
  //     title: "Numbers to Words Converter",
  //     description: "Convert numbers to words.",
  //   },
  // ],
  // Category123: [
  //   {
  //     url: "/fabonacci-calculator",
  //     title: "Fabonacci Calculator",
  //     description: "Calculate Fabonacci numbers.",
  //   },
  // ],
  // Category124: [
  //   {
  //     url: "/bitwise-calculator",
  //     title: "Bitwise Calculator",
  //     description: "Calculate Bitwise numbers.",
  //   },
  // ],
  // Category125: [
  //   {
  //     url: "/graphql-formatter",
  //     title: "GraphQL Formatter",
  //     description: "Format GraphQL numbers.",
  //   },
  // ],
  // Category126: [
  //   {
  //     url: "/celcius-to-fahrenheit",
  //     title: "Celcius to Fahrenheit Converter",
  //     description: "Convert Celcius to Fahrenheit.",
  //   },
  // ],
  // Category127: [
  //   {
  //     url: "/barcode-generator",
  //     title: "Barcode Generator",
  //     description: "Generate Barcodes.",
  //   },
  // ],
  // Category128: [
  //   {
  //     url: "/find-and-replace-string",
  //     title: "Find and Replace String",
  //     description: "Find and Replace String.",
  //   },
  // ],
  // Category129: [
  //   {
  //     url: "/api-key-generator",
  //     title: "API Key Generator",
  //     description: "Generate API Keys.",
  //   },
  // ],
  // Category130: [
  //   {
  //     url: "/html-escape",
  //     title: "HTML Escape",
  //     description: "Escape HTML.",
  //   },
  // ],
  // Category131: [
  //   {
  //     url: "/html-unescape",
  //     title: "HTML Unescape",
  //     description: "Unescape HTML.",
  //   },
  // ],
  // Category132: [
  //   {
  //     url: "/javascript-regex-tester",
  //     title: "JavaScript Regex Tester",
  //     description:
  //       "Test and validate JavaScript regular expressions with real-time results and match highlighting.",
  //   },
  // ],
  // Category133: [
  //   {
  //     url: "/strip-html",
  //     title: "Strip HTML",
  //     description: "Remove all HTML tags and scripts, output plain text.",
  //   },
  // ],
  // Category134: [
  //   {
  //     url: "/what-is-my-local-ip-address",
  //     title: "What Is My Local IP Address",
  //     description: "Discover local IPv4/IPv6 addresses via WebRTC ICE candidates.",
  //   },
  // ],
  // Category135: [
  //   {
  //     url: "/javascript-tester",
  //     title: "JavaScript Tester",
  //     description: "Write and run JavaScript with console output in a sandbox.",
  //   },
  // ],
  // Category136: [
  //   {
  //     url: "/what-version-of-java-do-i-have",
  //     title: "What version of Java is installed?",
  //     description: "Quick commands to check your Java/JDK version on any OS.",
  //   },
  // ],
  // Category137: [
  //   {
  //     url: "/what-version-of-macos-do-i-have",
  //     title: "What version of macOS do I have?",
  //     description: "Detect macOS from browser UA and show manual steps to verify.",
  //   },
  // ],
  // Category138: [
  //   {
  //     url: "/what-version-of-firefox-do-i-have",
  //     title: "What version of Firefox do I have?",
  //     description: "Detect Firefox version from user agent with manual steps to confirm.",
  //   },
  // ],
  // Category139: [
  //   {
  //     url: "/what-version-of-ios-do-i-have",
  //     title: "What version of iOS do I have?",
  //     description: "Detect iOS version from user agent and show Settings steps.",
  //   },
  // ],
  // Category140: [
  //   {
  //     url: "/whats-my-browser-size",
  //     title: "What's My Browser Size?",
  //     description: "View live viewport/window size and device pixel ratio.",
  //   },
  // ],
  // Category141: [
  //   {
  //     url: "/what-version-of-safari-do-i-have",
  //     title: "What version of Safari do I have?",
  //     description: "Detect Safari version from user agent with manual steps to confirm.",
  //   },
  // ],
  // Category142: [
  //   {
  //     url: "/what-version-of-android-do-i-have",
  //     title: "What version of Android do I have?",
  //     description: "Detect Android version from user agent and show Settings steps.",
  //   },
  // ],
  // Category143: [
  //   {
  //     url: "/what-version-of-flash-do-i-have",
  //     title: "What version of Flash do I have?",
  //     description: "Detect Flash version from user agent with manual steps to confirm.",
  //   },
  // ],
  // Category144: [
  //   {
  //     url: "/what-is-my-isp",
  //     title: "What is My ISP",
  //     description: "Detect ISP from user agent with manual steps to confirm.",
  //   },
  // ],
  // Category145: [
  //   {
  //     url: "/am-i-using-tor",
  //     title: "Am I Using Tor",
  //     description: "Detect if you are using Tor with manual steps to confirm.",
  //   },
  // ],
  // Category146: [
  //   {
  //     url: "/html-tester",
  //     title: "HTML Tester",
  //     description: "Test HTML code with real-time results and match highlighting.",
  //   },
  // ],
  // Category147: [
  //   {
  //     url: "/excel-compare",
  //     title: "Excel Compare",
  //     description: "Compare two Excel files and find the differences.",
  //   },
  // ],
  // Category148: [
  //   {
  //     url: "/javascript-escape",
  //     title: "JavaScript Escape",
  //     description: "Escape JavaScript.",
  //   },
  // ],
  // Category149: [
  //   {
  //     url: "/javascript-validator-linter",
  //     title: "JavaScript Validator & Linter",
  //     description: "Validate and lint JavaScript.",
  //   },
  // ],
  // Category150: [
  //   {
  //     url: "/xml-escape",
  //     title: "XML Escape",
  //     description: "Escape XML.",
  //   },
  // ],
  // Category151: [
  //   {
  //     url: "/css-validator",
  //     title: "CSS Validator",
  //     description: "Validate CSS.",
  //   },
  // ],
  // Category152: [
  //   {
  //     url: "/css-to-sass",
  //     title: "CSS to SASS",
  //     description: "Convert CSS to SASS.",
  //   },
  // ],
  // Category153: [
  //   {
  //     url: "/css-to-less",
  //     title: "CSS to LESS",
  //     description: "Convert CSS to LESS.",
  //   },
  // ],
  // Category154: [
  //   {
  //     url: "/crontab-generator",
  //     title: "Crontab Generator",
  //     description: "Generate Crontab.",
  //   },
  // ],
  // Category155: [
  //   {
  //     url: "/morse-code-translator",
  //     title: "Morse Code Translator",
  //     description: "Translate Morse Code.",
  //   },
  // ],
  // Category157: [
  //   {
  //     url: "/hex-to-ascii-converter",
  //     title: "Hex to ASCII Converter",
  //     description: "Convert Hex to ASCII.",
  //   },
  // ],
  // Category158: [
  //   {
  //     url: "/xml-to-json-converter",
  //     title: "XML to JSON Converter",
  //     description: "Convert XML to JSON.",
  //   },
  // ],
  // Category159: [
  //   {
  //     url: "/bcd-to-decimal-converter",
  //     title: "BCD to Decimal Converter",
  //     description: "Convert BCD to Decimal.",
  //   },
  // ],
  // Category20: [
  //   {
  //     url: "/html-to-bbcode",
  //     title: "HTML to BBCode",
  //     description: "Convert HTML to BBCode.",
  //   },
  // ],
  // Category21: [
  //   {
  //     url: "/sql-to-json",
  //     title: "SQL to JSON",
  //     description: "Convert SQL to JSON.",
  //   },
  // ],
  // Category20: [
  //   {
  //     url: "/html-to-jade",
  //     title: "HTML To Jade",
  //     description: "Convert HTML to Jade.",
  //   },
  //   ,
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
  RANDOM_DECIMAL_NUMBER_GENERATOR:
    '/random-decimal-number-generator',
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
  HTML_VALIDATOR: "/html-validator",
  JSON_VALIDATOR: "/json-validator",
  CODE_COMPARE_TOOL: "/code-compare-tool",
  WHAT_IS_MY_USER_AGENT: "/what-is-my-user-agent",
  
  // ROTATION_CALCULATOR: "/rotation-calculator",
  // ROT13_ENCODER_DECODER: "/rot13-encoder-decoder",
  // CMYK_TO_HEX: "/cmyk-to-hex",
  // HEX_TO_CMYK: "/hex-to-cmyk",
  // HEX_TO_PANTONE: "/hex-to-pantone",
  // RGB_TO_CMYK_CONVERTER: "/rgb-to-cmk-convertor",
  // CMYK_TO_RGB_CONVERTER: "/cmyk-to-rgb-converter"
  // CSS_TO_STYLUS: "/css-to-stylus",
  // HTML_TO_JADE: "/html-to-jade",
  // SQL_TO_JSON: "/sql-to-json",
  // HTML_TO_BBCODE: "/html-to-bbcode",
  // BCD_TO_DECIMAL_CONVERTER: "/bcd-to-decimal-converter",
  // XML_TO_JSON_CONVERTER: "/xml-to-json-converter",
  // DECIMAL_TO_ASCII_CONVERTER: "/decimal-to-ascii-converter",
  // ASCII_TO_DECIMAL_CONVERTER: "/ascii-to-decimal-converter",
  // UNICODE_TO_ASCII_CONVERTER: "/unicode-to-ascii-converter",
  // ASCII_TO_UNICODE_CONVERTER: "/ascii-to-unicode-converter",
  // HEX_TO_ASCII_CONVERTER: "/hex-to-ascii-converter",
  // BCRYPT_GENERATOR: "/bcrypt-generator",
  // BASE64_DECODER: "/base64-decoder",
  // BASE64_ENCODER: "/base64-encoder",
  // HOURS_TO_SECONDS: "/hours-to-seconds",
  // PX_TO_REM_CONVERTER: "/px-to-rem-converter",
  // REM_TO_PX_CONVERTER: "/rem-to-px-converter",
  // RANDOM_CHARACTER_GENERATOR: "/random-character-generator",
  // BCD_TO_DECIMAL_CONVERTER: "/bcd-to-decimal-converter",
  // PLACEHOLDER_IMAGE_GENERATOR: "/placeholder-image-generator",
  // COLOR_PICKER_TOOL: "/color-picker-tool",
  // ROTATE_IMAGE_TOOL: "/rotate-image-tool",
  // CSV_TO_EXCEL_FILE_CONVERTOR: "/csv-to-excel-file-convertor",
  // RANDOM_XML_GENERATOR: "/random-xml-generator",
  // SQL_TO_CSV_CONVERTER: "/sql-to-csv-converter",
  // HTML_PRETTIFY: "/html-prettify",
  // CSS_PRETTIFY: "/css-prettify",
  // HTML_MINIFY: "/html-minify",
  // CSS_MINIFY: "/css-minify",
  // XML_MINIFY: "/xml-minify",
  // XML_PRETTIFY: "/xml-prettify",
  // SQL_MINIFY: "/sql-minify",
  // HEX_TO_RGB_CONVERTER: "/hex-to-rgb-converter",
  // RGB_TO_HEX_CONVERTER: "/rgb-to-hex-converter",
  // GREY_CODE_TO_DECIMAL: "/grey-code-to-decimal",
  // DECIMAL_TO_GREY_CODE: "/decimal-to-grey-code",
  // YAML_FORMATTER_AND_BEAUTIFIER:
  //   "/yaml-formatter-and-beautifier",
  // SQL_FORMATTER_AND_BEAUTIFIER:
  //   "/sql-formatter-and-beautifier",
  // WHAT_IS_MY_BROWSER: "/what-is-my-browser",
  // WHAT_VERSION_OF_WINDOWS_DO_I_HAVE:
  //   "/what-version-of-windows-do-i-have",
  // WHAT_OPERATING_SYSTEM_DO_I_HAVE:
  //   "/what-operating-system-do-i-have",
  // WHAT_VERSION_OF_CHROME_DO_I_HAVE:
  //   "/what-version-of-chrome-do-i-have",
  // JSON_TO_TYPESCRIPT: "/json-to-typescript",
  // RANDOM_CSV_GENERATOR: "/random-csv-generator",
  // RANDOM_GUID_GENERATOR: "/random-guid-generator",
  // RANDOM_TEXT_FROM_REGEX: "/random-text-from-regex",
  // QR_CODE_GENERATOR: "/qr-code-generator",
  // RANDOM_ADDRESS_GENERATOR: "/random-address-generator",
  // HTML_CODE_GENERATOR: "/html-code-generator",
  // HTML_VIEWER: "/html-viewer",
  // COLOR_INVERTOR: "/color-inverter",
  // STRING_DIFFERENCE_CHECKER: "/string-difference-checker",
  // TEXT_REPEATER: "/text-repeater",
  // SORTING_LIST: "/sorting-list",
  // SHUFFLE_LETTERS: "/shuffle-letters",
  // SHUFFLE_TEXT_LINES: "/shuffle-text-lines",
  // RANDOM_IP_GENERATOR: "/random-ip-generator",
  // JSON_COMPARE: "/json-compare",
  // TEXT_COMPARE: "/text-compare",
  // URL_DECODE: "/url-decode",
  // URL_ENCODE: "/url-encode",
  // TEXT_TO_HTML_ENTITIES_CONVERTOR:
  //   "/text-to-html-entities-convertor",
  // HTML_ENTITIES_TO_TEXT_CONVERTER:
  //   "/html-entities-to-text-converter",
  // CSV_TO_JSON: "/csv-to-json",
  // CSS_TO_SCSS: "/css-to-scss",
  // SCSS_TO_CSS: "/scss-to-css",
  // MARKDOWN_FORMATTER: "/markdown-formatter",
  // TYPE_SCRIPT_FORMATTER: "/typeScript-formatter",
  // TEXT_TO_CSV: "/text-to-csv",
  // INTERNET_SPEED_TEST: "/internet-speed-test",
  // PHP_FORMATTER: "/php-formatter",
  // PYTHON_FORMATTER: "/python-formatter",
  // XML_COMPARE: "/xml-compare",
  // IDN_ENCODE: "/idn-encode",
  // IDN_DECODE: "/idn-decode",
  // JSON_TO_XML_CONVERTER: "/json-to-xml-converter",
  // JSON_TO_YAML_CONVERTER: "/json-to-yaml-converter",
  // UTF8_DECODE: "/utf8-decode",
  // UTF8_ENCODE: "/utf8-encode",
  // XOR_CALCULATOR: "/xor-calculator",
  // BINARY_TO_DECIMAL_CONVERTER: "/binary-to-decimal-converter",
  // DECIMAL_TO_BINARY_CONVERTER: "/decimal-to-binary-converter",
  // OCTAL_TO_DECIMAL_CONVERTER: "/octal-to-decimal-converter",
  // DECIMAL_TO_OCTAL_CONVERTER: "/decimal-to-octal-converter",
  // DECIMAL_TO_HEX: "/decimal-to-hex",
  // HEX_TO_BINARY: "/hex-to-binary",
  // OCTAL_TO_BINARY: "/octal-to-binary",
  // MILES_TO_KILOMETERS: "/miles-to-kilometers",
  // KILOMETERS_TO_MILES: "/kilometers-to-miles",
  // JWT_DECODER: "/jwt-decoder",
  // IP_TO_HEX: "/ip-to-hex",
  // WORDS_TO_NUMBERS: "/words-to-numbers",
  // NUMBERS_TO_WORDS: "/numbers-to-words",
  // FABONACCI_CALCULATOR: "/fabonacci-calculator",
  // BITWISE_CALCULATOR: "/bitwise-calculator",
  // GRAPHQL_FORMATTER: "/graphql-formatter",
  // CELCIUS_TO_FAHRENHEIT: "/celcius-to-fahrenheit",
  // BARCODE_GENERATOR: "/barcode-generator",
  // FIND_AND_REPLACE_STRING: "/find-and-replace-string",
  // API_KEY_GENERATOR: "/api-key-generator",
  // HTML_ESCAPE: "/html-escape",
  // HTML_UNESCAPE: "/html-unescape",
  // JAVASCRIPT_REGEX_TESTER: "/javascript-regex-tester",
  // STRIP_HTML: "/strip-html",
  // WHAT_IS_MY_LOCAL_IP_ADDRESS: "/what-is-my-local-ip-address",
  // JAVASCRIPT_TESTER: "/javascript-tester",
  // WHAT_VERSION_OF_JAVA: "/what-version-of-java-do-i-have",
  // WHAT_VERSION_OF_MACOS: "/what-version-of-macos-do-i-have",
  // WHAT_VERSION_OF_FIREFOX: "/what-version-of-firefox-do-i-have",
  // WHAT_VERSION_OF_IOS: "/what-version-of-ios-do-i-have",
  // WHATS_MY_BROWSER_SIZE: "/whats-my-browser-size",
  // WHAT_VERSION_OF_SAFARI: "/what-version-of-safari-do-i-have",
  // WHAT_VERSION_OF_ANDROID: "/what-version-of-android-do-i-have",
  // WHAT_VERSION_OF_FLASH: "/what-version-of-flash-do-i-have",
  // WHAT_IS_MY_ISP: "/what-is-my-isp",
  // AM_I_USING_TOR: "/am-i-using-tor",
  // HTML_TESTER: "/html-tester",
  // EXCEL_COMPARE: "/excel-compare",
  // JAVASCRIPT_ESCAPE: "/javascript-escape",
  // JAVASCRIPT_VALIDATOR_LINTER: "/javascript-validator-linter",
  // XML_ESCAPE: "/xml-escape",
  // CSS_VALIDATOR: "/css-validator",
  // CSS_TO_SASS: "/css-to-sass",
  // CSS_TO_LESS: "/css-to-less",
  // CRONTAB_GENERATOR: "/crontab-generator",
  // MORSE_CODE_TRANSLATOR: "/morse-code-translator",
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

  // { path: PATHS.ROTATION_CALCULATOR, component: <RotationCalculatorComponent /> },
  // { path: PATHS.ROT13_ENCODER_DECODER, component: <Rot13EncoderDecoderComponent /> },
  // {
  //   path: PATHS.CMYK_TO_HEX,
  //   component: <CmykToHexConverter />,
  // },
  // {
  //   path: PATHS.HEX_TO_CMYK,
  //   component: <HexToCmykConverter />,
  // },
  // {
  //   path:PATHS.HEX_TO_PANTONE,
  //   component: <HexToPantone />,
  // }
  // {
  //   path: PATHS.RGB_TO_CMYK_CONVERTER,
  //   component: <RgbToCmykConverter />,
  // },
  // {
  //   path: PATHS.CMYK_TO_RGB_CONVERTER,
  //   component: <CmykToRgbConverter />,
  // },
  // {
  //   path: PATHS.CSS_TO_STYLUS,
  //   component: <CssToStylus />,
  // },
  // {
  //   path: PATHS.UNICODE_TO_ASCII_CONVERTER,
  //   component: <UnicodeToAsciiConverter />,
  // },
  // {
  //   path: PATHS.ASCII_TO_UNICODE_CONVERTER,
  //   component: <AsciiToUnicodeConverter />,
  // },
  // {
  //   path: PATHS.DECIMAL_TO_ASCII_CONVERTER,
  //   component: <DecimalToAsciiConverter />,
  // },
  // {
  //   path: PATHS.ASCII_TO_DECIMAL_CONVERTER,
  //   component: <AsciiToDecimalConverter />,
  // },
  // {
  //   path: PATHS.BCRYPT_GENERATOR,
  //   component: <BcryptGenerator />,
  // },
  // {
  //   path: PATHS.HEX_TO_ASCII_CONVERTER,
  //   component: <HexToAscii />,
  // },
  // {
  //   path: PATHS.BASE64_DECODER,
  //   component: <Base64Decoder />,
  // },
  // {
  //   path: PATHS.BASE64_ENCODER,
  //   component: <Base64Encoder />,
  // },
  // {
  //   path: PATHS.HOURS_TO_SECONDS,
  //   component: <HoursToSecounds />,
  // },
  // {
  //   path: PATHS.PX_TO_REM_CONVERTER,
  //   component: <PxToRemConverter />,
  // },
  // {
  //   path: PATHS.REM_TO_PX_CONVERTER,
  //   component: <RemToPxConverter />,
  // },
  // {
  //   path: PATHS.RANDOM_CHARACTER_GENERATOR,
  //   component: <RandomCharacterGenerator />,
  // },
  // {
  //   path: PATHS.PLACEHOLDER_IMAGE_GENERATOR,
  //   component: <PlaceholderImageGenerator />,
  // },
  // {
  //   path: PATHS.COLOR_PICKER_TOOL,
  //   component: <ColorPickerTool />,
  // },
  // {
  //   path: PATHS.ROTATE_IMAGE_TOOL,
  //   component: <RotateImageTool />,
  // },
  // {
  //   path: PATHS.CSV_TO_EXCEL_FILE_CONVERTOR,
  //   component: <CsvToExcelFileConvertor />,
  // },
  // {
  //   path: PATHS.RANDOM_XML_GENERATOR,
  //   component: <RandomXMLGenerator />,
  // },
  // {
  //   path: PATHS.SQL_TO_CSV_CONVERTER,
  //   component: <SqlToCsvConverter />,
  // },
  // {
  //   path: PATHS.HTML_PRETTIFY,
  //   component: <HtmlPrettify />,
  // },
  // {
  //   path: PATHS.CSS_PRETTIFY,
  //   component: <CssPrettify />,
  // },
  // {
  //   path: PATHS.HTML_MINIFY,
  //   component: <HtmlMinify />,
  // },
  // {
  //   path: PATHS.CSS_MINIFY,
  //   component: <CssMinify />,
  // },
  // {
  //   path: PATHS.XML_MINIFY,
  //   component: <XmlMinify />,
  // },
  // {
  //   path: PATHS.XML_PRETTIFY,
  //   component: <XmlPrettify />,
  // },
  // {
  //   path: PATHS.SQL_MINIFY,
  //   component: <SqlMinify />,
  // },
  // {
  //   path: PATHS.HEX_TO_RGB_CONVERTER,
  //   component: <HexToRGBConverter />,
  // },
  // {
  //   path: PATHS.RGB_TO_HEX_CONVERTER,
  //   component: <RgbToHexConverter />,
  // },
  // {
  //   path: PATHS.GREY_CODE_TO_DECIMAL,
  //   component: <GreyCodeToDecimal />,
  // },
  // {
  //   path: PATHS.DECIMAL_TO_GREY_CODE,
  //   component: <DecimalToGrayCode />,
  // },
  // {
  //   path: PATHS.YAML_FORMATTER_AND_BEAUTIFIER,
  //   component: <YAMLFormatterAndBeautifier />,
  // },
  // {
  //   path: PATHS.SQL_FORMATTER_AND_BEAUTIFIER,
  //   component: <SqlFormatterAndBeautifier />,
  // },
  // {
  //   path: PATHS.WHAT_IS_MY_BROWSER,
  //   component: <WhatIsMyBrowser />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_WINDOWS_DO_I_HAVE,
  //   component: <WhatVersionOfWindowsDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
  //   component: <WhatOperatingSystemDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_CHROME_DO_I_HAVE,
  //   component: <WhatVersionOfChromeDoIHave />,
  // },

  // {
  //   path: PATHS.JSON_TO_TYPESCRIPT,
  //   component: <JsonToTypeScript />,
  // },
  // {
  //   path: PATHS.RANDOM_CSV_GENERATOR,
  //   component: <RandomCSVGenerator />,
  // },
  // {
  //   path: PATHS.RANDOM_GUID_GENERATOR,
  //   component: <RandomGUIDGenerator />,
  // },
  // {
  //   path: PATHS.RANDOM_TEXT_FROM_REGEX,
  //   component: <RandomTextFromRegEX />,
  // },
  // {
  //   path: PATHS.QR_CODE_GENERATOR,
  //   component: <QRCodeGenerator />,
  // },
  // {
  //   path: PATHS.RANDOM_ADDRESS_GENERATOR,
  //   component: <RandomAddressGenerator />,
  // },
  // {
  //   path: PATHS.HTML_CODE_GENERATOR,
  //   component: <HtmlCodeGenerator />,
  // },
  // {
  //   path: PATHS.HTML_VIEWER,
  //   component: <HtmlViewer />,
  // },
  // {
  //   path: PATHS.COLOR_INVERTOR,
  //   component: <ColorInvertor />,
  // },

  
  // {
  //   path: PATHS.STRING_DIFFERENCE_CHECKER,
  //   component: <StringDiffrenceChecker />,
  // },
  // {
  //   path: PATHS.TEXT_REPEATER,
  //   component: <TextRepeater />,
  // },
  // {
  //   path: PATHS.SORTING_LIST,
  //   component: <SortingList />,
  // },
  // {
  //   path: PATHS.SHUFFLE_LETTERS,
  //   component: <ShuffleLetters />,
  // },
  // {
  //   path: PATHS.SHUFFLE_TEXT_LINES,
  //   component: <ShuffleTextLines />,
  // },
  
  // {
  //   path: PATHS.RANDOM_IP_GENERATOR,
  //   component: <RandomIPGenerator />,
  // },
  // {
  //   path: PATHS.JSON_COMPARE,
  //   component: <JSONCompare />,
  // },
  // {
  //   path: PATHS.TEXT_COMPARE,
  //   component: <TextCompare />,
  // },
  // {
  //   path: PATHS.URL_DECODE,
  //   component: <URLDecode />,
  // },
  // {
  //   path: PATHS.URL_ENCODE,
  //   component: <URLEncode />,
  // },
  // {
  //   path: PATHS.TEXT_TO_HTML_ENTITIES_CONVERTOR,
  //   component: <TextToHtmlEntitiesConvertor />,
  // },
  // {
  //   path: PATHS.HTML_ENTITIES_TO_TEXT_CONVERTER,
  //   component: <HtmlEntitiesToTextConverter />,
  // },
  // {
  //   path: PATHS.CSV_TO_JSON,
  //   component: <CSVToJSON />,
  // },
  // {
  //   path: PATHS.CSS_TO_SCSS,
  //   component: <CSSToSCSSConverter />,
  // },
  // {
  //   path: PATHS.SCSS_TO_CSS,
  //   component: <ScssToCssConverter />,
  // },

  // {
  //   path: PATHS.MARKDOWN_FORMATTER,
  //   component: <MarkdownFormatter />,
  // },
  // {
  //   path: PATHS.TYPE_SCRIPT_FORMATTER,
  //   component: <TypescriptFormatter />,
  // },

  // {
  //   path: PATHS.TEXT_TO_CSV,
  //   component: <TextToCsv />,
  // },
  // {
  //   path: PATHS.INTERNET_SPEED_TEST,
  //   component: <InternetSpeedTest />,
  // },
  // {
  //   path: PATHS.PHP_FORMATTER,
  //   component: <PHPFormatter />,
  // },
  // {
  //   path: PATHS.PYTHON_FORMATTER,
  //   component: <PythonFormatter />,
  // },
  // {
  //   path: PATHS.XML_COMPARE,
  //   component: <XmlCompare />,
  // },
  //   {
  //     path: PATHS.IDN_ENCODE,
  //     component: <IdnEncode />,
  //   },
  //   {
  //     path: PATHS.IDN_DECODE,
  //     component: <IdnDecode />,
  //   },
  //   {
  //     path: PATHS.JSON_TO_XML_CONVERTER,
  //     component: <JsonToXmlConverter />,
  //   },
  //   {
  //     path: PATHS.JSON_TO_YAML_CONVERTER,
  //     component: <JsonToYamlConverter />,
  //   },
  //   {
  //     path: PATHS.UTF8_DECODE,
  //     component: <Utf8Decode />,
  //   },
  //   {
  //     path: PATHS.UTF8_ENCODE,
  //     component: <Utf8Encode />,
  //   },
  //   {
  //     path: PATHS.XOR_CALCULATOR,
  //     component: <XorCalculator />,
  // },
  // {
  //     path: PATHS.BINARY_TO_DECIMAL_CONVERTER,
  //     component: <BinaryToDecimalConverter />,
  //   },
  //   {
  //     path: PATHS.DECIMAL_TO_BINARY_CONVERTER,
  //     component: <DecimalToBinaryConverter />,
  //   },
  //   {
  //     path: PATHS.OCTAL_TO_DECIMAL_CONVERTER,
  //     component: <OctalToDecimalConverter />,
  //   },
  //   {
  //     path: PATHS.DECIMAL_TO_OCTAL_CONVERTER,
  //     component: <DecimalToOctalConverter />,
  //   },
  //   {
  //     path: PATHS.DECIMAL_TO_HEX,
  //     component: <DecimalToHexConverter />,
  //   },
  //   {
  //     path: PATHS.HEX_TO_BINARY,
  //     component: <HexToBinaryConverter />,
  //   },
  //   {
  //     path: PATHS.OCTAL_TO_BINARY,
  //     component: <OctalToBinaryConverter />,
  //   },
  //   {
  //     path: PATHS.MILES_TO_KILOMETERS,
  //     component: <MilesToKmConverter />,
  //   },
  //   {
  //     path: PATHS.KILOMETERS_TO_MILES,
  //     component: <KmToMilesConverter />,
  //   },
  //   {
  //     path: PATHS.JWT_DECODER,
  //     component: <JwtDecoder />,
  //   },
  //   {
  //     path: PATHS.IP_TO_HEX,
  //     component: <IpToHexConverter />,
  //   },
  // {
  //   path: PATHS.WORDS_TO_NUMBERS,
  //   component: <WordsToNumbers />,
  // },
  //   {
  //     path: PATHS.NUMBERS_TO_WORDS,
  //     component: <NumbersToWordsConverter />,
  //   },
  //   {
  //     path: PATHS.FABONACCI_CALCULATOR,
  //     component: <FibonacciCalculator />,
  //   },
  //   {
  //     path: PATHS.BITWISE_CALCULATOR,
  //     component: <BitwiseCalculator />,
  //   },
  //   {
  //     path: PATHS.GRAPHQL_FORMATTER,
  //     component: <GraphQLFormatter />,
  //   },
  //   {
  //     path: PATHS.CELCIUS_TO_FAHRENHEIT,
  //     component: <CelsiusFahrenheitConverter />,
  //   },
  //   {
  //     path: PATHS.BARCODE_GENERATOR,
  //     component: <BarcodeGenerator />,
  //   },
  //   {
  //     path: PATHS.FIND_AND_REPLACE_STRING,
  //     component: <FindAndReplaceString />,
  //   },
  //   {
  //     path: PATHS.API_KEY_GENERATOR,
  //     component: <ApiKeyGenerator />,
  //   },
  //   {
  //     path: PATHS.HTML_ESCAPE,
  //     component: <HtmlEscape />,
  //   },
  //   {
  //     path: PATHS.HTML_UNESCAPE,
  //     component: <HtmlUnescape />,
  //   },
  // {
  //   path: PATHS.JAVASCRIPT_REGEX_TESTER,
  //   component: <JavascriptRegexTester />,
  // },
  // {
  //   path: PATHS.STRIP_HTML,
  //   component: <StripHTML />,
  // },
  // {
  //   path: PATHS.WHAT_IS_MY_LOCAL_IP_ADDRESS,
  //   component: <WhatIsMyLocalIPAddress />,
  // },
  // {
  //   path: PATHS.JAVASCRIPT_TESTER,
  //   component: <JavaScriptTester />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_JAVA,
  //   component: <WhatVersionOfJavaDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_MACOS,
  //   component: <WhatVersionOfMacOSDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_FIREFOX,
  //   component: <WhatVersionOfFirefoxDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_IOS,
  //   component: <WhatVersionOfIOSDoIHave />,
  // },
  // {
  //   path: PATHS.WHATS_MY_BROWSER_SIZE,
  //   component: <WhatsMyBrowserSize />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_SAFARI,
  //   component: <WhatVersionOfSafariDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_ANDROID,
  //   component: <WhatVersionOfAndroidDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_VERSION_OF_FLASH,
  //   component: <WhatVersionOfFlashDoIHave />,
  // },
  // {
  //   path: PATHS.WHAT_IS_MY_ISP,
  //   component: <WhatIsMyISP />,
  // },
  // {
  //   path: PATHS.AM_I_USING_TOR,
  //   component: <AmIUsingTor />,
  // },
  // {
  //   path: PATHS.HTML_TESTER,
  //   component: <HtmlTester />,
  // },
  // {
  //   path: PATHS.EXCEL_COMPARE,
  //   component: <ExcelCompare />,
  // },
  // {
  //   path: PATHS.JAVASCRIPT_ESCAPE,
  //   component: <JavaScriptEscape />,
  // },
  // {
  //   path: PATHS.JAVASCRIPT_VALIDATOR_LINTER,
  //   component: <JavaScriptValidatorLinter />,
  // },
  // {
  //   path: PATHS.XML_ESCAPE,
  //   component: <XMLEscape />,
  // },
  // {
  //   path: PATHS.CSS_VALIDATOR,
  //   component: <CssValidator />,
  // },
  // {
  //   path: PATHS.CSS_TO_SASS,
  //   component: <CssToSass />,
  // },
  // {
  //   path: PATHS.CSS_TO_LESS,
  //   component: <CssToLess />,
  // },
  // {
  //   path: PATHS.CRONTAB_GENERATOR,
  //   component: <CrontabGenerator />,
  // },
  // {
  //   path: PATHS.MORSE_CODE_TRANSLATOR,
  //   component: <MorseCodeTranslator />,
  // },
  // {
  //   path: PATHS.XML_TO_JSON_CONVERTER,
  //   component: <XmlToJsonConverter />,
  // },
  // *{
  //   path: PATHS.BCD_TO_DECIMAL_CONVERTER,
  //   component: <BcdToDecimalConverter />,
  // },
  // {
  //   path: PATHS.HTML_TO_BBCODE,
  //   component: <HtmlToBBCode />,
  // },
  // {
  //   path: PATHS.SQL_TO_JSON,
  //   component: <SqlToJson />,
  // },
  // {
  //   path: PATHS.HTML_TO_JADE,
  //   component: <HtmlToJade />,
  // },
];

// lorem ipsum text
export const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
