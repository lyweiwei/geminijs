import {GeminiService} from './index';

new GeminiService().execute(({taskEngine}) => {
  const task = taskEngine.runTask((resolve, reject, progress) => {
    let c = 5;
    const wait = () => {
      if (c > 1) {
        c--;
        progress((5 - c) / 5);
        setTimeout(wait, 1000);
      } else {
        resolve({});
      }
    };
    setTimeout(wait, 1000);
  }, 'A test task');

  task.on('complete', () => console.log('finished'));
  task.on('progress', progress => console.log(`progress ${progress}`));
  task.on('fail', err => console.log(`error ${err}`));

  return task;
});
