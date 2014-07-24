window.onload = function(){
    var canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()){
        window.alert("Browser is not supported!");
    } else {
        // Load Babylon 3D engine, passing in the canvas
        var engine = new BABYLON.Engine(canvas, true);

        // Scene creation is defined in sceneTut.js
        var scene = createSceneTut(engine);

        // Attach the camera to the scene
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize event
        window.addEventListener("resize", function() {
            engine.resize();
        });
    }
};
