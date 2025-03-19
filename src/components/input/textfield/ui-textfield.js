import UiInput from "../ui-input.js";
import { dependencyInjection } from "../../../tools/commonDependencies.js";

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
                callOnAction = () => { return undefined; },
                validationFunction = null,
                validationResult = null,
                dependencies = dependencyInjection,
    }) {
        super({id, label, dataName, value, fetchFunction, callOnAction, validationFunction, validationResult, logObject: true, dependencies});
        this.type = "sv-ui__input-textfield"
        this.templatePath = `${this._dependencies.getConfig().templateRoot}input/textfield.html`;
        this.textfieldId = this._dependencies.createId(); // used in label for a11y
    }

    getRenderProperties() {
       return {
            ...super.getRenderProperties(),
            textfieldId: this.textfieldId,
        } 
    }
}

export default UiTextField;
