var ApplicationError = (function () {
    function ApplicationError(message) {
        this.name = "ApplicationError";
        this.message = message;
    }
    ApplicationError.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return ApplicationError;
}());
//# sourceMappingURL=applicationerror.js.map