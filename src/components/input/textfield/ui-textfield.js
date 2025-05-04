import UiInput from "../ui-input.js";
import ComponentTypeMap from "../../component-type-map.js";
import { dependencyInjection } from "../../../tools/commonDependencies.js";

class UiTextField extends UiInput {
    static type = "sv-ui__input-textfield";

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
                callOnAction = () => { return undefined; },
                validationFunction = null,
                validationResult = null,
                hasEditPreviewToggle = false,
                dependencies = dependencyInjection,
    }) {
        super({
            id,
            label,
            dataName,
            value,
            fetchFunction,
            callOnAction,
            validationFunction,
            validationResult,
            hasEditPreviewToggle,
            dependencies});
        this.type = UiTextField.type;
        if (!hasEditPreviewToggle) {
            this.templatePath = `${this._dependencies.getConfig().templateRoot}input/textfield.html`;
        } else {
            this.templatePath = `${this._dependencies.getConfig().templateRoot}input/textfieldEditPreviewMode.html`;
        }
        this.textfieldId = this._dependencies.createId(); // used in label for a11y
        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
       return {
            ...super.getRenderProperties(),
            textfieldId: this.textfieldId,
        } 
    }

    async setEventListeners() {
        await super.setEventListeners();
        const inputElement = this.componentNode.querySelector("input");
        inputElement.addEventListener("blur", (event) => this.handleAction(event));
    }

    async handleAction() {
            this.value = this.componentNode.querySelector("input").value;
            if (this.callOnAction) {
                this.callOnAction();
            }

            if (this.validationFunction) {
                await this.validateInput();
            }
    }
}

ComponentTypeMap[UiTextField.type] = UiTextField;

export default UiTextField;
