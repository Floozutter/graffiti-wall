from gwall import socketio
from gwall import wall


@socketio.on("connect")
def welcome():
    print("Hello there, newcomer!")

@socketio.on("imagepls")
def sendimage():
    print("Sending the image!")
    data = {"strimg" : wall.stringify()}
    socketio.emit("fullimage", data)

@socketio.on("edit")
def getedit(json):
    print("Getting an edit!")
    wall.update(json)
    print("Returning updated image!")
    data = {"strimg" : wall.stringify()}
    socketio.emit("fullimage", data)
    if wall.seconds_since_save() >= 300:
        print("Saving!")
        wall.save("./gwall/snapshots/")

@socketio.on("erase")
def getedit():
    print("Erasing it all!")
    wall.save("./gwall/snapshots/")
    wall.reset()
    data = {"strimg" : wall.stringify()}
    socketio.emit("fullimage", data)
