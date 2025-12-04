// Configuration
const BASE_URL = 'https://raw.githubusercontent.com/username/reponame/main/db/';
// const BASE_URL = 'db/'; // Local development fallback

/**
 * Initialize Theme Logic
 * Handles theme toggling and icon updates.
 */
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        html.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            }
        });
    }

    function updateThemeIcon(isDark) {
        if (!themeIcon) return;
        // Sun Icon (Colorful) for Light Mode, Moon Icon (Colorful) for Dark Mode
        if (isDark) {
            themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="orange" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
        } else {
            themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4da3ff" stroke="#4da3ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
        }
    }
}

/**
 * Fetch Configuration
 * @returns {Promise<Object>} Config object
 */
function fetchConfig() {
    return fetch(`${BASE_URL}config.json`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching config:', error);
            return {};
        });
}

/**
 * Get Query Parameter by Name
 * @param {string} name 
 * @returns {string|null}
 */
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Export functions if using modules, but for simple script tags we attach to window or just define globally
// Since we are likely using simple <script src="...">, these will be global.
