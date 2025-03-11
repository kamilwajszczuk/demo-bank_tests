import { test, expect } from '@playwright/test';

test.describe('Pulpit test', () => {
  test.only('quick payment with correct data', async ({ page }) => {
    //Arange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'hallo123';
    const userPassword = 'byebye12';
    const recieverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '145';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_transfer_receiver').selectOption(recieverId);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test1224');
    await page.getByTestId('password-input').fill('test1223');
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx',
    );
  });
});
