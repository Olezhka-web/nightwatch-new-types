import { NightwatchCustomCommandsModel } from "../../../src/custom-command";

declare module '../../../src/custom-command' {
  interface NightwatchCustomCommands {
    logMessage: typeof customCommands.command,
  }
}

const customCommands = {
  command() {
    console.log('Hello First Custom Command');

    return Promise.resolve();
  }
} satisfies NightwatchCustomCommandsModel;

export default customCommands;