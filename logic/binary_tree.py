class Node:
    def __init__(self,value):
        self.value = value
        self.left = None
        self.right = None
class BinaryTree:
    def __init__(self):
        self.root = None
    def insert(self,value):
        if self.root is None:
            self.root = Node(value)
        else:
            self.recursive_insert(value,self.root)
    def recursive_insert(self,value,node):
        if node is None:
            return Node(value)
        else:
            if value<node.value:
               node.left =  self.recursive_insert(value,node.left)
            if value> node.value:
                node.right = self.recursive_insert(value,node.right)
        return node
    
    def delete(self,key,node):
        if node is None:
            return node
        if key<node.value:
            node.left = self.delete(key, node.left)
        elif key>node.value:
            node.right - self.delete(key,node.right)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            temp = self.min_node(node.right)
            node.value = temp.value
            node.right = self.delete(temp.value,node.right)
        return node
   
    def min_node(self,node):
        current = node
        while current.left is not None:
            current = current.left
        return current
   
    def inorder_print(self,node):
        if node is None:
            return
        self.inorder_print(node.left)
        print(node.value,end = " ")
        self.inorder_print(node.right)

        

if __name__=="__main__":
    tree = BinaryTree()
    tree.insert(10)
    tree.insert(15)
    tree.insert(5)  #testing code
    assert tree.root.value == 10
    assert tree.root.left.value == 5
    assert tree.root.right.value == 15
    tree.inorder_print(tree.root)
    print("Insert test passed!")

