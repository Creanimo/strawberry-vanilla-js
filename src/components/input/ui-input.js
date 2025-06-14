import UiComponent from "../ui-component.js";
import ComponentTypeMap from "../component-type-map.js";
import UiAlertMsg from "../alertMsg/ui-alertMsg.js";
import { dependencyInjection } from "../../tools/commonDependencies.js";

class UiInput extends UiComponent {
    static type = "sv-ui__input";
    /**
     * @param {string} id
     * @param {string} label
     * @param {string} value
     * @param {string} dataName
     * @param {string} helptext
     * @param {function():void | null} fetchFunction
     * @param {Dependencies} dependencies
     * @param {function(Event|null):void | null} callOnAction
     * @param {function(string): ValidationResult | null} validationFunction
     * @param {boolean} hasEditPreviewToggle
     * @param {boolean} hasEditPreviewLabel
     * @param {ValidationResult | null} validationResult
     */
    constructor({
                    id = null,
                    label,
                    dataName = label,
                    value = null,
                    helptext = null,
                    fetchFunction = null,
                    dependencies = dependencyInjection,
                    callOnAction = null,
                    validationFunction = null,
                    hasEditPreviewToggle = false,
                    hasEditPreviewLabel = false,
                    validationResult = null,
                }) {
        super({ id, label, fetchFunction, dependencies });
        this.type = UiInput.type;

        /** @type {string} */
        this.value = value;

        this.helptext = helptext;

        /** @type {string} */
        this.dataName = dataName;

        /** @type {function(Event | null): void | null} */
        this.callOnAction = callOnAction;

        /** @type {function(string): Object | null} */
        this.validationFunction = validationFunction;

        /** @type {Object | null} */
        this.validationResult = validationResult;

        /** @type {boolean} */
        this.hasEditPreviewToggle = hasEditPreviewToggle;

        /** @type {boolean} */
        this.hasEditPreviewLabel = hasEditPreviewLabel;

        if (this.hasEditPreviewToggle) {
            this._idEditableField = this._dependencies.createId();
        }

        this._onSwitchToPreview = null;
        this._onSwitchToEditMode = null;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            value: this.value,
            dataName: this.dataName,
            helptext: this.helptext,
            hasEditPreviewLabel: this.hasEditPreviewLabel,
            idEditableField: this._idEditableField,
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            value: this.value,
            dataName: this.dataName,
            hasEditPreviewToggle: this.hasEditPreviewToggle,
        }
    }

    async render(targetNode) {
        await super.render(targetNode);
        await this.setEventListeners();
        if (this.validationFunction) {
            await this.validateInput();
        } else {
            // still print alert if one was given through constructor
            if (this.validationResult) {
                await this.validationResultToAlertChild();
            }
        }
    }

    async setEventListeners() {
        if (this.hasEditPreviewToggle) {
            await this.initPreviewEditMode();
        }
    }

    async initPreviewEditMode() {
        const editPreviewToggle = this.componentNode.querySelector("button.sv-ui__edit-mode__preview");
        const editPreviewToggleValue = this.componentNode.querySelector(".sv-ui__edit-mode__preview-value");
        const editableField = this.componentNode.querySelector(`[id="${this._idEditableField}"]`);
        const editPreviewExit = this.componentNode.querySelector(".sv-ui__edit-mode__exit");

        this._editPreviewElements = {
            editPreviewToggle,
            editPreviewToggleValue,
            editableField,
            editPreviewExit,
        };

        editPreviewToggle.addEventListener("mousedown", () => this.switchToEditMode());
        editPreviewExit.addEventListener("mousedown", () => this.switchToPreview());
    }

    async switchToPreview() {
        const { editPreviewToggle, editPreviewToggleValue, editableField } = this._editPreviewElements;
        editableField.style.display = "none";
        editPreviewToggle.style.removeProperty("display");
        editPreviewToggle.ariaExpanded = "false";
        await this.handleAction();
        editPreviewToggleValue.textContent = this.value;

        if (typeof this._onSwitchToPreview === "function") {
            await this._onSwitchToPreview();
        }
    }

    async switchToEditMode() {
        const { editPreviewToggle, editableField } = this._editPreviewElements;
        editPreviewToggle.style.display = "none";
        editableField.style.removeProperty("display");
        editPreviewToggle.ariaExpanded = "true";

        if (typeof this._onSwitchToEditMode === "function") {
            await this._onSwitchToEditMode();
        }
    }


    async handleAction() {
        this.callOnAction();
    }

    async validationResultToAlertChild() {
        this.dynamicChildren = this.dynamicChildren.filter(
            (child) => child.target !== "validationAlert",
        );
        const alert = new UiAlertMsg({
            alertType: this.validationResult.alertType,
            message: this.validationResult.message,
            dependencies: dependencyInjection,
        });
        this.dynamicChildren.push({ target: "validationAlert", component: alert });
        await this.applyChildren(this.componentNode, this.dynamicChildren, true);
    }

    async validateInput() {
        if (this.validationFunction) {
            this._dependencies.log.debug(`Validating ${this.type} ${this.id}`);
            const previousResult = structuredClone(this.validationResult);
            this.validationResult = await this._dependencies.validationService.validate(this.value, this.validationFunction);
            this._dependencies.log.debug(
                `Validation result of ${this.type} ${this.id}\nPrevious: ${JSON.stringify(previousResult)}\nNow: ${JSON.stringify(this.validationResult)}`
            );
            if (previousResult == null
                || JSON.stringify(previousResult) !== JSON.stringify(this.validationResult)
            ) {
                await this.validationResultToAlertChild();
            }
        } else {
            return;
        }
    }
}

ComponentTypeMap[UiInput.type] = UiInput;

export default UiInput;
