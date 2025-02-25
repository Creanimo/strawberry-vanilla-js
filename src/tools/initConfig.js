let config = null;

async function loadConfig() {
    if (!config) {
        try {
            const response = await fetch('./sv-ui-config.json');
            if (!response.ok) throw new Error("Config fetch failed");
            config = await response.json();
        } catch (error) {
            console.error('Error loading config:', error);
            return Promise.reject(error); // Ensure failures propagate
        }
    }
    return config;
}


function getConfig() {
    return config;
}

export { loadConfig, getConfig };
