import UiComponent from "../ui-component.js";
import UiButton from "../input/button/ui-button.js";
import { dependencyInjection } from "../../tools/commonDependencies.js";

/**
 * UI Item/Card component for displaying entity information with flexible fields.
 * Each field can be a string, a UiComponent, or (for actions) an array of UiComponents.
 * Field types can be restricted via the static allowedComponentTypes map.
 */
class UiItem extends UiComponent {
    /**
     * Map of allowed component types per field.
     * If a field is not listed, any UiComponent is allowed.
     * @type {Object<string, Array<Function>>}
     */
    static allowedComponentTypes = {
        loudAction: [UiButton],
        calmActions: [UiButton],
        quietActions: [UiButton],
        // Add more as needed
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
        loudProperties = null,
        calmProperties = null,
        quietProperties = null,
        loudAction = null,
        calmActions = null,
        quietActions = null,
        bodyContent = null,
        label = typeof loudIdentifier === "string" ? loudIdentifier : "",
        id,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        super({ label, id, fetchFunction, dependencies });
        /** @type {string} */
        this.type = "sv-ui__item";
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
            loudProperties,
            calmProperties,
            quietProperties,
            loudAction,
            calmActions,
            quietActions,
            bodyContent,
        };

        /**
         * List of permanent child components to be rendered into the template.
         * @type {Array<{target: string, component: UiComponent}>}
         */
        this.permanentChildren = [];

        for (const [fieldName, value] of Object.entries(this._fields)) {
            const allowed = this.constructor.allowedComponentTypes[fieldName];

            if (Array.isArray(value)) {
                value.forEach((item, idx) => {
                    if (item instanceof UiComponent) {
                        if (
                            allowed &&
                            !allowed.some((Type) => item instanceof Type)
                        ) {
                            throw new Error(
                                `Component of type ${item.constructor.name} not allowed in array field "${fieldName}". Allowed: ${allowed
                                    .map((t) => t.name)
                                    .join(", ")}`
                            );
                        }
                        // All array items share the same target (the container div)
                        this.permanentChildren.push({
                            target: fieldName,
                            component: item,
                        });
                    }
                });
            } else if (value instanceof UiComponent) {
                if (
                    allowed &&
                    !allowed.some((Type) => value instanceof Type)
                ) {
                    throw new Error(
                        `Component of type ${value.constructor.name} not allowed in field "${fieldName}". Allowed: ${allowed
                            .map((t) => t.name)
                            .join(", ")}`
                    );
                }
                this.permanentChildren.push({
                    target: fieldName,
                    component: value,
                });
            }
        }
    }

    /**
     * Returns an object containing the component's properties for rendering.
     * For fields that are UiComponents or arrays of UiComponents, returns an empty string
     * so the template placeholder is empty and ready for child mounting.
     * @returns {Object<string, string>}
     */
    getRenderProperties() {
        const props = super.getRenderProperties();
        for (const [fieldName, value] of Object.entries(this._fields)) {
            if (Array.isArray(value)) {
                // If all items are components, set to empty string
                if (value.every((item) => item instanceof UiComponent)) {
                    props[fieldName] = "";
                } else {
                    // Otherwise, join as string (or handle as needed)
                    props[fieldName] = value.join(", ");
                }
            } else {
                props[fieldName] = value instanceof UiComponent ? "" : value;
            }
        }
        return props;
    }
}

export default UiItem;
