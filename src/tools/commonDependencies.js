import { loadConfig, getConfig } from "./initConfig.js";
import { loadTemplate, renderTpl } from "./templateProcessing.js";
import { log } from "../tools/logger.js";
import { createId } from "../tools/createId.js";

class Dependencies {
    constructor() {
        this.loadTemplate = loadTemplate;
        this.renderTpl = renderTpl;
        this.loadConfig = loadConfig;
        this.getConfig = getConfig;
        this.log = log;
        this.createId = createId;
    }
}

const dependencyInjection = new Dependencies();

export { dependencyInjection };
