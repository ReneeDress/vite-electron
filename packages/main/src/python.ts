import { PythonShell } from 'python-shell';

let options: any = {
  mode: 'text',
//   pythonPath: 'path/to/python',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: 'packages/python',
  args: ['value1', 'value2', 'value3'],
};

const testPython = (event: Electron.IpcMainEvent, arg: any[]) => {
    PythonShell.run('hello.py', options).then(messages=>{
        // results is an array consisting of messages collected during execution
        console.log('results: %j', messages);
        event.reply('testPython-reply', messages);
    });
};

export {
    testPython,
};