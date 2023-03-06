import { NightwatchGlobals } from "../../src/globals";

declare module '../../src/globals' {
  interface NightwatchGlobals {
    myGlobalVar: string;
  }
}

const globals: NightwatchGlobals = {
  myGlobalVar: 'some value',

  reporter: (results, done) => {
    done('value1', 'value2');
  }
}

export default globals;