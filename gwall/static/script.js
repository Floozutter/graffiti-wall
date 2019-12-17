var socket = io.connect("http://" + document.domain + ":" + location.port);
socket.on("connect", function() {
	console.log("Connected!");
	socket.emit("imagepls");
});


var colorpicker = document.getElementById("colorpicker");
var color = parseInt(colorpicker.value.slice(1), 16);

colorpicker.addEventListener("input", function () {
	color = parseInt(colorpicker.value.slice(1), 16);
}, false);


var canvas = document.getElementById("wall_canvas");
var app = new PIXI.Application({
	width: 1000,
	height: 600,
	view: canvas,
	transparent: true
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
	app.renderer.render(app.stage);
});



var graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

var drawPoints = [];
function addPoint(event) {
	drawPoints.push({
		x: event.data.global.x,
		y: event.data.global.y
	});
}

function drawLines() {
	graphics.clear();
	graphics.lineStyle(6, color);
	if (drawPoints.length == 0) {
		return;
	}
	let first = drawPoints[0];
	graphics.moveTo(first.x, first.y);
	for (const point of drawPoints) {
		//console.log(point.x, point.y);
		graphics.lineTo(point.x, point.y);
	}
}

function freezeDraw() {
	//console.log("Freezing to emit!");
	wallsprite.visible = false;
	app.renderer.render(app.stage);
	socket.emit("edit", {strimg: canvas.toDataURL()});
	wallsprite.visible = true;
	app.renderer.render(app.stage);
	//console.log("Froze!");
}


var held = false;

app.renderer.plugins.interaction.on("pointerdown", onClick);
function onClick(event) {
	held = true;
	drawPoints = [];
	addPoint(event);
}

app.renderer.plugins.interaction.on("pointerup", onRelease);
app.renderer.plugins.interaction.on("mouseout", onRelease);
function onRelease(event) {
	held = false;
	freezeDraw();
}


app.renderer.plugins.interaction.on("pointermove", onMove);
function onMove(event) {
	if (held) {
		addPoint(event);
		drawLines();
		app.renderer.render(app.stage);
	}
}

document.addEventListener("keydown", onKeyDown);
var vis = true;
function onKeyDown(key) {
	if (key.keyCode == 87) {
		if (vis) {
			vis = false;
			drawsprite.visible = false;
		} else {
			vis = true;
			drawsprite.visible = true;
		}
	}
}

function erase() {
	drawPoints = [];
	drawLines();
	app.renderer.render(app.stage);
	socket.emit("erase");
}

