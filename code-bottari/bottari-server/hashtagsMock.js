const dummyjson = require("dummy-json");

const template = `{
  "hashtag": {
    "name": {{random "#MergeSort" "#Merge" "#MergeSorting" "#Greedy" "#Algorithm" "#HashTable" "#LinkedList" "#DataStructure" "#Tree" "#BinaryTree" "#BST" "#String" "#Array" "#Object" "#Memoization" "#Queue" "#Stack" "#HashFunction" "#BinaryIndexedTree" "#BinarySearch"}},
    "snippetList": [
      {{#repeat min=1 max=15}}
      {{random "6134d35c7dfb61ffc0e57703" "6134d382ab46ee45c90e2109" "6134d39266307bf4dc8965cc" "6134d3976e8e29ec85354d25" "6134d39bf456187a8ba70d6f" "6134d3a0078d1f98830f9600" "6134d3a490bfc60dfb7ffa97" "6134d3a80b2b48b24b5b7c6b" "6134d3ad9bcb1f77738285f8" "6134d3b19a5a022fa9098bd7" "6134d3b405a9d94cc6e5716f" "6134d3b8407437b396930078" "6134d3bd50a2d852e117fb8e" "6134d3c1f0328b7cb12a0928" "6134d3c43d76744c788b4e94"}}
      {{/repeat}}
    ]
  }
}`;

const mock = dummyjson.parse(template);

const getHashtagsMock = () => mock;

module.exports = getHashtagsMock;
