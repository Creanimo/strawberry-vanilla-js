import Mustache from "mustache";
import { htmlStringToElement } from "./tools/htmlStringToElement.js";

fetch('./config.json')
    .then(response => response.json)
    .then(data => {
        const template_path = data.templatePath;
    })
    .catch(error => console.error('Error loading config for Strawberry Vanilla UI:', error));

/**
 * Base class for UI components.
 */
class UiComponent {
    /**
     * Creates an instance of UiComponent.
     * @param {string} id - The unique identifier for the component.
     * @param {string} label - The label for the component.
     */
    constructor(id, label, name = "ui-component") {
        this.id = id;
        this.label = label;
        this.name = name
    }

    /**
     * Gets the properties for rendering the component.
     * @returns {Object} The properties for rendering.
     */
    getRenderProperties() {
        return {
            id: this.id,
            label: this.label,
            name: this.name,
        };
    }

    /**
     * Sets the template path for the component.
     * @param {string} path - The path to the template file.
     */
    setTemplatePath(path) {
        this.templatePath = path;
    }

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
        const htmlStr = await Mustache.render(template, renderProps); 
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

export { UiComponent };
