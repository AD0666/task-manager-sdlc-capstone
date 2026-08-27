export async function registerUser(page, suffix) {
  const email = `user${suffix}@test.com`;
  const password = 'password123';
  const name = `Test User ${suffix}`;

  if (!(await page.getByTestId('register-form').isVisible().catch(() => false))) {
    await page.getByRole('button', { name: 'Register' }).click();
  }
  await page.getByTestId('register-form').waitFor();
  await page.getByTestId('register-name').fill(name);
  await page.getByTestId('register-email').fill(email);
  await page.getByTestId('register-password').fill(password);
  await page.getByTestId('register-confirm-password').fill(password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByTestId('logout-button').waitFor();

  return { email, password, name };
}

export async function loginUser(page, email, password) {
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByTestId('logout-button').waitFor();
}

export async function ensureLoggedIn(page) {
  await page.goto('/');
  const logout = page.getByTestId('logout-button');
  if (await logout.isVisible().catch(() => false)) {
    return;
  }
  await registerUser(page, Date.now());
}
