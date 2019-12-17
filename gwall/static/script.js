var socket = io.connect("http://" + document.domain + ":" + location.port);
socket.on("connect", function() {
	console.log("Connected!");
	socket.emit("imagepls");
})

var canvas = document.getElementById("wall_canvas");
var app = new PIXI.Application({
	width: 1000,
	height: 600,
	view: canvas
	});

var wallsprite = new PIXI.Sprite();
app.stage.addChild(wallsprite);

socket.on("fullimage", function(data) {
	//console.log(data);
	//console.log(data.strimg);
	let img = new Image();
	img.src = "data:image/png;base64," + data.strimg;
	let base = new PIXI.BaseTexture(img);
	let texture = new PIXI.Texture(base);
	wallsprite.texture = texture;
})


var held = false;
var mousePoints = [];
function addPoint(event) {
	mousePoints.push({
		x: event.data.global.x,
		y: event.data.global.y
		});
}


app.renderer.plugins.interaction.on("pointerdown", onClick);
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
