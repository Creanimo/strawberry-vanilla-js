import UiInput from "../ui-input.mjs";

class UiTextField extends UiInput {
    /**
     * Single Line Text Field
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     * @param {string} templatePath - The path to the template file.
     */
    constructor(id,
                label,
                value,
                name = "ui-textfield",
                callOnBlur = (() => { return undefined; })) {
        super(id, label, value, name, callOnBlur);
        this.templatePath += 'input/textfield.html';
        this.setTemplatePath(templatePath);
    }
}

export default UiTextField;
