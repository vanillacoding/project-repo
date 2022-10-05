interface Area {
  name: string;
  pointX: number;
  pointY: number;
}

const hitArea: Area[] = [
  {
    name: "strawberry-1",
    pointX: 235,
    pointY: 255,
  },
  {
    name: "strawberry-2",
    pointX: 235,
    pointY: 367,
  },
  {
    name: "strawberry-3",
    pointX: 235,
    pointY: 480,
  },
  {
    name: "kiwi-1",
    pointX: 460,
    pointY: 255,
  },
  {
    name: "kiwi-2",
    pointX: 460,
    pointY: 367,
  },
  {
    name: "kiwi-3",
    pointX: 460,
    pointY: 480,
  },
  {
    name: "orange-1",
    pointX: 347,
    pointY: 255,
  },
  {
    name: "orange-2",
    pointX: 347,
    pointY: 367,
  },
  {
    name: "orange-3",
    pointX: 347,
    pointY: 480,
  },
];

export default hitArea;
