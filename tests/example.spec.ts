import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const userName = 'Jan Demobankowy';
    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(userName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arange
    const incorrectUserId = 'tesr';
    const errorMessage = 'identyfikator ma min. 8 znaków';
    //Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();
    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(errorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const incorrectPassword = '1234';
    const expectErrorMessage = 'hasło ma min. 8 znaków';
    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();
    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectErrorMessage,
    );
  });
});
