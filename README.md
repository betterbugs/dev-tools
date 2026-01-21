# BetterBugs Development Tools

A comprehensive collection of free, open-source development tools built with Next.js. This toolkit provides developers with essential utilities for text manipulation, code formatting, data conversion, and more.

## 🚀 Features

- **100+ Development Tools**: Text converters, code formatters, validators, generators, and more
- **Modern Stack**: Built with Next.js 14, React 18, TypeScript, and Tailwind CSS
- **Fast & Responsive**: Optimized performance with server-side rendering
- **PWA Support**: Progressive Web App capabilities for offline access
- **Monaco Editor**: Code editing with syntax highlighting
- **Dark Mode Ready**: Theme support built-in

## 📋 Available Tools

### Text Tools
- Text case converters (uppercase, lowercase, title case)
- Text counters (word, character, sentence, line)
- Text formatters and manipulators
- Lorem Ipsum generator

### Code Tools
- JavaScript minifier and obfuscator
- JSON formatter and minifier
- HTML to Markdown converter
- Markdown to HTML converter
- Code comparer

### Data Tools
- JSON validator and formatter
- CSV converters
- QR Code generator
- Credit card generator and validator

### Color Tools
- Color code converters (HEX, RGB, CMYK)
- Random color generator

### And Many More...

Browse all available tools at the [Development Tools](https://www.betterbugs.io/development-tools).

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/betterbugs/dev-tools.git
   cd dev-tools
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   NEXT_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
dev-tools/
├── app/
│   ├── [slug]/              # Dynamic routes for individual tools
│   ├── components/           # React components
│   │   ├── developmentToolsComponent/  # Tool-specific components
│   │   ├── layout/          # Header, Footer, Layout components
│   │   └── theme/           # Theme components and icons
│   ├── contexts/            # React contexts (Theme, Layout)
│   ├── libs/                # Utilities and constants
│   ├── styles/              # Global styles
│   └── page.tsx             # Homepage
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🧩 Adding a New Tool

1. Create a new component in `app/components/developmentToolsComponent/`
2. Add the tool configuration to `app/libs/developmentToolsConstant.tsx`
3. Add the route path to `app/libs/constants.tsx`
4. The tool will automatically appear on the homepage

Example:
```typescript
// app/components/developmentToolsComponent/myNewTool.tsx
"use client";
import React, { useState } from "react";

const MyNewTool = () => {
  const [input, setInput] = useState("");
  
  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      {/* Your tool logic here */}
    </div>
  );
};

export default MyNewTool;
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add some amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📝 Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Use functional components with hooks
- Follow the existing naming conventions
- Add comments for complex logic

## 🐛 Reporting Issues

Found a bug? Please open an issue on [GitHub Issues](https://github.com/betterbugs/dev-tools/issues) with:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

## 💡 Feature Requests

Have an idea for a new tool or feature? We'd love to hear it! Open a [Feature Request](https://github.com/betterbugs/dev-tools/issues/new?template=feature_request.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Ant Design](https://ant.design/)
- Code editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Icons and styling with [Tailwind CSS](https://tailwindcss.com/)

## 🔗 Links

- [Website](https://betterbugs.io)
- [Documentation](https://docs.betterbugs.io)
- [BetterBugs Main Product](https://app.betterbugs.io)

## 📊 Stats

- 100+ Development Tools
- Built with Next.js 14
- TypeScript throughout
- Fully responsive design

---

Made with ❤️ by the BetterBugs team
