describe('test Custom Commands', function () {
  it('should check calls to custom commands ', async function () {
    // // Call first custom command (Function style) // TODO BUG WITH FUNCTION STYLE
    await browser.logMessage();

    // Call second custom command (Class style)
    await browser.sleep();
  });
});