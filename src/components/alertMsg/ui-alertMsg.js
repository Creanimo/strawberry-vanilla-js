import UiComponent from "../ui-component.js";
import ComponentTypeMap from "../component-type-map.js";
import { dependencyInjection } from "../../tools/commonDependencies.js";

/**
 * @typedef {"success" | "error" | "info" | "warning"} AlertType
 */

class UiAlertMsg extends UiComponent {
    static type = "sv-ui__alert-msg";

    constructor({
        id,
        label,
        message,
        alertType,
        dataName = label,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        super({id, label, dataName, fetchFunction, dependencies: dependencies});
        this.message = message;
        const validAlertTypes = [
            "success",
            "info",
            "warning",
            "error",
        ]
        if (validAlertTypes.includes(alertType)) {
            this.alertType = alertType;
        } else {
            throw new TypeError("alertType must be 'success', 'info', 'warning' or 'error'.")
        }
        this.templatePath = `${this._dependencies.getConfig().templateRoot}/alertMsg/alertMsg.html`;

        this._dependencies.uiRegistry.register(this);
    }

    createContainer() {
        const container = super.createContainer();
        container.classList.add(this.alertType);
        return container;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            alertType: this.alertType,
            message: this.message,
        }
    }
}

ComponentTypeMap[UiAlertMsg.type] = UiAlertMsg;

export default UiAlertMsg;
