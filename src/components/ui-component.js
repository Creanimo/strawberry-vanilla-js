import { dependencyInjection } from "../tools/commonDependencies.js";

/**
 * Base class for UI components.
 */
class UiComponent {
    /**
     * Creates an instance of UiComponent.
     * @param {Object} options - Configuration options for the UI component.
     * @param {null|string} options.id - The unique identifier for the component.
     * @param {string} options.label - The label for the component.
     * @param {boolean} options.showLoading
     * @param {null|() => Promise<Object>} [options.fetchFunction] - An optional async function to fetch data.
     * @param {Object} dependencies - only pass different dependencies for unit tests in mocha
     */
    constructor({
        label,
        id = null,
        showLoading = true,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        /** @type {Object} */
        this._dependencies = dependencies;

        /** @type {string} */
        this.id = id;

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.showLoading = showLoading;

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
     * Returns a plain object representation of the component for serialization.
     * Subclasses should override and extend this as needed.
     * @returns {Object}
     */
    toJSON() {
        return {
            type: this.type,
            id: this.id,
            label: this.label,
            showLoading: this.showLoading,
            loading: this.loading,
            permanentChildren: this.permanentChildren.map((child) => ({
                target: child.target,
                component: child.component.toJSON(),
            })),
            dynamicChildren: this.dynamicChildren.map((child) => ({
                target: child.target,
                component: child.component.toJSON(),
            })),
        };
    }

    /**
     * Reconstructs a UiComponent (or subclass) from a plain object.
     * Subclasses should override and extend this as needed.
     * @param {Object} json - The plain object.
     * @param {Dependencies} dependencies - The dependencies to inject.
     * @param {Function} [ComponentClass=UiComponent] - The class to instantiate.
     * @returns {UiComponent}
     */
    static fromJSON(json, dependencies = this._dependencies, ComponentClass = UiComponent) {
        const instance = new ComponentClass({
            id: json.id,
            label: json.label,
            showLoading: json.showLoading,
            dependencies,
        });

        instance.loading = json.loading;

        const { deserializeComponent } = dependencies || {};
        instance.permanentChildren = (json.permanentChildren || []).map(
            (childJson) => ({
                target: childJson.target,
                component: deserializeComponent
                    ? deserializeComponent(childJson.component, dependencies)
                    : null,
            }),
        );

        instance.dynamicChildren = (json.dynamicChildren || []).map(
            (childJson) => ({
                target: childJson.target,
                component: deserializeComponent
                    ? deserializeComponent(childJson.component, dependencies)
                    : null,
            }),
        );

        return instance;
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
     * @param {boolean} state
     */
    async setLoading(state, showLoading = this.showLoading) {
        if (state && showLoading) {
            const loadingTemplate = await this._dependencies.loadTemplate(
                `${this._dependencies.getConfig().templateRoot}loading.html`,
            );
            const loadingNode = await this._dependencies.renderTpl(loadingTemplate, {
                id: this.id,
            });
            this.componentNode = await loadingNode;

            this.removeFromDom();

            if (this.targetNode) {
                this.targetNode.appendChild(this.componentNode);
            }
        }

        this.loading = state;
        this._dependencies.log.trace(
            `${this.type} with ID ${this.id}: loading state is ${this.loading}`,
        );
    }

    removeFromDom() {
        const staleComponent = document.getElementById(this.id);
        if (staleComponent) {
            staleComponent.remove();
        }
    }

    /**
     * Renders UI components and replaces content of given htmlNode
     */
    async render(
        targetNode = this.targetNode,
        { showLoading = this.showLoading, replace = true } = {},
    ) {
        if (targetNode !== this.targetNode) {
            this.targetNode = targetNode;
        }

        await this.setLoading(true, showLoading);
        this._dependencies.log.trace(
            `${this.type} with ID ${this.id}: append loading html done.`,
        );

        try {
            let propCollectionToRender;
            if (this.fetchFunction) {
                this._dependencies.log.trace(
                    `${this.type} with ID ${this.id}: starting fetch.`,
                );
                propCollectionToRender = await this.fetchData(this.fetchFunction);
            } else {
                propCollectionToRender = this.getRenderProperties();
            }

            const tempNode = document.createElement("template");

            // Render the actual component
            const componentTemplate = await this._dependencies.loadTemplate(
                this.templatePath,
            );
            const outerComponent = await this._dependencies.renderTpl(
                componentTemplate,
                propCollectionToRender,
            );
            tempNode.append(outerComponent);
            this._dependencies.log.trace(
                { tempNode },
                `${this.type} with ID ${this.id}: rendered tempNode.`,
            );

            if (this.permanentChildren) {
                await this.applyChildren(tempNode, this.permanentChildren);
            }

            if (this.dynamicChildren) {
                await this.applyChildren(tempNode, this.dynamicChildren);
            }

            this._dependencies.log.trace(
                { tempNode },
                `${this.type} with ID ${this.id}: Assembled rendering in temp Node`,
            );

            this.componentNode = tempNode.firstChild;

            const existingNode = document.getElementById(this.id);
            if (replace && existingNode) {
                existingNode.replaceWith(this.componentNode);
                this._dependencies.log.info(
                    `${this.type} with ID ${this.id}: replaced componentNode with tempNode in DOM.`,
                );
            } else if (this.targetNode) {
                // fallback: append if not found
                this.targetNode.appendChild(this.componentNode);
                this._dependencies.log.info(
                    `${this.type} with ID ${this.id}: appended componentNode in DOM targetNode.`,
                );
            }
        } catch (error) {
            this._dependencies.log.error(
                { errorMessage: error.message, errorStack: error.stack, error },
                "Render error:",
            );
        } finally {
            await this.setLoading(false);
            this._dependencies.uiRegistry.updateStatus(this.id, "rendered");
            this._dependencies.log.trace(
                `${this.type} with ID ${this.id}: loading state has been set to false (rendering final step).`,
            );
        }
    }

    async applyChildren(parentNode, childrenCollection, clearTarget = false) {
        for (const child of childrenCollection) {
            const childTargetNode = parentNode.querySelector(`.${child.target}`);
            child.component._dependencies = this._dependencies;
            if (clearTarget) {
                childTargetNode.innerHTML = "";
            }
            await child.component.render(childTargetNode);

            const childHtmlNode = child.component.componentNode;
            const existingChild = childTargetNode.querySelector(
                `[id="${child.component.id}"]`,
            );
            if (existingChild) {
                existingChild.replaceWith(childHtmlNode);
            } else {
                childTargetNode.appendChild(childHtmlNode);
            }
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
