export interface NightwatchCustomCommandsModel {
  command: (...args: any) => unknown | Promise<unknown>;
}

/**
 * @see https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html#define-a-custom-command
 */
export interface NightwatchCustomCommands {}