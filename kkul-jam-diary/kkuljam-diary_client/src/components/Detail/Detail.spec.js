import React from 'react';
import { shallow } from 'enzyme';
import Detail, { DetailSleep, DetailDiary } from './Detail';


describe('<Detail />', () => {
  const sleepWithDiary = {
    date: '2020.04.23',
    diary: {
      behaviorScore: 7
    }
  };
  const sleepNoDiary = { date: '2020.04.23' };

  const wrapperWithDiary = shallow(<Detail sleep={sleepWithDiary} />);
  const wrapperNoDiary = shallow(<Detail sleep={sleepNoDiary} />);

  it('renders Detail page', () => {
    expect(wrapperWithDiary.find('.detailWrapper')).toHaveLength(1);
    expect(wrapperWithDiary.find('.contents')).toHaveLength(1);
  });

  it('renders Write button if there\'s no diary', () => {
    expect(wrapperNoDiary.find('#wirteButton')).toHaveLength(1);
    expect(wrapperWithDiary.find('#wirteButton')).toHaveLength(0);
  });
});

describe('<DetailSleep />', () => {
  const sleep = {
    sleepCycle: [
      ['light', '03:26', '03:46'],
      ['deep', '03:47', '04:32'],
      ['light', '04:33', '04:50']]
  };

  const wrapper = shallow(<DetailSleep sleep={sleep} />);

  it('renders DetailSleep', () => {
    expect(wrapper.find('.sleepWrapper')).toHaveLength(1);
    expect(wrapper.find('span').get(0)).toEqual(
      <span className="sleepItemIcon">얕은 수면</span>
    );
  });

  it('renders cycle data', () => {
    expect(wrapper.find('.lightSleep')).toHaveLength(2);
    expect(wrapper.find('.lightSleep').at(0).text()).toEqual('03:26 ~ 03:46');
  });
});

describe('<DetailDiary />', () => {
  const diaryWithMemo = {
    behaviorScore: 7,
    feelingColor: ['#BDE4D7', '초록'],
    behaviorScoreReason: '7점을 준 이유는~',
    memo: '오늘은 BBQ를 먹었다.'

  };
  const diaryNoMemo = {
    behaviorScore: 7,
    feelingColor: ['#BDE4D7', '초록'],
    behaviorScoreReason: '7점을 준 이유는~'
  };

  const wrapperWithMemo = shallow(<DetailDiary diary={diaryWithMemo} />);
  const wrapperNoMemo = shallow(<DetailDiary diary={diaryNoMemo} />);

  it('renders DetailDiary', () => {
    expect(wrapperWithMemo.find('.scoreWrapper')).toHaveLength(1);
    expect(wrapperWithMemo.find('.colorWrapper')).toHaveLength(1);
  });

  it('renders Write button if there\'s no diary', () => {
    expect(wrapperWithMemo.find('.memoWrapper')).toHaveLength(1);
    expect(wrapperNoMemo.find('.memoWrapper')).toHaveLength(0);
  });

  it('renders diary data', () => {
    expect(wrapperWithMemo.find('.diaryScore').text()).toEqual('7점');
    expect(wrapperWithMemo.find('.diaryColor').text()).toEqual('초록');
  });
});
