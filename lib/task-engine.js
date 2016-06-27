import _ from 'lodash';
import EventEmitter from 'events';
import Promise from 'bluebird';
import uuid from 'node-uuid';

class Task extends EventEmitter {
  constructor(callback, {
    description,
  }) {
    super();

    this.description = description;
    this.uuid = uuid();
    this.status = 'running';

    const progress = progress => {
      if (progress !== this.progress) {
        this.progress = progress;
        this.emit('progress', progress);
      }
    };

    const resolve = result => {
      this.result = result;
      this.status = 'completed';
      this.emit('complete', result);
    };

    const reject = error => {
      this.error = error;
      this.status = 'failed';
      this.emit('fail', error);
    };

    new Promise(_.bind(callback, null, _, _, progress)).then(result => {
      progress(1);
      resolve(result);
    }).catch(reject).finally(() => {
      this.endTime = new Date();
    });

    this.startTime = new Date();
    this.endTime = null;
  }
}

export class TaskEngine {
  constructor() {
    this.tasks = [];
    this.taskIndex = {};
  }

  runTask(callback, {
    description = '',
  } = {}) {
    const task = new Task(callback, {
      description,
    });

    this.tasks.push(task);
    this.taskIndex[task.uuid] = task;
    return task;
  }
}
