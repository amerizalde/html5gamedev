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

    // make 3 spheres
    var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
    var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);

    // arrange the spheres
    sphere1.position.x = -40;
    sphere2.position.x = -30;

    // make 3 materials
    var materialSphere1 = new BABYLON.StandardMaterial("tex1", scene);
    var materialSphere2 = new BABYLON.StandardMaterial("tex2", scene);
    var materialSphere3 = new BABYLON.StandardMaterial("tex3", scene);

    // apply the materials
    sphere1.material = materialSphere1;
    sphere2.material = materialSphere2;
    sphere3.material = materialSphere3;

    // alternative assignment
    // sphere1.material = new BABYLON.StandardMaterial("tex1", scene);

    // add an alpha to the materials
    materialSphere1.alpha = 0.5;
    materialSphere2.alpha = 0.8;
    materialSphere3.alpha = 1.0;

    // WORKAROUND FOR LOADING IMAGES DURING LOCAL DEV
    // https://github.com/cesanta/mongoose

    // add textures to the materials
    // params = path to image, scene
    materialSphere1.diffuseTexture = new BABYLON.Texture("images/textures/01.jpg", scene);
    materialSphere2.diffuseTexture = new BABYLON.Texture("images/textures/02.jpg", scene);
    materialSphere3.diffuseTexture = new BABYLON.Texture("images/textures/03.jpg", scene);

    // set u, v scales
    materialSphere1.diffuseTexture.uScale = 5.0;
    materialSphere1.diffuseTexture.vScale = 5.0;

    materialSphere1.diffuseTexture.uScale = 2.0;
    materialSphere1.diffuseTexture.vScale = 2.0;

    materialSphere1.diffuseTexture.uScale = 1.0;
    materialSphere1.diffuseTexture.vScale = 1.0;

    // materialSphere1.diffuseTexture.hasAlpha = true;

    // materialSphere1.wireframe = true;

    return scene;
}
