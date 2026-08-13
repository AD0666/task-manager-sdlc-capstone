import { test, expect } from '@playwright/test';
import { loginUser, registerUser } from './helpers/auth';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('registers a new account', async ({ page }) => {
    const suffix = Date.now();
    const { name } = await registerUser(page, suffix);
    await expect(page.getByText(`signed in as ${name}`)).toBeVisible();
  });

  test('logs in with existing credentials', async ({ page }) => {
    const suffix = Date.now();
    const { email, password, name } = await registerUser(page, suffix);

    await page.getByTestId('logout-button').click();
    await page.getByTestId('login-form').waitFor();

    await loginUser(page, email, password);
    await expect(page.getByText(`signed in as ${name}`)).toBeVisible();
  });

  test('rejects duplicate email on register', async ({ page }) => {
    const suffix = Date.now();
    const email = `dup${suffix}@test.com`;

    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByTestId('register-name').fill('First User');
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill('password123');
    await page.getByTestId('register-confirm-password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.getByTestId('logout-button').waitFor();

    await page.getByTestId('logout-button').click();
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByTestId('register-name').fill('Second User');
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill('password123');
    await page.getByTestId('register-confirm-password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page.getByText('Email already registered')).toBeVisible();
  });

  test('blocks unauthenticated API access', async ({ request }) => {
    const res = await request.get('http://localhost:3001/api/tasks');
    expect(res.status()).toBe(401);
  });

  test('users only see their own tasks', async ({ page, browser }) => {
    const suffix = Date.now();
    await registerUser(page, `${suffix}a`);
    await page.getByPlaceholder('Task title').fill(`Private task ${suffix}`);
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByRole('heading', { name: `Private task ${suffix}`, exact: true })).toBeVisible();

    const otherContext = await browser.newContext();
    const otherPage = await otherContext.newPage();
    await otherPage.goto('/');
    await registerUser(otherPage, `${suffix}b`);
    await expect(otherPage.getByRole('heading', { name: `Private task ${suffix}`, exact: true })).not.toBeVisible();
    await otherContext.close();
  });
});
