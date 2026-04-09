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
    userId: number;
  };
};

type ThreadFixture = {
  thread: { id: number | null };
};

/**
 * Extend the base Playwright test object
 * so we can inject a `testUser` into any test.
 */
export const test = base.extend<UserFixture & ThreadFixture>({
  /**
   * USER FIXTURE: This fixture runs BEFORE each test that requests `testUser`.
   */
  testUser: async ({ playwright }, use) => {    
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

    const responseJson = JSON.parse(bodyText);
    const userId = responseJson.id;

    /**
     * If successful, make the user available to the test.
     * `use()` hands control back to the test execution.
     */
    await use({...userData, userId});

    // ============================
    // 🧹 TEARDOWN (runs after test)
    // ============================

    console.log('\n========== DELETING TEST USER ==========');

    try {
      const deleteResponse = await apiContext.delete('/api/delete', {
        data: { userId }, // or userId if you have it
      });

      const deleteStatus = deleteResponse.status();
      const deleteBody = await deleteResponse.text();

      console.log('Delete status:', deleteStatus);
      console.log('Delete body:', deleteBody);

      if (!deleteResponse.ok()) {
        console.warn('⚠️ Failed to delete test user');
      }
    } catch (err) {
      console.error('❌ Error deleting test user:', err);
    }

    console.log('=========================================\n');



    /**
     * Clean up the API context after test completes.
    */
    await apiContext.dispose();
  },
    // 🧵 DELETE THREAD FIXTURE
    thread: async ({ request, testUser }, use) => {
      const thread = { id: null };

      await use(thread);

    if (thread.id) {
      console.log('Deleting thread:', thread.id);
      const result = await request.delete(`${process.env.API_URL}/api/thread/delete`, {
        data: { thread_id: thread.id },
      });
      const status = result.status();
      const body = await result.text();

      console.log('Thread delete status:', status);
      console.log('Thread delete body:', body);

      if (!result.ok()) {
        console.warn('⚠️ Thread delete failed');
      }
    }
  },

});

export { expect };
