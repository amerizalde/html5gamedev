// globals
var ship;
var gameWorld;

document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
    gameWorld = new BABYLON.GameFX.GameWorld("gameContainer");

    var startShipPos = new BABYLON.Vector3(0, 0, 100);
    var startShipScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
    var startShipRot = new BABYLON.Vector3(0, 0, 0);

    ship = new BABYLON.GameFX.GameEntity3D(
        "Vaisseau",
        "assets/davrous/",
        "OmegaCrusher.babylon",
        startShipPos, startShipRot, startShipScale,
        false,      // template or singleton
        gameWorld);

    // add to asset manager
    gameWorld.assetsManager.push(ship);

    // on load completion, run callback func 'startGame'
    gameWorld.assetsManager.loadAllEntitiesAsync(startGame);
}

function startGame() {
    // add a basic key config for the player
    keyboardConfig();

    // set borders based on a defined z-depth
    var zdepth = 150;
    var borders = gameWorld.getVirtual2DWindowOnZ(zdepth);
    gameWorld.Keyboard.setMinMaxX(borders.top.x, borders.bottom.x);
    gameWorld.Keyboard.setMinMaxY(borders.top.y, borders.bottom.y);

    // start the game loop
    gameWorld.startGameLoop();
    // remove loading screen
    gameWorld.dashboard.endLoading();
}

function keyboardConfig() {
    // add a basic key config for the player
    gameWorld.addKeyboard().connectTo(ship);

    /*
    OPTIONAL CONFIG FUNCTIONS
    *************************
    */
    // ** change the UP/DOWN keys
    // gameWorld.Keyboard.setAxisForUD("AXIS"); ['X', 'Y', 'Z']
    // ** change the LEFT/RIGHT keys
    // gameWorld.Keyboard.setAxisForLR("AXIS");
    // ** invert the UP/DOWN keys
    // gameWorld.Keyboard.reverseUpDown = true;
    // ** invert the LEFT/RIGHT keys
    // gameWorld.Keyboard.reverseLeftRight = true;
    // ** map to Q, Z, D, S in AZERTY.
    // gameWorld.Keyboard.setBasicKeysCodes(81, 90, 68, 83);

    /*
    MODIFYING KEY BEHAVIORS
    ***********************
    */
    /*
    gameWorld.KeyBoard.setKeysBehaviors([{
        key: "left",
        associateBehavior: function () {
            console.log("myCustomLogicForLeft");
        },
        // false overrides the default logic,
        // true appends to it. 
        addLogic: false,
    }]);
    */
}
