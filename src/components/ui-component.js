import { dependencyInjection } from "../tools/commonDependencies.js"

/**
 * Base class for UI components.
 */
class UiComponent {
    /**
     * Creates an instance of UiComponent.
     * @param {Object} options - Configuration options for the UI component.
     * @param {string} options.id - The unique identifier for the component.
     * @param {string} options.label - The label for the component.
     * @param {() => Promise<Object>} [options.fetchFunction=null] - An optional async function to fetch data.
     * @param {Object} dependencies - only pass different dependencies for unit tests in mocha
     */
    constructor({ label, id = null, fetchFunction = null, dependencies = dependencyInjection }) {
        /** @type {Object} */
        this._dependencies = dependencies;

        /** @type {string} */
        this.id = id;

        /** @type {string} */
        this.label = label;

        /** @type {string} */
        this.type = "sv-ui__component";

        /** @type {boolean} */
        this.loading = null;

        /** @type {(() => Promise<Object>) | null} */
        this.fetchFunction = fetchFunction;

        /** @type {HTMLElement | null} */
        this.componentNode = null;

        /** @type {HTMLElement | null} */
        this.targetNode = null;

        /** @type {string} */
        this.templatePath = `${this._dependencies.getConfig.templateRoot}mytemplate.html`;

        /**
         * @type {Object[] | null} permanentChildren - html ids where to place rendered child ui component(s)
         * @type {string} permanentChildren[].target class of a div in the parent's html template
         * @type {UiComponent} permanentChildren[].component to place inside the div
         */
        this.permanentChildren = [];

        /**
         * @type {Object[] | null} dynamicChildren - html ids where to place rendered child ui component(s)
         * @type {string} dynamicChildren[].target class of a div in the parent's html template
         * @type {UiComponent} dynamicChildren[].component to place inside the div
         */
        this.dynamicChildren = [];

        /**
         * @type {boolean}
         */
        this.logObject = false;
        if (this.logObject) {
            this._dependencies.log.trace(this, `Initialized a ${this.type}`);
        }
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
        this._id = value || this._dependencies.createId();
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
            const loadingTemplate = await this._dependencies.loadTemplate(
                `${this._dependencies.getConfig().templateRoot}loading.html`,
            );
            await this._dependencies.renderTpl(this.componentNode, loadingTemplate);
        }
        this.loading = state;
        this._dependencies.log.trace(
            `${this.type} with ID ${this.id}: loading state is ${this.loading}`,
        );
    }

    /**
     * Renders UI components and replaces content of given htmlNode
     */
    async render(targetNode = this.targetNode) {
        const stackTrace = new Error().stack;
        this._dependencies.log.trace(
            { stackTrace },
            `${this.type} with ID ${this.id}: render() called`,
        );

        await this.setLoading(true);
        targetNode.appendChild(this.componentNode);
        this._dependencies.log.trace(`${this.type} with ID ${this.id}: append loading html done.`);

        try {
            let propCollectionToRender;
            if (this.fetchFunction) {
                this._dependencies.log.trace(`${this.type} with ID ${this.id}: starting fetch.`);
                propCollectionToRender = await this.fetchData(this.fetchFunction);
            } else {
                propCollectionToRender = this.getRenderProperties();
            }

            const tempNode = this.createContainer();

            // Render the actual component
            const componentTemplate = await this._dependencies.loadTemplate(this.templatePath);
            await this._dependencies.renderTpl(tempNode, componentTemplate, propCollectionToRender);
            this._dependencies.log.trace(`${this.type} with ID ${this.id}: rendered tempNode.`);

            if (this.permanentChildren) {
                await this.applyChildren(tempNode, this.permanentChildren);
            }

            if (this.dynamicChildren) {
                await this.applyChildren(tempNode, this.dynamicChildren);
            }

            this._dependencies.log.trace(
                tempNode,
                "${this.type} with ID ${this.id}: Assembled rendering in temp Node",
            );
            this.componentNode.replaceWith(tempNode);
            if (document.getElementById(this.id)) {
                this._dependencies.log.info(
                    `${this.type} with ID ${this.id}: replaced componentNode with tempNode in DOM.`,
                );
            }
            this.componentNode = tempNode;
        } catch (error) {
            console.error("Render error:", error);
        } finally {
            await this.setLoading(false);
            this._dependencies.log.trace(
                `${this.type} with ID ${this.id}: loading state has been set to false (rendering final step).`,
            );
        }
    }

    async applyChildren(parentNode, childrenCollection, clearTarget = false) {
        for (const child of childrenCollection) {
            const childTargetNode = parentNode.querySelector(`.${child.target}`);  
            child.component._dependencies = this._dependencies;
            await child.component.render(childTargetNode);
            const childHtmlNode = child.component.componentNode;
            if (clearTarget) {
                childTargetNode.innerHTML = "";
            }
            childTargetNode.appendChild(childHtmlNode);
        }
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
