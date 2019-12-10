from PIL import Image
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
            f.extend(filenames)
            break
        if not filenames:
            return
        self.img = Image.open(dirpath + max(filenames))
    def save(self, dirpath):
        title = datetime.now().isoformat(" ").replace(":", ".")
        self.img.save(dirpath + title + ".png", "PNG")
        self.lastsaved = datetime.now()
    def seconds_since_save():
        return (datetime.now() - self.lastsaved).total_seconds()
    def stringify():
        pass
