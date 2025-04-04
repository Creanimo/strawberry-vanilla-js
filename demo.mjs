import { uiRegistry, loadConfig, UiTextField, UiCodeBlock, UiButton } from "./dist/index.esm.js";

window.uiRegistry = uiRegistry;

loadConfig().then(() => {
    function exampleTextfield() {
        function textfieldValidation(value) {
            if (value === "") {
                return {
                    isValid: false,
                    alertType: "info",
                    message: "Enter more than 4 characters.",
                };
            }
            if (value.length < 4) {
                return {
                    isValid: false,
                    alertType: "warning",
                    message: "Not enough characters. Must be at least 4.",
                };
            }
            if (value.length >= 4) {
                return {
                    isValid: true,
                    alertType: "success",
                    message: "Yay! It's more than 4 characters.",
                };
            }
        }

        const demoTextfield = new UiTextField({
            id: "demo_textfield",
            label: "Label for Textfield",
            value: "",
            validationFunction: textfieldValidation,
        });

        demoTextfield.render(document.getElementById("example-textfield"));
    }
    exampleTextfield();

    const demoTextfieldCode = new UiCodeBlock({
        label: "Code of Textfield Example",
        code: String(exampleTextfield),
        language: "javascript",
    })

    demoTextfieldCode.render(document.getElementById("example-textfield__code"))


    async function exampleButtons() {
        const buttonLoud = new UiButton({
            label: "Click me",
            buttonPriority: "loud",
        })

        const buttonMelodic = new UiButton({
            label: "Click me",
            buttonPriority: "melodic",
        })

        const buttonQuiet = new UiButton({
            label: "Click me",
            buttonPriority: "quiet",
        })

        await buttonLoud.render(document.getElementById("example-buttons"));
        await buttonMelodic.render(document.getElementById("example-buttons"));
        await buttonQuiet.render(document.getElementById("example-buttons"));
    }
    exampleButtons();

    const demoButtonsCode = new UiCodeBlock({
        label: "Code of Buttons Example",
        code: String(exampleButtons),
        language: "javascript",
    })
    
    demoButtonsCode.render(document.getElementById("example-buttons__code"))
});