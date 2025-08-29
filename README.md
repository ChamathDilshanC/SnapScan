# SnapScan

QR Scan | Photo Choose | Capture a Photo

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd SnapScan
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create your configuration files:**
   - Copy and create your own `.env`, `app.config.js`, `eas.json`, and `eslint.config.js` files. These files are not committed to GitHub for security and environment reasons.
   - Example:
     ```sh
     cp .env.example .env
     cp app.config.example.js app.config.js
     cp eas.example.json eas.json
     cp eslint.config.example.js eslint.config.js
     ```
   - Fill in your own values for API keys, EAS project ID, Android package name, etc.

4. **Run the app locally:**
   ```sh
   npx expo start
   ```

## Notes

- Sensitive and environment-specific files (`.env`, `app.config.js`, `eas.json`, `eslint.config.js`) are excluded from version control. You must create and configure these yourself after cloning.
- See the documentation in each example config file for required fields.
- For EAS Build, ensure your `app.config.js` includes the correct `android.package` and `extra.eas.projectId`.

## Features

- Scan QR codes
- Pick images from gallery
- Capture and save photos to gallery
