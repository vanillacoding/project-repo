import React from 'react';
import WeeklyPercentageChart from './WeeklyPercentageChart';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import '../App/App.css';
import './Chart.css';

const Chart = props => {
  const { weeklyPatternList, term, history } = props;
  const isLoading = !weeklyPatternList.length;
  const keys = ['deep', 'light'],
    colors = { deep: '#080850', light: '#471FB3' };

  return (
    <>
      <Header history={history} />
      <main>
        <section>
          <h2 className="title">
            주간 수면패턴 차트
          </h2>
        </section>
        {isLoading
          ? <Loading />
          : (
            <WeeklyPercentageChart
              sleepList={weeklyPatternList}
              keys={keys}
              colors={colors}
              term={term}
            />
          )}
      </main>
      <BottomNavigation />
    </>
  );
};

export default Chart;
