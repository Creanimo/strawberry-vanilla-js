import { loadConfig, getConfig } from "./init.mjs";
import { UiTextField } from "./input/textfield/ui-textfield";

loadConfig().then(() => {
    console.log(getConfig());
});

const demoTextField = new UiTextField("demo_textfield", "Label for Textfield", "");


