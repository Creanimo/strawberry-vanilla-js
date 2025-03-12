import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import "./domSetup.js";
import { renderTpl } from "../src/tools/templateProcessing.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadTemplateMock(filePath) {
    const template = readFileSync(resolve(__dirname, filePath), "utf8");
    return template; 
}

function renderTplMock(template, renderProps = {}) {
    return renderTpl(template, renderProps);
}

async function loadConfigMock() {
    return { templateRoot: "../src/templates/" };
}

function getConfigMock() {
    return { templateRoot: "../src/templates/" };
}

class logMock {
    logThis(...args) {
        // console.log(...args);
    }
    trace(...args) {
        this.logThis(...args);
    }
    debug(...args) {
        this.logThis(...args);
    }
    info(...args) {
        this.logThis(...args);
    }
    warn(...args) {
        this.logThis(...args);
    }
    error(...args) {
        this.logThis(...args);
    }
}

function createIdMock() {
    return "mock-id";
}

class Dependencies {
    constructor(
        loadTemplate = loadTemplateMock,
        renderTpl = renderTplMock,
        loadConfig = loadConfigMock,
        getConfig = getConfigMock,
        createId = createIdMock
    ) {
        this.loadTemplate = loadTemplate;
        this.renderTpl = renderTpl;
        this.loadConfig = loadConfig;
        this.getConfig = getConfig;
        this.log = new logMock;
        this.createId = createId;
    }
}

const dependencyInjection = new Dependencies();

export { dependencyInjection };
