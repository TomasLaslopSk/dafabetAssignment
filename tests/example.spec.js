// @ts-check
const { test, expect } = require('@playwright/test');
const { getConvertedValue } = require('../lib/clients/helloAcmConverterClient');
const { extractResponseJson } = require('../lib/util/helpers');

const dateStringValueToConvert = '2016-01-01%202:3:22'
const unixTimeStampValueToConvert = 1451613802
const invalidValues = ['asdfasd', '', '&^$#']

const expectedUnixTimeStampValue = 1451613802
const expectedDateStringValue = '2016-01-01 02:03:22'

// Happy path scenarios

test('User able to convert from valid date string to unix timeStamp', async ({ request }) => {
  // When User sends request with valid date string
  const response = await getConvertedValue(request, dateStringValueToConvert)
  const responseBody = await extractResponseJson(response)
  // Then User receives response with converted unix timeStamp
  expect(response.status()).toBe(200);
  expect(responseBody).toBe(expectedUnixTimeStampValue)
});

test('User able to convert from valid unix timeStamp to date string', async ({ request }) => {
  // When User sends request with valid unix timestamp
  const response = await getConvertedValue(request, unixTimeStampValueToConvert)
  const responseBody = await extractResponseJson(response)
  // Then User receives response with converted unix timeStamp
  expect(response.status()).toBe(200);
  expect(responseBody).toBe(expectedDateStringValue)
});

// Negative scenarios 
for (const item of invalidValues) {
  test(`User is not able to convert from invalid date string ${item} , service returns false`, async ({ request }) => {
    // When User sends request with valid unix timestamp
    const response = await getConvertedValue(request, item)
    const responseBody = await extractResponseJson(response)
    // Then User receives response with converted unix timeStamp
    expect(response.status()).toBe(200);
    expect(responseBody).toBe(false)
  });
}
