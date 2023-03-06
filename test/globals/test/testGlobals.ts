describe('test Globals', function () {
  it('should check globals configs', function (browser) {
    // My Custom Global variable
    console.log(browser.globals.myGlobalVar);

    // Test reporter
    browser.globals.reporter!({ helloMessage: "Hello World!" }, (a, b) => {
        console.log('Finished');

        console.log(`${a} ${b}`);
      }
    );
  });
});