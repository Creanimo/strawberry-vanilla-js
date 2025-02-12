import Mustache from "mustache";
import { getConfig } from "../tools/initConfig.js";
import { htmlStringToElement } from "../tools/htmlStringToElement.js";

/**
 * Base class for UI components.
 */
class UiComponent {
    /**
     * Creates an instance of UiComponent.
     * @param {Object} options - Configuration options for the UI component.
     * @param {string} options.id - The unique identifier for the component.
     * @param {string} options.label - The label for the component.
     * @param {string} [options.type="ui-component"] - The type of the component.
     * @param {() => Promise<Object>} [options.fetchFunction=null] - An optional async function to fetch data.
     */
    constructor({
        id,
        label,
        type = "ui-component",
        fetchFunction = null
    }) {
        /** @type {string} */
        this.id = id;

        /** @type {string} */
        this.label = label;

        /** @type {string} */
        this.type = type;

        /** @type {boolean} */
        this.loading = false;

        /** @type {(() => Promise<Object>) | null} */
        this.fetchFunction = fetchFunction;

        /** @type {HTMLElement | null} */
        this.targetNode = null;

        /** @type {string} */
        this.templatePath = `${getConfig().templateRoot}mytemplate.html`;
    }

    /**
     * Returns an object containing the component's properties for rendering.
     * @returns {Object} The properties used in the Mustache template.
     */
    getRenderProperties() {
        return {
            id: this.id,
            label: this.label,
            type: this.type,
        };
    }

    /**
     * Renders the UI component inside the specified target node.
     * @param {HTMLElement} [targetNode=this.targetNode] - The target HTML element where the component should be rendered.
     * @returns {Promise<void>}
     * @throws {Error} If targetNode is not provided on the first render.
     */
    async render(targetNode = this.targetNode) {
        if (!targetNode) throw new Error("Target node is required for the first render.");
        this.targetNode = targetNode;
        this.loading = true;

        // Clear previous content and show loading state
        targetNode.innerHTML = "";
        const loadingTemplate = await this.#loadTemplate(`${getConfig().templateRoot}loading.html`);
        targetNode.appendChild(this.renderHTML(loadingTemplate));

        // Fetch data if needed
        if (this.fetchFunction) {
            await this.fetchData(this.fetchFunction);
        }

        // Render the actual component
        const componentTemplate = await this.#loadTemplate(this.templatePath);
        targetNode.innerHTML = "";
        targetNode.appendChild(this.renderHTML(componentTemplate));

        this.loading = false;
    }

    /**
     * Renders an HTML template with Mustache and returns the resulting element.
     * @param {string} template - The Mustache template string.
     * @returns {Node} The rendered HTML element.
     */
    renderHTML(template) {
        const renderProps = this.getRenderProperties();
        const htmlStr = Mustache.render(template, renderProps);
        return htmlStringToElement(htmlStr);
    }

    /**
     * Loads an HTML template from a given file path.
     * @param {string} templatePath - The path to the template file.
     * @returns {Promise<string>} The template content as a string.
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

    /**
     * Fetches data using the provided fetch function and updates the component properties.
     * After fetching, it re-renders the component to reflect the new data.
     * @param {() => Promise<Object>} fetchFunction - The function to fetch data.
     * @returns {Promise<void>}
     */
    async fetchData(fetchFunction) {
        if (!fetchFunction) return;

        try {
            const newData = await fetchFunction();
            if (typeof newData === "object" && newData !== null) {
                Object.assign(this, newData);
            } else {
                console.warn("fetchFunction must return an object.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
}

export default UiComponent;

