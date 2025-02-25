import { assert, expect } from "chai";
import sinon from "sinon";
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

    after(() => {
        sinon.restore();
    });

    describe("Textfield as used by consumer", () => {
        it("should create a textfield with correct properties", async () => {
            const textfield = new UiTextField({
                label: "Name",
                dataName: "f_name",
                value: "Sarah",
                dependencies: dependencyInjection,
            });

            console.log(textfield.label);
        });
    });
});
