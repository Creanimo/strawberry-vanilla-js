import { loadConfig, getConfig } from "./initConfig.js";
import { loadTemplate, renderTpl } from "./templateProcessing.js";
import { log } from "../tools/logger.js";
import { createId } from "../tools/createId.js";
import ValidationService from "./validationService.js";
import uiRegistry from "./UiRegistry.js";

class Dependencies {
    constructor() {
        this.loadTemplate = loadTemplate;
        this.renderTpl = renderTpl;
        this.loadConfig = loadConfig;
        this.getConfig = getConfig;
        this.log = log;
        this.createId = createId;
        this.uiRegistry = uiRegistry;
        this.validationService = ValidationService;
    }
}

const dependencyInjection = new Dependencies();

export { dependencyInjection };
