import UiComponent from "./ui-component.js";
import UiInput from "./input/ui-input.js";
import UiTextField from "./input/textfield/ui-textfield.js";
import UiButton from "./input/button/ui-button.js";
import UiAlertMsg from "./alertMsg/ui-alertMsg.js";
import UiIcon from "./icon/ui-icon.js";

const ComponentTypeMap = {
    "sv-ui__component": UiComponent,
    "sv-ui__input": UiInput,
    "sv-ui__input-textfield": UiTextField,
    "sv-ui__input-button": UiButton,
    "sv-ui__alert-msg": UiAlertMsg,
    "sv-ui__icon": UiIcon,
};

export default ComponentTypeMap;
