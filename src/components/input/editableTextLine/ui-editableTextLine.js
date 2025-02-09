import { UiInput } from "../ui-input.js";
import { ClassToggler } from "../../tools/toggleClass.js";

class UiEditableTextLine extends UiInput {
    /**
     * Single Line Text Field
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     * @param {string} templatePath - The path to the template file.
     * @param {UiInput, UiTextField} inputWhenEditing - switches to this component during edit mode
     */
    constructor(id, label, value, inputWhenEditing, name = "ui-editableTextField") {
        super(id, label, value, name);
        this.inputWhenEditing = inputWhenEditing

        const templatePath = "/view/ui-component/input/editableTextLine/ui-editableTextLine.html"
        this.setTemplatePath(templatePath); // Set the template path
    }

    async getRenderProperties() {
        const nestedComponentRender = await this.inputWhenEditing.renderHTML();
        return {
            ...super.getRenderProperties(),
            nestedComponentRender: nestedComponentRender.outerHTML,
        };
    }

    async setEventListeners() {
        const viewVisibility = new ClassToggler(`${this.name}-${this.id}`, `ui-editableTextLine__viewer`, 'hidden');
        const editorVisibility = new ClassToggler(`${this.name}-${this.id}`, `ui-editableTextLine__editor`, 'hidden');

        const editButton = document.getElementById(`${this.name}-${this.id}_editableTextButton`);
        const editableElement = document.getElementById(`${this.inputWhenEditing.id}`);
        if (editButton) {
            const enterEdit = () => {
                viewVisibility.toggleClassMethod();
                editorVisibility.toggleClassMethod();
                editableElement.focus();
                console.log("Enter Edit was clicked");
            };
            editButton.addEventListener("click", enterEdit);
            console.log("Event Listener is in place");
        } else {
            console.error(`No edit button found with ID "${this.name}-${this.id}_editableTextButton"`);
        }

        if (editableElement) {
            const exitEdit = () => {
                if (editableElement != "") {
                    this.value = editableElement.value
                    editButton.innerText = editableElement.value;
                }
                viewVisibility.toggleClassMethod();
                editorVisibility.toggleClassMethod();
                console.log("Element lost focus");
            };
            editableElement.addEventListener("blur", exitEdit);
            console.log("Blur Event Listener is in place");
        } else {
            console.error(`No editable element found with ID "${this.name}-${this.id}_editableText"`);
        }

        await this.inputWhenEditing.setEventListeners();
    }
}

export { UiEditableTextLine };


