// 1
class Node {
    constructor(data, left, right) {
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

    // traverse down to find the node
    if (value < node.data) {
        node.left = deleteNode(node.left, value);
    } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
    } else {
        // if current node has no children
        if (node.left === null && node.right === null) {
            console.log(`Deleting leaf node: ${node.data}`);
            return null;
        }
 
        // if current node has one child
        if (node.left === null) {
        console.log(`Deleting node ${node.data} with RIGHT child`);
        return node.right;
        }

        if (node.right === null) {
        console.log(`Deleting node ${node.data} with LEFT child`);

        return node.left;
        }

    }

    return node;
}

const tree = new Tree([2, 1, 4, 3, 6, 5, 7, 7, 7]);
console.log("\n Final BST Root:", tree.root);

tree.insert(9);
console.log("\n New Tree:", tree.root);

tree.deleteItem(1);
console.log("\nAfter deletion:", tree.root);