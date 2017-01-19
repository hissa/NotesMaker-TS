class ApplicationError implements Error {
    public name = "ApplicationError";
    public message: string;

    constructor(message: string) {
        this.message = message;
    }

    toString() {
        return this.name + ": " + this.message; 
    }
}