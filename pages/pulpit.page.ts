import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  actionCloseButton: Locator;
  messageText: Locator;
  topupRecieverInput: Locator;
  topupAmount: Locator;
  topupAgreementCheckbox: Locator;
  topupExecuteButton: Locator;
  moneyValueText: Locator;
  paymentButton: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(page);
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.actionCloseButton = this.page.getByTestId('close-button');
    this.messageText = this.page.locator('#show_messages');
    this.topupRecieverInput = this.page.locator('#widget_1_topup_receiver');
    this.topupAmount = this.page.locator('#widget_1_topup_amount');
    this.topupAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topupExecuteButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.moneyValueText = this.page.locator('#money_value');
  }
}
