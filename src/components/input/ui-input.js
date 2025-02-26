import UiComponent from "../ui-component.js";
import UiAlertMsg from "../alertMsg/ui-alertMsg.js";
import { dependencyInjection } from "../../tools/commonDependencies.js";

class UiInput extends UiComponent {
    /**
     *
     * @param {string} id
     * @param {string} label
     * @param {string} value
     * @param {string} dataName
     * @param {() => void | null} callOnBlur
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
        dependencies = dependencyInjection,
    }) {
        super({ id, label, fetchFunction, dependencies });
        /** @type {string} */
        this.type = "sv-ui__input";

        /** @type {string} */
        this.value = value;

        /** @type {string} */
        this.dataName = dataName;

        /** @type {() => void | null} */
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
        } else {
            // still print alert if one was given through constructor
            if (this.validationResult) {
                await this.validationResultToAlertChild();
            }
        }
    }

    async setEventListeners() {
        const inputElement = document
            .getElementById(this.id)
            .querySelector("input");

        const onBlur = async () => {
            this.value = inputElement.value;
            if (this.callOnBlur) {
                this.callOnBlur();
            }
            console.log(`Input UI Component now has value: ${this.value}`);
            if (this.validationFunction) {
                await this.validateInput();
            }
        };
        inputElement.addEventListener("blur", onBlur);
    }

    async validationResultToAlertChild() {
        this.dynamicChildren = this.dynamicChildren.filter(
            (child) => child.target !== "validationAlert",
        );
        const alert = new UiAlertMsg({
            alertType: this.validationResult.alertType,
            message: this.validationResult.message,
            dependencies: dependencyInjection,
        });
        this.dynamicChildren.push({ target: "validationAlert", component: alert });
        await this.applyChildren(this.componentNode, this.dynamicChildren, true);
    }

    async validateInput() {
        if (this.validationFunction) {
            const previousResult = this.validationResult;
            this.validationResult = this.validationFunction(this.value);
            if (previousResult.message !== this.validationResult.message) {
                if (this.validationResult) {
                    await this.validationResultToAlertChild();
                }
            }
        } else {
            return;
        }
    }
}

export default UiInput;
