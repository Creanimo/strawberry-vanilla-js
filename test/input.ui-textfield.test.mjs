import { assert, expect } from "chai";
import sinon from "sinon";
import "./domSetup.js";
import UiTextField from "../src/components/input/textfield/ui-textfield.js";

describe("UiTextField (Real Templates)", async () => {
    let testContainer;
    let configGetStub;
    let configLoadStub;

    before(() => {
        const getConfig = sinon.stub();
        configGetStub = getConfig;
        const loadConfig = sinon.stub();
        configLoadStub = loadConfig;
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

            const mockConfig = { templateRoot: "./ui-components/" };

            configLoadStub.resolves({
                json: sinon.stub().resolves(mockConfig),
            });      
            configGetStub.resolves({
                json: sinon.stub().resolves(mockConfig),
            });

            loadConfig().then(() => {
            const textfield = new UiTextField({
                label: "Name",
                dataName: "f_name",
                value: "Sarah"
            });

            console.log(textfield.label);
            });

        });
    });
});
