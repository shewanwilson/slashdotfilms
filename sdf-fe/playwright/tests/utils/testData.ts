// utils/testData.ts

/**
 * Generates a unique test user.
 * We use timestamp to avoid email collisions in the database.
 */
export function generateTestUser() {
  const timestamp = Date.now();

  return {
    username: `user_${timestamp}`,
    email: `testuser_${timestamp}@example.com`,
    password: 'Password123!',
    
  };
}
