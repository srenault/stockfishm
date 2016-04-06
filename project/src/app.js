"use strict";

const qstart = require('qstart');

const CMDS = (() => {
  let index = -1;
  const GO_INFINITE = 'go infinite';
  const STOP = 'stop';
  const COMMANDS = ['position startpos moves e2e4', GO_INFINITE, STOP];

  return {
    next: () => {
      index += 1;
      index = index > (COMMANDS.length - 1) ? 0 : index;
      return COMMANDS[index];
    },
    reset: () => index = -1
  };
})();

const $ = (s) => document.querySelector(s);

const $output = () => $('.stockfish-output');

const $startBtn = () => $('.stockfish-start');

const $exitBtn = () => $('.stockfish-exit');

const $sendBtn = () => $('.stockfish-command-send');

const $cmd = () => $('.stockfish-command-text');

function writeError(str) {
  writeOuput(str, true);
}

function writeOuput(str, error) {
  const firstLine = $output().querySelector('p:first-child');
  const text = document.createTextNode(str);
  const line = document.createElement('p');
  if(error) line.classList.add('error');
  line.appendChild(text);
  $output().insertBefore(line, firstLine);
}

function reset() {
  $startBtn().disabled = false;
  $exitBtn().disabled = true;
  $sendBtn().disabled = true;
  $cmd().value = '';
  $cmd().disabled = true;
  CMDS.reset();
}


function bindEvents() {

  $startBtn().addEventListener('click', function() {
    this.disabled = true;

    Stockfish.init(() => {
      writeOuput('Init OK');
      $cmd().value = CMDS.next();
      $exitBtn().disabled = false;
      $sendBtn().disabled = false;
      $cmd().disabled = false;
    }, (e) => {
      writeError(`Unable to init stockfish: ${e}`);
      reset();
    });
  });

  $exitBtn().addEventListener('click', function() {
    Stockfish.exit(() => {
      writeOuput('Exit OK');
      reset();
    }, (e) => {
      writeError(`Unable to exit stockfish: ${e}`);
    });
  });

  $sendBtn().addEventListener('click', function() {
    const cmd = $cmd().value;
    if(cmd) {
      Stockfish.cmd(cmd, () => {
        writeOuput(`${cmd} OK`);
        $cmd().value = CMDS.next();
      }, (e) => {
        writeOuput(`Unable to perform command ${cmd}`);
      });
    } else {
      writeError('This is not a valid stockfish command');
    }
  });
}

qstart.then(function () {

  bindEvents();

  navigator.splashscreen.hide();

  Stockfish.output((output) => {
    writeOuput(output);
  });

}).catch((e) => {
  writeOuput(e);
});
