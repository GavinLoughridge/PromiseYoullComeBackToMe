/*
  level designs
*/

let endgameText = "Congratulations on making it through that last sector! It was quite complicated.##I have been monitoring for any signlas from earth and have two peices of unfortunat news and two pieces of good news. First, It seems that you did attempt to use the transporter that Dr. Lovelace referenced in the last message I quoted. Unfortunatly it appears something went wrong and rather then being sent back you were partially replicated on earth. The partially repicated body could not survive and you passed away soon after transportation. You had just enough time to profess your undying love for Dr. Lovelace before she watched you die in her arms.##Luckly, however, it seems that the you who was left behind by the transporter is fully functional and should live a very long time.##Again, unfortunatly, after continued scans of the SARGGASO SECTOR I have concluded that there is absolutly no way out, no matter how many promises we construct and how many wormholes we traverse. Since the transporter was completly destroyed during it's initial usage you will never get home. You will never see Dr. Lovelace again. She will never know you or your love survive.##That is likly excruciatingly painful, so I have analysed a potential solution. It seems I am capable of wiping your memory. It will not change anything, but parhapse it will ease the pain of this tragic loss. I would also intentially erase sections of my own database to preserve both of our ignorance. From there we can continue a doomed journy home in happy ignorance, beliving we might one day make it. If you would like me to do this, simple press 'COMMAND + R' or 'CTR + F5' (I forget which it is).";

const safeSquares = [
  [
    [0, 1], [1,0]
  ],
  [
    [1, 2]
  ],
  [],
  []
]

const wormholes = [
  {

  },
  {
    "x1y0": {"origin": [1, 0], "pass": [2, 2]},
  },
  {
    "x0y1": {"origin": [0, 1], "pass": [1, 2], "fail": [2, 1]},
  },
  {
    "x0y1": {"origin": [0, 1], "pass": [0, 3], "fail": [3, 3]},
    "x0y4": {"origin": [0, 4], "pass": [0, 6], "fail": [3, 3]},
    "x1y6": {"origin": [1, 6], "pass": [3, 6], "fail": [3, 3]},
    "x3y4": {"origin": [3, 4], "pass": [3, 6], "fail": [6, 4]},
    "x4y6": {"origin": [4, 6], "pass": [6, 6], "fail": [6, 4]},
  }
];

const goals = [
  [1, 1],
  [0, 2],
  [2, 2],
  [6, 5]
];

const starts = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0]
];

const mapSizes = [2, 3, 3, 7];

