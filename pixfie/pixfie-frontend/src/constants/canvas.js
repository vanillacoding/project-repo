export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 300;

export const optionThemes = [
  {
    name: 'face color',
    id: 'faceColor',
    type: 'color',
    options: [
      ['#FFDBAC', '#ee8862'],
      ['#F3B780', '#ee8862'], 
      ['#8D5524', '#30150e']
    ]
  },
  {
    name: 'eye color',
    id: 'eyeColor',
    type: 'color',
    options: [['#000'], ['#9E6B4A'], ['#6CA580'], ['#85ABCE']]
  },
  {
    name: 'hair',
    id: 'hair',
    type: 'draw',
    options: [[0], [1], [2]]
  },
  {
    name: 'clothes',
    id: 'clothes',
    type: 'draw',
    options: [[0], [1]]
  },
  {
    name: 'acc',
    id: 'acc',
    type: 'draw',
    options: [[0], [1]]
  },
];
