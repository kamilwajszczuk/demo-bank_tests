import { test, expect } from '@playwright/test';

test.describe('Pulpit test', () => {
  
  test.beforeEach(async ({ page }) => {
    const userId = 'hallo123';
    const userPassword = 'byebye12';
   
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arange
    const recieverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '145';
    //Act
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_transfer_receiver').selectOption(recieverId);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
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
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReciever);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectMessage);
  });
});
