import UiComponent from "../ui-component.js";
import ComponentTypeMap from "../component-type-map.js";
import UiButton from "../input/button/ui-button.js";
import { dependencyInjection } from "../../tools/commonDependencies.js";

/**
 * UI Item/Card component for displaying entity information with flexible fields.
 * Each field can be a string, a UiComponent, or (for actions) an array of UiComponents.
 * Field types can be restricted via the static allowedComponentTypes map.
 */
class UiItem extends UiComponent {
    static type = "sv-ui__item";

    /**
     * Map of allowed component types per field.
     * If a field is not listed, any UiComponent is allowed.
     * @type {Object<string, Array<Function>>}
     */
    static allowedComponentTypes = {
        loudAction: [UiButton],
        calmActions: [UiButton],
        quietActions: [UiButton],
    };

    /**
     * @typedef {Object} UiItemOptions
     * @property {null|string|UiComponent} [loudIdentifier]
     * @property {null|string|UiComponent} [calmIdentifier]
     * @property {null|string|UiComponent} [loudProperties]
     * @property {null|string|UiComponent} [calmProperties]
     * @property {null|string|UiComponent} [quietProperties]
     * @property {null|string|UiComponent} [bodyContent]
     * @property {null|string|UiButton} [loudAction]
     * @property {null|string|UiButton[]} [calmActions]
     * @property {null|string|UiButton[]} [quietActions]
     * @property {string} [label]
     * @property {string} [id]
     * @property {function|null} [fetchFunction]
     * @property {Object} [dependencies]
     */

    /**
     * Creates a new UiItem instance.
     * @param {UiItemOptions} options - Configuration options for the item.
     */
    constructor({
        loudIdentifier,
        calmIdentifier,
        itemStyle = "object",
        mediaIdentifier = null,
        loudProperties = null,
        calmProperties = null,
        quietProperties = null,
        actionProperty = null,
        loudAction = null,
        calmActions = null,
        quietActions = null,
        bodyContent = null,
        label = typeof loudIdentifier === "string" ? loudIdentifier : "",
        id,
        fetchFunction = null,
        showLoading = true,
        dependencies = dependencyInjection,
    }) {
        super({
            label,
            id,
            showLoading,
            fetchFunction,
            dependencies,
        });

        this.type = UiItem.type;

        /** @type {string} */
        this.templatePath = `${this._dependencies.getConfig().templateRoot}item/item.html`;

        /**
         * Internal map of all fields for rendering and child registration.
         * @type {Object<string, any>}
         * @private
         */
        this._fields = {
            loudIdentifier,
            calmIdentifier,
            mediaIdentifier,
            loudProperties,
            calmProperties,
            quietProperties,
            actionProperty,
            loudAction,
            calmActions,
            quietActions,
            bodyContent,
        };

        this.itemStyle = itemStyle;

        /**
         * List of permanent child components to be rendered into the template.
         * @type {Array<{target: string, component: UiComponent}>}
         */
        this.permanentChildren = [];

        const prefix = "sv-ui__item__";
        for (const [fieldName, value] of Object.entries(this._fields)) {
            const allowed = this.constructor.allowedComponentTypes[fieldName];

            if (Array.isArray(value)) {
                for (const item of value) {
                    if (item instanceof UiComponent) {
                        if (allowed && !allowed.some((Type) => item instanceof Type)) {
                            throw new Error(
                                `Component of type ${item.constructor.name} not allowed in array field "${fieldName}". Allowed: ${allowed
                                    .map((t) => t.name)
                                    .join(", ")}`,
                            );
                        }
                        this.permanentChildren.push({
                            target: prefix + fieldName,
                            component: item,
                        });
                    }
                }
            } else if (value instanceof UiComponent) {
                if (allowed && !allowed.some((Type) => value instanceof Type)) {
                    throw new Error(
                        `Component of type ${value.constructor.name} not allowed in field "${fieldName}". Allowed: ${allowed
                            .map((t) => t.name)
                            .join(", ")}`,
                    );
                }
                this.permanentChildren.push({
                    target: prefix + fieldName,
                    component: value,
                });
            }
        }

        this._dependencies.uiRegistry.register(this);
    }

    /**
     * Returns an object containing the component's properties for rendering.
     * For fields that are UiComponents or arrays of UiComponents, returns an empty string
     * so the template placeholder is empty and ready for child mounting.
     * @returns {Object<string, string>}
     */
    getRenderProperties() {
        const props = super.getRenderProperties();
        props.itemStyle = this.itemStyle;

        // Only set actions if at least one action field is present and non-empty
        const hasActions =
            (this._fields.actionProperty && this._fields.actionProperty !== "") ||
            (this._fields.loudAction && this._fields.loudAction !== "") ||
            (Array.isArray(this._fields.calmActions) &&
                this._fields.calmActions.length > 0);

        props.actions = hasActions;

        for (const [fieldName, value] of Object.entries(this._fields)) {
            if (Array.isArray(value)) {
                if (value.every((item) => item instanceof UiComponent)) {
                    props[fieldName] = " "; // so prop is truthy
                } else {
                    props[fieldName] = value.join(", ");
                }
            } else {
                props[fieldName] = value instanceof UiComponent ? " " : value; // so prop is truthy
            }
        }

        return props;
    }
}

ComponentTypeMap[UiItem.type] = UiItem;

export default UiItem;
