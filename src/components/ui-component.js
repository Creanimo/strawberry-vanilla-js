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
        this.componentNode = null;

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
     * Renders UI components and replaces content of given htmlNode
     * @param {HTMLElement} htmlNode - the target HTMLElement in which the rendered content will be placed
     * @param {string} htmlTemplate - path relative to the entry point; should use getConfig().templateRoot
     * @param {Object.<string, string>} propCollection - which placeholders to replace with which values
     * @param {Object[]} childrenCollection - html ids where to place rendered child ui component(s)
     * @param {string} childrenCollection[].id of a div in the html template
     * @param {UiComponent} childrenCollection[].component to place inside the div
     * @param {null | (() => Promise<Object>)} fetchFunction may override propCollection if not null
     * @param {null | ((htmlNode) => Promise<void>)} afterRenderFunction e.g. to attach event listeners
     */
    async renderInNode(
        htmlNode = this.componentNode,
        targetNode = null,
        htmlTemplate = this.templatePath,
        propCollection = this.getRenderProperties(),
        childrenCollection = null,
        fetchFunction = this.fetchFunction,
        afterRenderFunction = null
    ) {
        const loadingTemplate = await this.#loadTemplate(`${getConfig().templateRoot}loading.html`);
        await this.renderTpl(htmlNode, loadingTemplate); 

        if (targetNode && !targetNode.contains(htmlNode)) {
            targetNode.appendChild(htmlNode);
        }

        let propCollectionToRender;
        if (this.fetchFunction) {
            propCollectionToRender = await this.fetchData(this.fetchFunction);
        } else {
            propCollectionToRender = propCollection;
        }

        // Render the actual component
        const componentTemplate = await this.#loadTemplate(this.templatePath);
        await this.renderTpl(htmlNode, componentTemplate, propCollectionToRender);

        if (afterRenderFunction) afterRenderFunction();
    }

    async renderTpl(htmlNode, template, renderProps = {}) {
        htmlNode.innerHTML = "";
        const htmlStr = Mustache.render(template, renderProps);
        const renderedNode = htmlStringToElement(htmlStr);
        htmlNode.appendChild(renderedNode);
    }

    /**
     * Renders the UI component inside the specified target node.
     * @param {HTMLElement} [componentNode=this.componentNode] - The target HTML element where the component should be rendered.
     * @returns {Promise<void>}
     * @throws {Error} If componentNode is not provided on the first render.
     */
    async render() {
        if (!this.componentNode) throw new Error("Target node is required for the first render.");
        this.renderInNode();
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
            return newData;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
}

export default UiComponent;

