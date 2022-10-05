const dummyjson = require("dummy-json");

const template = `{
  "user": {
    "email": {{email}},
    "nickname": {{lastName}},
    "imageUrl": {{random "https://images.theconversation.com/files/72534/original/image-20150219-28209-ovexg7.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" "https://www.moviemiento.org/wp-content/uploads/2020/05/01_8O2A2532.jpg" "https://www.popsci.com/uploads/2019/03/18/WEPPVOVTYPHVPEIZBFVKVL4H5I.jpeg?width=785" "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbbc/bp-potato-or-potaNO-quiz.jpg" "https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/0/8a/08aefe0d-4411-581a-8a98-8b2d0e5d0409/604f7853e0d03.image.jpg"}},
    "notificationList": [
      {{#repeat min=0 max=10}}
      {
        "type": {{random "like" "subscribe" "snippet" "comment"}},
        "targetId": {{random "6134a39c51aec8f0e02b4dd6" "6134a3da2d4a1880d511628c" "6134a3e0c9749d9f43310090" "6134a3e8d1de2bfd9db69b7b" "6134a3ef4d8c8a3c9b7cebac" "6134a3f54e55aa479203d21a" "6134a3fc56b652d773fde9ed" "6134a4033d99de4742b40f9b" "6134a40ad1972f7d1bce4a99" "6134a410ad85b89a59c88d51" "6134a4165b1e8133b2730c31" "6134a41e5fff65911f44aa19" "6134a4256eaed3a4b530f69f" "6134a42b0d4f29ae16a1c3da" "6134a42b0d4f29ae16a1c3da"}},
        "isChecked": {{boolean}}
      }
      {{/repeat}}
    ],
    "subscriberList": [
      {{#repeat min=0 max=15}}
      {{random "6134a39c51aec8f0e02b4dd6" "6134a3da2d4a1880d511628c" "6134a3e0c9749d9f43310090" "6134a3e8d1de2bfd9db69b7b" "6134a3ef4d8c8a3c9b7cebac" "6134a3f54e55aa479203d21a" "6134a3fc56b652d773fde9ed" "6134a4033d99de4742b40f9b" "6134a40ad1972f7d1bce4a99" "6134a410ad85b89a59c88d51" "6134a4165b1e8133b2730c31" "6134a41e5fff65911f44aa19" "6134a4256eaed3a4b530f69f" "6134a42b0d4f29ae16a1c3da" "6134a42b0d4f29ae16a1c3da"}}
      {{/repeat}}
    ],
    "theme": {{random "Dracula" "Dark" "Monokai" "Red" "High Contrast" "Solarized Dark" "Monokai Dimmed" "Material Theme"}}
  }
}`;

const mock = dummyjson.parse(template);

const getUsersMock = () => mock;

module.exports = getUsersMock;
