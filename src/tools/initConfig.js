let config = null;

async function loadConfig() {
    if (!config) {
        try {
            const response = await fetch('./sv-ui-config.json');
            config = await response.json();
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }
    return config;
}

function getConfig() {
    return config;
}

export { loadConfig, getConfig };
