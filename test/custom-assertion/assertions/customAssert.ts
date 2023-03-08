import { Assert } from "../../../index";

declare module '../../../src/custom-assertion' {
  interface NightwatchCustomAssertions {
    customAssert: typeof assertion,
  }
}

function assertion(this: Assert<string, string>, expected: string) {
  this.expected = function() {
    return this.negate ? `is not '${expected}'` : `is '${expected}'`;
  };

  this.formatMessage = function() {
    const message = `Testing if the page title ${this.negate ? 'doesn\'t equal %s' : 'equals %s'}`;

    return {
      message,
      args: [`'${expected}'`]
    };
  };

  this.evaluate = function(value) {
    return value === expected;
  };

  // TODO Conflict with another value method in Assert
  this.value = function(result = {}) {
    return result.value || '';
  };

  this.command = function(callback) {
    // TODO NOT WORKING!
    // return this.api.getAttribute('input', 'maxlength', callback);

    callback({ value: 'test title assert' });
  };
}

export default { assertion };