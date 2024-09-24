import sys
from PyQt6.QtWidgets import QApplication, QMainWindow

class MainWindow(QMainWindow):
    def init(self):
        super.__init__()
        self.setWindowTitle("TreeVis")
        self.setGeometry(0,0,800,1900)


