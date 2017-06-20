export class ValidationMessage {

    /**
     * Creates a new validation error
     */
    constructor(public property: string, public message: string) {
        this.property = property;

    }

}