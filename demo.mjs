import {
    uiRegistry,
    loadConfig,
    UiTextField,
    UiCodeBlock,
    UiButton,
    UiIcon,
    UiItem,
} from "./dist/index.esm.js";

window.uiRegistry = uiRegistry;

loadConfig().then(async () => {
    async function exampleTextfield() {
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
            helptext: "A very helpful helptext.",
            validationFunction: textfieldValidation,
        });

        const demoTextfield2 = new UiTextField({
            label: "My Name",
            value: "Charlie Changemyname",
            hasEditPreviewToggle: true,
        })

        const demoTextfield3 = new UiTextField({
            label: "Current Location",
            value: "Cologne",
            hasEditPreviewToggle: true,
            hasEditPreviewLabel: true,
        })

        await demoTextfield.render(document.getElementById("example-textfield"));
        await demoTextfield2.render(document.getElementById("example-textfield"));
        await demoTextfield3.render(document.getElementById("example-textfield"));
    }
    await exampleTextfield();

    const demoTextfieldCode = new UiCodeBlock({
        label: "Code of Textfield Example",
        code: String(exampleTextfield),
        language: "javascript",
    });

    await demoTextfieldCode.render(document.getElementById("example-textfield__code"));

    async function exampleButtons() {
        function alertOnClick() {
            alert("There was a click on a button!")
        }

        const buttonLoud = new UiButton({
            label: "Click me",
            buttonPriority: "loud",
            callOnAction: alertOnClick,
        });

        const buttonCalm = new UiButton({
            label: "Click me",
            buttonPriority: "calm",
            callOnAction: alertOnClick,
        });

        const buttonQuiet = new UiButton({
            label: "Click me",
            buttonPriority: "quiet",
            callOnAction: alertOnClick,
        });

        await buttonLoud.render(document.getElementById("example-buttons"));
        await buttonCalm.render(document.getElementById("example-buttons"));
        await buttonQuiet.render(document.getElementById("example-buttons"));
    }
    await exampleButtons();

    const demoButtonsCode = new UiCodeBlock({
        label: "Code of Buttons Example",
        code: String(exampleButtons),
        language: "javascript",
    });

    demoButtonsCode.render(document.getElementById("example-buttons__code"));

    async function exampleIcons() {
        const demoIcons = [
            {
                label: "A wonderful rocket",
                iconClass: "ti-rocket",
                addAriaLabel: true,
            },
            { label: "Beautiful checkmark", iconClass: "ti-check", showLabel: true },
        ];

        const iconComponents = demoIcons.map((iconData) => new UiIcon(iconData));

        for (const icon of iconComponents) {
            await icon.render(document.getElementById("example-icons"));
        }
    }
    await exampleIcons();

    const demoIconsCode = new UiCodeBlock({
        label: "Code of Icons Example",
        code: String(exampleIcons),
        language: "javascript",
    });

    await demoIconsCode.render(document.getElementById("example-icons__code"));

    async function exampleItem() {
        const iconSmile = new UiIcon({
            label: "A smiling emoji",
            iconClass: "ti-mood-smile"
        })

        const item = new UiItem({
            loudIdentifier: "Main Title",
            calmIdentifier: "Subtitle",
            mediaIdentifier: iconSmile,
            actionProperty: "action Prop",
            loudAction: new UiButton({
                label: "Very Important Action",
                buttonPriority: "loud",
            }),
            calmActions: [
                new UiButton({ label: "Secondary 1", buttonPriority: "quiet" }),
                new UiButton({ label: "Secondary 2", buttonPriority: "quiet" }),
            ],
            bodyContent: "Some content",
        });
        await item.render(document.getElementById("example-item"));
        console.log(item.toJSON());
    }
    await exampleItem();

    const demoItemCode = new UiCodeBlock({
        label: "Code of Items Example",
        code: String(exampleItem),
        language: "javascript",
    });

    await demoItemCode.render(document.getElementById("example-item__code"));

});
