/* eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import { meta as Meta0 } from '../components/developmentToolsComponent/amIUsingTor.meta';
import { meta as Meta1 } from '../components/developmentToolsComponent/apiKeyGenerator.meta';
import { meta as Meta2 } from '../components/developmentToolsComponent/asciiToDecimalConverter.meta';
import { meta as Meta3 } from '../components/developmentToolsComponent/asciiToUnicodeConverter.meta';
import { meta as Meta4 } from '../components/developmentToolsComponent/barcodeGenerator.meta';
import { meta as Meta5 } from '../components/developmentToolsComponent/base64Decoder.meta';
import { meta as Meta6 } from '../components/developmentToolsComponent/base64Encoder.meta';
import { meta as Meta7 } from '../components/developmentToolsComponent/bcdToDecimalConverter.meta';
import { meta as Meta8 } from '../components/developmentToolsComponent/bcryptGenerator.meta';
import { meta as Meta9 } from '../components/developmentToolsComponent/binaryToDecimalConverter.meta';
import { meta as Meta10 } from '../components/developmentToolsComponent/bitwiseCalculator.meta';
import { meta as Meta11 } from '../components/developmentToolsComponent/celsiusFahrenheitConverter.meta';
import { meta as Meta12 } from '../components/developmentToolsComponent/characterCounterComponent.meta';
import { meta as Meta13 } from '../components/developmentToolsComponent/cmykToHexConverter.meta';
import { meta as Meta14 } from '../components/developmentToolsComponent/cmykToRgbConverter.meta';
import { meta as Meta15 } from '../components/developmentToolsComponent/codeCompareTool.meta';
import { meta as Meta16 } from '../components/developmentToolsComponent/colorInvertor.meta';
import { meta as Meta17 } from '../components/developmentToolsComponent/colorPickerTool.meta';
import { meta as Meta18 } from '../components/developmentToolsComponent/creditCardGeneratorComponent.meta';
import { meta as Meta19 } from '../components/developmentToolsComponent/creditCardValidatorComponent.meta';
import { meta as Meta20 } from '../components/developmentToolsComponent/crontabGenerator.meta';
import { meta as Meta21 } from '../components/developmentToolsComponent/cssMinify.meta';
import { meta as Meta22 } from '../components/developmentToolsComponent/cssPrettify.meta';
import { meta as Meta23 } from '../components/developmentToolsComponent/cssToLess.meta';
import { meta as Meta24 } from '../components/developmentToolsComponent/cssToSass.meta';
import { meta as Meta25 } from '../components/developmentToolsComponent/cssToScssConverter.meta';
import { meta as Meta26 } from '../components/developmentToolsComponent/cssToStylus.meta';
import { meta as Meta27 } from '../components/developmentToolsComponent/cssValidator.meta';
import { meta as Meta28 } from '../components/developmentToolsComponent/csvToExcelFileConvertor.meta';
import { meta as Meta29 } from '../components/developmentToolsComponent/csvToJson.meta';
import { meta as Meta30 } from '../components/developmentToolsComponent/csvToTextConverter.meta';
import { meta as Meta31 } from '../components/developmentToolsComponent/curlToCodeConverter.meta';
import { meta as Meta32 } from '../components/developmentToolsComponent/decimalToAsciiConverter.meta';
import { meta as Meta33 } from '../components/developmentToolsComponent/decimalToBinaryConverter.meta';
import { meta as Meta34 } from '../components/developmentToolsComponent/decimalToGrayCode.meta';
import { meta as Meta35 } from '../components/developmentToolsComponent/decimalToHexConverter.meta';
import { meta as Meta36 } from '../components/developmentToolsComponent/decimalToOctalConverter.meta';
import { meta as Meta37 } from '../components/developmentToolsComponent/excelCompare.meta';
import { meta as Meta38 } from '../components/developmentToolsComponent/fibonacciCalculator.meta';
import { meta as Meta39 } from '../components/developmentToolsComponent/findAndReplaceString.meta';
import { meta as Meta40 } from '../components/developmentToolsComponent/graphqlFormatter.meta';
import { meta as Meta41 } from '../components/developmentToolsComponent/greyCodeToDesimal.meta';
import { meta as Meta42 } from '../components/developmentToolsComponent/hexToAscii.meta';
import { meta as Meta43 } from '../components/developmentToolsComponent/hexToBinaryConverter.meta';
import { meta as Meta44 } from '../components/developmentToolsComponent/hexToCmykConverter.meta';
import { meta as Meta45 } from '../components/developmentToolsComponent/hexToPantone.meta';
import { meta as Meta46 } from '../components/developmentToolsComponent/hexToRGBConverter.meta';
import { meta as Meta47 } from '../components/developmentToolsComponent/hoursToSecounds.meta';
import { meta as Meta48 } from '../components/developmentToolsComponent/htmlCodeGenerator.meta';
import { meta as Meta49 } from '../components/developmentToolsComponent/htmlEntitiesToTextConverter.meta';
import { meta as Meta50 } from '../components/developmentToolsComponent/htmlEscape.meta';
import { meta as Meta51 } from '../components/developmentToolsComponent/htmlMinify.meta';
import { meta as Meta52 } from '../components/developmentToolsComponent/htmlPrettify.meta';
import { meta as Meta53 } from '../components/developmentToolsComponent/htmlTester.meta';
import { meta as Meta54 } from '../components/developmentToolsComponent/htmlToBBCode.meta';
import { meta as Meta55 } from '../components/developmentToolsComponent/htmlToJade.meta';
import { meta as Meta56 } from '../components/developmentToolsComponent/htmlToMarkDownComponent.meta';
import { meta as Meta57 } from '../components/developmentToolsComponent/htmlUnescape.meta';
import { meta as Meta58 } from '../components/developmentToolsComponent/htmlValidator.meta';
import { meta as Meta59 } from '../components/developmentToolsComponent/htmlViewer.meta';
import { meta as Meta60 } from '../components/developmentToolsComponent/idnDecode.meta';
import { meta as Meta61 } from '../components/developmentToolsComponent/idnEncode.meta';
import { meta as Meta62 } from '../components/developmentToolsComponent/internetSpeedTest.meta';
import { meta as Meta63 } from '../components/developmentToolsComponent/ipToHexConverter.meta';
import { meta as Meta64 } from '../components/developmentToolsComponent/javascriptEscape.meta';
import { meta as Meta65 } from '../components/developmentToolsComponent/javascriptMinifierComponent.meta';
import { meta as Meta66 } from '../components/developmentToolsComponent/javascriptRegexTester.meta';
import { meta as Meta67 } from '../components/developmentToolsComponent/javascriptTester.meta';
import { meta as Meta68 } from '../components/developmentToolsComponent/javascriptValidatorLinter.meta';
import { meta as Meta69 } from '../components/developmentToolsComponent/jsObfuscatorComponent.meta';
import { meta as Meta70 } from '../components/developmentToolsComponent/jsonCompare.meta';
import { meta as Meta71 } from '../components/developmentToolsComponent/jsonMinifierComponent.meta';
import { meta as Meta72 } from '../components/developmentToolsComponent/jsonPrittifierComponent.meta';
import { meta as Meta73 } from '../components/developmentToolsComponent/jsonToCsvConverter.meta';
import { meta as Meta74 } from '../components/developmentToolsComponent/jsonToTxt.meta';
import { meta as Meta75 } from '../components/developmentToolsComponent/jsonToTypeScript.meta';
import { meta as Meta76 } from '../components/developmentToolsComponent/jsonToXmlConverter.meta';
import { meta as Meta77 } from '../components/developmentToolsComponent/jsonToYamlConverter.meta';
import { meta as Meta78 } from '../components/developmentToolsComponent/jsonValidator.meta';
import { meta as Meta79 } from '../components/developmentToolsComponent/jwtDecoder.meta';
import { meta as Meta80 } from '../components/developmentToolsComponent/kmToMilesConverter.meta';
import { meta as Meta81 } from '../components/developmentToolsComponent/lineCounterComponent.meta';
import { meta as Meta82 } from '../components/developmentToolsComponent/loremIpsumGeneratorComponent.meta';
import { meta as Meta83 } from '../components/developmentToolsComponent/lowerCaseConverterComponent.meta';
import { meta as Meta84 } from '../components/developmentToolsComponent/markdownFormatter.meta';
import { meta as Meta85 } from '../components/developmentToolsComponent/markDownToHTMLComponent.meta';
import { meta as Meta86 } from '../components/developmentToolsComponent/milesToKmConverter.meta';
import { meta as Meta87 } from '../components/developmentToolsComponent/morseCodeTranslator.meta';
import { meta as Meta88 } from '../components/developmentToolsComponent/numbersToWordsConverter.meta';
import { meta as Meta89 } from '../components/developmentToolsComponent/octalToBinaryConverter.meta';
import { meta as Meta90 } from '../components/developmentToolsComponent/octalToDecimalConverter.meta';
import { meta as Meta91 } from '../components/developmentToolsComponent/phoneNumberExtractor.meta';
import { meta as Meta92 } from '../components/developmentToolsComponent/phpFormatter.meta';
import { meta as Meta93 } from '../components/developmentToolsComponent/placeholderImageGenerator.meta';
import { meta as Meta94 } from '../components/developmentToolsComponent/pxToRemConverter.meta';
import { meta as Meta95 } from '../components/developmentToolsComponent/pythonFormatter.meta';
import { meta as Meta96 } from '../components/developmentToolsComponent/qrCodeGenerator.meta';
import { meta as Meta97 } from '../components/developmentToolsComponent/randomAddressGenerator.meta';
import { meta as Meta98 } from '../components/developmentToolsComponent/randomCharacterGenerator.meta';
import { meta as Meta99 } from '../components/developmentToolsComponent/randomClockTimeGenerator.meta';
import { meta as Meta100 } from '../components/developmentToolsComponent/randomColorGenerator.meta';
import { meta as Meta101 } from '../components/developmentToolsComponent/randomCSVGenerator.meta';
import { meta as Meta102 } from '../components/developmentToolsComponent/randomDateGenerator.meta';
import { meta as Meta103 } from '../components/developmentToolsComponent/randomDecimalNumberGenerator.meta';
import { meta as Meta104 } from '../components/developmentToolsComponent/randomGUIDGenerator.meta';
import { meta as Meta105 } from '../components/developmentToolsComponent/randomIPGenerator.meta';
import { meta as Meta106 } from '../components/developmentToolsComponent/randomJsonDataGenerator.meta';
import { meta as Meta107 } from '../components/developmentToolsComponent/randomNumberGenerator.meta';
import { meta as Meta108 } from '../components/developmentToolsComponent/randomParagraphGenerator.meta';
import { meta as Meta109 } from '../components/developmentToolsComponent/randomPasswardGenerator.meta';
import { meta as Meta110 } from '../components/developmentToolsComponent/randomSentanceGenerator.meta';
import { meta as Meta111 } from '../components/developmentToolsComponent/randomStringGenerator.meta';
import { meta as Meta112 } from '../components/developmentToolsComponent/randomTextFromRegEX.meta';
import { meta as Meta113 } from '../components/developmentToolsComponent/randomUsernameGenerator.meta';
import { meta as Meta114 } from '../components/developmentToolsComponent/randomWordGenerator.meta';
import { meta as Meta115 } from '../components/developmentToolsComponent/randomXMLGenerator.meta';
import { meta as Meta116 } from '../components/developmentToolsComponent/removeSpaces.meta';
import { meta as Meta117 } from '../components/developmentToolsComponent/remToPxConverter.meta';
import { meta as Meta118 } from '../components/developmentToolsComponent/reverseTextGenerator.meta';
import { meta as Meta119 } from '../components/developmentToolsComponent/rgbToCmykConverter.meta';
import { meta as Meta120 } from '../components/developmentToolsComponent/rgbToHexConverter.meta';
import { meta as Meta121 } from '../components/developmentToolsComponent/rot13EncoderDecoderComponent.meta';
import { meta as Meta122 } from '../components/developmentToolsComponent/rotateImageTool.meta';
import { meta as Meta123 } from '../components/developmentToolsComponent/rotationCalculatorComponent.meta';
import { meta as Meta124 } from '../components/developmentToolsComponent/roundingCalculator.meta';
import { meta as Meta125 } from '../components/developmentToolsComponent/scssToCssConverter.meta';
import { meta as Meta126 } from '../components/developmentToolsComponent/sentenceCounterComponent.meta';
import { meta as Meta127 } from '../components/developmentToolsComponent/shuffleLetters.meta';
import { meta as Meta128 } from '../components/developmentToolsComponent/shuffleTextLines.meta';
import { meta as Meta129 } from '../components/developmentToolsComponent/sortingList.meta';
import { meta as Meta130 } from '../components/developmentToolsComponent/sortNumbers.meta';
import { meta as Meta131 } from '../components/developmentToolsComponent/sortWords.meta';
import { meta as Meta132 } from '../components/developmentToolsComponent/sqlFormatterAndBeautifier.meta';
import { meta as Meta133 } from '../components/developmentToolsComponent/sqlMinify.meta';
import { meta as Meta134 } from '../components/developmentToolsComponent/sqlToCsvConverter.meta';
import { meta as Meta135 } from '../components/developmentToolsComponent/sqlToJson.meta';
import { meta as Meta136 } from '../components/developmentToolsComponent/stringDiffrenceChecker.meta';
import { meta as Meta137 } from '../components/developmentToolsComponent/stripHTML.meta';
import { meta as Meta138 } from '../components/developmentToolsComponent/textCompare.meta';
import { meta as Meta139 } from '../components/developmentToolsComponent/textRepeater.meta';
import { meta as Meta140 } from '../components/developmentToolsComponent/textToCsv.meta';
import { meta as Meta141 } from '../components/developmentToolsComponent/textToHtmlEntitiesConvertor.meta';
import { meta as Meta142 } from '../components/developmentToolsComponent/textToOneLine.meta';
import { meta as Meta143 } from '../components/developmentToolsComponent/txtToCsvConverter.meta';
import { meta as Meta144 } from '../components/developmentToolsComponent/typescriptFormatter.meta';
import { meta as Meta145 } from '../components/developmentToolsComponent/unicodeToAsciiConverter.meta';
import { meta as Meta146 } from '../components/developmentToolsComponent/upperCaseConverterComponent.meta';
import { meta as Meta147 } from '../components/developmentToolsComponent/urlDecode.meta';
import { meta as Meta148 } from '../components/developmentToolsComponent/urlEncode.meta';
import { meta as Meta149 } from '../components/developmentToolsComponent/utf8Decode.meta';
import { meta as Meta150 } from '../components/developmentToolsComponent/utf8Encode.meta';
import { meta as Meta151 } from '../components/developmentToolsComponent/whatIsMyBrowser.meta';
import { meta as Meta152 } from '../components/developmentToolsComponent/whatIsMyISP.meta';
import { meta as Meta153 } from '../components/developmentToolsComponent/whatIsMyLocalIPAddress.meta';
import { meta as Meta154 } from '../components/developmentToolsComponent/whatIsMyUserAgent.meta';
import { meta as Meta155 } from '../components/developmentToolsComponent/whatOperatingSystemDoIHave.meta';
import { meta as Meta156 } from '../components/developmentToolsComponent/whatsMyBrowserSize.meta';
import { meta as Meta157 } from '../components/developmentToolsComponent/whatVersionOfAndroidDoIHave.meta';
import { meta as Meta158 } from '../components/developmentToolsComponent/whatVersionOfChromeDoIHave.meta';
import { meta as Meta159 } from '../components/developmentToolsComponent/whatVersionOfFirefoxDoIHave.meta';
import { meta as Meta160 } from '../components/developmentToolsComponent/whatVersionOfFlashDoIHave.meta';
import { meta as Meta161 } from '../components/developmentToolsComponent/whatVersionOfIOSDoIHave.meta';
import { meta as Meta162 } from '../components/developmentToolsComponent/whatVersionOfJavaDoIHave.meta';
import { meta as Meta163 } from '../components/developmentToolsComponent/whatVersionOfMacOSDoIHave.meta';
import { meta as Meta164 } from '../components/developmentToolsComponent/whatVersionOfSafariDoIHave.meta';
import { meta as Meta165 } from '../components/developmentToolsComponent/whatVersionOfWindowsDoIHave.meta';
import { meta as Meta166 } from '../components/developmentToolsComponent/wordCounterComponent.meta';
import { meta as Meta167 } from '../components/developmentToolsComponent/wordsToNumbers.meta';
import { meta as Meta168 } from '../components/developmentToolsComponent/xmlCompare.meta';
import { meta as Meta169 } from '../components/developmentToolsComponent/xmlEscape.meta';
import { meta as Meta170 } from '../components/developmentToolsComponent/xmlMinify.meta';
import { meta as Meta171 } from '../components/developmentToolsComponent/xmlPrettify.meta';
import { meta as Meta172 } from '../components/developmentToolsComponent/xmlToJsonConverter.meta';
import { meta as Meta173 } from '../components/developmentToolsComponent/xorCalculator.meta';
import { meta as Meta174 } from '../components/developmentToolsComponent/yamlFormatterAndBeautifier.meta';
export const DEVELOPMENTTOOLS: Record<string, any> = {};
export const developmentToolsCategoryContent: Record<string, any[]> = {};

const allMeta = [
  Meta0,
  Meta1,
  Meta2,
  Meta3,
  Meta4,
  Meta5,
  Meta6,
  Meta7,
  Meta8,
  Meta9,
  Meta10,
  Meta11,
  Meta12,
  Meta13,
  Meta14,
  Meta15,
  Meta16,
  Meta17,
  Meta18,
  Meta19,
  Meta20,
  Meta21,
  Meta22,
  Meta23,
  Meta24,
  Meta25,
  Meta26,
  Meta27,
  Meta28,
  Meta29,
  Meta30,
  Meta31,
  Meta32,
  Meta33,
  Meta34,
  Meta35,
  Meta36,
  Meta37,
  Meta38,
  Meta39,
  Meta40,
  Meta41,
  Meta42,
  Meta43,
  Meta44,
  Meta45,
  Meta46,
  Meta47,
  Meta48,
  Meta49,
  Meta50,
  Meta51,
  Meta52,
  Meta53,
  Meta54,
  Meta55,
  Meta56,
  Meta57,
  Meta58,
  Meta59,
  Meta60,
  Meta61,
  Meta62,
  Meta63,
  Meta64,
  Meta65,
  Meta66,
  Meta67,
  Meta68,
  Meta69,
  Meta70,
  Meta71,
  Meta72,
  Meta73,
  Meta74,
  Meta75,
  Meta76,
  Meta77,
  Meta78,
  Meta79,
  Meta80,
  Meta81,
  Meta82,
  Meta83,
  Meta84,
  Meta85,
  Meta86,
  Meta87,
  Meta88,
  Meta89,
  Meta90,
  Meta91,
  Meta92,
  Meta93,
  Meta94,
  Meta95,
  Meta96,
  Meta97,
  Meta98,
  Meta99,
  Meta100,
  Meta101,
  Meta102,
  Meta103,
  Meta104,
  Meta105,
  Meta106,
  Meta107,
  Meta108,
  Meta109,
  Meta110,
  Meta111,
  Meta112,
  Meta113,
  Meta114,
  Meta115,
  Meta116,
  Meta117,
  Meta118,
  Meta119,
  Meta120,
  Meta121,
  Meta122,
  Meta123,
  Meta124,
  Meta125,
  Meta126,
  Meta127,
  Meta128,
  Meta129,
  Meta130,
  Meta131,
  Meta132,
  Meta133,
  Meta134,
  Meta135,
  Meta136,
  Meta137,
  Meta138,
  Meta139,
  Meta140,
  Meta141,
  Meta142,
  Meta143,
  Meta144,
  Meta145,
  Meta146,
  Meta147,
  Meta148,
  Meta149,
  Meta150,
  Meta151,
  Meta152,
  Meta153,
  Meta154,
  Meta155,
  Meta156,
  Meta157,
  Meta158,
  Meta159,
  Meta160,
  Meta161,
  Meta162,
  Meta163,
  Meta164,
  Meta165,
  Meta166,
  Meta167,
  Meta168,
  Meta169,
  Meta170,
  Meta171,
  Meta172,
  Meta173,
  Meta174,
];

allMeta.forEach((m: any) => {
  const meta: any = m;
  DEVELOPMENTTOOLS[meta.slug] = meta;
  const cat = meta.category || 'Category1';
  if (!developmentToolsCategoryContent[cat]) {
    developmentToolsCategoryContent[cat] = [];
  }
  developmentToolsCategoryContent[cat].push({
    url: meta.route,
    title: meta.title || meta.hero_section?.title || '',
    description: meta.description || meta.hero_section?.description || '',
    isNew: false
  });
});

export const developmentToolsRoutes: any[] = [
  {
    path: Meta0.route,
    component: dynamic(() => import('../components/developmentToolsComponent/amIUsingTor')),
  },
  {
    path: Meta1.route,
    component: dynamic(() => import('../components/developmentToolsComponent/apiKeyGenerator')),
  },
  {
    path: Meta2.route,
    component: dynamic(() => import('../components/developmentToolsComponent/asciiToDecimalConverter')),
  },
  {
    path: Meta3.route,
    component: dynamic(() => import('../components/developmentToolsComponent/asciiToUnicodeConverter')),
  },
  {
    path: Meta4.route,
    component: dynamic(() => import('../components/developmentToolsComponent/barcodeGenerator')),
  },
  {
    path: Meta5.route,
    component: dynamic(() => import('../components/developmentToolsComponent/base64Decoder')),
  },
  {
    path: Meta6.route,
    component: dynamic(() => import('../components/developmentToolsComponent/base64Encoder')),
  },
  {
    path: Meta7.route,
    component: dynamic(() => import('../components/developmentToolsComponent/bcdToDecimalConverter')),
  },
  {
    path: Meta8.route,
    component: dynamic(() => import('../components/developmentToolsComponent/bcryptGenerator')),
  },
  {
    path: Meta9.route,
    component: dynamic(() => import('../components/developmentToolsComponent/binaryToDecimalConverter')),
  },
  {
    path: Meta10.route,
    component: dynamic(() => import('../components/developmentToolsComponent/bitwiseCalculator')),
  },
  {
    path: Meta11.route,
    component: dynamic(() => import('../components/developmentToolsComponent/celsiusFahrenheitConverter')),
  },
  {
    path: Meta12.route,
    component: dynamic(() => import('../components/developmentToolsComponent/characterCounterComponent')),
  },
  {
    path: Meta13.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cmykToHexConverter')),
  },
  {
    path: Meta14.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cmykToRgbConverter')),
  },
  {
    path: Meta15.route,
    component: dynamic(() => import('../components/developmentToolsComponent/codeCompareTool')),
  },
  {
    path: Meta16.route,
    component: dynamic(() => import('../components/developmentToolsComponent/colorInvertor')),
  },
  {
    path: Meta17.route,
    component: dynamic(() => import('../components/developmentToolsComponent/colorPickerTool')),
  },
  {
    path: Meta18.route,
    component: dynamic(() => import('../components/developmentToolsComponent/creditCardGeneratorComponent')),
  },
  {
    path: Meta19.route,
    component: dynamic(() => import('../components/developmentToolsComponent/creditCardValidatorComponent')),
  },
  {
    path: Meta20.route,
    component: dynamic(() => import('../components/developmentToolsComponent/crontabGenerator')),
  },
  {
    path: Meta21.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssMinify')),
  },
  {
    path: Meta22.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssPrettify')),
  },
  {
    path: Meta23.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssToLess')),
  },
  {
    path: Meta24.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssToSass')),
  },
  {
    path: Meta25.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssToScssConverter')),
  },
  {
    path: Meta26.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssToStylus')),
  },
  {
    path: Meta27.route,
    component: dynamic(() => import('../components/developmentToolsComponent/cssValidator')),
  },
  {
    path: Meta28.route,
    component: dynamic(() => import('../components/developmentToolsComponent/csvToExcelFileConvertor')),
  },
  {
    path: Meta29.route,
    component: dynamic(() => import('../components/developmentToolsComponent/csvToJson')),
  },
  {
    path: Meta30.route,
    component: dynamic(() => import('../components/developmentToolsComponent/csvToTextConverter')),
  },
  {
    path: Meta31.route,
    component: dynamic(() => import('../components/developmentToolsComponent/curlToCodeConverter')),
  },
  {
    path: Meta32.route,
    component: dynamic(() => import('../components/developmentToolsComponent/decimalToAsciiConverter')),
  },
  {
    path: Meta33.route,
    component: dynamic(() => import('../components/developmentToolsComponent/decimalToBinaryConverter')),
  },
  {
    path: Meta34.route,
    component: dynamic(() => import('../components/developmentToolsComponent/decimalToGrayCode')),
  },
  {
    path: Meta35.route,
    component: dynamic(() => import('../components/developmentToolsComponent/decimalToHexConverter')),
  },
  {
    path: Meta36.route,
    component: dynamic(() => import('../components/developmentToolsComponent/decimalToOctalConverter')),
  },
  {
    path: Meta37.route,
    component: dynamic(() => import('../components/developmentToolsComponent/excelCompare')),
  },
  {
    path: Meta38.route,
    component: dynamic(() => import('../components/developmentToolsComponent/fibonacciCalculator')),
  },
  {
    path: Meta39.route,
    component: dynamic(() => import('../components/developmentToolsComponent/findAndReplaceString')),
  },
  {
    path: Meta40.route,
    component: dynamic(() => import('../components/developmentToolsComponent/graphqlFormatter')),
  },
  {
    path: Meta41.route,
    component: dynamic(() => import('../components/developmentToolsComponent/greyCodeToDesimal')),
  },
  {
    path: Meta42.route,
    component: dynamic(() => import('../components/developmentToolsComponent/hexToAscii')),
  },
  {
    path: Meta43.route,
    component: dynamic(() => import('../components/developmentToolsComponent/hexToBinaryConverter')),
  },
  {
    path: Meta44.route,
    component: dynamic(() => import('../components/developmentToolsComponent/hexToCmykConverter')),
  },
  {
    path: Meta45.route,
    component: dynamic(() => import('../components/developmentToolsComponent/hexToPantone')),
  },
  {
    path: Meta46.route,
    component: dynamic(() => import('../components/developmentToolsComponent/hexToRGBConverter')),
  },
  {
    path: Meta47.route,
    component: dynamic(() => import('../components/developmentToolsComponent/hoursToSecounds')),
  },
  {
    path: Meta48.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlCodeGenerator')),
  },
  {
    path: Meta49.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlEntitiesToTextConverter')),
  },
  {
    path: Meta50.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlEscape')),
  },
  {
    path: Meta51.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlMinify')),
  },
  {
    path: Meta52.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlPrettify')),
  },
  {
    path: Meta53.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlTester')),
  },
  {
    path: Meta54.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlToBBCode')),
  },
  {
    path: Meta55.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlToJade')),
  },
  {
    path: Meta56.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlToMarkDownComponent')),
  },
  {
    path: Meta57.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlUnescape')),
  },
  {
    path: Meta58.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlValidator')),
  },
  {
    path: Meta59.route,
    component: dynamic(() => import('../components/developmentToolsComponent/htmlViewer')),
  },
  {
    path: Meta60.route,
    component: dynamic(() => import('../components/developmentToolsComponent/idnDecode')),
  },
  {
    path: Meta61.route,
    component: dynamic(() => import('../components/developmentToolsComponent/idnEncode')),
  },
  {
    path: Meta62.route,
    component: dynamic(() => import('../components/developmentToolsComponent/internetSpeedTest')),
  },
  {
    path: Meta63.route,
    component: dynamic(() => import('../components/developmentToolsComponent/ipToHexConverter')),
  },
  {
    path: Meta64.route,
    component: dynamic(() => import('../components/developmentToolsComponent/javascriptEscape')),
  },
  {
    path: Meta65.route,
    component: dynamic(() => import('../components/developmentToolsComponent/javascriptMinifierComponent')),
  },
  {
    path: Meta66.route,
    component: dynamic(() => import('../components/developmentToolsComponent/javascriptRegexTester')),
  },
  {
    path: Meta67.route,
    component: dynamic(() => import('../components/developmentToolsComponent/javascriptTester')),
  },
  {
    path: Meta68.route,
    component: dynamic(() => import('../components/developmentToolsComponent/javascriptValidatorLinter')),
  },
  {
    path: Meta69.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsObfuscatorComponent')),
  },
  {
    path: Meta70.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonCompare')),
  },
  {
    path: Meta71.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonMinifierComponent')),
  },
  {
    path: Meta72.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonPrittifierComponent')),
  },
  {
    path: Meta73.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonToCsvConverter')),
  },
  {
    path: Meta74.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonToTxt')),
  },
  {
    path: Meta75.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonToTypeScript')),
  },
  {
    path: Meta76.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonToXmlConverter')),
  },
  {
    path: Meta77.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonToYamlConverter')),
  },
  {
    path: Meta78.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jsonValidator')),
  },
  {
    path: Meta79.route,
    component: dynamic(() => import('../components/developmentToolsComponent/jwtDecoder')),
  },
  {
    path: Meta80.route,
    component: dynamic(() => import('../components/developmentToolsComponent/kmToMilesConverter')),
  },
  {
    path: Meta81.route,
    component: dynamic(() => import('../components/developmentToolsComponent/lineCounterComponent')),
  },
  {
    path: Meta82.route,
    component: dynamic(() => import('../components/developmentToolsComponent/loremIpsumGeneratorComponent')),
  },
  {
    path: Meta83.route,
    component: dynamic(() => import('../components/developmentToolsComponent/lowerCaseConverterComponent')),
  },
  {
    path: Meta84.route,
    component: dynamic(() => import('../components/developmentToolsComponent/markdownFormatter')),
  },
  {
    path: Meta85.route,
    component: dynamic(() => import('../components/developmentToolsComponent/markDownToHTMLComponent')),
  },
  {
    path: Meta86.route,
    component: dynamic(() => import('../components/developmentToolsComponent/milesToKmConverter')),
  },
  {
    path: Meta87.route,
    component: dynamic(() => import('../components/developmentToolsComponent/morseCodeTranslator')),
  },
  {
    path: Meta88.route,
    component: dynamic(() => import('../components/developmentToolsComponent/numbersToWordsConverter')),
  },
  {
    path: Meta89.route,
    component: dynamic(() => import('../components/developmentToolsComponent/octalToBinaryConverter')),
  },
  {
    path: Meta90.route,
    component: dynamic(() => import('../components/developmentToolsComponent/octalToDecimalConverter')),
  },
  {
    path: Meta91.route,
    component: dynamic(() => import('../components/developmentToolsComponent/phoneNumberExtractor')),
  },
  {
    path: Meta92.route,
    component: dynamic(() => import('../components/developmentToolsComponent/phpFormatter')),
  },
  {
    path: Meta93.route,
    component: dynamic(() => import('../components/developmentToolsComponent/placeholderImageGenerator')),
  },
  {
    path: Meta94.route,
    component: dynamic(() => import('../components/developmentToolsComponent/pxToRemConverter')),
  },
  {
    path: Meta95.route,
    component: dynamic(() => import('../components/developmentToolsComponent/pythonFormatter')),
  },
  {
    path: Meta96.route,
    component: dynamic(() => import('../components/developmentToolsComponent/qrCodeGenerator')),
  },
  {
    path: Meta97.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomAddressGenerator')),
  },
  {
    path: Meta98.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomCharacterGenerator')),
  },
  {
    path: Meta99.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomClockTimeGenerator')),
  },
  {
    path: Meta100.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomColorGenerator')),
  },
  {
    path: Meta101.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomCSVGenerator')),
  },
  {
    path: Meta102.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomDateGenerator')),
  },
  {
    path: Meta103.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomDecimalNumberGenerator')),
  },
  {
    path: Meta104.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomGUIDGenerator')),
  },
  {
    path: Meta105.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomIPGenerator')),
  },
  {
    path: Meta106.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomJsonDataGenerator')),
  },
  {
    path: Meta107.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomNumberGenerator')),
  },
  {
    path: Meta108.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomParagraphGenerator')),
  },
  {
    path: Meta109.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomPasswardGenerator')),
  },
  {
    path: Meta110.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomSentanceGenerator')),
  },
  {
    path: Meta111.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomStringGenerator')),
  },
  {
    path: Meta112.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomTextFromRegEX')),
  },
  {
    path: Meta113.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomUsernameGenerator')),
  },
  {
    path: Meta114.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomWordGenerator')),
  },
  {
    path: Meta115.route,
    component: dynamic(() => import('../components/developmentToolsComponent/randomXMLGenerator')),
  },
  {
    path: Meta116.route,
    component: dynamic(() => import('../components/developmentToolsComponent/removeSpaces')),
  },
  {
    path: Meta117.route,
    component: dynamic(() => import('../components/developmentToolsComponent/remToPxConverter')),
  },
  {
    path: Meta118.route,
    component: dynamic(() => import('../components/developmentToolsComponent/reverseTextGenerator')),
  },
  {
    path: Meta119.route,
    component: dynamic(() => import('../components/developmentToolsComponent/rgbToCmykConverter')),
  },
  {
    path: Meta120.route,
    component: dynamic(() => import('../components/developmentToolsComponent/rgbToHexConverter')),
  },
  {
    path: Meta121.route,
    component: dynamic(() => import('../components/developmentToolsComponent/rot13EncoderDecoderComponent')),
  },
  {
    path: Meta122.route,
    component: dynamic(() => import('../components/developmentToolsComponent/rotateImageTool')),
  },
  {
    path: Meta123.route,
    component: dynamic(() => import('../components/developmentToolsComponent/rotationCalculatorComponent')),
  },
  {
    path: Meta124.route,
    component: dynamic(() => import('../components/developmentToolsComponent/roundingCalculator')),
  },
  {
    path: Meta125.route,
    component: dynamic(() => import('../components/developmentToolsComponent/scssToCssConverter')),
  },
  {
    path: Meta126.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sentenceCounterComponent')),
  },
  {
    path: Meta127.route,
    component: dynamic(() => import('../components/developmentToolsComponent/shuffleLetters')),
  },
  {
    path: Meta128.route,
    component: dynamic(() => import('../components/developmentToolsComponent/shuffleTextLines')),
  },
  {
    path: Meta129.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sortingList')),
  },
  {
    path: Meta130.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sortNumbers')),
  },
  {
    path: Meta131.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sortWords')),
  },
  {
    path: Meta132.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sqlFormatterAndBeautifier')),
  },
  {
    path: Meta133.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sqlMinify')),
  },
  {
    path: Meta134.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sqlToCsvConverter')),
  },
  {
    path: Meta135.route,
    component: dynamic(() => import('../components/developmentToolsComponent/sqlToJson')),
  },
  {
    path: Meta136.route,
    component: dynamic(() => import('../components/developmentToolsComponent/stringDiffrenceChecker')),
  },
  {
    path: Meta137.route,
    component: dynamic(() => import('../components/developmentToolsComponent/stripHTML')),
  },
  {
    path: Meta138.route,
    component: dynamic(() => import('../components/developmentToolsComponent/textCompare')),
  },
  {
    path: Meta139.route,
    component: dynamic(() => import('../components/developmentToolsComponent/textRepeater')),
  },
  {
    path: Meta140.route,
    component: dynamic(() => import('../components/developmentToolsComponent/textToCsv')),
  },
  {
    path: Meta141.route,
    component: dynamic(() => import('../components/developmentToolsComponent/textToHtmlEntitiesConvertor')),
  },
  {
    path: Meta142.route,
    component: dynamic(() => import('../components/developmentToolsComponent/textToOneLine')),
  },
  {
    path: Meta143.route,
    component: dynamic(() => import('../components/developmentToolsComponent/txtToCsvConverter')),
  },
  {
    path: Meta144.route,
    component: dynamic(() => import('../components/developmentToolsComponent/typescriptFormatter')),
  },
  {
    path: Meta145.route,
    component: dynamic(() => import('../components/developmentToolsComponent/unicodeToAsciiConverter')),
  },
  {
    path: Meta146.route,
    component: dynamic(() => import('../components/developmentToolsComponent/upperCaseConverterComponent')),
  },
  {
    path: Meta147.route,
    component: dynamic(() => import('../components/developmentToolsComponent/urlDecode')),
  },
  {
    path: Meta148.route,
    component: dynamic(() => import('../components/developmentToolsComponent/urlEncode')),
  },
  {
    path: Meta149.route,
    component: dynamic(() => import('../components/developmentToolsComponent/utf8Decode')),
  },
  {
    path: Meta150.route,
    component: dynamic(() => import('../components/developmentToolsComponent/utf8Encode')),
  },
  {
    path: Meta151.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatIsMyBrowser')),
  },
  {
    path: Meta152.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatIsMyISP')),
  },
  {
    path: Meta153.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatIsMyLocalIPAddress')),
  },
  {
    path: Meta154.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatIsMyUserAgent')),
  },
  {
    path: Meta155.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatOperatingSystemDoIHave')),
  },
  {
    path: Meta156.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatsMyBrowserSize')),
  },
  {
    path: Meta157.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfAndroidDoIHave')),
  },
  {
    path: Meta158.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfChromeDoIHave')),
  },
  {
    path: Meta159.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfFirefoxDoIHave')),
  },
  {
    path: Meta160.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfFlashDoIHave')),
  },
  {
    path: Meta161.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfIOSDoIHave')),
  },
  {
    path: Meta162.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfJavaDoIHave')),
  },
  {
    path: Meta163.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfMacOSDoIHave')),
  },
  {
    path: Meta164.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfSafariDoIHave')),
  },
  {
    path: Meta165.route,
    component: dynamic(() => import('../components/developmentToolsComponent/whatVersionOfWindowsDoIHave')),
  },
  {
    path: Meta166.route,
    component: dynamic(() => import('../components/developmentToolsComponent/wordCounterComponent')),
  },
  {
    path: Meta167.route,
    component: dynamic(() => import('../components/developmentToolsComponent/wordsToNumbers')),
  },
  {
    path: Meta168.route,
    component: dynamic(() => import('../components/developmentToolsComponent/xmlCompare')),
  },
  {
    path: Meta169.route,
    component: dynamic(() => import('../components/developmentToolsComponent/xmlEscape')),
  },
  {
    path: Meta170.route,
    component: dynamic(() => import('../components/developmentToolsComponent/xmlMinify')),
  },
  {
    path: Meta171.route,
    component: dynamic(() => import('../components/developmentToolsComponent/xmlPrettify')),
  },
  {
    path: Meta172.route,
    component: dynamic(() => import('../components/developmentToolsComponent/xmlToJsonConverter')),
  },
  {
    path: Meta173.route,
    component: dynamic(() => import('../components/developmentToolsComponent/xorCalculator')),
  },
  {
    path: Meta174.route,
    component: dynamic(() => import('../components/developmentToolsComponent/yamlFormatterAndBeautifier')),
  },
];
