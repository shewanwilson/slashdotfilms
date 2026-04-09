// e2e/threads.spec.ts

import { test, expect } from '../fixtures/user.fixture';
import { generateNewThreadData } from '../utils/threadTestData';
import { LoginPage } from '../UI-pages/LoginPage';
import { BoardMenuPage } from '../UI-pages/BoardMenuPage';
import { BoardPage } from '../UI-pages/BoardPage';
import { NewThreadPage } from '../UI-pages/NewThreadPage';
import { ThreadPage } from '../UI-pages/ThreadPage';

test('user can create a new thread on any of the main boards', async ({ page, testUser, thread }) => {
  const loginPage = new LoginPage(page);
  const boardMenuPage = new BoardMenuPage(page);  
  const boardPage = new BoardPage(page);
  const newThreadPage = new NewThreadPage(page);
  const threadPage = new ThreadPage(page);
  const testData = generateNewThreadData();

  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password);

  await expect(boardMenuPage.boardMenuHeader).toBeVisible();
  await expect(boardMenuPage.boardMenuUL).toBeVisible();

  // 1. click on test board from the main boards
  boardMenuPage.clickOnAutoTestBoard();

  // 2. validate auto test board
  await expect(boardPage.boardMenuHeading).toBeVisible();
  await expect(boardPage.addNewTopicLink).toBeVisible();
  await expect(page.getByText('You must be signed in')).not.toBeVisible();

  // 3. click on new topic link
  boardPage.clickOnNewTopicLink();

  // 4. validate New Thread Page
  await expect(newThreadPage.newThreadHeading).toBeVisible();
  await expect(newThreadPage.newThreadTitle).toBeVisible();
  await expect(newThreadPage.newThreadBody).toBeVisible();
  await expect(newThreadPage.newThreadSubmitButton).toBeVisible();

  // 5. enter data for new thread and click on Post Thread
  await newThreadPage.newThreadTitle.fill(testData.thread_title);
  await newThreadPage.newThreadBody.fill(testData.thread_body);
  await newThreadPage.clickOnPostThreadButton();

  // 6. Validate Thread post is displayed correctly after submission
  await expect(threadPage.breadcrumb).toBeVisible();


  // 7. Delete new thread from board using thread fixture
  const url = page.url(); // e.g. /board/13/thread/40
  const match = url.match(/thread\/(\d+)/);
  console.log('URL === ' + url);
  console.log('ThreadId === ' + match[1]);
  if (!match) throw new Error('Thread ID not found');
  thread.id = Number(match[1]);
  
});