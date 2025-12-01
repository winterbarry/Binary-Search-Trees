// 1
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// 2
class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    insert(value) {
        this.root = insertNode(this.root, value);
    }

    deleteItem(value) {
        this.root = deleteNode(this.root, value);
    }

    find(value) {
        return findNode(this.root, value);
    }

    height(value) {
        const node = this.find(value);
        if (node === null) return null; // value not found
        return nodeHeight(node);
    }

    depth(value) {
        return nodeDepth(this.root, value);
    }

}

// 3
function buildTree(array) {
    // sort and remove duplicates
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    console.log("Sorted unique array:", sortedArray);

    // build tree recursively
    function buildBalancedTree(arr, depth = 0) {
        if (arr.length === 0) return null; // base case
        const indent = "  ".repeat(depth); // visual indentation

        // find middle value of array
        const middleIndex = Math.floor(arr.length / 2);
        const rootValue = arr[middleIndex];

        const root = new Node(rootValue); // create root node object using middle value

        root.left = buildBalancedTree(arr.slice(0, middleIndex), depth + 1);
        root.right = buildBalancedTree(arr.slice(middleIndex + 1), depth + 1);

        return root;
    }

    return buildBalancedTree(sortedArray);
}

// 4
function insertNode(node, value) {
    if (node === null) {
        console.log(`Inserting new node: ${value}`);
        return new Node(value);
    }

    if (value < node.data) {
        console.log(`Going LEFT from ${node.data}`);
        node.left = insertNode(node.left, value);
    } else if (value > node.data) {
        console.log(`Going RIGHT from ${node.data}`);
        node.right = insertNode(node.right, value);
    } else {
        console.log(`Value ${value} already exists — skipping`);
    }

    return node;
}

// 5
function deleteNode(node, value) {
    if (node === null) return null; // base case: value not found

    // traverse to find node
    if (value < node.data) {
        node.left = deleteNode(node.left, value);
    } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
    } else {
        // if no children
        if (node.left === null && node.right === null) {
            return null;
        }

        // if one one child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        // if two children
        let successor = node.right;
        while (successor.left !== null) {
            successor = successor.left;
        }

        node.data = successor.data;

        node.right = deleteNode(node.right, successor.data);

        return node;
    }

    return node;
}

// 6
function findNode(node, value) {
    if (node === null) return null; // value not found

    if (value === node.data) {
        return node; 
    }

    if (value < node.data) {
        return findNode(node.left, value); // search left
    }

    if (value > node.data) {
        return findNode(node.right, value); // search left
    }

    return null;
}

// 7

// 8

// 9
function nodeHeight(node) {
    if (node === null) return -1; 

    const leftHeight = nodeHeight(node.left);
    const rightHeight = nodeHeight(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
}

// 10
function nodeDepth(node, value, depth = 0) {
    if (node === null) return null; 

    if (value === node.data) {
        return depth; 
    }

    if (value < node.data) {
        return nodeDepth(node.left, value, depth + 1);
    } else {
        return nodeDepth(node.right, value, depth + 1);
    }
}

const tree = new Tree([2, 1, 4, 3, 6, 5, 7, 7, 7]);
console.log("\n Final BST Root:", tree.root);

tree.insert(9);
console.log("\n New Tree:", tree.root);

tree.deleteItem(1);
console.log("\nAfter deletion:", tree.root);

const found = tree.find(6);
console.log(found); 

console.log("Height of 7:", tree.height(7));

console.log(tree.depth(7)); 