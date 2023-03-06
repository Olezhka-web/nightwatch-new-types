import { NightwatchAPI, NightwatchClient } from "../../index";

/**
 * Abstract assertion class that will subclass all defined assertions
 *
 * @see https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html#guide-container
 */
export interface NightwatchAssertion<T, U = unknown> {
  /**
   * If the custom commands operates with DOM elements, this options should be set
   *
   * @example
   * this.options = {
   *   elementSelector: true
   * };
   */
  options?: {
    elementSelector: boolean;
  };

  /**
   * Returns the expected value of the assertion which is displayed in the case of a failure
   *
   * @example
   * this.expected = function() {
   *   return this.negate ? `is not '${expectedText}'` : `is '${expectedText}'`;
   * };
   */
  expected: (() => T) | T;

  /**
   * The message which will be used in the test output ana inside the XML reports
   *
   * @remarks The formatMessage method creates the same option message. this.message or this.formatMessage must be specified!
   *
   * @example
   * this.message = `Testing if the page title contains ${expression}`;
   */
  message?: string;

  /**
   * The method which performs the actual assertion.
   * It is called with the result of the value method as the argument.
   *
   * @remarks This option can also override the evaluate method. this.pass or this.evaluate must be specified!
   *
   * @example
   * this.pass = function (value) {
   *   return this.expected.test(value);
   * };
   */
  pass?(value: T): unknown;

  /**
   * Called with the result object of the command to retrieve the value which is to be evaluated
   *
   * @example
   * this.value = function(result) {
   *    return result.value;
   * };
   */
  value?(result: U): T;

  /**
   * The command which is to be executed by the assertion runner; Nightwatch api is available as this.api
   *
   * @example
   * this.command = function(callback) {
   *   // Example: this.api.getText(definition, callback);
   *
   *   setTimeout(function() {
   *     // The object containing a "value" property will be passed to the .value() method to determine the value
   *     // which is to be evaluated (by the .evaluate() method)
   *     callback({
   *       value: ''
   *     });
   *
   *    }, 1000);
   * };
   */
  command(callback: (result: U) => void): this;

  /**
   * Returns the message format which will be used to output the message in the console and also
   * the arguments which will be used for replace the placeholders, used in the order of appearance.
   *
   * The message format also takes into account whether the .not negate has been used.
   *
   * @remarks The formatMessage method creates option message. this.message or this.formatMessage must be specified!
   *
   * @example
   * this.formatMessage = function() {
   *   // Use this.negate to determine if ".not" is in use
   *   // Example:
   *   const message = `Testing if the page title ${this.negate ? 'doesn\'t equal %s' : 'equals %s'}`;
   *
   *   return {
   *     message,
   *     args: [`'${expected}'`]
   *   }
   * };
   */
  formatMessage?(): { message: string; args: unknown[] };

  /**
   * Given the value, the condition used to evaluate if the assertion is passed
   *
   * @remarks This option can also override the pass method. this.pass or this.evaluate must be specified!
   *
   * @example
   * this.evaluate = function(value) {
   *   if (typeof value != 'string') {
   *     return false;
   *   }
   *
   *   return value.includes(expectedText);
   * };
   */
  evaluate?(value: T): boolean;

  /**
   * When defined, this method is called by the assertion runner with the command result, to determine if the
   * value can be retrieved successfully from the result object
   *
   * @example
   * this.failure = function(result) {
   *   return result === false || result && result.status === -1;
   * };
   */
  failure?(result: U): boolean; // TODO CHECK TYPE (ARGS AND RETURN)

  /**
   * When defined, this method is called by the assertion runner with the command result to determine the actual
   * state of the assertion in the event of a failure
   *
   * @example
   * this.actual = function(passed) {
   *    return passed ? `contains '${expectedText}'` : `does not contain '${expectedText}'`;
   * };
   */
  actual?(passed: boolean): string;

  /**
   * Nightwatch API
   */
  readonly api: NightwatchAPI;

  /**
   * Nightwatch Client
   */
  readonly client: NightwatchClient;

  /**
   * Use this.negate to determine if ".not" is in use
   */
  readonly negate: boolean;
}

/**
 * @see https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html#guide-container
 */
export interface NightwatchCustomAssertions {}