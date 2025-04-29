import UiComponent from "../ui-component.js";
import ComponentTypeMap from "../component-type-map.js";
import {dependencyInjection} from "../../tools/commonDependencies.js";

class UiIcon extends UiComponent {
    static type = "sv-ui__icon";

    /**
     *
     * @param {string} iconClass
     * @param {string} label
     * @param {string} id
     * @param {boolean} showLabel
     * @param {boolean} addAriaLabel
     * @param {function | null} fetchFunction
     * @param {Object} dependencies
     */
    constructor({
        iconClass,
        label,
        id,
        showLabel = false,
        addAriaLabel = false,
        fetchFunction = null,
        dependencies = dependencyInjection
                })
    {
        super({label, id, fetchFunction, dependencies});
        this.type = UiIcon.type;
        this.iconClass = iconClass;
        this.showLabel = showLabel;
        this.addAriaLabel = addAriaLabel;
        this.templatePath = `${this._dependencies.getConfig().templateRoot}icon/icon.html`
        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            iconClass: this.iconClass,
            showLabel: this.showLabel,
            addAriaLabel: this.addAriaLabel,
        }
    }
}

ComponentTypeMap[UiIcon.type] = UiIcon;

export default UiIcon;
