# Chatbot UI Desktop Setup

This guide will help you set up and run Chatbot UI as a desktop application using Electron.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Docker (for Supabase)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Environment

Copy the environment example file:
```bash
cp .env.local.example .env.local
```

### 3. Start Supabase (Required for first setup)

Install Supabase CLI if you haven't already:
```bash
# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or download from https://github.com/supabase/cli/releases
```

Start Supabase:
```bash
supabase start
```

Get your local Supabase credentials:
```bash
supabase status
```

Update your `.env.local` file with the values from `supabase status`.

### 4. Run Desktop App

```bash
# Start the desktop application in development mode
npm run desktop
```

Or use the batch file:
```bash
# Double-click start-chatbot-ui.bat
# Or run from command line:
start-chatbot-ui.bat
```

## Create Desktop Shortcut

To create a desktop shortcut, run the PowerShell script:

```powershell
# Run as Administrator if needed
powershell -ExecutionPolicy Bypass -File create-desktop-shortcut.ps1
```

This will create a "Chatbot UI" shortcut on your desktop.

## Building for Distribution

To build the app for distribution:

```bash
# Build the app
npm run electron-pack
```

The built application will be in the `dist-electron` folder.

## Available Scripts

- `npm run desktop` - Start the desktop app in development mode
- `npm run electron` - Start Electron (requires Next.js to be running separately)
- `npm run electron-dev` - Start both Next.js and Electron concurrently
- `npm run electron-pack` - Build the app for distribution

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it:
```bash
# Start on a different port
PORT=3001 npm run dev
```

Then update the Electron main.js file to use the new port.

### Supabase Issues
If you encounter Supabase issues:
```bash
# Reset the database
npm run db-reset

# Or restart Supabase
npm run restart
```

### Windows Security Warning
When running the desktop app for the first time, Windows might show a security warning. Click "More info" and then "Run anyway" to continue.

## Features

- Desktop window with native menus
- Keyboard shortcuts (Ctrl+N for new chat, etc.)
- Auto-updater ready (can be configured)
- Offline capabilities (depending on your AI provider setup)
- System tray integration (can be added)

## Next Steps

- Customize the app icon in `public/favicon.ico`
- Modify window settings in `electron/main.js`
- Add custom menu items or keyboard shortcuts
- Set up auto-updater for automatic updates 