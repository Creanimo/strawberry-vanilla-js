import { loadConfig, getConfig } from "./initConfig.js";
import { loadTemplate, renderTpl } from "./templateProcessing.js";
import { log } from "../tools/logger.js";
import { createId } from "../tools/createId.js";
import ValidationService from "./validationService.js";
import uiRegistry from "./UiRegistry.js";
import ComponentTypeMap from "../components/component-type-map.js";
import { deserializeComponent, serializeComponent } from "./componentSerializer.js";
import { markdownRenderer } from "./markdownRenderer.js";

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
        this.ComponentTypeMap = ComponentTypeMap;
        this.serializeComponent = serializeComponent;
        this.deserializeComponent = deserializeComponent;
        this.markdownRenderer = markdownRenderer;
    }
}

const dependencyInjection = new Dependencies();

export { dependencyInjection };
