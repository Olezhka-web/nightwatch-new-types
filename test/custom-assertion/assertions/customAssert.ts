import { NightwatchAssertion } from "../../../src/custom-assertion";

declare module '../../../src/custom-assertion' {
  interface NightwatchCustomAssertions {
    customAssert: typeof assertion,
  }
}

function assertion(this: NightwatchAssertion<string>, expectedText: string) {
  this.formatMessage = function() {
    const message = `Testing if the page title ${this.negate ? 'doesn\'t equal %s' : 'equals %s'}`;

    return {
      message,
      args: []
    }
  };

  this.expected = function() {
    return this.negate ? `is not '${expectedText}'` : `is '${expectedText}'`;
  };

  this.evaluate = function(value: any) {
    if (typeof value != 'string') {
      return false;
    }

    return value.includes(expectedText);
  };

  this.command = function(callback: (params: { value: string }) => void) {
    setTimeout(function() {
      callback({
        value: ''
      });

    }, 1000);

    return this;
  };
}

export default assertion;