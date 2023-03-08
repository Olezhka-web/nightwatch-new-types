describe('test Custom Assertions', function () {
  it('should check calls to custom assertions ', function () {
    // Call from .assert
    browser.assert.customAssert('test title assert');
    //
    // // Call from .verify
    browser.verify.customAssert('test title assert');
  });
});