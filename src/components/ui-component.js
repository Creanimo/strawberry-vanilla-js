import Mustache from "mustache";
import { getConfig } from "../tools/initConfig.js";
import { createId } from "../tools/createId.js";

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
    constructor({ label, id = null, dataName = label, fetchFunction = null }) {
        /** @type {string} */
        this.id = id;

        /** @type {string} */
        this.label = label;

        /** @type {string} */
        this.dataName = dataName;

        /** @type {string} */
        this.type = "sv-ui__component";

        /** @type {boolean} */
        this.loading = false;

        /** @type {(() => Promise<Object>) | null} */
        this.fetchFunction = fetchFunction;

        /** @type {HTMLElement | null} */
        this.componentNode = null;

        /** @type {HTMLElement | null} */
        this.targetNode = null;

        /** @type {string} */
        this.templatePath = `${getConfig().templateRoot}mytemplate.html`;

        /**
         * @type {Object[] | null} childrenCollection - html ids where to place rendered child ui component(s)
         * @type {string} childrenCollection[].target class of a div in the parent's html template
         * @type {UiComponent} childrenCollection[].component to place inside the div
         */
        this.childrenCollection = [];
    }

    /**
     * Returns an object containing the component's properties for rendering.
     * @returns {Object} The properties used in the Mustache template.
     */
    getRenderProperties() {
        return {
            id: this.id,
            label: this.label,
            dataName: this.dataName,
        };
    }

    /**
     * @param {string} id
     */

    set id(value) {
        this._id = value || createId();
    }

    get id() {
        return this._id;
    }

    /**
     * @param {HTMLElement} node
     */
    set componentNode(node) {
        this._componentNode = node || this.createContainer();
    }

    get componentNode() {
        return this._componentNode;
    }

    createContainer() {
        const container = document.createElement("div");
        container.id = this.id;
        container.classList.add(this.type);
        return container;
    }

    /**
     * @param {boolean} state
     */
    async setLoading(state) {
        if (state) {
            const loadingTemplate = await this.#loadTemplate(
                `${getConfig().templateRoot}loading.html`,
            );
            await this.renderTpl(this.componentNode, loadingTemplate);
        }
        this.loading = state;
    }

    /**
     * Renders UI components and replaces content of given htmlNode
     */
    async render(targetNode) {
        this.targetNode = targetNode;

        this.setLoading(true);
        this.targetNode.appendChild(this.componentNode);

        let propCollectionToRender;
        if (this.fetchFunction) {
            propCollectionToRender = await this.fetchData(this.fetchFunction);
        } else {
            propCollectionToRender = this.getRenderProperties();
        }

        const tempNode = this.createContainer();

        // Render the actual component
        const componentTemplate = await this.#loadTemplate(this.templatePath);
        await this.renderTpl(tempNode, componentTemplate, propCollectionToRender);

        if (this.childrenCollection) {
            for (const child of this.childrenCollection) {
                const childHtmlNode = child.component.componentNode;
                const childTargetNode = tempNode.querySelector(`.${child.target}`);
                childTargetNode.appendChild(childHtmlNode);
            }
        }

        this.componentNode.replaceWith(tempNode);
        this.setLoading(false);
    }

    async renderTpl(htmlNode, template, renderProps = {}) {
        htmlNode.innerHTML = "";
        const htmlStr = Mustache.render(template, renderProps);
        htmlNode.innerHTML = htmlStr;
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
