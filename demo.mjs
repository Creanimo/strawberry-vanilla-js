import { loadConfig, UiTextField, UiCodeBlock } from "./dist/index.esm.js";

loadConfig().then(() => {
    function exampleTextfield() {
        function textfieldValidation(value) {
            if (value === "")
                return { alertType: "info", message: "Enter more than 4 characters." };
            if (value.length < 4)
                return {
                    alertType: "warning",
                    message: "Not enough characters. Must be at least 4.",
                };
            if (value.length >= 4)
                return {
                    alertType: "success",
                    message: "Yay! It's more than 4 characters.",
                };
        }

        const demoTextfield = new UiTextField({
            id: "demo_textfield",
            label: "Label for Textfield",
            value: "",
            validationFunction: textfieldValidation,
        });

        demoTextfield.render(document.body);
    }
    exampleTextfield();

    const demoTextfieldCode = new UiCodeBlock({
        label: "Code of Textfield Example",
        code: String(exampleTextfield),
        language: "javascript",
    })
    demoTextfieldCode.render(document.body)

});
