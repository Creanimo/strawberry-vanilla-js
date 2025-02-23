import Mustache from 'mustache';
import hljs from '@highlightjs/cdn-assets/es/core.js';
import javascript from '@highlightjs/cdn-assets/es/languages/javascript.min.js';

let config = null;

async function loadConfig() {
    if (!config) {
        try {
            const response = await fetch('./sv-ui-config.json');
            config = await response.json();
        } catch (error) {
            // console.error('Error loading config:', error);
        }
    }
    return config;
}

function getConfig() {
    return config;
}

const createId = (length = 8) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map(byte => byte.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, length);
};

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
     */
    constructor({
        label,
        id = null,
        fetchFunction = null
    }) {
        /** @type {string} */
        this.id = id;

        /** @type {string} */
        this.label = label;

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
    async render(targetNode = this.targetNode) {
        this.setLoading(true);
        targetNode.appendChild(this.componentNode);

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

        if (this.permanentChildren) {
            await this.applyChildren(tempNode, this.permanentChildren);
        }

        if (this.dynamicChildren) {
            await this.applyChildren(tempNode, this.dynamicChildren);
        }

        this.componentNode.replaceWith(tempNode);
        this.componentNode = tempNode;
        this.setLoading(false);
    }

    async applyChildren(parentNode, childrenCollection, clearTarget = false) {
            for (const child of childrenCollection) {
                const childTargetNode = parentNode.querySelector(`.${child.target}`);
                await child.component.render(childTargetNode);
                const childHtmlNode = child.component.componentNode;
                if (clearTarget) { childTargetNode.innerHTML = ""; }
                childTargetNode.appendChild(childHtmlNode);
            }
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

/**
 * @typedef {"success" | "error" | "info" | "warning"} AlertType
 */

class UiAlertMsg extends UiComponent {
    constructor({
        id,
        label,
        message,
        alertType,
        dataName = label,
        fetchFunction = null,
    }) {
        super({id, label, dataName, fetchFunction});
        this.type = "sv-ui__alert-msg";
        this.message = message;
        const validAlertTypes = [
            "success",
            "info",
            "warning",
            "error",
        ];
        if (validAlertTypes.includes(alertType)) {
            this.alertType = alertType;
        } else {
            throw new TypeError("alertType must be 'success', 'info', 'warning' or 'error'.")
        }
        this.templatePath = `${getConfig().templateRoot}/alertMsg/alertMsg.html`;
    }

    createContainer() {
        const container = super.createContainer();
        container.classList.add(this.alertType);
        return container;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            message: this.message,
        }
    }
}

class UiInput extends UiComponent {
    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     * @param {string} dataName 
     * @param {() => void | null} callOnBlur 
     */
    constructor({
        id = null,
        label,
        dataName = label,
        value,
        fetchFunction = null,
        callOnBlur = null,
        validationFunction = null,
        validationResult = null,
    }) {
        super({ id, label, fetchFunction });
        /** @type {string} */
        this.type = "sv-ui__input";

        /** @type {string} */
        this.value = value;

        /** @type {string} */
        this.dataName = dataName;

        /** @type {() => void | null} */
        this.callOnBlur = callOnBlur;
        this.validationFunction = validationFunction;
        this.validationResult = validationResult;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            value: this.value,
        };
    }

    async render(targetNode) {
        await super.render(targetNode);
        await this.setEventListeners();
        if (this.validationFunction) {
            await this.validateInput();
        }
    }

    async setEventListeners() {
        const inputElement = document.getElementById(this.id).querySelector("input");

        const onBlur = async () => {
            this.value = inputElement.value;
            if (this.callOnBlur) {
                this.callOnBlur();
            }
            console.log(`Input UI Component now has value: ${this.value}`);
            if (this.validationFunction) {
                await this.validateInput();
            }
        };
        inputElement.addEventListener("blur", onBlur);
    }

    async validateInput() {
        if (this.validationFunction) {
            const previousResult = this.validationResult;
            this.validationResult = this.validationFunction(this.value);
            if (previousResult !== this.validationResult) {
                this.dynamicChildren = this.dynamicChildren.filter(child => child.target !== "validationAlert");
                const alert = new UiAlertMsg({
                    alertType: this.validationResult.alertType,
                    message: this.validationResult.message
                });
                this.dynamicChildren.push({ target: "validationAlert", component: alert });
                await this.applyChildren(this.componentNode, this.dynamicChildren, true);
            }
        } else {
            return
        }
    }
}

class UiTextField extends UiInput {
    /**
     * Single Line Text Field
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     * @param {string} templatePath - The path to the template file.
     */
    constructor({id = null,
                label,
                dataName = label,
                value,
                fetchFunction = null,
                callOnBlur = () => { return undefined; },
                validationFunction = null,
                validationResult = null,
    }) {
        super({id, label, dataName, value, fetchFunction, callOnBlur, validationFunction, validationResult});
        this.type = "sv-ui__input-textfield";
        this.templatePath = `${getConfig().templateRoot}input/textfield.html`;
        this.textfieldId = createId(); // used in label for a11y
    }

    getRenderProperties() {
       return {
            ...super.getRenderProperties(),
            textfieldId: this.textfieldId,
        } 
    }
}

class UiCodeBlock extends UiComponent {
    constructor({
        label,
        id = null,
        fetchFunction = null,
        code,
        language,
    }) {
        super({label, id, fetchFunction});

        this.type = "sv-ui__codeBlock";

        /** @type {string} */
        this.language = language;

        hljs.registerLanguage('javascript', javascript);
        
        /** @type {string} */
        this.code = code;

        this.templatePath = `${getConfig().templateRoot}code/codeBlock.html`;
    }

    get code() {
        return this._code;
    }

    set code(string) {
        const code = hljs.highlight(string, {language: this.language}).value;
        this._code = code;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            code: this.code,
            language: this.language,
        }
    }
}

export { UiCodeBlock, UiTextField, getConfig, loadConfig };
//# sourceMappingURL=index.esm.js.map
