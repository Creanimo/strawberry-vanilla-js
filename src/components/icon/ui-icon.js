import UiComponent from "../ui-component.js";
import {dependencyInjection} from "../../tools/commonDependencies.js";

class UiIcon extends UiComponent {
    /**
     *
     * @param {string} iconClass
     * @param {string} label
     * @param {string} id
     * @param {boolean} showLabel
     * @param {function | null} fetchFunction
     * @param {Object} dependencies
     */
    constructor({
        iconClass,
        label,
        id,
        showLabel = false,
        fetchFunction = null,
        dependencies = dependencyInjection
                })
    {
        super({label, id, fetchFunction, dependencies});
        this.iconClass = iconClass;
        this.showLabel = showLabel;
        this.templatePath = `${this._dependencies.getConfig.templateRoot}icon/icon.html`
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            iconClass: this.iconClass,
            showLabel: this.showLabel,
        }
    }
}

export default UiIcon;
