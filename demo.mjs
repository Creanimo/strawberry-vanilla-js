import { loadConfig, getConfig, UiTextField } from "./dist/index.esm.js";

loadConfig().then(() => {
    console.log(getConfig());
    const demoTextField = new UiTextField(
        "demo_textfield",
        "Label for Textfield",
        "",
    );

    demoTextField.render(document.body);
});
