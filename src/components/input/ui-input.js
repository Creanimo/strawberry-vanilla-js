import UiComponent from "../ui-component.js";
import UiAlertMsg from "../alertMsg/ui-alertMsg.js";

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
        super({ id, label, dataName, fetchFunction })
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
        if (this.validationFunction) {
            await this.validateInput();
        }
    }

    async setEventListeners() {
        const inputElement = document.getElementById(this.id).querySelector("input");

        const onBlur = async () => {
            this.value = inputElement.value;
            if (this.callOnBlur) {
                this.callOnBlur();
            }
            console.log(`Input UI Component now has value: ${this.value}`);
            if (this.validationFunction) {
                await this.validateInput();
            }
        }
        inputElement.addEventListener("blur", onBlur)
    }

    async validateInput() {
        if (this.validationFunction) {
            const previousResult = this.validationResult;
            this.validationResult = this.validationFunction(this.value);
            if (previousResult !== this.validationResult) {
                this.dynamicChildren = this.dynamicChildren.filter(child => child.target !== "validationAlert");
                const alert = new UiAlertMsg({
                    alertType: this.validationResult.alertType,
                    message: this.validationResult.message
                });
                this.dynamicChildren.push({ target: "validationAlert", component: alert });
                await this.applyChildren(this.componentNode, this.dynamicChildren, true);
            }
        } else {
            return
        }
    }
}

export default UiInput;
