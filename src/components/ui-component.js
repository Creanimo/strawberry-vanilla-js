import Mustache from "mustache";
import { getConfig } from "../tools/initConfig.js";
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
    constructor({id, label, type = "ui-component", fetchFunction = null}) {
        this.id = id;
        this.label = label;
        this.type = type;
        this.loading = false;
        this.fetchFunction = fetchFunction;

        this.templatePath = `${getConfig().templateRoot}mytemplate.html`;
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
     * Renders the component using the specified template.
     * @returns {Promise<Node>} The rendered HTML string.
     */
    async render(targetNode) {
        this.setLoading = true;
        const loadingTemplate = `${getConfig().templateRoot}loading.html`
        const placeholderTemplate = await this.#loadTemplate(loadingTemplate);
        const placeholderHTML = await this.renderHTML(placeholderTemplate);
        targetNode.appendChild(placeholderHTML)

        this.fetchData(this.fetchFunction);

        const componentTemplate = await this.#loadTemplate(this.templatePath);
        const renderedHtml = await this.renderHTML(componentTemplate);
        targetNode.appendChild(renderedHtml);
    }

    async renderHTML(template) {
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

    async fetchData(fetchFunction) {
        if (!fetchFunction) {
            return
        }
        try {
            const newData = await fetchFunction();
            if (typeof newData === "object" && newData !== null) {
                Object.assign(this, newData);
            } else {
                console.warn("fetchFunction must return an object");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
}

export default UiComponent;
