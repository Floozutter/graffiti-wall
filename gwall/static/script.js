var canvas = document.getElementById("wall_canvas");
var app = new PIXI.Application({
	width: 1000,
	height: 600,
	view: canvas
	});

var held = false;
var mousePoints = [];
function addPoint(event) {
	mousePoints.push({
		x: event.data.global.x,
		y: event.data.global.y
		});
}


app.renderer.plugins.interaction.on('pointerdown', onClick);
function onClick(event) {
	held = true;
	addPoint(event);
}

app.renderer.plugins.interaction.on("pointerup", onRelease);
function onRelease(event) {
	held = false;
	console.log(mousePoints);
	mousePoints = [];
}

app.renderer.plugins.interaction.on("pointermove", onMove);
function onMove(event) {
	if (held) {
		addPoint(event);
	}
}
