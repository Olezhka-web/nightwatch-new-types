describe('test Page Object Model', function () {
    it('should test a Google page', async function (browser) {
      const googlePage = browser.page.googlePage();

      // Go to https://google.com -> from url
      googlePage.navigate().pause(2000);

      // Check url
      await browser.expect.url().to.include(googlePage.url());

      // Call custom method
      googlePage.sayHello();

      // Get props
      console.log(`\nProps: ${googlePage.props.text}\n`);

      // Get Search Bar element
      browser.findElement(googlePage.elements.searchBar.selector, (result) => {
        console.log(result.value);
      });

      // Check if search bar exist
      await googlePage.assert.elementPresent('@searchBar');

      // Get Google Section
      const form = googlePage.section.menu;

      // googlePage.elements.searchBar
      form.section.m.clickYoutube();
      form.section.m.clickYoutubeMyOwm();
      form.section.m.clickYoutubeMy();

      console.log(form.section.m.elements.b.selector)

      console.log(form.section.m.section.myForm.selector);

      // Check if submitButton visible
      await form.expect.element('@mail').to.be.visible;
    });
});