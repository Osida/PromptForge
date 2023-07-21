export class AuthRequiredError extends Error {
    constructor(message = "Access Denied: Auth is required to view this resource.") {
        super(message);
        this.name = "AuthRequiredError";
    }
}