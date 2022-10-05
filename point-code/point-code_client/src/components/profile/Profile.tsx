import React from 'react';
import styled from 'styled-components';
import { IUser } from '../../lib/api/auth';
import { RUNTIME_ERROR, WRONG_ANSWER, ACCEPTED } from '../../lib/constants/submissionResult';
import Responsive from '../common/Responisve';
import Card from '../common/Card';
import ActiveShapePieChart from '../common/ActiveShapePieChart';
import SimpleBarChart from '../common/SimpleBarChart';

const ProfileBlock = styled(Responsive)`
  margin-top: 2rem;
  padding-bottom: 2.5rem;

  .title {
    margin-bottom: 0.875rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const StatisticBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.375rem;

  .padding-block {
    width: calc(100% / 3);
    padding: 0 0.5rem;
    &:first-child {
      padding-left: 0;  
    }
    &:last-child {
      padding-right: 0;
    }

    @media (max-width: 48rem) {
      width: 100%;
      padding: 0;
      padding-bottom: 1rem;
    }
  }

  .avatar {
    width: 3.5rem;
    height: 3.2rem;
    margin-right: 0.25rem;
  }

  .number {
    color: ${props => props.theme.color.gray[8]};
    font-size: 2rem;
    font-weight: 600;
  }

  .text {
    color: ${props => props.theme.color.gray[6]};
    font-weight: 600;
  }
`;

const ChartBlock = styled.div`
  display: flex;
  flex-wrap: wrap;

  .padding-block {
    width: 50%;
    padding: 0 0.5rem;
    &:first-child {
      padding-left: 0;  
    }
    &:last-child {
      padding-right: 0;
    }

    @media (max-width: 48rem) {
      width: 100%;
      padding: 0;
      padding-bottom: 1rem;
    }
  }

  .card-title {
    position: absolute;
    left: 1.5rem;
    top: 1.5rem;
    color: ${props => props.theme.color.gray[6]};
    font-weight: 600;
  }
`;

type ProfileProps = {
  user: IUser;
  chartSize: number;
  totalCounts: { [result: string]: number };
  lastWeekCounts: Array<[string, number]>;
};

const Profile = ({ user, chartSize, totalCounts, lastWeekCounts }: ProfileProps) => (
  <ProfileBlock>
    <h3 className="title">통계</h3>
    <StatisticBlock>
      {
        [
          {
            number: user.solved_problems.length,
            text: '✅ 맞춘 문제'
          },
          {
            number: Math.floor(user.total_point / user.solved_problems.length) || 0,
            text: '💯 평균 점수'
          },
          {
            number: lastWeekCounts.reduce((acc, cur) => acc + cur[1], 0),
            text: '📝 최근 일주일 제출'
          }
        ].map(({ number, text }) => (
          <div key={text} className="padding-block">
            <Card>
              <span className="number">{number}</span>
              <p className="text">{text}</p>
            </Card>
          </div>
        ))
      }
    </StatisticBlock>
    <h3 className="title">차트</h3>
    <ChartBlock>
      <div className="padding-block">
        <Card>
          <p className="card-title">모든 제출 결과</p>
          <ActiveShapePieChart
            width={chartSize}
            height={chartSize}
            data={
              [
                {
                  name: RUNTIME_ERROR,
                  color: '#CB4B4B',
                  value: totalCounts[RUNTIME_ERROR]
                },
                {
                  name: WRONG_ANSWER,
                  color: '#EDC240',
                  value: totalCounts[WRONG_ANSWER]
                },
                {
                  name: ACCEPTED,
                  color: '#009900',
                  value: totalCounts[ACCEPTED]
                }
              ]
            }
          />
        </Card>
      </div>
      <div className="padding-block">
        <Card>
          <p className="card-title">최근 일주일 제출</p>
          <SimpleBarChart
            width={chartSize - 100}
            height={chartSize}
            data={
              [
                {
                  name: lastWeekCounts[6][0],
                  value: lastWeekCounts[6][1]
                },
                {
                  name: lastWeekCounts[5][0],
                  value: lastWeekCounts[5][1]
                },
                {
                  name: lastWeekCounts[4][0],
                  value: lastWeekCounts[4][1]
                },
                {
                  name: lastWeekCounts[3][0],
                  value: lastWeekCounts[3][1]
                },
                {
                  name: lastWeekCounts[2][0],
                  value: lastWeekCounts[2][1]
                },
                {
                  name: lastWeekCounts[1][0],
                  value: lastWeekCounts[1][1]
                },
                {
                  name: lastWeekCounts[0][0],
                  value: lastWeekCounts[0][1]
                }
              ]
            }
          />
        </Card>
      </div>
    </ChartBlock>
  </ProfileBlock>
);

export default Profile;
