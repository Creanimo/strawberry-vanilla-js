import { expect } from "chai";
import "./domSetup.js";
import UiTextField from "../src/components/input/textfield/ui-textfield.js";
import { dependencyInjection } from "./mockDependencies.js";

describe("UiTextField (Real Templates)", async () => {
    let testContainer;

    beforeEach(() => {
        testContainer = document.createElement("div");
        document.body.appendChild(testContainer);
    });

    afterEach(() => {
        document.body.removeChild(testContainer);
    });

    describe("Textfield as used by consumer", () => {
        it("should create a textfield with correct properties", async () => {
            const textfield = new UiTextField({
                label: "Name",
                dataName: "f_name",
                value: "Sarah",
                dependencies: dependencyInjection,
            });
            const sometemplate = dependencyInjection.loadTemplate(
                    `${dependencyInjection.getConfig().templateRoot}input/textfield.html`
            );
            dependencyInjection.renderTpl(testContainer, sometemplate, {id: "555", label: "hey"})
            await textfield.render(testContainer)
            console.log(textfield.targetNode.outerHTML)
            expect(textfield.label).to.be.equal("Name");
            expect(textfield.id).to.be.equal("mock-id");
        });
    });
});
