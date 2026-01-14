# Quickstart: Module 1 Development

## Prerequisites
- Node.js 24.12.0+
- npm 11.6.2+

## Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Docusaurus development server:
   ```bash
   npm start
   ```

## Creating New Content
1. Navigate to `docs/modules/module-1/`.
2. Create a new `.md` file.
3. Add the file to `sidebars.js` under the `Module 1` category if not auto-generated.

## Verification
- Run `npm run build` to ensure all Markdown renders without errors (SC-003).
- Check the `sidebars.js` configuration for correct ordering.
