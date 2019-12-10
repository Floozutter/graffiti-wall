from gwall import socketio
from gwall import wall

@socketio.on("fullimage", namespace="/wall")
def handle_canvas(message):
    pass
