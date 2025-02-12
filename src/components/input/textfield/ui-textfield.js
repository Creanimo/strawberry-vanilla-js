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
                value,
                type = "ui-textfield",
                callOnBlur = () => { return undefined; }
    }) {
        super({id, label, value, type, callOnBlur});
        this.templatePath = `${getConfig().templateRoot}input/textfield.html`;
    }
}

export default UiTextField;
