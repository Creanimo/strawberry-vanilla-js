import { dependencyInjection } from "../../tools/commonDependencies.js";
import ComponentTypeMap from "../component-type-map";
import UiComponent from "../ui-component";

class UiTooltip extends UiComponent {
    static type = "sv-ui__tooltip";

    /**
     * @type {string | UiComponent}
     */
    target;

    /**
     * @type {string | UiComponent}
     */
    content;

    /**
    * @type {boolean}
    */
    positionAbove;

    constructor({
        label,
        id = null,
        target,
        content,
        positionAbove = false,
        showLoading = true,
        fetchFunction = null,
        dependendcies = dependencyInjection,
    }) {
        super(label, id, showLoading, fetchFunction, dependendcies);
        this.target = target;
        this.content = content;
        this.positionAbove = positionAbove;
        this.templatePath = `${this._dependencies.getConfig().templateRoot}tooltip/tooltip.mustache`;
        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
        const childStringElements = {};
        if (typeof(this.target) === "string") {
            childStringElements.target = this.target;
        }
        if (typeof(this.content) === "string") {
            childStringElements.target = this.content;
        }

        return {
            ...super.getRenderProperties(),
            ...childStringElements,
            positionAbove: this.positionAbove,
        }
    }
}

ComponentTypeMap[UiTooltip.type] = UiTooltip;

export default UiTooltip;
