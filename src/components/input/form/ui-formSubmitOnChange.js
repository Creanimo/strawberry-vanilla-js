import { UiComponent } from "../ui-component.js";

class UiFormSubmitOnChange extends UiInput {
    /**
     * Prototype for all UI Components of type UI Input.
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     */
    constructor(id, label, value, name = "ui-input") {
        super(id, label, value, name);
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
        const formNode = document.getElementById(`${this.name}-${this.id}`)
    }
}

export { UiInput };