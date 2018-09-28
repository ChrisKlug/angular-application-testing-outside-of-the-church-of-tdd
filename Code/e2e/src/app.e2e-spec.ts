import { AppPage } from './app.po';
import { element, by, ExpectedConditions, browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a search box', async () => {
    await page.navigateTo();

    let searchBox = page.getSearchBox();

    expect(await searchBox.isPresent()).toBeTruthy();
  });

  describe(`typing in the search box`, () => {

    it('shows the results when search is complete', async () => {
      await page.navigateTo();
      let searchBox = page.getSearchBox();

      await searchBox.sendKeys("metallica");
      let items = element.all(by.css("ul li"));

      expect(await items.count()).toBe(1);
      expect(await items.first().getText()).toBe("Metallica")
    })

    it('starts search and shows loading text', async () => {
      await page.navigateTo();

      browser.waitForAngularEnabled(false);

      try {

        let searchBox = page.getSearchBox();
        await searchBox.sendKeys("metallica");

        let em = element(by.tagName("em"));
        await browser.wait(ExpectedConditions.presenceOf(em), 1000);

        expect(await em.getText()).toBe("loading...");

      } finally {
        browser.waitForAngularEnabled(true);
      }
    })

  });
});
