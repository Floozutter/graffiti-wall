from flask import Flask, render_template
from flask_socketio import SocketIO

from gwall import canvas

app = Flask(__name__)
socketio = SocketIO(app)

app.secret_key = "uwu"
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


wall = canvas.Canvas()
wall.restore("./gwall/snapshots/")

from gwall import routes
from gwall import sockets
