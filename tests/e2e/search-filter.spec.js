import { test, expect } from '@playwright/test';

async function createTask(page, { title, description = '', status = 'todo' }) {
  await page.getByPlaceholder('Task title').fill(title);
  if (description) {
    await page.getByPlaceholder('Optional description').fill(description);
  }
  if (status !== 'todo') {
    await page.locator('form').first().locator('select').selectOption(status);
  }
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
}

test.describe('Search and Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('search-filter-bar')).toBeVisible();
  });

  test('filters tasks by status', async ({ page }) => {
    const suffix = Date.now();
    const todoTitle = `Filter todo ${suffix}`;
    const doneTitle = `Filter done ${suffix}`;

    await createTask(page, { title: todoTitle, status: 'todo' });
    await createTask(page, { title: doneTitle, status: 'done' });

    await page.getByTestId('status-filter').selectOption('todo');
    await expect(page.getByRole('heading', { name: todoTitle, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: doneTitle, exact: true })).not.toBeVisible();
  });

  test('searches tasks by title keyword', async ({ page }) => {
    const suffix = Date.now();
    const unique = `UniqueAlpha${suffix}`;
    const matchTitle = `${unique} task`;
    const otherTitle = `Other unrelated ${suffix}`;

    await createTask(page, { title: matchTitle });
    await createTask(page, { title: otherTitle });

    await page.getByTestId('search-input').fill(unique);
    await expect(page.getByRole('heading', { name: matchTitle, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: otherTitle, exact: true })).not.toBeVisible();
  });

  test('searches tasks by description keyword', async ({ page }) => {
    const suffix = Date.now();
    const unique = `BetaGamma${suffix}`;
    const title = `Desc search ${suffix}`;

    await createTask(page, { title, description: `${unique} description text` });

    await page.getByTestId('search-input').fill(unique);
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
  });

  test('clearing status filter shows all tasks', async ({ page }) => {
    const suffix = Date.now();
    const title = `Show all ${suffix}`;

    await createTask(page, { title, status: 'todo' });

    await page.getByTestId('status-filter').selectOption('done');
    await expect(page.getByRole('heading', { name: title, exact: true })).not.toBeVisible();

    await page.getByTestId('status-filter').selectOption('all');
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
  });
});
