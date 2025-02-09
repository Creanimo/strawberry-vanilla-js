import UiComponent from "../ui-component.mjs";

class UiInput extends UiComponent {
    /**
     * 
     * @param {*} id 
     * @param {*} label 
     * @param {*} value 
     * @param {*} name 
     * @param {Function} callOnBlur 
     */
    constructor(id,
                label,
                value,
                name = "ui-input",
                callOnBlur = (() => { return undefined; })) {
        super(id, label, name)
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
            console.log(`Text UI Component now has value: ${this.value}`);
        }
        inputElement.addEventListener("blur", onBlur)
    }
}

export default UiInput;
