import { EventEmitter } from 'events';
import { NightwatchCustomCommandsModel } from "../../../src/custom-command";

declare module '../../../src/custom-command' {
  interface NightwatchCustomCommands {
    sleep: typeof SleepCommand.prototype.command,
  }
}

class SleepCommand extends EventEmitter implements NightwatchCustomCommandsModel {
  public command(milliseconds: number = 1000) {
    setTimeout(() => {
      console.log('Hello Second Custom Command');

      this.emit('complete');
    }, milliseconds);

    return this;
  }
}

export = SleepCommand;