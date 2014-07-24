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
    var box = BABYLON.Mesh.CreateBox("Box", 6.0, scene);

    // params == name, # of segments, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("Sphere",
        10.0, 10.0, scene);

    // params == name, size, scene
    var plane = BABYLON.Mesh.CreatePlane("Plane", 50.0, scene);
    
    // params == name, height, diameterTop, diameterBot, tessellation, scene, updatable
    var cylinder = BABYLON.Mesh.CreateCylinder("Cylinder",
        3, 3, 3, 6, scene, false);

    // params = name, diameter, thickness, tesselation, scene, updatable
    var torus = BABYLON.Mesh.CreateTorus("Torus",
        5, 1, 10, scene, false);

    // arrange the primitives
    box.position = new BABYLON.Vector3(-10, 0, 0);
    sphere.position = new BABYLON.Vector3(-10, 30, 0);
    plane.position = new BABYLON.Vector3(30, 5, 0);
    cylinder.position = new BABYLON.Vector3(-30, 0, 5);
    torus.position = new BABYLON.Vector3(-10, 0, -30);

    return scene;
}
