import UiComponent from "../ui-component";
import { getConfig } from "../../tools/initConfig.js";
import hljs from '@highlightjs/cdn-assets/es/core.js';
import javascript from '@highlightjs/cdn-assets/es/languages/javascript.min.js';

class UiCodeBlock extends UiComponent {
    constructor({
        label,
        id = null,
        fetchFunction = null,
        code,
        language,
    }) {
        super({label, id, fetchFunction, logObjet: true});

        this.type = "sv-ui__codeBlock";

        /** @type {string} */
        this.language = language;

        hljs.registerLanguage('javascript', javascript);
        
        /** @type {string} */
        this.code = code;

        this.templatePath = `${getConfig().templateRoot}code/codeBlock.html`;
    }

    get code() {
        return this._code;
    }

    set code(string) {
        const code = hljs.highlight(string, {language: this.language}).value
        this._code = code;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            code: this.code,
            language: this.language,
        }
    }
}

export default UiCodeBlock;
