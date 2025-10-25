# SIID Download Page

A modern React application for downloading the SIID (Salesforce Intelligence Integrated Development) IDE. This is the official download page for the SIID IDE, which is a specialized VS Code distribution for Salesforce development.

## Features

- **Latest Release Download**: Download the most recent version of SIID IDE
- **Version History**: Browse and download older versions  
- **Multiple Installation Options**: User and System installations
- **Checksum Verification**: SHA256 checksums for download integrity
- **Real-time Data**: Fetches release information from GitHub API
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Auto-deployment**: Automatically deploys to Firebase on push to main branch

## Technology Stack

- React 19 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- Lucide React for icons
- Axios for HTTP requests
- Firebase Hosting
- GitHub Actions for CI/CD

## Getting Started

### Installation

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Firebase Deployment

1. Setup Firebase project
2. Configure `firebase.json` and `.firebaserc`
3. Deploy: `npm run firebase:deploy`

## API Integration

Fetches releases from: `https://api.github.com/repos/Conscendotechnologies/AIpexium2/releases`

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
