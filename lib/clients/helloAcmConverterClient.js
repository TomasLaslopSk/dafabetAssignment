// This baseUrl could be moved to config but it's not make sense in this size of project :D
const baseUrl = 'https://helloacm.com/api/unix-timestamp-converter/'
// Could be reused if more methods will point to similar URL within this client
const routeUrl = '?cached&s='

export async function getConvertedValue(request, valueToConvert) {
    return request.get(baseUrl+routeUrl+`${valueToConvert}`);
}