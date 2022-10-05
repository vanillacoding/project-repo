import bathroomItems from "./bathroom";
import bedroomItems from "./bedroom";
import catroomItems from "./catroom";
import kitchenItems from "./kitchen";
import livingroomItems from "./livingroom";

const ROOMS = {
  livingroom: {
    items: livingroomItems,
    leftButton: {
      path: "/game/room/kitchen",
      text: "부엌"
    },
    rightButton: {
      path: "/game/room/bedroom",
      text: "방"
    },
    description: "옅은 아이보리 색 바탕에 좌측 상단에는 액자 세 개가 걸려있다. 그 밑에 빨간색 소파와 가로 줄무늬 카페트 위에 테이블이 있고, 테이블 위에는 편지가 놓여져있다. 소파 우측에는 빨간색 산세베리아와 주황색의 현관문이 있다."
  },
  kitchen: {
    items: kitchenItems,
    leftButton: null,
    rightButton: {
      path: "/game/room/livingroom",
      text: "거실"
    },
    description: "연한 하늘색 바탕에 좌측에는 파란색 냉장고가 있다. 그 옆에 그릇이 있는 싱크대와 카운터가 있고, 카운터에는 노란색 도마와 칼이 있다. 부엌에 달려 있는 창문은 커텐이 반쯤 닫혀있다. 좌측 바닥에는 소용돌이 모양의 카펫이 있고, 그 옆에 부엌 공간의 절반 정도 차지하는 노란색 식탁이 있다. 식탁 위에는 하얀 접시 위에 담긴 샌드위치와 우유팩, 그리고 우유가 절반쯤 담긴 유리컵이 있다."
  },
  bedroom: {
    items: bedroomItems,
    leftButton: {
      path: "/game/room/livingroom",
      text: "거실"
    },
    rightButton: {
      path: "/game/room/catroom",
      text: "고양이방"
    },
    description: "연한 노란색 배경에 노란색 이불 위로 세로 줄무늬가 그려진 커다란 침대가 가운데에 놓여져있다. 좌측 상단에는 붉은 사각형과 영어, 숫자, 기호가 적혀져있는 포스터가 붙어있고 그 밑에는 퍼즐이 올려진 작은 원형 협탁이 있다. 침대 우측에는 검정색 스탠드와 숙제가 올려진 책상이 있다."
  },
  catroom: {
    items: catroomItems,
    leftButton: {
      path: "/game/room/bedroom",
      text: "방"
    },
    rightButton: {
      path: "/game/room/bathroom",
      text: "화장실"
    },
    description: "연한 에메랄드 빛 방에는 고양이 관련 물품이 있다. 좌측 정면에는 녹색 캣타워가 있고, 나머지 공간은 고양이 액자와 장난감이 놓여진 책꽂이가 있다. 바닥에는 생선 뼈가 그려진 작은 카펫과 고양이를 위한 낚싯대, 쥐 장난감이 있다. 캣타워 뒤에는 창문이 있다."
  },
  bathroom: {
    items: bathroomItems,
    leftButton: {
      path: "/game/room/catroom",
      text: "고양이방"
    },
    rightButton: null,
    description: "연한 하늘색 바탕에 가운데에는 둥근 거울과 세면대가 있다. 왼쪽에는 흰색 수건이 걸려있고, 그 밑에 하얀 욕조가 절반쯤 보인다. 오른쪽에는 노란색 수납장과 그 밑에는 변기가 놓여있다."
  }
};

export default ROOMS;
