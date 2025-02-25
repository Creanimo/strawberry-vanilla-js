import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import "./domSetup.js";
import Mustache from "mustache";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadTemplateMock(filePath) {
    return readFileSync(resolve(__dirname, filePath), "utf8");
}

function renderTplMock(htmlNode, template, renderProps = {}) {
    htmlNode.innerHTML = "";
    const htmlStr = Mustache.render(template, renderProps);
    htmlNode.innerHTML = htmlStr;
    return htmlNode;
}

async function loadConfigMock() {
    return { templateRoot: "../src/templates/" };
}

function getConfigMock() {
    return { templateRoot: "../src/templates/" };
}

class logMock {
    logThis(...args) {
        console.log(...args);
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
    ) {
        this.loadTemplate = loadTemplate;
        this.renderTpl = renderTpl;
        this.loadConfig = loadConfig;
        this.getConfig = getConfig;
        this.log = logMock;
        this.createId = createIdMock;
    }
}

const dependencyInjection = new Dependencies();

export { dependencyInjection };
