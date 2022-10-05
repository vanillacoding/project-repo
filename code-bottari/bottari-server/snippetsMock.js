const dummyjson = require("dummy-json");

const template = `{
  "snippetList": [
    {{#repeat 100}}
    {
      "creator": {{random "6134a39c51aec8f0e02b4dd6" "6134a3da2d4a1880d511628c" "6134a3e0c9749d9f43310090" "6134a3e8d1de2bfd9db69b7b" "6134a3ef4d8c8a3c9b7cebac" "6134a3f54e55aa479203d21a" "6134a3fc56b652d773fde9ed" "6134a4033d99de4742b40f9b" "6134a40ad1972f7d1bce4a99" "6134a410ad85b89a59c88d51" "6134a4165b1e8133b2730c31" "6134a41e5fff65911f44aa19" "6134a4256eaed3a4b530f69f" "6134a42b0d4f29ae16a1c3da" "6134a42b0d4f29ae16a1c3da"}},
      "poster": {{random "6134a39c51aec8f0e02b4dd6" "6134a3da2d4a1880d511628c" "6134a3e0c9749d9f43310090" "6134a3e8d1de2bfd9db69b7b" "6134a3ef4d8c8a3c9b7cebac" "6134a3f54e55aa479203d21a" "6134a3fc56b652d773fde9ed" "6134a4033d99de4742b40f9b" "6134a40ad1972f7d1bce4a99" "6134a410ad85b89a59c88d51" "6134a4165b1e8133b2730c31" "6134a41e5fff65911f44aa19" "6134a4256eaed3a4b530f69f" "6134a42b0d4f29ae16a1c3da" "6134a42b0d4f29ae16a1c3da"}},
      "commentList": [
        {
          "creator": {{random "6134a39c51aec8f0e02b4dd6" "6134a3da2d4a1880d511628c" "6134a3e0c9749d9f43310090" "6134a3e8d1de2bfd9db69b7b" "6134a3ef4d8c8a3c9b7cebac" "6134a3f54e55aa479203d21a" "6134a3fc56b652d773fde9ed" "6134a4033d99de4742b40f9b" "6134a40ad1972f7d1bce4a99" "6134a410ad85b89a59c88d51" "6134a4165b1e8133b2730c31" "6134a41e5fff65911f44aa19" "6134a4256eaed3a4b530f69f" "6134a42b0d4f29ae16a1c3da" "6134a42b0d4f29ae16a1c3da"}},
          "content": {{lorem min=3 max=5}},
          "createdAt": {{date "2019" "2021"}}
        }
      ],
      "createdAt": {{date "2019" "2021"}},
      "language": {{random "Python" "Java" "JavaScript" "C#" "C/C++" "PHP" "R" "Objective-C"}},
      "code": {{random "print('Hello World')" "int var1 = 1004;" "const foo = function () {return 'Hello World';};" "int number = 5;" "$var = 'Hello World';" "x <- 100"}},
      "likerList": [
        {{#repeat min=0 max=15}}
        {{random "6134a39c51aec8f0e02b4dd6" "6134a3da2d4a1880d511628c" "6134a3e0c9749d9f43310090" "6134a3e8d1de2bfd9db69b7b" "6134a3ef4d8c8a3c9b7cebac" "6134a3f54e55aa479203d21a" "6134a3fc56b652d773fde9ed" "6134a4033d99de4742b40f9b" "6134a40ad1972f7d1bce4a99" "6134a410ad85b89a59c88d51" "6134a4165b1e8133b2730c31" "6134a41e5fff65911f44aa19" "6134a4256eaed3a4b530f69f" "6134a42b0d4f29ae16a1c3da" "6134a42b0d4f29ae16a1c3da"}}
        {{/repeat}}
      ],
      "hashtagList": [
        {{#repeat min=1 max=10}}
        {{random "#MergeSort" "#Merge" "#MergeSorting" "#Greedy" "#Algorithm" "#HashTable" "#LinkedList" "#DataStructure" "#Tree" "#BinaryTree" "#BST" "#String" "#Array" "#Object" "#Memoization" "#Queue" "#Stack" "#HashFunction" "#BinaryIndexedTree"}}
        {{/repeat}}
      ]
    }
    {{/repeat}}
  ]
}`;

const mock = dummyjson.parse(template);

const getSnippetsMock = () => mock;

module.exports = getSnippetsMock;
