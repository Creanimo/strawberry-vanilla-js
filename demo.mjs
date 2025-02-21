import { loadConfig, getConfig, UiTextField } from "./dist/index.esm.js";



loadConfig().then(() => {
    console.log(getConfig());
    function textfieldValidation(value) {
        if (value === "") return {alertType: "info", message: "Enter more than 4 characters."}
        if (value.length < 4) return {alertType: "warning", message: "Not enough characters. Must be at least 4."}
        if (value.length >= 4) return {alertType: "success", message: "Yay! It's more than 4 characters."}
    }
    const demoTextField = new UiTextField({
        id: "demo_textfield",
        label: "Label for Textfield",
        value: "",
        validationFunction: textfieldValidation,
    });

    demoTextField.render(document.body);
});
