import _ from 'lodash';

const icons = ['😝', '🥰', '😎', '🤢', '🤮', '😭', '😪', '🍹', '🍺', '🍷', '🤗'];

export const getRandomEmoji = () => (icons[_.random(icons.length - 1)]);
