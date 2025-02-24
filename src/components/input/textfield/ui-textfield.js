import { getConfig } from "../../../tools/initConfig.js";
import { createId } from "../../../tools/createId.js";
import UiInput from "../ui-input.js";

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
        super({id, label, dataName, value, fetchFunction, callOnBlur, validationFunction, validationResult, logObject: true});
        this.type = "sv-ui__input-textfield"
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

export default UiTextField;
