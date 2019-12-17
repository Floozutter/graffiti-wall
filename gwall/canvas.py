from PIL import Image
from base64 import b64encode
from io import BytesIO
from datetime import datetime
from os import walk


class Canvas:
    def __init__(self):
        self.img = Image.new(
                mode="RGB",
                size=(1000, 600),
                color=(255, 255, 255)
                )
        self.lastsaved = datetime.now()
    def restore(self, dirpath):
        filenames = []
        for _, _, files in walk(dirpath):
            filenames.extend(files)
            break
        if not filenames:
            return
        print("Restoring from:", dirpath + max(filenames))
        self.img = Image.open(dirpath + max(filenames))
    def save(self, dirpath):
        title = datetime.now().isoformat(" ").replace(":", ".")
        self.img.save(dirpath + title + ".png", "PNG")
        self.lastsaved = datetime.now()
    def seconds_since_save(self):
        return (datetime.now() - self.lastsaved).total_seconds()
    def stringify(self):
        buffer = BytesIO()
        self.img.save(buffer, format="PNG")
        imgstr = str(b64encode(buffer.getvalue()))[2:-1]
        return imgstr
    def update(json):
        pass
