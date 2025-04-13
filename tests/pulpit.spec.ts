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
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arange
    const recieverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '145';
    //Act
    await page.waitForLoadState('domcontentloaded');
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiver.selectOption(recieverId);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferButton.click();
    await pulpitPage.actionCloseButton.click();

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
    await pulpitPage.topupRecieverInput.selectOption(topUpReciever);
    await pulpitPage.topupAmount.fill(topUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();
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
    await pulpitPage.topupRecieverInput.selectOption(topUpReciever);
    await pulpitPage.topupAmount.fill(topUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();
    //Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
