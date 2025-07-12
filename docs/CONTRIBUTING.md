# Contributing to DASHED

We love your input! We want to make contributing to DASHED as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### 1. Fork the Repository

Fork the repo and create your branch from `main`.

### 2. Local Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/dashed.git
cd dashed

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

### 3. Development Workflow

- Create a feature branch: `git checkout -b feature/amazing-feature`
- Make your changes
- Add tests for your changes
- Run the test suite: `pnpm test`
- Run linting: `pnpm lint`
- Commit your changes: `git commit -m 'Add amazing feature'`
- Push to your branch: `git push origin feature/amazing-feature`
- Open a Pull Request

## Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components
- Use functional components with hooks
- Implement proper prop validation with TypeScript
- Follow the component structure pattern used in the codebase
- Write unit tests for components

### Styling
- Use Tailwind CSS for styling
- Follow the design system established in the codebase
- Ensure responsive design for all screen sizes
- Maintain accessibility standards (WCAG 2.1 AA)

## Testing Requirements

### Unit Tests
- Write tests for all new functions and components
- Maintain minimum 80% code coverage
- Use Jest and React Testing Library
- Mock external dependencies properly

### Integration Tests
- Test critical user flows
- Test API endpoints
- Test database interactions

### E2E Tests
- Use Playwright for end-to-end testing
- Cover main user journeys
- Test across different browsers

## Commit Message Guidelines

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples
```
feat(auth): add OAuth integration
fix(api): resolve user data fetching issue
docs(readme): update installation instructions
test(dashboard): add unit tests for analytics component
```

## Pull Request Process

1. **Update Documentation**: Update the README.md with details of changes if applicable
2. **Update Tests**: Ensure all tests pass and add new tests for your changes
3. **Code Review**: Your PR will be reviewed by maintainers
4. **CI/CD Checks**: All automated checks must pass
5. **Merge Requirements**: Requires approval from at least one maintainer

### PR Template
When creating a PR, please include:

- **Description**: What changes were made and why
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes
- **Breaking Changes**: Any breaking changes and migration guide
- **Checklist**: Complete the PR checklist

## Issue Reporting

### Bug Reports
Use the bug report template and include:

- **Environment**: OS, browser, Node.js version
- **Steps to Reproduce**: Clear steps to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Additional Context**: Any other relevant information

### Feature Requests
Use the feature request template and include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: Detailed description of the feature
- **Alternatives**: Any alternative solutions considered
- **Additional Context**: Mockups, examples, etc.

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers.

## Development Environment

### Required Tools
- Node.js 18.x or 20.x
- pnpm (preferred package manager)
- Git
- VS Code (recommended)

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DASHED
NEXT_PUBLIC_APP_VERSION=1.1.0

# External APIs
RESEND_API_KEY=your_resend_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Architecture Guidelines

### Project Structure
```
app/                 # Next.js App Router
├── (app)/          # Authenticated app routes
├── (marketing)/    # Public marketing pages
├── api/           # API routes
└── globals.css    # Global styles

components/         # Reusable components
├── ui/            # Basic UI components
├── auth/          # Authentication components
└── [feature]/     # Feature-specific components

lib/               # Utility functions
├── api-utils.ts   # API helpers
├── supabase.ts    # Database client
└── utils.ts       # General utilities

types/             # TypeScript type definitions
hooks/             # Custom React hooks
```

### Database Guidelines
- Use Supabase for data persistence
- Follow Row Level Security (RLS) policies
- Use TypeScript types for database schemas
- Implement proper indexing for performance

### API Design
- Follow REST conventions
- Use proper HTTP status codes
- Implement rate limiting
- Add comprehensive error handling
- Document all endpoints

## Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

### Release Checklist
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release branch
4. Run full test suite
5. Create GitHub release with tag
6. Deploy to production
7. Monitor for issues

## Security

### Reporting Security Issues
Please do not report security vulnerabilities through public GitHub issues. Instead, send an email to security@dashed.dev with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fixes (if any)

### Security Best Practices
- Never commit secrets or API keys
- Use environment variables for configuration
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Regular dependency updates

## Support

### Getting Help
- Check existing [Issues](https://github.com/yourusername/dashed/issues)
- Read the [Documentation](https://github.com/yourusername/dashed/tree/main/docs)
- Join our [Discord Community](https://discord.gg/dashed)
- Contact us at support@dashed.dev

### Community Resources
- [GitHub Discussions](https://github.com/yourusername/dashed/discussions)
- [Documentation Site](https://docs.dashed.dev)
- [Blog](https://blog.dashed.dev)
- [Twitter](https://twitter.com/dashedapp)

## License

By contributing to DASHED, you agree that your contributions will be licensed under its MIT License.

## Acknowledgments

Thank you to all contributors who help make DASHED better! 🚀

---

**Happy coding!** 🎉
