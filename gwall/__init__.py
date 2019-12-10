from flask import Flask, render_template
from flask_socketio import SocketIO

from gwall import canvas

app = Flask(__name__)
socketio = SocketIO(app)

wall = canvas.Canvas()
wall.restore("snapshots/")

app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0

from gwall import routes
from gwall import sockets
