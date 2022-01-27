const { spawn, exec } = require("child_process");
const python = spawn("python", ["-u", "./gesture.py"]);
const vlc = spawn("vlc");
vlc.stdin.write(`add ${ process.argv[2] }\n`);

const state = {
  shuffle: false
};

python.stdout.on("data", (rawStream) => {

  const stream = rawStream.toString();
  if (!stream.startsWith("gest!")) return;
  const instruction = stream.slice(5).trim();

  updateVLC(instruction);
})

function updateVLC(instruction) {
  if(instruction != "-") console.log('Instruction:', instruction);
  switch (instruction) {
    case "UP":
      exec("amixer sset 'Master' 10%+"); break;
    case "DOWN":
      exec("amixer sset 'Master' 10%-"); break;
    case "FORWARD":
      break;
    case "BACKWARD":
      sendToVLC(`sort ${ (state.shuffle ^= 1) ? 'random' : 'id' }`); break;
    case "RIGHT":
      sendToVLC("next"); break;
    case "LEFT":
      sendToVLC("previous"); break;
    case "CLOCLWISE":
      sendToVLC("loop"); break;
    case "ANTI_CLOCKWISE":
      sendToVLC("repeat"); break;
    case "WAVE":
      break;
    case "Error":
      throw new Error("Error");
    case "-":
      // Ignore
      break;
  }
}

function sendToVLC(command) {
  vlc.stdin.write(command + "\n");
}