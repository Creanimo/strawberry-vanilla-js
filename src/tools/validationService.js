/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Indicates whether the validation passed.
 * @property {string} alertType - The type of alert to display (e.g., 'error', 'warning', 'success').
 * @property {string} message - The validation message to display.
 */

class ValidationService {
    /**
     * Validates the input value using the provided validation function.
     * @param {string} value - The value to validate.
     * @param {function(string): ValidationResult} validationFunction - The validation function.
     * @returns {ValidationResult} The result of the validation.
     */
    static async validate(value, validationFunction) {
        if (typeof validationFunction !== "function") {
            throw new Error("Validation function must be a function.");
        }

        const result = await validationFunction(value);

        if (
            typeof result !== "object" ||
            typeof result.isValid !== "boolean" ||
            typeof result.alertType !== "string" ||
            typeof result.message !== "string"
        ) {
            throw new Error(
                "Validation function must return a ValidationResult object.",
            );
        }

        return result;
    }
}

export default ValidationService