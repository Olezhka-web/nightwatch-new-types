import { LocateStrategy } from "../../index";

export interface ElementProperties {
  /**
   * the element selector name
   *
   * @example
   * '@searchBar'
   */
  selector: string;

  /**
   * locator strategy can be one of
   *  - css selector
   *  - link text
   *  - partial link text
   *  - tag name
   *  - xpath
   *
   * @example
   * 'css selector'
   */
  locateStrategy?: LocateStrategy;

  /**
   * used to target a specific element in a query that results in multiple elements returned. Normally,
   * only the first element is used (index = 0) but using the index property, you can specify any element within the result.
   */
  index?: number;

  /**
   * used to overwrite this setting when using waitForElement* commands.
   */
  abortOnFailure?: boolean;

  /**
   * used to overwrite the default timeout for when using waitForElement* commands or assertions.
   */
  timeout?: number;

  /**
   * used to overwrite the default retry interval for when using waitForElement* commands or assertions.
   */
  retryInterval?: number;

  /**
   * Some element commands like .click() or .getText() will throw a NoSuchElement error if the element cannot be located, causing the test to fail.
   * If this option is set to true then this error is ignored.
   */
  suppressNotFoundErrors?: boolean;
}

/**
 * #### [Enhanced Element Instances](https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API#enhanced-element-instances)
 * Element instances encapsulate the definition used to handle element selectors.
 * Generally you won't need to access them directly,
 * instead referring to them using their `@`-prefixed names for selector arguments,
 * but they are available through a page object or section's elements property.
 */
export interface EnhancedElementInstance<T> {
  /**
   * The name of the element as defined by its key in the parent section or the page object's `elements` definition.
   * This is the same name used with the `@` prefix in selector arguments for page object commands that refer to the element.
   */
  name: string;

  /**
   * The locate strategy to be used with `selector` when finding the element within the DOM.
   */
  locateStrategy: LocateStrategy;

  /**
   * A reference to the parent object instance.
   * This is the parent section or the page object that contained the definition for this object.
   */
  parent: T;

  /**
   * The selector string used to find the element in the DOM.
   */
  selector: string;
}

