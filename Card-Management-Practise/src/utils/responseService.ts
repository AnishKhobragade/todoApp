import { ResponseModel } from "./../dataTransferModel/responseModel"

export  class ResponseService {
    public static getValidResponse(response: any) {
        return new ResponseModel(true, response, null);
    }

    public static getInValidResponse(error: any) {
        return new ResponseModel(false, null, error);
    }
}