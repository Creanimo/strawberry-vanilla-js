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
        value,
        type = "ui-input",
        fetchFunction = null,
        callOnBlur = () => { return undefined; }
    }) {
        super({id, label, type, fetchFunction})
        this.value = value;
        this.callOnBlur = callOnBlur;
        this.eventValueUpdate = new Event(`${id}_value-update`);
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
        const inputElement = document.getElementById(this.id);

        const onBlur = () => {
            this.value = inputElement.value;
            this.callOnBlur();
            console.log(`Input UI Component now has value: ${this.value}`);
        }
        inputElement.addEventListener("blur", onBlur)
    }
}

export default UiInput;
