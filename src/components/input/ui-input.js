import { createId } from "../../tools/createId.js";
import UiComponent from "../ui-component.js";

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
        id,
        label,
        dataName = label,
        value,
        fetchFunction = null,
        callOnBlur = () => { return undefined; }
    }) {
        super({id, label, dataName, fetchFunction})
        this.type = "sv-ui__input"
        this.value = value;
        this.callOnBlur = callOnBlur;
        this.textfieldId = createId();
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
            this.callOnBlur();
            console.log(`Input UI Component now has value: ${this.value}`);
        }
        inputElement.addEventListener("blur", onBlur)
    }
}

export default UiInput;
