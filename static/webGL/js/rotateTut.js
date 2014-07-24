function createSceneTut(engine) {
    // creation of the scene
    var scene = new BABYLON.Scene(engine);

    // Adding a light to the scene
    var light = new BABYLON.PointLight("Omni",
        new BABYLON.Vector3(0, 100, 100),
        scene);

    // Adding of the Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera",
        0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);

    // END OF BASIC SETUP

    // params == name, size, scene
    var box1 = BABYLON.Mesh.CreateBox("Box1", 6.0, scene);
    var box2 = BABYLON.Mesh.CreateBox("Box2", 6.0, scene);
    var box3 = BABYLON.Mesh.CreateBox("Box3", 6.0, scene);

    

    // arrange the primitives
    box1.position = new BABYLON.Vector3(-20, 0, 0); // one way to position an object
    box2.position.x = -10; // another way to position an object
    box3.position.x = 0;
    
    // rotate the boxes
    box1.rotation.x = Math.PI / 4; // or box1.rotation = new BABYLON.Vector3(Math.PI / 4, 0, 0);
    box2.rotation.y = Math.PI / 6;

    // scale the boxes
    box3.scaling.x = 2;

    // moving an object in relation to another object's position
    box3.parent = box1;
    box3.position.z = -10;

    return scene;
}
