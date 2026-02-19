// e2e/auth.spec.ts

import { test, expect } from '../fixtures/user.fixture';
import { LoginPage } from '../UI-pages/LoginPage'
import { Header } from '../UI-components/Header';


test('user can login with newly created account', async ({ page, testUser }) => {
  const header = new Header(page);  
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password)
  // Assertions 
  await expect(header.profileAvatar).toBeVisible();
  await expect(header.logoutButton).toBeVisible();
});
