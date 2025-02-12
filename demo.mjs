import { loadConfig, getConfig, UiTextField } from "./dist/index.esm.js";

loadConfig().then(() => {
    console.log(getConfig());
    const demoTextField = new UiTextField({
        id: "demo_textfield",
        label: "Label for Textfield",
        value: "",
    });

    demoTextField.render(document.body);
});
