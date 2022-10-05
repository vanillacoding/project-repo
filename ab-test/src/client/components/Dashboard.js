import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';

import './Dashboard.scss';
import ReactCountryFlag from 'react-country-flag';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import WorldMap from './charts/WorldMap';
import DonutChart from './charts/DonutChart';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPageBox: false,
    };

    this.convertMillsecToLabel = this.convertMillsecToLabel.bind(this);
    this.togglePageBox = this.togglePageBox.bind(this);
    this.renderCountryList = this.renderCountryList.bind(this);
  }

  componentDidMount() {
    this.props.onDashboardMount();
  }

  convertMillsecToLabel() {
    const average = this.props.stayOnPages.reduce((acc, time, idx) => {
      acc += time;

      if (idx === this.props.stayOnPages.length - 1) {
        return acc / this.props.stayOnPages.length;
      }

      return acc;
    });

    let min = parseInt((average / (1000 * 60)).toString().split('.'));
    let sec = parseInt(((average % (1000 * 60)) / 1000).toString().split('.'));

    min = min ? `${min} min` : '';
    sec = sec ? `${sec} sec` : '';

    return (`${min} ${sec}`).trim();
  }

  renderCountryList() {
    return this.props.countries.map(country => (
      <li className="dashboard__country--list" key={country.name}>
        <ReactCountryFlag code={`${country.name}`} className="country-flag" />
        <span className="country-name">{country.name}</span>
        <span>{country.value} %</span>
      </li>
    ));
  }

  togglePageBox() {
    this.setState(state => ({ showPageBox: !state.showPageBox }));
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard--control-panel">
          <div className="page-selection">
            <div className="page-selection__btn" onClick={this.togglePageBox}>
              <IoIosArrowDown size={15} className="icon-page-select" />
              <span>Choose pages</span>
            </div>
            {
              this.state.showPageBox &&
              <form className="dropdown-menu">
                {
                  this.props.pages.map(page => (
                    <div className="dropdown-menu__list" key={page.id}>
                      <input
                        type="checkbox"
                        id={page.id}
                        className="page-checkbox"
                      />
                      <label htmlFor={page.id}>{page.name}</label>
                      <span className="checkmark" />
                    </div>
                  ))
                }
              </form>
            }
          </div>
        </div>
        <div className="dashboard__row">
          {
            this.props.isVisitLoading ?
              <div className="dashboard__row--loader-wrapper">
                <FaSpinner size={19} className="loader" />
              </div> :
              <div className="dashboard__chart-wrapper">
                <div className="dashboard__chart-label">Visitors by date</div>
                <LineChart className="dashboard--visitor-chart" data={this.props.visitDataset} width={400} height={200} />
              </div>
          }
          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart-label">Conversion rate</div>
            <BarChart data={this.props.pages} width={400} height={200} />
          </div>
          {
            this.props.isVisitLoading ?
              <div className="dashboard__row--loader-wrapper donut">
                <FaSpinner size={19} className="loader" />
              </div> :
              <div className="dashboard__chart-wrapper donut">
                <div className="dashboard__chart-label">Visit by browser</div>
                <DonutChart width={200} height={200} data={this.props.useragent} />
              </div>
          }
        </div>
        <div className="dashboard__row">
          <div className="dashboard__column">
            {
              this.props.isVisitLoading ?
                <div className="dashboard__row--loader-wrapper time">
                  <FaSpinner size={19} className="loader" />
                </div> :
                <div className="dashboard__chart-wrapper">
                  <div className="dashboard__chart-label">AVG. time on pages</div>
                  <div className="average-time-label">
                    <span className="time">
                      {
                        this.props.stayOnPages.length !== 0 &&
                        this.convertMillsecToLabel()
                      }
                    </span>
                  </div>
                </div>
            }
            <div className="dashboard__chart-wrapper">
              <div className="dashboard__chart-label">Total Revisit rate</div>
              <div className="average-revisit-label">
                <span className="revisit">{this.props.revisitRate}</span>
                <span className="criteria">%</span>
              </div>
            </div>
          </div>
          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart-label">Approx location of client</div>
            <WorldMap data={this.props.dataByRegion} />
          </div>
          {
            this.props.isVisitLoading ?
              <div className="dashboard__row--loader-wrapper country">
                <FaSpinner size={19} className="loader" />
              </div> :
              <div className="dashboard__chart-wrapper">
                <div className="dashboard__chart-label">Visit by country</div>
                <ul className="dashboard__country">
                  {
                    this.renderCountryList()
                  }
                </ul>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;

Dashboard.propTypes = {
  onDashboardMount: PropTypes.func,
  visitDataset: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      visits: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.instanceOf(Date),
          count: PropTypes.number,
        })
      ),
    })
  ),
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      visit_count: PropTypes.number,
      conversion: PropTypes.number,
    }),
  ),
  dataByRegion: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      date: PropTypes.date,
    }),
  ),
  isVisitLoading: PropTypes.bool,
  revisitRate: PropTypes.string,
  stayOnPages: PropTypes.arrayOf(PropTypes.number),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  useragent: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};
