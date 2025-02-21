import { createId } from "../../tools/createId.js";
import UiComponent from "../ui-component.js";
import UiAlertMsg from "./alertMsg/ui-alertMsg.js";

class UiInput extends UiComponent {
    /**
     * 
     * @param {*} id 
     * @param {*} label 
     * @param {*} value 
     * @param {*} name 
     * @param {Function} callOnBlur 
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
        super({id, label, dataName, fetchFunction})
        this.type = "sv-ui__input"
        this.value = value;
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
    }

    async setEventListeners() {
        const inputElement = document.getElementById(this.id).querySelector("input");

        const onBlur = () => {
            this.value = inputElement.value;
            if (this.callOnBlur) {
                this.callOnBlur();
            }
            console.log(`Input UI Component now has value: ${this.value}`);
        }
        inputElement.addEventListener("blur", onBlur)
    }

    validateInput() {
        if (this.validationFunction) {
            previousResult = this.validationResult;
            this.validationResult = this.validationFunction(this.value);
            if (previousResult != this.validationResult) {
                new UiAlertMsg()
            }
        } else {
            return
        }
    }
}

export default UiInput;
