import { Nightwatch, NightwatchCustomCommands, SharedCommands } from "../../index";
import { EnhancedPageObjectSharedFields, SectionProperties } from "./sections";
import { ElementProperties } from "./elements";
import { MergeObjectsArray } from "../utils/merge-objects-array";

/**
 * Page objects provide an additional layer of abstraction for test case creation.
 * Page objects are defined in modules and parsed into factory functions that create page object instances.
 *
 * @see https://nightwatchjs.org/api/pageobject/#overview
 *
 * @remarks Use satisfies to preserve types!
 *
 * @example
 * const homePage = {
 *   // Some options
 * } satisfies PageObjectModel;
 */

export interface PageObjectModel {
  /**
   * A list of objects containing functions to represent methods added to the page object instance.
   * Page-specific commands: {@link https://nightwatchjs.org/guide/using-page-objects/writing-page-specific-commands.html}
   *
   * @example
   * class MyCommands {
   *   myFirstMethod() {
   *     return 'My First Method';
   *   }
   * }
   *
   * const homePage = {
   *   commands: MyCommands
   * } satisfies PageObjectModel;
   */
  commands?: Record<string, (...args: any) => unknown>[];

  /**
   * An object, or array of objects, of named element definitions to be used
   * as element selectors within element commands called from the page object.
   *
   * @example
   * const homePage = {
   *   elements: [
   *     {
   *       searchBar: {
   *         selector: 'input[type=text]',
   *       },
   *       submitButton: {
   *         selector: 'input[name=btnK]',
   *       },
   *     },
   *   ]
   * } satisfies PageObjectModel;
   */
  elements?: { [name: string]: ElementProperties } | { [name: string]: ElementProperties }[];

  /**
   * An object or a function returning an object representing a container for user variables.
   * Props objects are copied directly into the props property of the page object instance.
   *
   * @example
   * const homePage = {
   *   props: {
   *     myVar: "some info"
   *   }
   * } satisfies PageObjectModel;
   */
  props?: Record<string, unknown> | (() => Record<string, unknown>);

  /**
   * An object of named sections definitions defining the sections within the page object.
   *
   * @example
   * const homePage = {
   *   sections: {
   *     menu: {
   *       selector: '#gb',
   *       elements: {
   *         mail: {
   *           selector: 'a[href="https://mail.google.com/mail/&ogbl"]'
   *         }
   *       }
   *     }
   *   }
   * } satisfies PageObjectModel;
   */
  sections?: {
    [name: string]: SectionProperties;
  };

  /**
   * A url or function returning a url to be used in a url() command when the page's navigate() method is called.
   *
   * @example
   * const homePage = {
   *   url: function() {
   *      return this.api.launchUrl;
   *   }
   * } satisfies PageObjectModel;
   */
  url?: string | ((...args: any) => string);
}

/**
 * #### [Enhanced Page Object Instances](https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API#enhanced-page-object-instances)
 * Page object module definitions are used to define page object instances when their respective
 * factory functions within the page reference of the standard command API is called.
 * ```
 * const myPageObject = browser.page.MyPage(); // defined in MyPage.js module
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
  /**
   * A url or function returning a url to be used in a url() command when the page's navigate() method is called.
   *
   * @example
   * const homePageObject = browser.page.homePage();
   *
   * googlePage.url; // if string type
   * googlePage.url(); // if function type
   */
  url: URL;

  /**
   * This command is an alias to url and also a convenience method because when called without any arguments
   * it performs a call to .url() with passing the value of `url` property on the page object.
   * Uses `url` protocol command.
   *
   * @example
   * const homePageObject = browser.page.homePage();
   *
   * homePageObject.navigate();
   */
  navigate(url?: string, callback?: () => void): EnhancedPageObject<URL, Commands, Props, Elements, Sections>;
};