
# 个人作品集网站

This is a code bundle for 个人作品集网站. The original project is available at https://www.figma.com/design/mwcd7xYnJT1EKZju1zS3Bj/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.

## Running the code

Run `npm install` to install the dependencies.

Run `npm run dev` to start the development server.

Run `npm run build` before deployment.

## Current migration status

The Figma Make project has been moved to the repository root and `package.json` has been cleaned so npm can install dependencies.

The current export is missing `src/assets/`. The code references 83 Figma image assets through `figma:asset/*.png`, so the production build cannot finish until those image files are added back.

To fix this, re-download the code from Figma Make with assets included, or copy the missing `src/assets` folder into this project.
