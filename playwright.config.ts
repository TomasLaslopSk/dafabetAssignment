import { expect, PlaywrightTestConfig } from '@playwright/test';
import playwrightApiMatchers from 'odottaa';

expect.extend(playwrightApiMatchers);

const config: PlaywrightTestConfig = {
};

export default config;