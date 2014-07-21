
var TOAD_MODEL;
var ENDINGS = [];
var ENEMIES = [];

function setupScene(engine) {
    // create scene
    var scene = new BABYLON.Scene(engine);
    // pass the scene to the setup functions
    setupLights(scene);
    setupCameras(scene);
    addLanes(scene, scene.activeCamera);
    //return the complete scene
    return scene;
}

function setupLights(scene) {
    // add light
    var light = new BABYLON.DirectionalLight(
        "Hemi",
        new BABYLON.Vector3(0, -1, 0),
        scene);
    var white = new BABYLON.Color3(1, 1, 1);
    var nearBlack = new BABYLON.Color3(.01, .01, .01);
    light.diffuse = white;
    light.groundColor = white;
    light.specular = white;
}

function setupCameras(scene) {
    // add camera
    var camera = new BABYLON.FreeCamera(
        "Camera",
        new BABYLON.Vector3(0, 4, -10),
        scene);
    camera.setTarget(new BABYLON.Vector3(0, 0, 10));
}

function addPrimitives(scene) {
    var box = BABYLON.Mesh.CreateBox("Box", 6.0, scene);
    var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10.0, 3.0, scene);
    var plane = BABYLON.Mesh.CreatePlane("Plane", 50.0, scene);
    var cylinder = BABYLON.Mesh.CreateCylinder(
        "cylinder", 3, 3, 3, 6, scene, false);
    var torus = BABYLON.Mesh.CreateTorus(
        "torus", 5, 1, 10, scene, false);

    box.position.x = -10;
    plane.rotation.y = 180;
    plane.position.z = -20;
}

function axis(scene, size) {
    //X axis
    var x = BABYLON.Mesh.CreateCylinder("x", size, 0.1, 0.1, 6, scene, false);
    x.material = new BABYLON.StandardMaterial("xColor", scene);
    x.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    x.position = new BABYLON.Vector3(size/2, 0, 0);
    x.rotation.z = Math.PI / 2;

    //Y axis
    var y = BABYLON.Mesh.CreateCylinder("y", size, 0.1, 0.1, 6, scene, false);
    y.material = new BABYLON.StandardMaterial("yColor", scene);
    y.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
    y.position = new BABYLON.Vector3(0, size / 2, 0);

    //Z axis
    var z = BABYLON.Mesh.CreateCylinder("z", size, 0.1, 0.1, 6, scene, false);
    z.material = new BABYLON.StandardMaterial("zColor", scene);
    z.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
    z.position = new BABYLON.Vector3(0, 0, size/2);
    z.rotation.x = Math.PI / 2;
};

function addLanes(scene, camera) {
    var LANES = 3;
    var LANE_INTERVAL = 5;
    var LANE_POSITIONS = [];

    var createLane = function (id, pos) {
        var lane = BABYLON.Mesh.CreateBox("lane" + id, 1, scene);
        lane.scaling.y = 0.1;
        lane.scaling.x = 3.0;
        lane.scaling.z = 800;
        lane.position.x = pos;
        lane.position.z = lane.scaling.z / 2 - 200;

        var ground = new BABYLON.StandardMaterial("ground", scene);
        var texture = new BABYLON.Texture("assets/toadAttack/ground.jpg", scene);
        texture.uScale = 40;
        texture.vScale = 2;
        ground.diffuseTexture = texture;

        lane.material = ground;
    };
    var createEnding = function(id, pos) {
        var ending = BABYLON.Mesh.CreateGround(id, 3, 4, 1, scene);
        ending.position.x = pos;
        ending.position.y = 0.1;
        ending.position.z = 1.0;

        var mat = new BABYLON.StandardMaterial("endingMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
        ending.material = mat;
        return ending;
    };

    var currentLanePosition = LANE_INTERVAL * -1 * (LANES / 2);
    for (var i = 0; i < LANES; i++) {
        LANE_POSITIONS[i] = currentLanePosition;
        createLane(i, currentLanePosition);
        var e = createEnding(i, currentLanePosition);
        ENDINGS.push(e);
        currentLanePosition += LANE_INTERVAL;
    }

    camera.position.x = LANE_POSITIONS[Math.floor(LANES / 2)];

    // import a .babylon model file
    BABYLON.SceneLoader.ImportMesh(
        "red_toad",                     // key
        "assets/toadAttack/",           // path
        "toad.babylon",                 // file
        scene,
        function (meshes) {
            var m = meshes[0];
            m.position = new BABYLON.Vector3(0, 2, 0);
            m.rotation.y = 90;
            m.isVisible = true;
            m.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            TOAD_MODEL = m;
        }
    );

    var createEnemy = function () {
        // starting position of toads
        var pos_z = 100;

        // random lane
        var pos_x = LANE_POSITIONS[Math.floor(Math.random() * LANES)];

        // create a clone of the template
        var shroom = TOAD_MODEL.clone(TOAD_MODEL.name);
        shroom.id = TOAD_MODEL.name + (ENEMIES.length + 1);
        shroom.killed = false;
        shroom.visible = true;
        shroom.position = new BABYLON.Vector3(
            pos_x,
            shroom.position.y / 2,
            pos_z);
        ENEMIES.push(shroom);
    };

    setInterval(createEnemy, 1000);
}

function gameUpdate() {
    ENEMIES.forEach(function (shroom) {
        if (shroom.killed) {
            // nothing
        } else {
            shroom.position.z -= 0.5;
            shroom.rotation.y += 0.1;
        }
    });
}
