import {
  ChromiumClientCommands,
  ElementCommands,
  Nightwatch,
  NightwatchAPI,
  NightwatchComponentTestingCommands,
} from "../../index";
import { ElementProperties, EnhancedElementInstance } from "./elements";
import { EnhancedPageObject } from "./index";
import { MergeObjectsArray } from "../utils/merge-objects-array";

export interface SectionProperties {
  selector: string;

  elements?: { [name: string]: ElementProperties } | { [name: string]: ElementProperties }[];

  sections?: {
    [name: string]: SectionProperties;
  };

  commands?: Record<string, () => unknown>[]
}

export type EnhancedSectionInstance<
  Commands = {},
  Props = {},
  Elements = {},
  Sections = {},
> = EnhancedPageObjectSections<Commands, Props, Elements, Sections> &
  Commands &
  ElementCommands &
  ChromiumClientCommands &
  Pick<NightwatchComponentTestingCommands,
    'importScript' |
    'launchComponentRenderer' |
    'mountComponent'
  > &
  Pick<NightwatchAPI,
    'axeInject' |
    'axeRun' |
    'debug' |
    'deleteCookie' |
    'deleteCookies' |
    'end' |
    'getCookie' |
    'getCookies' |
    'getLog' |
    'getLogTypes' |
    'getTitle' |
    'getWindowPosition' |
    'getWindowRect' |
    'getWindowSize' |
    'init' |
    'injectScript' |
    'isLogAvailable' |
    'maximizeWindow' |
    'pause' |
    'perform' |
    'resizeWindow' |
    'saveScreenshot' |
    'setCookie' |
    'setWindowPosition' |
    'setWindowRect' |
    'setWindowSize' |
    'urlHash' |
    'useCss' |
    'useXpath' |
    'registerBasicAuth' |
    'setNetworkConditions' |
    'clickAndHold' |
    'doubleClick' |
    'rightClick'
  > &
  Pick<Nightwatch,
    'client' |
    'api' |
    'assert' |
    'verify' |
    'expect'
  >;

export interface EnhancedPageObjectSections<
  Commands = {},
  Props = {},
  Elements = {},
  Sections = {},
> extends EnhancedPageObjectSharedFields<{}, Commands, Props, Elements, Sections> {
  selector: string;
}

interface EnhancedPageObjectSharedFields<
  URL = string,
  Commands = {},
  Props = {},
  Elements = {},
  Sections = {},
> {
  /**
   * A map of Element objects (see [Enhanced Element Instances](https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API#enhanced-element-instances)) used by element selectors.
   */
  elements: {
    [key in keyof Elements]: EnhancedElementInstance<EnhancedPageObject<URL, Commands, Props, Elements, Sections>>;
  };

  section: {
    [key in keyof Sections]: EnhancedSectionInstance<
      Required<MergeObjectsArray<Sections[key]['commands']>>,
      Sections[key]['props'],
      Sections[key]['elements'],
      Sections[key]['sections']>
  }

  /**
   * The name of the page object as defined by its module name (not including the extension).
   * This is the same name used to access the `page` object factory from the page reference in the command API.
   */
  name: string;

  props: Props;
}