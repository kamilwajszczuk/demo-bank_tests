import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit test', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arange
    const recieverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '145';
    //Act
    await page.waitForLoadState('domcontentloaded');
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.executeQuickPayment(
      recieverId,
      transferTitle,
      transferAmount,
    );

    //Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const topUpReciever = '500 xxx xxx';
    const topUpAmount = '50';
    const expectMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciever}`;
    //Act
    await page.waitForLoadState('domcontentloaded');
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.executeMobieTopUp(topUpReciever, topUpAmount);

    //Assert
    await expect(pulpitPage.messageText).toHaveText(expectMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    //Arrange
    const topUpReciever = '500 xxx xxx';
    const topUpAmount = '50';
    const expectMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciever}`;
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    //Act
    await page.waitForLoadState('domcontentloaded');
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.executeMobieTopUp(topUpReciever, topUpAmount);

    //Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
