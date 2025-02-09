import { UiComponent } from "../ui-component.js";

class UiItem extends UiComponent {
    /**
     * 
     * @param {string} id 
     * @param {stringtring} label 
     * @param {string} name 
     * @param {null|Array<UiProperties>} propertiesImportant 
     * @param {null|Array<UiProperties>} propertiesSecondary 
     * @param {null|UiButton|UiButtonRow>} actionsMain 
     * @param {null|UiButton|UiButtonRow>} actionsSecondöary 
     */
    constructor(id, label, name = "ui-component", propertiesImportant = null, propertiesSecondary = null, actionsMain = null, actionsSecondary = null) {
        super(id, label, name);
        this.propertiesImportant = propertiesImportant;
        this.propertiesSecondary = propertiesSecondary;
        this.actionsMain = actionsMain;
        this.actionsSecondary = actionsSecondary;

        const templatePath = "/view/ui-component/item/item.html"
        this.setTemplatePath(templatePath); // Set the template path
    }

    async getRenderProperties() {
        const actionsMainRender = this.actionsMain ? await this.actionsMain.renderHTML().outerHTML : null;
        return {
            ...super.getRenderProperties(),
            actionsMain: actionsMainRender,
        };
    }
}

export { UiItem };