document.addEventListener('DOMContentLoaded', () => {
    const textTab = document.getElementById('text-tab');
    const colorTab = document.getElementById('color-tab');
    const textSettings = document.getElementById('text-settings');
    const colorSettings = document.getElementById('color-settings');
    const applyTextBtn = document.getElementById('apply-text-settings');
    const resetTextBtn = document.getElementById('reset-text-settings');
    const applyColorBtn = document.getElementById('apply-color-settings');
    const resetColorBtn = document.getElementById('reset-color-settings');

    const textConfig = {
        'font-family': document.getElementById('font-family'),
        'font-size': document.getElementById('font-size'),
        'line-height': document.getElementById('line-height'),
        'letter-spacing': document.getElementById('letter-spacing'),
        'text-transform': document.getElementById('text-transform'),
        'text-align': document.getElementById('text-align')
    };

    const colorConfig = {
        'text-color': document.getElementById('text-color'),
        'background-color': document.getElementById('background-color'),
        'link-color': document.getElementById('link-color'),
        'button-color': document.getElementById('button-color')
    };

    const tabs = {
        'text-tab': textSettings,
        'color-tab': colorSettings
    };

    function switchTab(tabId) {
        for (const tab in tabs) {
            if (tab === tabId) {
                tabs[tab].classList.add('active');
                document.getElementById(tab).classList.add('active');
            } else {
                tabs[tab].classList.remove('active');
                document.getElementById(tab).classList.remove('active');
            }
        }
        localStorage.setItem('activeTab', tabId);
    }

    textTab.addEventListener('click', () => switchTab('text-tab'));
    colorTab.addEventListener('click', () => switchTab('color-tab'));

    function applyTextSettings() {
        for (const setting in textConfig) {
            document.body.style.setProperty(`--${setting}`, textConfig[setting].value);
        }
        saveSettings('textSettings', textConfig);
    }

    function resetTextSettings() {
        for (const setting in textConfig) {
            textConfig[setting].value = getComputedStyle(document.documentElement).getPropertyValue(`--default-${setting}`).trim();
        }
        applyTextSettings();
    }

    function applyColorSettings() {
        for (const setting in colorConfig) {
            document.documentElement.style.setProperty(`--${setting}`, colorConfig[setting].value);
        }
        saveSettings('colorSettings', colorConfig);
    }

    function resetColorSettings() {
        for (const setting in colorConfig) {
            colorConfig[setting].value = getComputedStyle(document.documentElement).getPropertyValue(`--default-${setting}`).trim();
        }
        applyColorSettings();
    }

    function saveSettings(key, config) {
        const settings = {};
        for (const setting in config) {
            settings[setting] = config[setting].value;
        }
        localStorage.setItem(key, JSON.stringify(settings));
    }

    function loadSettings() {
        const activeTab = localStorage.getItem('activeTab');
        if (activeTab) {
            switchTab(activeTab);
        } else {
            switchTab('text-tab');
        }

        const textSettings = JSON.parse(localStorage.getItem('textSettings'));
        if (textSettings) {
            for (const setting in textSettings) {
                textConfig[setting].value = textSettings[setting];
            }
            applyTextSettings();
        }

        const colorSettings = JSON.parse(localStorage.getItem('colorSettings'));
        if (colorSettings) {
            for (const setting in colorSettings) {
                colorConfig[setting].value = colorSettings[setting];
            }
            applyColorSettings();
        }
    }

    applyTextBtn.addEventListener('click', applyTextSettings);
    resetTextBtn.addEventListener('click', resetTextSettings);
    applyColorBtn.addEventListener('click', applyColorSettings);
    resetColorBtn.addEventListener('click', resetColorSettings);

    loadSettings();
});