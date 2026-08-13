import { test, expect } from '@playwright/test';
import { ensureLoggedIn } from './helpers/auth';

test.describe('Task CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedIn(page);
    await expect(page.getByRole('heading', { name: 'Task Manager' })).toBeVisible();
  });

  test('creates a new task', async ({ page }) => {
    const title = `E2E Task ${Date.now()}`;
    await page.getByPlaceholder('Task title').fill(title);
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText(title)).toBeVisible();
  });

  test('updates an existing task', async ({ page }) => {
    const original = `Update Test ${Date.now()}`;
    const updated = `${original} - Updated`;

    await page.getByPlaceholder('Task title').fill(original);
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText(original)).toBeVisible();

    const taskItem = page.locator('.task-item', { hasText: original });
    await taskItem.getByRole('button', { name: 'Edit' }).click();
    await page.getByPlaceholder('Task title').fill(updated);
    await page.getByRole('button', { name: 'Update Task' }).click();

    await expect(page.getByRole('heading', { name: updated, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: original, exact: true })).toHaveCount(0);
  });

  test('deletes a task', async ({ page }) => {
    const title = `Delete Test ${Date.now()}`;

    await page.getByPlaceholder('Task title').fill(title);
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText(title)).toBeVisible();

    const taskItem = page.locator('.task-item', { hasText: title });
    await taskItem.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText(title)).not.toBeVisible();
  });

  test('changes task status', async ({ page }) => {
    const title = `Status Test ${Date.now()}`;

    await page.getByPlaceholder('Task title').fill(title);
    await page.getByRole('button', { name: 'Add Task' }).click();

    const taskItem = page.locator('.task-item', { hasText: title });
    await taskItem.getByRole('button', { name: 'Edit' }).click();
    await page.locator('form').first().getByLabel('Status').selectOption('done');
    await page.getByRole('button', { name: 'Update Task' }).click();

    await expect(taskItem.locator('.status-done')).toBeVisible();
  });
});
