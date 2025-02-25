import Mustache from "mustache";

/**
 * Loads an HTML template from a given file path.
 * @param {string} templatePath - The path to the template file.
 * @returns {Promise<string>} The template content as a string.
 * @throws {Error} If the template cannot be loaded.
 */
async function loadTemplate(templatePath) {
    const response = await fetch(templatePath);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath}`);
    }
    return await response.text();
}

async function renderTpl(htmlNode, template, renderProps = {}) {
    htmlNode.innerHTML = "";
    const htmlStr = Mustache.render(template, renderProps);
    htmlNode.innerHTML = htmlStr;
}

export { loadTemplate, renderTpl };
