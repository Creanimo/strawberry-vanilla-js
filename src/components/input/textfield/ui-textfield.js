import { getConfig } from "../../../tools/initConfig.js";
import UiInput from "../ui-input.js";

class UiTextField extends UiInput {
    /**
     * Single Line Text Field
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     * @param {string} templatePath - The path to the template file.
     */
    constructor({id,
                label,
                dataName = label,
                value,
                callOnBlur = () => { return undefined; }
    }) {
        super({id, label, dataName, value, callOnBlur});
        this.type = "sv-ui__input-textfield"
        this.templatePath = `${getConfig().templateRoot}input/textfield.html`;
    }

    getRenderProperties() {
       return {
            ...super.getRenderProperties(),
            textfieldId: this.textfieldId,
        } 
    }
}

export default UiTextField;
