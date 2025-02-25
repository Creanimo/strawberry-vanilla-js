import { assert, expect } from "chai";
import sinon from "sinon";
import { loadConfig, getConfig } from "../src/tools/initConfig.js";
import "./domSetup.js";
import UiTextField from "../src/components/input/textfield/ui-textfield.js";

describe("UiTextField (Real Templates)", async () => {
    let testContainer;
    
    before(() => {
        global.fetch = sinon.stub();
        fetchStub = global.fetch;
    });

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
            const config = await loadConfig();
            console.log(config)
        });
    });
});
