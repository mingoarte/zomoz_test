import { LetslearnPage } from './app.po';

describe('letslearn App', () => {
  let page: LetslearnPage;

  beforeEach(() => {
    page = new LetslearnPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to lsl!');
  });
});
