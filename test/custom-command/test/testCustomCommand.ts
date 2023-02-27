describe('test Custom Commands', function () {
  it('should check calls to custom commands ', async function (browser) {
    // Call first custom command (Function style)
    await browser.logMessage();

    // Call second custom command (Class style)
    await browser.sleep();
  });
});