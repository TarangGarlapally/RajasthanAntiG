# Gemini Sidebar Chrome Extension

A beautiful Chrome extension that loads Google Gemini in a convenient sidebar panel, allowing you to access Gemini AI while browsing any website.

## Features

✨ **Modern Design** - Premium UI with glassmorphism effects and smooth animations
🎨 **Beautiful Gradients** - Eye-catching color scheme matching Gemini's branding
🔄 **Refresh Button** - Easily reload Gemini without closing the sidebar
⚡ **Fast Loading** - Optimized performance with loading states
🎯 **Side Panel Integration** - Uses Chrome's native side panel API for seamless experience

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the `GeminiSideBar` folder (d:\Projects\GeminiSideBar)
6. The extension is now installed!

### Method 2: Create Extension Icons First

Before loading the extension, you need to create icon files. You can:

**Option A: Use placeholder icons temporarily**
- Create simple colored square PNG files (16x16, 32x32, 48x48, 128x128) in the `icons` folder
- Name them: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`

**Option B: Use an online icon generator**
- Visit a site like [favicon.io](https://favicon.io) or [Canva](https://canva.com)
- Create icons with Gemini-themed colors (blue, purple, pink gradients)
- Export in sizes: 16x16, 32x32, 48x48, 128x128
- Save them in the `icons` folder

## Usage

1. Click the **Gemini Sidebar** extension icon in your Chrome toolbar
2. The sidebar will open on the right side of your browser
3. Gemini will load automatically in the sidebar
4. Use the refresh button in the header to reload if needed
5. Continue browsing while keeping Gemini accessible!

## File Structure

```
GeminiSideBar/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for extension logic
├── sidepanel.html         # Sidebar HTML structure
├── sidepanel.css          # Premium styling with animations
├── sidepanel.js           # Sidebar functionality
├── icons/                 # Extension icons (16, 32, 48, 128px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `sidePanel` (for sidebar functionality)
- **Framework**: Vanilla JavaScript (no dependencies)
- **Styling**: Modern CSS with gradients, glassmorphism, and animations
- **Font**: Inter (loaded from Google Fonts)

## Customization

### Change Gemini URL
Edit `sidepanel.html` line 31 to change the loaded URL:
```html
<iframe id="geminiFrame" src="https://gemini.google.com" ...>
```

### Modify Colors
Edit `sidepanel.css` to customize the color scheme. Main gradient colors are defined in:
- `.header::before` (lines 45-49)
- `h1` gradient (lines 75-79)
- `.gemini-icon` SVG gradients in `sidepanel.html` (lines 11-21)

### Adjust Sidebar Width
The sidebar width is controlled by Chrome. Users can resize it by dragging the edge.

## Troubleshooting

**Extension icon doesn't appear:**
- Make sure you've created the icon files in the `icons` folder
- Check that the file names match exactly: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`

**Sidebar doesn't open:**
- Ensure you're using Chrome version 114 or later (Side Panel API requirement)
- Check that the extension is enabled in `chrome://extensions/`

**Gemini doesn't load:**
- Check your internet connection
- Try clicking the refresh button in the sidebar header
- Make sure you're logged into your Google account

**Loading screen stuck:**
- Click the refresh button
- Close and reopen the sidebar
- Reload the extension from `chrome://extensions/`

## Browser Compatibility

- ✅ **Google Chrome** 114+ (recommended)
- ✅ **Microsoft Edge** 114+ (Chromium-based)
- ❌ Firefox (uses different extension API)
- ❌ Safari (uses different extension API)

## Privacy

This extension simply loads Gemini in an iframe. No data is collected or transmitted by the extension itself. All interactions with Gemini follow Google's standard privacy policies.

## License

This project is open source and available for personal and educational use.

## Credits

Created with modern web technologies and design principles. Inspired by Google's Gemini AI branding.

---

**Enjoy using Gemini in your sidebar! 🚀**
