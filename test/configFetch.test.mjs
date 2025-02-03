import { expect } from "chai";
import sinon from "sinon";
import { loadConfig, getConfig } from "../init.mjs";

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

    it("should handle fetch errors gracefully", async () => {
        fetchStub.rejects(new Error("Failed to fetch")); // Simulate network failure

        const config = await loadConfig(); // Call loadConfig

        // Check that fetch was called once
        expect(fetchStub.calledOnce).to.be.true;

        // Expect config to remain null since fetch failed
        expect(config).to.be.null;
        expect(getConfig()).to.be.null;
    });

    it("should fetch and store config correctly", async () => {
        // mock fetch response
        const mockConfig = { rootPath: "./ui-components/" };

        fetchStub.resolves({
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
            json: sinon.stub().resolves(mockConfig),
        });

        const config = await loadConfig(); // Second call should not re-fetch

        expect(fetchStub.notCalled).to.be.true;
        expect(config).to.be.deep.equal(existingConfigFromPreviousTest);
        expect(config).to.not.deep.equal(mockConfig);
    });




});
