// fixtures/user.fixture.ts

import { test as base, expect } from '@playwright/test';
import { generateTestUser } from '../utils/testData';

/**
 * Define the shape of our custom fixture.
 * This ensures TypeScript knows `testUser` exists in our tests.
 */
type UserFixture = {
  testUser: {
    email: string;
    password: string;
    username: string;
  };
};

/**
 * Extend the base Playwright test object
 * so we can inject a `testUser` into any test.
 */
export const test = base.extend<UserFixture>({
  /**
   * This fixture runs BEFORE each test that requests `testUser`.
   */
  testUser: async ({ playwright }, use) => {
    /**
     * Create a dedicated API request context.
     * This allows us to talk directly to the backend,
     * separate from the browser (UI).
     *
     * We use the backend URL from environment variables.
     */
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_URL,
    });

    /**
     * Generate a unique user for this test.
     * This prevents email collisions in the database.
     */
    const userData = generateTestUser();

    // --- DEBUG START ---
    console.log('\n========== REGISTERING TEST USER ==========');
    console.log('Backend API URL:', process.env.API_URL);
    console.log('Request payload:', userData);
    // --- DEBUG END ---

    /**
     * Send registration request to backend.
     * This should match your actual Express route.
     */
    const response = await apiContext.post('/api/register', {
      data: userData,
    });

    /**
     * Capture status code for debugging.
     */
    const status = response.status();

    /**
     * Read response body as text so we can see
     * exactly what the backend returned.
     */
    const bodyText = await response.text();

    // --- DEBUG START ---
    console.log('Response status:', status);
    console.log('Response body:', bodyText);
    console.log('===========================================\n');
    // --- DEBUG END ---

    /**
     * If registration failed, throw a detailed error.
     * This will immediately show us why it failed.
     */
    if (!response.ok()) {
      throw new Error(
        `User registration failed.
        Status: ${status}
        Body: ${bodyText}`
      );
    }

    /**
     * If successful, make the user available to the test.
     * `use()` hands control back to the test execution.
     */
    await use(userData);

    /**
     * Clean up the API context after test completes.
     * (No user deletion as requested.)
     */
    await apiContext.dispose();
  },
});

export { expect };
