// e2e/auth.spec.ts

import { test, expect } from '../fixtures/user.fixture';
import { LoginPage } from '../UI-pages/LoginPage';
import { BoardMenuPage } from '../UI-pages/BoardMenuPage';
import { Header } from '../UI-components/Header';

// TODO: Login failures

test('user can login with newly created account', async ({ page, testUser }) => {
  const header = new Header(page);  
  const loginPage = new LoginPage(page);
  const boardMenuPage = new BoardMenuPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password)
  
  // Profile Header and Board Menu Assertions 
  await expect(header.profileAvatar).toBeVisible();
  await expect(header.logoutButton).toBeVisible();
  await expect(boardMenuPage.boardMenuHeader).toBeVisible();
  await expect(boardMenuPage.boardMenuUL).toBeVisible();
});
