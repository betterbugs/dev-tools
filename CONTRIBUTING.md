# Contributing to BetterBugs Development Tools

Thank you for your interest in contributing! We're building 175+ developer tools with a community-first mindset. We welcome contributions of all kinds: bug reports, feature suggestions, documentation improvements, new tools, and code contributions.

**Our philosophy:** Low friction > perfection. We can refine things later. It's much harder to revive an abandoned repo.

Please read through this document before submitting any issues or pull requests. For detailed guides on tool structure, offline support, and more, visit the [Contributing Guides](https://docs.betterbugs.io/contributing-to-betterbugs).

## Reporting Bugs and Issues

Before reporting a bug, please check our [open issues](https://github.com/betterbugs/dev-tools/issues) to see if it has already been reported. If it has, please add any additional information that might be helpful. If not, please [create a new issue](https://github.com/betterbugs/dev-tools/issues/new/choose) and include:

- A clear, descriptive title
- Detailed description of the issue
- Steps to reproduce the behavior
- Expected behavior
- Actual behavior
- Environment information (browser, OS, Node.js version)
- Screenshots or error messages if applicable

## Suggesting Enhancements and New Tools

We welcome ideas for improvements and new tools. There's no permission needed—if you have an idea, build it! Please [create an issue](https://github.com/betterbugs/dev-tools/issues/new/choose) or [discussion](https://github.com/betterbugs/dev-tools/discussions) with:

- A clear description of the enhancement or tool
- Why this would be useful
- Any relevant examples or use cases

**Note:** If your tool uses APIs or network features, that's fine! Just make it optional and gracefully handle missing connectivity. See [Contributing Guides](https://docs.betterbugs.io/contributing-to-betterbugs) for details.

## Self Assigning Issues

To express interest in working on an issue, simply comment on it to let us know. Maintainers will assign it to you or discuss next steps if needed.

## Branch Strategy

**Branch purposes:**
- **main**: Always reflects the latest stable and released code
- **develop**: Contains accepted changes that will be part of the next release

**For all contributors:**
- Create a new branch from `develop`
- Open pull requests against `develop` (not `main`)

**For regular contributors:**
If your work depends on unreleased features or changes, base your work directly on `develop`. Pull requests merged into `develop` are considered accepted for now, but remain under maintainer control. Our team decides which changes move from `develop` to `main` for release, and may revert or modify any merged code if needed.

## Code Contributions

### 🚨 Dependency & Lockfile Policy (Read Before PR!)

**When to Commit `package-lock.json`**

- **You MUST commit `package-lock.json` if:**
	- You add, remove, or upgrade a dependency in `package.json` (for example, when your new tool needs a new npm package).
	- You intentionally update any package version in `package.json`.
	- After such changes, always run `npm install` and commit both `package.json` and `package-lock.json` together.

- **You MUST NOT commit `package-lock.json` if:**
	- You are only editing, adding, or refactoring tool components, UI, or logic, and did not touch `package.json`.
	- You ran `npm install` after pulling latest develop, but did not change dependencies. If the lockfile changes, discard it (`git checkout -- package-lock.json`).

- **Dependency/toolchain upgrades (Next.js, ESLint, etc.) must be in a separate PR, never mixed with feature/tool PRs.**

**For Adding a New Tool:**

- If your tool needs a new npm package:
	1. Add the dependency to `package.json`.
	2. Run `npm install` (this updates `package-lock.json`).
	3. Commit both files in your PR.
- If your tool does NOT need a new dependency, do NOT touch or commit `package-lock.json`.

**Why?**

- Our CI uses `npm ci`, which requires the lockfile to match `package.json` exactly.
- Random lockfile churn (from different npm versions or accidental upgrades) causes huge, noisy diffs and can break builds.
- Only the canonical lockfile in `develop` is valid.

---

Please ensure your pull request adheres to the following guidelines:

- Search [open pull requests](https://github.com/betterbugs/dev-tools/pulls) to ensure your change hasn't already been submitted
- Target the `develop` branch with your pull request (not `main`)
- Rebase your branch with the latest changes from `develop` before opening your PR
- Follow the existing code style and conventions
- Test your changes locally: `npm run dev` and `npm run lint`
- Use TypeScript for all new code

**Adding a new tool?** Check the [Feature and Module Structure](https://docs.betterbugs.io/contributing-to-betterbugs) guide for detailed walkthrough and examples.

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Please use one of the following commit types:

- `feat` - A new feature
- `fix` - A bug fix
- `perf` - A performance improvement
- `refactor` - Code refactoring
- `docs` - Documentation changes
- `style` - Code formatting (no logic changes)
- `test` - Test additions or changes
- `ci` - CI/CD changes
- `chore` - Other changes

Examples:
- `feat(tools): add markdown to html converter`
- `fix(ui): resolve responsive layout on mobile`
- `docs: update installation guide`

Releases and changelog updates are automated via CI. Do not manually edit CHANGELOG.md.

## Code Quality

- Use TypeScript for all new files
- Follow the existing code style in the repository
- Test your changes work locally before submitting
- Ensure no console errors or warnings

## Testing

Test your changes locally before submitting a pull request:

- Test with various inputs and edge cases
- Test on different browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on mobile, tablet, and desktop viewports
- Verify accessibility where applicable
- **For offline-safe tools:** Test offline mode by running `npm run build && npm start`, then enabling offline in DevTools. See [PWA and Offline Behavior](https://docs.betterbugs.io/contributing-to-betterbugs) for details.
- **For tools with APIs:** Verify graceful failure when the API is unavailable

## Documentation

We love documentation contributions! Whether it's more complete descriptions, new examples, or better formatting, any help improving the documentation is appreciated.

## The Only Hard Rule

🚫 **Don't:** Require user login, store personal data, or collect user information.

✅ **Everything else is negotiable:** Network features, APIs, AI integrations—all welcome if implemented thoughtfully.

This keeps us legally sound and makes contributing stress-free.

## Community

Join us on [Discord](https://discord.com/invite/HF8XjwVtPh) to connect with the community and core team. Please be respectful and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

**For detailed guides** on tool structure, offline support, contributing philosophy, and more, visit [Contributing Guides](https://docs.betterbugs.io/contributing-to-betterbugs).

## Questions?

For questions or concerns, please reach out to us at dev@betterbugs.io or ask in our [Discord community](https://discord.com/invite/HF8XjwVtPh).

Thank you for your interest and contributions to BetterBugs 🪲
