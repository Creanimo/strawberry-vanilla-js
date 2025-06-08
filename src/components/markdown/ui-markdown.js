import UiComponent from "../ui-component";
import ComponentTypeMap from "../component-type-map.js";
import { dependencyInjection } from "../../tools/commonDependencies";

class UiMarkdown extends UiComponent {
    static type = "sv-ui__markdown";

    /**
     * @type {string}
     */
    _markdownInput;

    /**
     * @type {string}
     */
    _renderedHtml;

    /**
     * Creates an instance of UiComponent.
     * @param {Object} options - Configuration options for the UI component.
     * @param {null|string} options.id - The unique identifier for the component.
     * @param {string} options.label - The label for the component.
     * @param {boolean} options.showLoading
     * @param {null|() => Promise<Object>} [options.fetchFunction] - An optional async function to fetch data.
     * @param {Object} dependencies - only pass different dependencies for unit tests in mocha
     */
    constructor({
        label = "",
        id = null,
        markdown,
        showLoading = true,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        super({
            label,
            id,
            showLoading,
            fetchFunction,
            dependencies,
        });

        this.markdown = markdown;

        this.templatePath = `${this._dependencies.getConfig().templateRoot}markdown/markdown.mustache`;

        this._dependencies.uiRegistry.register(this);
        // Add this temporarily in your constructor or render method
        console.log("Testing markdown renderer directly:");
        this._dependencies.markdownRenderer.renderHtml("# Test").then((result) => {
            console.log("Direct render result:", result);
        });
    }

    /*
     * @param {string} markdown
     */
    set markdown(markdown) {
        this._markdownInput = markdown;
        this._renderedHtml = null; // Clear cache
    }

    /*
     * @returns {string}
     */
    get markdown() {
        // Return cached result or null if not rendered
        return this._renderedHtml;
    }

    async renderMarkdown() {
        if (!this._renderedHtml && this._markdownInput) {
            this._renderedHtml = await this._dependencies.markdownRenderer.renderHtml(
                this._markdownInput,
            );
        }
        return this._renderedHtml;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            content: this._renderedHtml,
        };
    }

    async render(
        targetNode = this.targetNode,
        { showLoading = this.showLoading, replace = true } = {},
    ) {
        await this.renderMarkdown();
        console.log(
            "this.renderedHtml after renderMarkdown:\n" + this._renderedHtml,
        );
        await super.render(targetNode, { showLoading, replace });
    }
}

ComponentTypeMap[UiMarkdown.type] = UiMarkdown;

export default UiMarkdown;
