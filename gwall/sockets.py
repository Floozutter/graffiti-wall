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
