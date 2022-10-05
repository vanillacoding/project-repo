/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from '../src/client/components/Dashboard';
import LineChart from '../src/client/components/charts/LineChart';
import BarChart from '../src/client/components/charts/BarChart';
import DonutChart from '../src/client/components/charts/DonutChart';
import WordMap from '../src/client/components/charts/WorldMap';

configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
  const stayOnPages = [77777];
  const countries = [];
  const onDashboardMount = () => {};

  it('should be rendered successfully', () => {
    let num = 1;
    const fakeFunc = () => { num++; };
    const wrapper = shallow(
      <Dashboard
        stayOnPages={stayOnPages}
        countries={countries}
        onDashboardMount={fakeFunc}
      />
    );

    expect(wrapper.length).toBe(1);
    expect(num).toBe(2);
  });

  it('should not display some charts while loading visit information', () => {
    const isVisitLoading = true;

    const wrapper = shallow(
      <Dashboard
        stayOnPages={stayOnPages}
        countries={countries}
        onDashboardMount={onDashboardMount}
        isVisitLoading={isVisitLoading}
      />
    );

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.dashboard__chart-wrapper').length).toBe(3);
  });

  it('should render all charts after when visit-info-loading is finished', () => {
    const isVisitLoading = false;

    const wrapper = shallow(
      <Dashboard
        stayOnPages={stayOnPages}
        countries={countries}
        onDashboardMount={onDashboardMount}
        isVisitLoading={isVisitLoading}
      />
    );

    expect(wrapper.length).toBe(1);
  });

  it('should render all chart components when data is loaded', () => {
    const isVisitLoading = false;
    const visitDataset = [{
      name: 'test-visit-data',
      visits: [{
        date: new Date(),
        count: 1,
      }],
    }];
    const pages = [{
      name: 'test-page-name',
      id: 'test-page-id',
      visit_count: 1,
      conversion: 2,
    }];
    const dataByRegion = [{
      count: 5,
      ll: [120, 20]
    }];
    const useragent = [{
      value: 1,
      name: 'test-user-agent',
    }];
    const mockCountries = [{
      name: 'test-country',
      value: 'test-country-value',
    }];

    const wrapper = mount(
      <Dashboard
        onDashboardMount={onDashboardMount}
        stayOnPages={stayOnPages}
        countries={mockCountries}
        isVisitLoading={isVisitLoading}
        visitDataset={visitDataset}
        pages={pages}
        dataByRegion={dataByRegion}
        useragent={useragent}
      />
    );

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.dashboard__chart-wrapper').length).toBe(7);
    expect(wrapper.find('svg').length).toBe(5);
    expect(wrapper.find(LineChart).length).toBe(1);
    expect(wrapper.find(BarChart).length).toBe(1);
    expect(wrapper.find(DonutChart).length).toBe(1);
    expect(wrapper.find(WordMap).length).toBe(1);
  });

  it('should receive all props correctly and not mutate', () => {
    let num = 1;
    const fakeOnMountFunc = () => { num++; };
    const isVisitLoading = false;
    const visitDataset = [{
      name: 'test-visit-data',
      visits: [{
        date: new Date(),
        count: 1,
      }],
    }];
    const pages = [{
      name: 'test-page-name',
      id: 'test-page-id',
      visit_count: 1,
      conversion: 2,
    }];
    const dataByRegion = [{
      count: 5,
      ll: [120, 20]
    }];
    const useragent = [{
      value: 1,
      name: 'test-user-agent',
    }];
    const mockCountries = [{
      name: 'test-country',
      value: 'test-country-value',
    }];

    const wrapper = shallow(
      <Dashboard
        onDashboardMount={fakeOnMountFunc}
        stayOnPages={stayOnPages}
        countries={mockCountries}
        isVisitLoading={isVisitLoading}
        visitDataset={visitDataset}
        pages={pages}
        dataByRegion={dataByRegion}
        useragent={useragent}
      />
    );

    const instance = wrapper.instance();

    expect(instance['props'].isVisitLoading).toBe(false);
    expect(typeof instance['props'].onDashboardMount).toBe('function');
    expect(num).toBe(2);
    expect(instance['props'].stayOnPages[0]).toBe(77777);
    expect(instance['props'].visitDataset[0].name).toBe('test-visit-data');
    expect(instance['props'].countries[0].name).toBe('test-country');
  });
});
