import UiInput from "../ui-input.js";
import ComponentTypeMap from "../../component-type-map.js";

/**
 * Select dropdown input component.
 */
class UiDropdownSelectInput extends UiInput {
    static type = "sv-ui__input-dropdown-select";

    /**
     * @param {Object} options
     * @param {string} options.id
     * @param {string} options.label
     * @param {string} options.dataName
     * @param {string} options.value
     * @param {string} options.helptext
     * @param {Array<{value: string, label: string}>} options.options
     * @param {string} [options.placeholder]
     * @param {boolean} [options.disabled]
     * @param {function():Promise<Object>} [options.fetchFunction]
     * @param {function(Event|null):void} [options.callOnAction]
     * @param {function(string):Object} [options.validationFunction]
     * @param {Object} [options.dependencies]
     */
    constructor({
                    id = null,
                    label,
                    dataName = label,
                    value = null,
                    helptext = null,
                    options = [],
                    placeholder = null,
                    disabled = false,
                    fetchFunction = null,
                    dependencies,
                    callOnAction = null,
                    validationFunction = null,
                }) {
        super({
            id,
            label,
            dataName,
            value,
            helptext,
            fetchFunction,
            dependencies,
            callOnAction,
            validationFunction,
        });

        this.type = UiDropdownSelectInput.type;

        /** @type {Array<{value: string, label: string}>} */
        this.options = options;

        /** @type {string|null} */
        this.placeholder = placeholder;

        /** @type {boolean} */
        this.disabled = disabled;
    }

    getRenderProperties() {
        const selectedValue = this.value;
        const optionsWithSelected = this.options.map(opt => ({
            ...opt,
            isSelected: opt.value === selectedValue,
        }));
        return {
            ...super.getRenderProperties(),
            options: optionsWithSelected,
            placeholder: this.placeholder,
            disabled: this.disabled,
        };
    }


    toJSON() {
        return {
            ...super.toJSON(),
            options: this.options,
            placeholder: this.placeholder,
            disabled: this.disabled,
        };
    }

    /**
     * Reconstructs a UiDropdownSelectInput from a plain object.
     * @param {Object} json
     * @param {Dependencies} dependencies
     * @param {Function} [ComponentClass=UiDropdownSelectInput]
     * @returns {UiDropdownSelectInput}
     */
    static fromJSON(json, dependencies = this._dependencies, ComponentClass = UiDropdownSelectInput) {
        return super.fromJSON(json, dependencies, ComponentClass);
    }


    /**
     * Set up event listeners for the select input.
     */
    async setEventListeners() {
        await super.setEventListeners();
        const select = this.componentNode.querySelector("select");
        if (select) {
            select.addEventListener("change", async (e) => {
                this.value = select.value;
                if (this.validationFunction) {
                    await this.validateInput();
                }
                if (typeof this.callOnAction === "function") {
                    await this.callOnAction(e);
                }
                await this.render();
            });
        }
    }
}

ComponentTypeMap[UiDropdownSelectInput.type] = UiDropdownSelectInput;

export default UiDropdownSelectInput;
