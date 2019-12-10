from gwall import socketio

@socketio.on("image", namespace="/wall")
def handle_canvas(message):
    pass
