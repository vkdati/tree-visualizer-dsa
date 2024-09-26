from logic.binary_tree import BinaryTree

class TreeManager:
    def __init__(self) :
        self.tree = BinaryTree()

    def add_node(self,value):
        self.tree.insert(value)
    def delete_node(self,value):
        self.tree.delete(value)