import { expect } from "chai";
import sinon from "sinon";
import { getConfig, loadConfig } from "../src/tools/initConfig.js";

describe("Config Fetch Tests", () => {
    let fetchStub;

    // hijack fetch function
    beforeEach(async () => {
        // Stub the global fetch
        global.fetch = sinon.stub();
        fetchStub = global.fetch;
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should propagate fetch error", async () => {
        // Stub console.error to suppress error logging during this test.
        const consoleErrorStub = sinon.stub(console, "error");

        fetchStub.rejects(new Error("Failed to fetch")); // Simulate network failure

        try {
            await loadConfig(); // This should throw
            expect.fail("Expected loadConfig to throw an error");
        } catch (error) {
            expect(fetchStub.calledOnce).to.be.true;
            expect(error.message).to.equal("Failed to fetch");
            expect(getConfig()).to.be.null;
        }

        // Restore the original console.error after the test.
        consoleErrorStub.restore();
    });

    it("should fetch and store config correctly", async () => {
        // mock fetch response
        const mockConfig = { rootPath: "./ui-components/" };

        fetchStub.resolves({
            ok: true,
            json: sinon.stub().resolves(mockConfig),
        });

        // execute the config fetching we want to test
        const config = await loadConfig();

        // expect(fetchStub.calledOnce).to.be.true;
        expect(config).to.deep.equal(mockConfig);
        expect(getConfig()).to.deep.equal(mockConfig);
    });

    it("should not re-fetch if config is already loaded", async () => {
        const existingConfigFromPreviousTest = { rootPath: "./ui-components/" };
        const mockConfig = { rootPath: "./my-ui/" };

        fetchStub.resolves({
            ok: true,
            json: sinon.stub().resolves(mockConfig),
        });

        const config = await loadConfig(); // Second call should not re-fetch

        expect(fetchStub.notCalled).to.be.true;
        expect(config).to.be.deep.equal(existingConfigFromPreviousTest);
        expect(config).to.not.deep.equal(mockConfig);
    });
});
