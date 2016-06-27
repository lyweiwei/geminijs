import {runInContext} from 'vm';
import {Context} from './context';

export class GeminiService {
  constructor() {
    this.context = new Context();
  }

  execute(func, options) {
    const code = func.toString();
    return runInContext(`(${code})(global)`, this.context.vmContext, options);
  }
}
