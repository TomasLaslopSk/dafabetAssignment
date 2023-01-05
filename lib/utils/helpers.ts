import { APIResponse } from "@playwright/test";

export async function extractResponseJson(response: APIResponse): Promise<APIResponse> {
    return response.json();
}