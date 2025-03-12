import { dependencyInjection } from "../../../tools/commonDependencies.js";
import UiInput from "../ui-input.js";

class UiButton extends UiInput {
    constructor({
        id = null,
        label,
        dataName = label,
        fetchFunction = null,
        dependencies = dependencyInjection,
        callOnAction = null,
    }) {
        super({
            id,
            label,
            dataName,
            value,
            fetchFunction,
            dependencies,
            callOnAction,
        });
        this.type = "sv-ui__input-button";
        this.templatePath = `${this._dependencies.getConfig().templateRoot}input/button.html`;
    }
}

export default UiButton;
