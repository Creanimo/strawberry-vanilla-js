import { expect } from "chai";
import "./domSetup.js";
import UiTextField from "../src/components/input/textfield/ui-textfield.js";
import { dependencyInjection } from "./mockDependencies.js";

describe("UiTextField", async () => {
    let testContainer;

    beforeEach(() => {
        testContainer = document.createElement("div");
        document.body.appendChild(testContainer);
    });

    afterEach(() => {
        document.body.removeChild(testContainer);
    });

    describe("Class object", () => {
        it("should create a textfield with correct properties", async () => {
            const textfield = new UiTextField({
                label: "Name",
                dataName: "f_name",
                value: "Sarah",
                dependencies: dependencyInjection,
            });

            expect(textfield.label).to.be.equal("Name");
            expect(textfield.dataName).to.be.equal("f_name");
            expect(textfield.value).to.be.equal("Sarah");
            expect(textfield.id).to.be.equal("mock-id");
        });
    });
    describe("Rendering", () => {
        it("should show loading template during loading state", async () => {
            const textfield = new UiTextField({
                label: "First Name",
                dataName: "name",
                value: "Bob",
                dependencies: dependencyInjection,
            });

            await textfield.setLoading(true).then(() => {
                expect(textfield.componentNode.outerHTML).to.contain("loading");
            });
        });

        it("should fill componentNode", async () => {
            const textfield = new UiTextField({
                label: "First Name",
                dataName: "name",
                value: "Bob",
                dependencies: dependencyInjection,
            });

            await textfield.render(testContainer).then(
                () => {
                    expect(textfield.componentNode.outerHTML).to.contain("sv-ui__input-textfield")
                }
            );

            
        });
    });
});
