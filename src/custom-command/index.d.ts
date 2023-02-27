export interface NightwatchCustomCommandsModel {
  command: (...args: any) => unknown | Promise<unknown>;
}

export interface NightwatchCustomCommands {}