import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment test', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);


    paymentPage = new PaymentPage(page);
    await paymentPage.sideMenu.paymentButton.click();
    // await page.getByRole('link', { name: 'płatności' }).click();
  });
  test('Simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7812 3456 7812 3456 5453';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    await paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount)
    
    //Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
