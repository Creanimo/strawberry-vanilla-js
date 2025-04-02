import { log } from "./logger.js";

/**
 * @typedef {UiComponent} UiComponent
 */

/**
 * Represents a registered UI component entry within the registry.
 * @typedef {object} ComponentEntry
 * @property {string} id - Unique identifier of the component.
 * @property {string} status - Lifecycle status (e.g., 'registered', 'rendering', 'rendered', 'destroying', 'destroyed', 'error').
 * @property {UiComponent} instance - The actual component instance.
 * @property {string} type - info on the type of the component
 * @property {HTMLElement | null} node - The root DOM node of the rendered component.
 * @property {HTMLElement | null} targetNode - The DOM node where the component was rendered into.
 */

/**
 * Manages the lifecycle and provides access to UI component instances.
 */
class UiRegistry {
    /**
     * Initializes a new instance of the UiRegistry.
     */
    constructor() {
        /**
         * Stores the registered components, keyed by their ID.
         * @type {Map<string, ComponentEntry>}
         * @private
         */
        this._components = new Map();
        this._dependencies = { log: log };
        this._dependencies.log.info("UiRegistry initialized");
    }

    /**
     * Registers a new component instance.
     * @param {UiComponent} componentInstance - The UI component instance to register.
     * @returns {ComponentEntry | null} The created registry entry, or null if registration failed.
     * @throws {Error} Throws an error if a component with the same ID is already registered.
     */
    register(componentInstance) {
        if (!componentInstance || !componentInstance.id) {
            this._dependencies.log.warn("UiRegistry: Cannot register invalid component instance.");
            return null;
        }

        const id = componentInstance.id;

        if (this._components.has(id)) {
            this._dependencies.log.error(
                `UiRegistry: Component with ID '${id}' is already registered.`,
            );
        }

        const type = componentInstance.type;

        /** @type {ComponentEntry} */
        const entry = {
            id: id,
            instance: componentInstance,
            type: type,
            status: "registered",
            node: null,
            targetNode: null,
        };

        this._components.set(id, entry);
        this._dependencies.log.info(`UiRegistry: Component '${id}' of type '${type}' registered.`);
        return entry;
    }

    /**
     * Unregisters a component, removes it from the registry, and calls its destroy method.
     * @param {string} id - The ID of the component to unregister.
     * @returns {boolean} True if the component was found and unregistered, false otherwise.
     */
    unregister(id) {
        const entry = this.getEntryById(id);

        if (entry) {
            this.updateStatus(id, "destroying");
            console.log(`UiRegistry: Unregistering component '${id}' of type '${entry.type}'.`);

            try {
                // Check if the instance has a destroy method before calling
                if (typeof entry.instance.destroy === "function") {
                    entry.instance.destroy();
                } else {
                    console.warn(
                        `UiRegistry: Component '${id}' instance does not have a destroy() method. Manual cleanup might be required.`,
                    );
                    entry.node?.remove();
                }
                this.updateStatus(id, "destroyed"); // Optional: Mark as destroyed before deleting
            } catch (error) {
                console.error(
                    `UiRegistry: Error during destroy() call for component '${id}':`,
                    error,
                );
                // Still attempt to remove from registry even if destroy fails
            }

            const deleted = this._components.delete(id);
            if (deleted) {
                console.log(`UiRegistry: Component '${id}' removed from registry.`);
            }
            return deleted;
        } else {
            console.warn(
                `UiRegistry: Attempted to unregister component with ID '${id}', but it was not found.`,
            );
            return false;
        }
    }

    /**
     * Retrieves the full registry entry for a given component ID.
     * @param {string} id - The ID of the component entry to retrieve.
     * @returns {ComponentEntry | undefined} The component entry if found, otherwise undefined.
     */
    getEntryById(id) {
        return this._components.get(id);
    }

    /**
     * Retrieves the component instance for a given component ID.
     * @param {string} id - The ID of the component instance to retrieve.
     * @returns {UiComponent | undefined} The component instance if found, otherwise undefined.
     */
    getComponentById(id) {
        const entry = this.getEntryById(id);
        return entry?.instance;
    }

    /**
     * Updates the status of a registered component.
     * @param {string} id - The ID of the component.
     * @param {string} status - The new status string.
     * @returns {boolean} True if the status was updated, false otherwise.
     */
    updateStatus(id, status) {
        const entry = this.getEntryById(id);
        if (entry) {
            const oldStatus = entry.status;
            entry.status = status;
            // Optional: Add more detailed logging if needed
            // console.log(`UiRegistry: Status for component '${id}' updated from '${oldStatus}' to '${status}'.`);
            return true;
        } else {
            console.warn(
                `UiRegistry: Attempted to update status for non-existent component ID '${id}'.`,
            );
            return false;
        }
    }

    /**
     * Updates the DOM node references for a registered component. Typically called after rendering.
     * @param {string} id - The ID of the component.
     * @param {HTMLElement | null} node - The main rendered HTMLElement of the component.
     * @param {HTMLElement | null} targetNode - The HTMLElement where the component was rendered into.
     * @returns {boolean} True if the nodes were updated, false otherwise.
     */
    updateNodes(id, node, targetNode) {
        const entry = this.getEntryById(id);
        if (entry) {
            entry.node = node;
            entry.targetNode = targetNode;
            // console.log(`UiRegistry: DOM node references updated for component '${id}'.`);
            return true;
        } else {
            console.warn(
                `UiRegistry: Attempted to update nodes for non-existent component ID '${id}'.`,
            );
            return false;
        }
    }

    /**
     * Checks if a component with the given ID is registered.
     * @param {string} id - The component ID to check.
     * @returns {boolean} True if the component is registered, false otherwise.
     */
    hasComponent(id) {
        return this._components.has(id);
    }

    /**
     * Gets the current number of registered components.
     * @returns {number} The number of components in the registry.
     */
    getSize() {
        return this._components.size;
    }

    /**
     * Retrieves all component entries currently in the registry.
     * @returns {ComponentEntry[]} An array of all component entries.
     */
    getAllEntries() {
        return Array.from(this._components.values());
    }

    /**
     * Retrieves all component instances currently in the registry.
     * @returns {UiComponent[]} An array of all component instances.
     */
    getAllComponents() {
        return Array.from(this._components.values(), (entry) => entry.instance);
    }
}

const uiRegistry = new UiRegistry();

export default uiRegistry;
