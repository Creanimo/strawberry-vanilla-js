import UiComponent from "../../ui-component";

/**
 * @typedef {"success" | "error" | "info" | "warning"} AlertType
 */

class UiAlertMsg extends UiComponent {
    constructor({
        id,
        label,
        message,
        alertLevel,
        dataName = label,
        fetchFunction = null,
    }) {
        super({id, label, dataName, fetchFunction});
        this.type = "sv-ui__alert-msg"
        this.message = message;
        validAlertLevels = [
            "success",
            "info",
            "warning",
            "error",
        ]
        if (validAlertLevels.includes(alertLevel)) {
            this.alertLevel = alertLevel;
        } else {
            throw new TypeError("alertLevel must be 'success', 'info', 'warning' or 'error'.")
        };
    }

    render() {
        super.render();
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            message: this.message,
            alertLevel: this.alertLevel,
        }
    }
}

export default UiAlertMsg;
