import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PaymentPage {
  transferReceiverInput: Locator;
  transferToInput: Locator;
  transferAmountInput: Locator;
  transferButton: Locator;
  actionCloseButton: Locator;
  messageText: Locator;
  paymentButton: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(page);
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferToInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');
  }
}
