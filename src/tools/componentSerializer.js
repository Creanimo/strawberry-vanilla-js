import ComponentTypeMap from "../components/component-type-map.js";

/**
 * Serializes a UI component instance to a plain object suitable for JSON.
 * Calls the component's `toJSON()` method if available.
 *
 * @param {UiComponent} component - The component instance to serialize.
 * @returns {Object} The plain object representation of the component.
 * @throws {TypeError} If the component does not implement toJSON().
 */
export function serializeComponent(component) {
    if (typeof component.toJSON === "function") {
        return component.toJSON();
    }
    throw new TypeError(
        `Component of type "${component.type}" does not implement toJSON().`
    );
}

/**
 * Deserializes a plain object (parsed from JSON) into a UI component instance.
 * Uses the `type` property to look up the correct class in the ComponentTypeMap.
 * Calls the class's static `fromJSON()` method if available, otherwise uses the constructor.
 *
 * @param {Object} json - The plain object representation of the component.
 * @param {Dependencies} dependencies - The dependencies to inject into the component.
 * @returns {UiComponent} The reconstructed component instance.
 * @throws {TypeError} If the type is not registered or cannot be constructed.
 */
export function deserializeComponent(json, dependencies) {
    const type = json.type;
    const ComponentClass =
        dependencies?.ComponentTypeMap?.[type] ?? ComponentTypeMap[type];

    if (!ComponentClass) {
        throw new TypeError(
            `Unknown component type "${type}" in ComponentTypeMap.`
        );
    }

    if (typeof ComponentClass.fromJSON === "function") {
        return ComponentClass.fromJSON(json, dependencies, ComponentClass);
    }

    return new ComponentClass({ ...json, dependencies });
}
