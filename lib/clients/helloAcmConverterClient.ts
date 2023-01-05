import { APIRequestContext, expect } from "@playwright/test";
import { extractResponseJson } from "../utils/helpers";

// This baseUrl could be moved to config but it's not make sense in this size of project :D
const baseUrl = 'https://helloacm.com/api/unix-timestamp-converter/'
// Could be reused if more methods will point to similar URL within this client, but the route name is weird not descriptive to me much
const routeUrl = '?cached&s='

class UnixTimestampConverterClient {

    async getUnixTimestampConverter(request: APIRequestContext, valueToConvert: string | number, expectedStatus: number = 200)  {
        const response = await request.get(baseUrl+routeUrl+`${valueToConvert}`)
        
        expect(response.status()).toBe(expectedStatus);
        expect(response).toBeOK();

        const responseBody = await extractResponseJson(response)

        return responseBody;
    }
}

export default UnixTimestampConverterClient