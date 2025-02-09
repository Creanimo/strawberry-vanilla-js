import { UiItem } from "../../item/item.js";
import { UiInput } from "../ui-input.js";

/**
 * Base class for UI components.
 */
class UiSortableList extends UiInput {
    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {Array<UiItem>} items 
     * @param {string} name 
     */
    constructor(id, label, items, name = "ui-sortableList") {
        super(id, label, items, name);
        const templatePath = "/view/ui-component/input/sortableList/ui-sortablelist.html"
        this.setTemplatePath(templatePath);
    }

    /**
     * Gets the properties for rendering the component.
     * @returns {Object} The properties for rendering.
     */
    async getRenderProperties() {
        let renderedItems = [];
        for (const item of this.items) {
            let currentRender = await item.renderHTML();
            currentRender = currentRender.outerHTML;
            renderedItems.push(currentRender);
        }
        return {
            ...super.getRenderProperties(),
            items: renderedItems,
        };
    }

    async setEventListeners() {
        /* items currently don't have event listeners
        for (const item of this.items) {
            await item.setEventListeners();
        } */
    }
}

export { UiSortableList };