import {dependencyInjection} from "../../../tools/commonDependencies.js";
import ComponentTypeMap from "../../component-type-map.js";
import UiInput from "../ui-input.js";

/**
 * @typedef {"loud" | "calm" | "quiet" | "textlink" | "menuItem" } ButtonPriority
 */

class UiButton extends UiInput {
    static type = "sv-ui__input-button";

    /**
     * Buttons can either have a linkHref or a callOnAction(), not both
     * @param id
     * @param label
     * @param dataName
     * @param value
     * @param fetchFunction
     * @param dependencies
     * @param callOnAction
     * @param {ButtonPriority} buttonPriority
     * @param linkHref
     */
    constructor({
                    id = null,
                    label,
                    dataName = null,
                    value = null,
                    fetchFunction = null,
                    dependencies = dependencyInjection,
                    callOnAction = null,
                    buttonPriority = "quiet",
                    linkHref = null,
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
        this.type = UiButton.type;
        this.templatePath = `${this._dependencies.getConfig().templateRoot}input/button.html`;
        this.buttonPriority = buttonPriority;
        this.linkHref = linkHref;

        if (this.linkHref && this.callOnAction) {
            this._dependencies.log.error(
                "UiButton can either be a link and have a linkHref or be a button with a callOnAction(), but not both."
            );
        }

        if (this.linkHref) {
            this._isLink = true;
        } else {
            this._isLink = false;
        }

        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            buttonPriority: this.buttonPriority,
            isLink: this._isLink,
        }
    }

    async setEventListeners() {
        await super.setEventListeners();
        if (this.componentNode) {
            this.componentNode.addEventListener("mousedown", (event) => {
                this.callOnAction(event);
            });
        }
    }
}

ComponentTypeMap[UiButton.type] = UiButton;

export default UiButton;

