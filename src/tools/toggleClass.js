class ClassToggler {
    constructor(containerId, target, toggleClass) {
        this.container = document.getElementById(containerId);
        this.target = target;
        this.toggleClass = toggleClass;

        if (!this.container) {
            throw new Error(`No element found with ID "${containerId}"`);
        }
    }

    // Method to add the toggle class
    addClass() {
        this._getTargetElements().forEach(element => {
            element.classList.add(this.toggleClass);
        });
    }

    // Method to remove the toggle class
    removeClass() {
        this._getTargetElements().forEach(element => {
            element.classList.remove(this.toggleClass);
        });
    }

    // Method to toggle the toggle class
    toggleClassMethod() {
        this._getTargetElements().forEach(element => {
            element.classList.toggle(this.toggleClass);
        });
    }

    // Helper method to get target elements
    _getTargetElements() {
        return this.container.querySelectorAll(`.${this.target}`);
    }
}

export { ClassToggler };
