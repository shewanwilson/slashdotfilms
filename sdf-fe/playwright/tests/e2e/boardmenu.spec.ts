import { test, expect } from '../fixtures/user.fixture';
import { LoginPage } from '../UI-pages/LoginPage';
import { BoardMenuPage } from '../UI-pages/BoardMenuPage';


test('user can view main boards on the board menu page', async ({ page, testUser }) => {  
  const loginPage = new LoginPage(page);
  const boardMenuPage = new BoardMenuPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password)
    
  await expect(boardMenuPage.boardMenuHeader).toBeVisible();
  await expect(boardMenuPage.boardMenuUL).toBeVisible();


});

test('Board menu matches main boards in DB', async ({ page, request, testUser }) => {
  const loginPage = new LoginPage(page);
  const boardMenuPage = new BoardMenuPage(page);
  
  // 1. Get expected boards from backend
  const response = await request.get('http://localhost:5000/api/boards');
  expect(response.ok()).toBeTruthy();

  const boards = await response.json();

  // Extract expected names (adjust to your schema)
  const expectedBoardNames = boards.map(b => b.board_name);

  // 2. Go to page
  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password)
    
  await expect(boardMenuPage.boardMenuHeader).toBeVisible();
  await expect(boardMenuPage.boardMenuUL).toBeVisible();

  // 3. Grab board menu items
  const boardItems = boardMenuPage.boardMenuUL.locator('li');

  // Wait for them to render
  await expect(boardItems).toHaveCount(expectedBoardNames.length);

  // 4. Extract UI text
  const uiBoardNames = await boardItems.allTextContents();

  // Optional: trim whitespace
  const cleanedUI = uiBoardNames.map(name => name.trim());

  // 5. Compare
  expect(cleanedUI).toEqual(expectedBoardNames);
});