let instructions = [
  "Good morning Captain Fort. Do not be alarmed if you feel disoriented, this is normal when coming out of cryosleep.##My name is [ERROR: data corrupted]. I am your speech enabled emergency guidance system.##I will do my best to explain everything due to your temporarily [permanent and irreparably damaged memory]. If you ever need clarification, just say my name and then ask your question.##We are currently orbiting a planet at the edge of the SARGASSO SECTOR. At this point I’m instructed to tell you:##CONGRATULATIONS, YOU REALLY MADE IT CHARLES! LOVE AND BEST WISHES FROM THE WHOLE TEAM!##Upon entry to the SARGASSO SECTOR we sustained heavy damage and will likely never return back to earth. At this point I’m instructed to tell you:##OH GOD, I HOPE YOU NEVER HAVE TO READ THIS CHARLES. BUT IF YOU DO, I NEED TO TELL YOU TWO [ERROR: data corrupted] IF THAT WORKS YOU SHOULD STILL BE ABLE TO MAKE IT HOME. REMEMBER, YOU PROMISED TO COME BACK TO ME.##You should try to leave the Saragossa Sector in order to [not die alone in space]. First you must travel to the next planet on your sector map, from there we can gather additional sensor data and find a safe path to continue on.##Soon I will display the current sector map. Use the controls modules to the left to create a Promise Engine Path (i.e. 'P.E.P.', an upbeat fun way to [not die alone in space]) that will get our satellite from this planet to the next. To do that you must drag an IGNITION promise block into the P.E.P., followed by two THEN method blocks with a MOVEMENT promise return block in the FIRST argument slot of each.##The functions in each THEN method will only activate once the previous promise has RESOLVED (i.e. has finished). Only the first MOVEMENT promise will activate in each THEN method right now. This is because all current promises are guaranteed to RESOLVE to FULFILLED (i.e. finish in a good way).##That should be enough information. Remember, if you need more help just say my name!##PRESS THE 'S' KEY TO BEGIN",
  "Congratulations on [not dying alone in space] yet! I have been able to analyze a new section of the SARGASSO SECTOR. Unfortunately there is a substantial amount of SARGASSO CLOUDS in the way. On your map they will look like SARGASSO CLOUDS. DO NOT TRY TO FLY THROUGH THEM. If you do you will lose power and [drift into the infinite abyss].##Fortunately there is a stable wormhole connecting us to a section of clear space near the next planet. When you move into a wormhole, the MOVEMENT promise will not resolve until you reach the other side. Once you have reached the other side of the wormhole the next THEN method will automatically activate.##Also, in case you have not noticed, I have recovered a copy of your SONG SIPHON data. Listening to the recordings from the Charles-Fort artistic thought extractor may help you recover from your temporary [permanent and irreparable memory loss].## Good luck!##PRESS THE 'S' KEY TO START",
  "I've noticed you haven't had any questions for me. Remember, if you need any additional information just say my name, [ERROR: data corrupted], and then ask a question.##Have you listened to the SONG SIPHON? Some circuits have been damaged and I can not tell. If you have, I have been instructed to tell you:##I KNOW WE SAID WE WOULDN'T SEND TRANSMISSIONS DIRECTLY TO EACH OTHER, BUT I DON'T THINK I'LL BE ABLE TO HELP IT. I LOVE [ERROR: data corrupted] HOME.##That sounds nice, I wonder who it's from. Do you think you will see them again if you manage to get back to earth and [not die alone in space]. I hope so.##The next section of the SARGASSO SECTOR is covered in SARGASSO CLOUDS. The only way across is an unstable wormhole. Unstable wormholes may take you to either a SUCCESS or a FAILURE destination. If a wormhole fails and drops you in the fail destination then the MOVEMENT promise that took you into that wormhole will throw an ERROR.##Prepare for either scenario by using BOTH of a THEN methods FUNCTION slots. Remember, the first slot will activate if the MOVEMENT promise from the previous METHOD was FULFILLED (i.e. succeeded or finished in a good way) and the second slot will activate if the MOVEMENT promise from the previous METHOD was REJECTED (i.e. threw an error or finished in another bad way).##If you misconstruct your Promise Engine Path you will [drift off into space and die].##PRESS THE 'S' KEY TO START",
  "I have been cataloging data degradation after the turbulent entry to the SARGASSO SECTOR and found something I think you will find interesting.##CHARLES, ITS ADA. I'M UNSURE HOW RELIABLE THE SONG SIPHON WILL BE FOR COMMUNICATION SO I'VE DECIDED TO LEAVE THESE NOTES WITH YOUR SHIPBOARD A.I. IT'S STRANGE LETTING EVERYONE BELIVE YOU WILL NEVER COME BACK, BUT I DON'T DARE TELL THEM ABOUT OUR WORK ON THE TRANSPORTER. I HAVE NO DOUBT ITS EXPOSURE AT THIS POINT WOULD BE DISASTROUS. I CAN'T WAIT TO SEE YOU AGAIN. I KNOW I'LL BE LOST WITHOUT YOU.##It appears from the mission logs that Ada must refer to Ada Lovelace, the original cosmologist who proposed this mission, and also my chief programer. But I can not find any records of a personal relationship between the her, our chief researcher, and you, our craft captain. Odd. Is that who you are hopping to get back to on earth?##Anyway, time seems less pressing at the moment so I thought I'd explain a bit more about the Promise Engine Path system (since you seem so averse to asking questions of me).##The propulsion and engineering systems work be means of [ERROR: data corrupted] over how the control modules work.##The IGNITION and each MOVEMENT module construct and return a promise. This is useful for two reasons.##1) It accounts for the fact that, due to wormholes and high speed time dilations, it is impossible to predict when a particular destination will be reached in the SARGASSO SECTOR. You must be entirely sure that you have finished moving forward before you begin to move left, or you could [slam into the side of a wormhole and ripped apart atom by atom for eternity]. The Promise Engine ensures that the next movement will not be taken until the previous one completes.##2) The primary control system is responsible for all life support and environmental regulation systems. But it is also single threaded (i.e. it can only evaluate a single command at a time). The Promise Engine allows the control system to begin and respond to movement commands without stoping life support functions. This allows you you to navigate the SARGASSO SECTOR without [asphyxiating in a freezing cold vacuum].##I hope that was helpful. The next sector is fairly chaotic. Try to make use of the CATCH methods. Functions in a CATCH method, like the SECOND function in a THEN block, will only activate if there is an uncaught ERROR in one of the previous MOVEMENT promises.##PRESS THE 'S' KEY TO START"
];

function levelWon() {
  let textboxPromise = new Promise((resolve, reject) => {
    console.log('in text promise');
    $('#textbox').empty();
    appendToTextbox("####**************************##* CONGRATULATIONS YOU WON *##**************************", resolve);
  });

  textboxPromise.then(function() {
    console.log('in first then');

    heightPromise = new Promise((resolve, reject) => {
      console.log('in height promise');
      changeTextboxHeight(660, resolve);
    });

    return heightPromise;
  }).then(function() {
    console.log('in second then');
    $('#textbox').empty();
    $('#solution').empty();
    if (instructions[level + 1]) {
      level += 1;
      gamestate = 'instructions';
      giveInstructions(instructions[level])
    } else {
      appendToTextbox(endgameText);
    }
  });
}

function levelEnd() {
  if (won) {
    console.log('YOU HAVE WON THE LEVEL');
    gamestate = 'won';
    levelWon();
  } else {
    console.log('YOU HAVE LOST THE LEVEL');
    gamestate = 'lost';
    let lostText = "##It seems you have [died alone in space]. But I belive I can reverse causality back to the last planet if you would like to try again.##PLEASE THE 'S' KEY TO TRY AGAIN";
    giveInstructions(lostText);
  }
}
