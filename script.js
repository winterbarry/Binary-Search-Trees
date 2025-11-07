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

        console.log(`${indent}Creating node with value: ${rootValue} (from ${arr})`);

        const root = new Node(rootValue); // create root node object using middle value

        console.log(`${indent}→ Building LEFT subtree from: [${arr.slice(0, middleIndex)}]`);
        root.left = buildBalancedTree(arr.slice(0, middleIndex), depth + 1);

        console.log(`${indent}→ Building RIGHT subtree from: [${arr.slice(middleIndex + 1)}]`);
        root.right = buildBalancedTree(arr.slice(middleIndex + 1), depth + 1);

        console.log(`${indent}Returning node: ${rootValue}`);
        return root;
    }

    return buildBalancedTree(sortedArray);
}

const tree = new Tree([2, 1, 4, 3, 6, 5, 7, 7, 7]);
console.log("\n✅ Final BST Root:", tree.root);