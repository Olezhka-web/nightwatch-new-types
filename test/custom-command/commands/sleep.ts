// import { EventEmitter } from 'events';
// import { NightwatchCustomCommandsModel } from "../../../src/custom-command";
//
// declare module '../../../src/custom-command' {
//   interface NightwatchCustomCommands {
//     sleep: typeof SleepCommand.prototype.command,
//   }
// }
//
// // simply waits for given number of milliseconds before resuming operation
// class SleepCommand extends EventEmitter implements NightwatchCustomCommandsModel {
//   public command(milliseconds: number = 1000) {
//     setTimeout(() => {
//       console.log('Hello Second Custom Command');
//
//       this.emit('complete');
//     }, milliseconds);
//
//     return this;
//   }
// }
//
// export = SleepCommand;

import { NightwatchCustomCommandsModel } from "../../../src/custom-command";

declare module '../../../src/custom-command' {
  interface NightwatchCustomCommands {
    sleep: typeof sleep.command,
  }
}

const sleep = {
  command() {
    console.log('Hello First Custom Command');

    return Promise.resolve();
  }
} satisfies NightwatchCustomCommandsModel;

export default sleep;