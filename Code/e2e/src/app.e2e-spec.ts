import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';

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

  });

  it('starts search and shows loading text', async () => {
    try {
      browser.waitForAngularEnabled(false);

      await page.navigateTo();

      let searchBox = page.getSearchBox();
      await searchBox.sendKeys("metallica");

      let em = element(by.cssContainingText("em", "loading..."));
      await browser.wait(ExpectedConditions.presenceOf(em), 1000);

      expect(await em.getText()).toBe("loading...");
    } finally {
      browser.waitForAngularEnabled(true);
    }
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
