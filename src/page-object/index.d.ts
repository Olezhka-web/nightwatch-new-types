import { Nightwatch, NightwatchCustomCommands, SharedCommands } from "../../index";
import { EnhancedPageObjectSharedFields, SectionProperties } from "./sections";
import { ElementProperties } from "./elements";
import { MergeObjectsArray } from "../utils/merge-objects-array";

/**
 * Page objects are defined in modules and parsed into factory functions that create page object instances.
 * @param commands - A list of objects containing functions to represent methods added to the page object instance.
 *
 * @param elements - An object, or array of objects, of named element definitions to be used as element selectors
 * within element commands called from the page object.
 *
 * @param props - An object or a function returning an object representing a container for user variables.
 *
 * @param sections - An object of named sections definitions defining the sections within the page object.
 *
 * @param url - A url or function returning a url to be used in a url() command when the page's navigate() method is called.
 *
 * @see https://nightwatchjs.org/api/pageobject/#overview
 */
// TODO WRONG TYPES!!!
export interface PageObjectModel {
  /**
   * A list of objects containing functions to represent methods added to the page object instance.
   * Page-specific commands: {@link https://nightwatchjs.org/guide/using-page-objects/writing-page-specific-commands.html}
   *
   * @example
   * // Page Object Model home.ts file
   * class MyCommands {
   *   myFirstMethod() {
   *     return 'My First Method';
   *   }
   *
   *   mySecondMethod() {
   *     return 'My Second Method';
   *   }
   * }
   *
   * const homePage: PageObjectModule = {
   *   commands: MyCommands
   * };
   *
   * export default homePage;
   *
   *
   * // Test home.spec.ts file
   * const homePage = browser.page.homePage();
   *
   * homePage.myFirstMethod();
   */
  commands?: Record<string, (...args: any) => unknown>[];

  /**
   * TODO
   */
  elements?: { [name: string]: ElementProperties } | { [name: string]: ElementProperties }[];

  /**
   * An object or a function returning an object representing a container for user variables.
   * Props objects are copied directly into the props property of the page object instance.
   *
   * @example
   * // Page Object Model home.ts file
   * const homePage: PageObjectModule = {
   *   props: {
   *     email: "example@gmail.com"
   *   }
   * };
   *
   * export default homePage;
   *
   *
   * // Test home.spec.ts file
   * const homePage = browser.page.homePage();
   *
   * console.log(homePage.props.email);
   */
  props?: Record<string, unknown> | (() => Record<string, unknown>);

  /**
   * TODO
   */
  sections?: {
    [name: string]: SectionProperties
  };

  /**
   * A url or function returning a url to be used in a url() command when the page's navigate() method is called.
   *
   * @example
   * // Page Object Model home.ts file
   * const homePage = {
   *   url: function(host: string, port: number) {
   *      return `http://${host}:${port}`;
   *   }
   * } satisfies PageObjectModule;
   *
   * export default homePage;
   *
   *
   * // Test home.spec.ts file
   * const homePage = browser.page.homePage();
   *
   * homePage.navigate(homePage.url('localhost', 3000));
   */
  url?: string | ((...args: any) => string);
}

/**
 * #### [Enhanced Page Object Instances](https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API#enhanced-page-object-instances)
 * Page object module definitions are used to define page object instances when their respective factory functions within the page reference of the standard command API is called.
 * ```
 * var myPageObject = browser.page.MyPage(); // defined in MyPage.js module
 * ```
 * Every time a factory function like MyPage above is called, a new instance of the page object is instantiated.
 */
export type EnhancedPageObject<
  URL = string,
  Commands = {},
  Props = {},
  Elements = {},
  Sections = {},
> = Nightwatch &
  SharedCommands &
  NightwatchCustomCommands &
  EnhancedPageObjectSharedFields<URL, Required<MergeObjectsArray<Commands>>, Props, Required<MergeObjectsArray<Elements>>, Sections> &
  Required<MergeObjectsArray<Commands>> & {
  url: URL;

  /**
   * This command is an alias to url and also a convenience method because when called without any arguments
   *  it performs a call to .url() with passing the value of `url` property on the page object.
   * Uses `url` protocol command.
   */
  navigate(url?: string, callback?: () => void): EnhancedPageObject<URL, Commands, Props, Elements, Sections>;
};