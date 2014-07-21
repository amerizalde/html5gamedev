window.onload = function () {
	// the canvas
	var canvas = document.getElementById('gameContainer');

	if (!BABYLON.Engine.isSupported()) {
		window.alert('Browser not supported');
	} else {
		var engine = new BABYLON.Engine(canvas, true);

		// create scene
		scene = setupScene(engine);
		scene.activeCamera.attachControl(canvas);

		// Register a render loop
		engine.runRenderLoop(function () {
			scene.render();
			gameUpdate();
		});

		// on resize events
		window.addEventListener("resize", function () {
			engine.resize();
		});
	}
};
