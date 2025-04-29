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
                dependencies = dependencyInjection,
    }) {
        super({id, label, dataName, value, fetchFunction, callOnAction, validationFunction, validationResult, dependencies});
        this.type = UiTextField.type;
        this.templatePath = `${this._dependencies.getConfig().templateRoot}input/textfield.html`;
        this.textfieldId = this._dependencies.createId(); // used in label for a11y
        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
       return {
            ...super.getRenderProperties(),
            textfieldId: this.textfieldId,
        } 
    }
}

ComponentTypeMap[UiTextField.type] = UiTextField;

export default UiTextField;
