# Contributing to BetterBugs Development Tools

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

Before creating a bug report, please check if the issue has already been reported. If it hasn't, create a new issue with:

- **Clear title**: Brief description of the issue
- **Description**: Detailed explanation of the problem
- **Steps to reproduce**: How to reproduce the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

### Suggesting Features

We welcome feature suggestions! When suggesting a feature:

- Check if the feature has already been requested
- Provide a clear description of the feature
- Explain why it would be useful
- Provide examples or mockups if possible

### Adding New Tools

We're always looking to add more useful development tools! Here's how:

1. **Check if the tool already exists** or is similar to an existing one
2. **Create the tool component** in `app/components/developmentToolsComponent/`
3. **Add tool metadata** to `app/libs/developmentToolsConstant.tsx`
4. **Add route path** to `app/libs/constants.tsx`
5. **Test thoroughly** before submitting

### Code Contributions

#### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/dev-tools.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m 'Add: description of changes'`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

#### Coding Standards

- **TypeScript**: Use TypeScript for all new files
- **Components**: Use functional components with hooks
- **Naming**: Follow existing naming conventions
  - Components: PascalCase (e.g., `MyNewTool.tsx`)
  - Files: camelCase for utilities, PascalCase for components
- **Formatting**: Use consistent indentation (2 spaces)
- **Comments**: Add comments for complex logic
- **Imports**: Organize imports (external first, then internal)

#### Component Structure

```typescript
"use client";
import React, { useState } from "react";
import styles from "./toolStyles.module.scss";

const MyNewTool = () => {
  const [input, setInput] = useState("");
  
  // Tool logic here
  
  return (
    <div className={styles.container}>
      {/* UI here */}
    </div>
  );
};

export default MyNewTool;
```

#### Testing

Before submitting:
- Test the tool with various inputs
- Test on different browsers (Chrome, Firefox, Safari)
- Test responsive design (mobile, tablet, desktop)
- Check for console errors
- Verify accessibility

#### Commit Messages

Use clear, descriptive commit messages:

- `Add: New text case converter tool`
- `Fix: JSON validator error handling`
- `Update: Improve tool descriptions`
- `Refactor: Clean up component structure`

### Pull Request Process

1. **Update documentation** if needed
2. **Ensure tests pass** (if applicable)
3. **Update CHANGELOG.md** with your changes
4. **Request review** from maintainers
5. **Address feedback** promptly

### Code Review

All submissions require review. We'll review for:
- Code quality and style
- Functionality and correctness
- Performance considerations
- Accessibility
- Documentation

## 📋 Development Setup

See [README.md](README.md) for installation instructions.

## 🎯 Areas for Contribution

- **New Tools**: Add useful development tools
- **Bug Fixes**: Fix existing issues
- **Performance**: Optimize existing tools
- **UI/UX**: Improve user experience
- **Documentation**: Improve docs
- **Accessibility**: Improve accessibility
- **Testing**: Add tests

## 📞 Questions?

- Open an issue for questions
- Check existing issues and discussions
- Review the codebase for examples

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!
