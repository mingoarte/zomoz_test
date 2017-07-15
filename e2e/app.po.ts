import { browser, by, element } from 'protractor';

export class LetslearnPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lsl-root h1')).getText();
  }
}
