import Mustache from "mustache";
import { loadConfig, getConfig } from "../tools/initConfig.js";
import { htmlStringToElement } from "../tools/htmlStringToElement.js";

/**
 * Base class for UI components.
 */
class UiComponent {
    /**
     * Creates an instance of UiComponent.
     * @param {string} id - The unique identifier for the component.
     * @param {string} label - The label for the component.
     */
    constructor(id, label, type = "ui-component") {
        this.id = id;
        this.label = label;
        this.type = type;

        this.templatePath = getConfig().templatePath;
    }

    /**
     * Gets the properties for rendering the component.
     * @returns {Object} The properties for rendering.
     */
    getRenderProperties() {
        return {
            id: this.id,
            label: this.label,
            type: this.type,
        };
    }

    /**
     * Sets the template path for the component.
     * @param {string} path - The path to the template file.
     */
    setTemplatePath(path) { this.templatePath = path; }

    /**
     * Renders the component using the specified template.
     * @returns {Promise<Node>} The rendered HTML string.
     */
    async render(targetNode) {
        const renderedHtml = await this.renderHTML();
        targetNode.appendChild(renderedHtml);
    }

    async renderHTML() {
        const template = await this.#loadTemplate(this.templatePath);
        const renderProps = await this.getRenderProperties();
        const htmlStr = Mustache.render(template, renderProps); 
        const renderedHTML = htmlStringToElement(htmlStr);
        
        return renderedHTML;
    }

    /**
     * Loads the template from the specified path.
     * @param {string} templatePath - The path to the template file.
     * @returns {Promise<string>} The template content.
     * @throws {Error} If the template cannot be loaded.
     * @private
     */
    async #loadTemplate(templatePath) {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Failed to load template: ${templatePath}`);
        }
        return await response.text();
    }
}

export default UiComponent;
