import { NightwatchCustomCommandsModel } from "../../../src/custom-command";

declare module '../../../src/custom-command' {
  interface NightwatchCustomCommands {
    logMessage: typeof LogMessage.prototype.command,
  }
}

class LogMessage implements NightwatchCustomCommandsModel {
  command() {
    console.log('Hello First Custom Command');

    return Promise.resolve();
  }
}

export = LogMessage;