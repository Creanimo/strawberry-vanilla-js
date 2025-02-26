
let config = null;

/**
 * Loads the configuration for the UI framework.
 * @returns {Promise<Object>} The configuration object.
 * @throws {Error} If fetching the configuration fails.
 */
async function loadConfig() {
  if (!config) {
    try {
      const response = await fetch('./sv-ui-config.json');
      if (!response.ok) throw new Error("Config fetch failed");
      config = await response.json();
    } catch (error) {
      console.error('Error loading config:', error);
      throw error;
    }
  }
  return config;
}



function getConfig() {
    return config;
}

export { loadConfig, getConfig };
