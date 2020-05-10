

export class ResponseModel {
    isValid: boolean = false;
    data: any;
    error: any;

    constructor(isValid: boolean, data: any, err: any) {
        this.isValid = isValid;
        this.data = data;
        this.error = err;
    }
}