describe('test Globals', function () {
  it('should check globals configs', function (browser) {
    // Test My Custom Global variable
    browser.assert.equal(browser.globals.myGlobalVar, 'some value');

    // Test reporter
    const customData = { helloMessage: 'Hello World!' };
    browser.globals.reporter!(customData, (result, a, b) => {
        console.log('Finished');

        browser.assert.equal((result as typeof customData).helloMessage, 'Hello World!');
        browser.assert.equal(a, 'value1');
        browser.assert.equal(b, 'value2');
      }
    );
  });
});