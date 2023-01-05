import { test, expect } from '@playwright/test';
import UnixTimestampConverterClient from '../lib/clients/helloAcmConverterClient';

// Test Data

const dateStringValueToConvert = '2016-01-01%202:3:22'
const unixTimeStampValueToConvert = 1451613802
const invalidValues = ['asdfasd', '', '&^$#', `SELECT * FROM cached`]

const expectedUnixTimeStampValue = 1451613802
const expectedDateStringValue = '2016-01-01 02:03:22'

// Test suite

test.describe('/unix-timestamp-converter/ endpoint', () => {

  // Happy path scenarios

  test('GET - conversion from valid date string to unix timeStamp', async ({ request }) => {

    // When User sends request with valid date string
    const response = await new UnixTimestampConverterClient()
      .getUnixTimestampConverter(request, dateStringValueToConvert)

    // Then User receives response with converted unix timeStamp
    expect(response).toBe(expectedUnixTimeStampValue)
  })

  test('GET - conversion from valid unix timeStamp to date string', async ({ request }) => {

    // When User sends request with valid unix timestamp
    const response = await new UnixTimestampConverterClient()
      .getUnixTimestampConverter(request, unixTimeStampValueToConvert)

    // Then User receives response with converted unix timeStamp
    expect(response).toBe(expectedDateStringValue)
  });
  
  // Negative scenarios 
  
  for (const item of invalidValues) {
    test(`GET - conversion from invalid value ${item} , service returns false`, async ({ request }) => {

      // When User sends request with invalid value which is not unix timestamp neither date string
    const response = await new UnixTimestampConverterClient()
      .getUnixTimestampConverter(request, item)

      // Then User receives response with false value
      expect(response).toBe(false)
    });
  };
});
