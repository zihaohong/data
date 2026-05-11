# Navbar Library

A centralized navbar component for games with collapsible menu, language toggle, and games dropdown.

## Features

- Collapsible hamburger menu with animated icon
- Language toggle (EN/中文)
- Games dropdown loaded from `games.json`
- Usage panel rendering
- Responsive design
- Easy integration

## Usage

### Basic Integration

Add this to your HTML `<head>`:

```html
<script src="https://zihaohong.github.io/data/lib/navbar/navbar.js"></script>
```

Then initialize the navbar in your script:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  Navbar.init();
});
```

### Advanced Options

```javascript
document.addEventListener('DOMContentLoaded', () => {
  Navbar.init({
    gamesJsonUrl: 'https://your-domain.com/data/links/games.json',
    currentGameId: 'your-game-id'
  });
});
```

## Required HTML Structure

The navbar will automatically inject itself at the beginning of the `<body>`. However, you need to include a usage panel in your HTML:

```html
<div class="usage-panel" id="usagePanel">
  <h3>How to Play</h3>
  <p id="usageText">Loading...</p>
</div>
```

## API

### Methods

- `Navbar.init(options)` - Initialize the navbar
- `Navbar.toggleLanguage()` - Toggle between EN and 中文
- `Navbar.toggleDropdown()` - Toggle the games dropdown
- `Navbar.closeDropdown()` - Close the games dropdown
- `Navbar.getCurrentLang()` - Get current language ('en' or 'zh')
- `Navbar.getGamesData()` - Get the loaded games data
- `Navbar.getUsageText()` - Get usage text for current game

### Events

The navbar dispatches a custom event when language changes:

```javascript
window.addEventListener('navbar:languageChanged', (e) => {
  console.log('Language changed to:', e.detail.lang);
});
```

## CSS Classes

The navbar uses these CSS classes (included in navbar.css):

- `.game-nav` - Main navbar container
- `.nav-left` - Left side of navbar
- `.nav-right` - Right side of navbar
- `.menu-btn` - Hamburger menu button
- `.lang-btn` - Language toggle button
- `.hamburger` - Hamburger icon container
- `.games-dropdown` - Dropdown menu
- `.games-dropdown.open` - Open dropdown state
- `.games-dropdown a` - Dropdown links
- `.games-dropdown a.current` - Current game link

## Example Full Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Game</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100%;
      overflow: hidden;
    }
    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      height: calc(100% - 50px);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
    }
    .usage-panel {
      background: rgba(255, 255, 255, 0.1);
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
    }
  </style>
  <script src="https://zihaohong.github.io/data/lib/navbar/navbar.js"></script>
</head>
<body>
  <main>
    <h1>My Game</h1>
    <!-- Your game content here -->
    <div class="usage-panel" id="usagePanel">
      <h3>How to Play</h3>
      <p id="usageText">Loading...</p>
    </div>
  </main>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      Navbar.init();
      // Your game logic here
    });
  </script>
</body>
</html>
```

## Files

- `navbar.css` - All navbar styles
- `navbar.js` - Navbar JavaScript logic
- `README.md` - This documentation

## License

MIT License
