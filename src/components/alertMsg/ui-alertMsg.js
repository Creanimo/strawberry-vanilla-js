import { getConfig } from "../../tools/initConfig";
import UiComponent from "../ui-component";

/**
 * @typedef {"success" | "error" | "info" | "warning"} AlertType
 */

class UiAlertMsg extends UiComponent {
    constructor({
        id,
        label,
        message,
        alertType,
        dataName = label,
        fetchFunction = null,
    }) {
        super({id, label, dataName, fetchFunction});
        this.type = "sv-ui__alert-msg"
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
        this.templatePath = `${getConfig().templateRoot}/alertMsg/alertMsg.html`;
    }

    createContainer() {
        const container = super.createContainer();
        container.classList.add(this.alertType);
        return container;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            message: this.message,
        }
    }
}

export default UiAlertMsg;
