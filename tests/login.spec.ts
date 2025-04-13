import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

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

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(userName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arange
    const incorrectUserId = 'tesr';
    const errorMessage = 'identyfikator ma min. 8 znaków';
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();
    
    //Assert
    await expect(loginPage.loginError).toHaveText(errorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const incorrectPassword = '1234';
    const expectErrorMessage = 'hasło ma min. 8 znaków';
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();
   
    //Assert
    await expect(loginPage.passwordError).toHaveText(
      expectErrorMessage,
    );
  });
});
