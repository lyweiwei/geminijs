import {createContext} from 'vm';
import {TaskEngine} from './task-engine';

export class Context {
  constructor() {
    const sandbox = this.sandbox = {
      taskEngine: new TaskEngine(),
      console,
      setTimeout,
    };
    sandbox.global = sandbox;
    this.vmContext = createContext(sandbox);
  }
}
