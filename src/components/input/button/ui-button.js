import { dependencyInjection } from "../../../tools/commonDependencies.js";
import UiInput from "../ui-input.js";

/**
 * @typedef {"loud" | "melodic" | "quiet" | "textlink" } ButtonPriority
 */

class UiButton extends UiInput {
    /** 
     * Buttons can either have a linkHref or a callOnAction(), not both
     * @param {ButtonPriority} buttonPriority
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
        this.type = "sv-ui__input-button";
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
    }
    
    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            buttonPriority: this.buttonPriority, 
            isLink: this._isLink,
        }
    }

    async setEventListeners() {
        
    }
}

export default UiButton;

