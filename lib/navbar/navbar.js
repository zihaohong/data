/**
 * Navbar Library
 * A centralized navbar component for games with:
 * - Collapsible hamburger menu
 * - Language toggle (EN/中文)
 * - Games dropdown from games.json
 * - Usage panel rendering
 */

(function(window) {
  'use strict';

  const Navbar = {
    config: {
      gamesJsonUrl: 'https://zihaohong.github.io/data/links/games.json',
      currentLang: 'en',
      gamesData: {},
      currentGameId: null
    },

    /**
     * Initialize the navbar
     * @param {Object} options - Configuration options
     * @param {string} options.gamesJsonUrl - URL to games.json (optional)
     * @param {string} options.currentGameId - Current game identifier for highlighting (optional)
     */
    init: function(options) {
      if (options) {
        if (options.gamesJsonUrl) this.config.gamesJsonUrl = options.gamesJsonUrl;
        if (options.currentGameId) this.config.currentGameId = options.currentGameId;
      }

      this.injectCSS();
      this.injectHTML();
      this.detectLanguage();
      this.loadGames();
      this.bindEvents();
    },

    /**
     * Inject navbar CSS into the page
     */
    injectCSS: function() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.config.gamesJsonUrl.replace('games.json', 'lib/navbar/navbar.css');
      document.head.appendChild(link);
    },

    /**
     * Inject navbar HTML into the page
     */
    injectHTML: function() {
      const navbarHTML = `
        <div class="game-nav">
          <div class="nav-left">
            <button class="menu-btn" id="navbar-menuBtn">
              <div class="hamburger"><span></span><span></span><span></span></div>
              <span class="menu-label">Games</span>
            </button>
          </div>
          <div class="nav-right">
            <button class="lang-btn" id="navbar-langBtn">EN</button>
          </div>
          <div class="games-dropdown" id="navbar-gamesDropdown"></div>
        </div>
      `;

      // Insert at the beginning of body
      document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    },

    /**
     * Detect browser language
     */
    detectLanguage: function() {
      const lang = navigator.language.toLowerCase();
      if (lang.startsWith('zh')) {
        this.config.currentLang = 'zh';
      }
      this.updateLangButton();
    },

    /**
     * Update language button text
     */
    updateLangButton: function() {
      const btn = document.getElementById('navbar-langBtn');
      if (btn) {
        btn.textContent = this.config.currentLang === 'en' ? 'EN' : '中文';
      }
    },

    /**
     * Load games data from JSON
     */
    loadGames: async function() {
      try {
        const response = await fetch(this.config.gamesJsonUrl);
        this.config.gamesData = await response.json();
        this.renderGamesDropdown();
        this.renderUsagePanel();
      } catch (error) {
        console.error('Error loading games:', error);
      }
    },

    /**
     * Render the games dropdown
     */
    renderGamesDropdown: function() {
      const container = document.getElementById('navbar-gamesDropdown');
      if (!container) return;

      const langData = this.config.gamesData[this.config.currentLang] || this.config.gamesData['en'];

      if (!langData.games || langData.games.length === 0) {
        container.innerHTML = '';
        return;
      }

      const currentUrl = window.location.href;
      container.innerHTML = langData.games.map(game => {
        const isCurrent = currentUrl.startsWith(game.link);
        return `<a href="${game.link}" class="${isCurrent ? 'current' : ''}">${game.title}</a>`;
      }).join('');
    },

    /**
     * Render the usage panel for current game
     */
    renderUsagePanel: function() {
      const usageText = document.getElementById('usageText');
      if (!usageText) return;

      const langData = this.config.gamesData[this.config.currentLang] || this.config.gamesData['en'];

      // Find current game by URL match
      const currentUrl = window.location.href;
      const currentGame = langData.games.find(game => currentUrl.startsWith(game.link));

      if (currentGame && currentGame.usage) {
        usageText.textContent = currentGame.usage;
      }
    },

    /**
     * Get usage text for current game (returns string)
     * @returns {string} Usage text or empty string
     */
    getUsageText: function() {
      const langData = this.config.gamesData[this.config.currentLang] || this.config.gamesData['en'];
      const currentUrl = window.location.href;
      const currentGame = langData.games.find(game => currentUrl.startsWith(game.link));
      return currentGame && currentGame.usage ? currentGame.usage : '';
    },

    /**
     * Get current language
     * @returns {string} Current language code ('en' or 'zh')
     */
    getCurrentLang: function() {
      return this.config.currentLang;
    },

    /**
     * Get games data
     * @returns {Object} Games data object
     */
    getGamesData: function() {
      return this.config.gamesData;
    },

    /**
     * Toggle language
     */
    toggleLanguage: function() {
      this.config.currentLang = this.config.currentLang === 'en' ? 'zh' : 'en';
      this.updateLangButton();
      this.renderGamesDropdown();
      this.renderUsagePanel();

      // Dispatch custom event for other scripts to listen
      window.dispatchEvent(new CustomEvent('navbar:languageChanged', {
        detail: { lang: this.config.currentLang }
      }));
    },

    /**
     * Toggle dropdown
     */
    toggleDropdown: function() {
      const menuBtn = document.getElementById('navbar-menuBtn');
      const dropdown = document.getElementById('navbar-gamesDropdown');
      if (menuBtn && dropdown) {
        menuBtn.classList.toggle('open');
        dropdown.classList.toggle('open');
      }
    },

    /**
     * Close dropdown
     */
    closeDropdown: function() {
      const menuBtn = document.getElementById('navbar-menuBtn');
      const dropdown = document.getElementById('navbar-gamesDropdown');
      if (menuBtn && dropdown) {
        menuBtn.classList.remove('open');
        dropdown.classList.remove('open');
      }
    },

    /**
     * Bind event listeners
     */
    bindEvents: function() {
      // Language toggle
      const langBtn = document.getElementById('navbar-langBtn');
      if (langBtn) {
        langBtn.addEventListener('click', () => this.toggleLanguage());
      }

      // Menu toggle
      const menuBtn = document.getElementById('navbar-menuBtn');
      if (menuBtn) {
        menuBtn.addEventListener('click', () => this.toggleDropdown());
      }

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.game-nav')) {
          this.closeDropdown();
        }
      });
    }
  };

  // Export to window
  window.Navbar = Navbar;

})(window);
