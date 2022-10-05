import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import ProjectDetail from '../ProjectDetail';
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('<ProjectDetail />', () => {
  let wrapper;
  let initialProps;

  beforeEach(() => {
    initialProps = {
      jwtoken: 'jwtoken',
      isLoading: false,
      isError: false,
      errorList: [],
      project: {
        name: 'project-name',
        token: 'project-token',
        created_at: new Date(2019, 10, 12)
      },
      statistics: {name: {}, time: []},
      currentPageNo: 0,
      isDescSorting: false,
      onProjectDetailLoad: jest.fn(),
      totalErrorListLength: 30,
      onProjectDelete: jest.fn(),
      match: {
        params: {
          token: 'project-token'
        }
      }
    };

    wrapper = shallow(
      <ProjectDetail
        {...initialProps}
      />
    );
  });

  it('renders ProjectDetail page', () => {
    expect(wrapper.find('.app-content')).toHaveLength(1);
    expect(wrapper.find('.content-header')).toHaveLength(1);
    expect(wrapper.find('.content-title')).toHaveLength(1);
  });

  it('renders content-header with project information', () => {
    expect(wrapper.find('.content-title').text()).toEqual(initialProps.project.name + '2019.11.12');
    expect(wrapper.find('.project-token').text()).toEqual('Project Token: ' + initialProps.project.token);
  });

  it('calls onProjectDetailLoad if user click refresh button', () => {
    let btn = wrapper.find('.btn-basic[title="Refresh"]');
    btn.simulate('click');

    expect(initialProps.onProjectDetailLoad).toHaveBeenCalledWith(initialProps.jwtoken, initialProps.match.params.token);
  });

  it('renders Manual component if errorList is as empty array', () => {
    expect(wrapper.find('Manual')).toHaveLength(1);
  });

  describe('ErrorList', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectDetail
          {...initialProps}
          errorList={[
            {_id: '1'},
            {_id: '2'},
            {_id: '3'},
          ]}
        />
      );
    });

    it('renders tab if errorList is not empty', () => {
      expect(wrapper.find('.tab-header')).toHaveLength(1);
    });

    it('renders Timeline content as a default tab content', () => {
      let btn = wrapper.find('.tab-header .btn-tab').first();

      expect(btn.hasClass('active')).toEqual(true);
      expect(wrapper.find('.timeline-list')).toHaveLength(1);
    });

    it('renders Graph content if user click Graph tab button', () => {
      let lastBtn = wrapper.find('.tab-header li:last-child .btn-tab');

      lastBtn.simulate('click');
      wrapper.update();

      let firstBtn = wrapper.find('.tab-header li:first-child .btn-tab');
      lastBtn = wrapper.find('.tab-header li:last-child .btn-tab');

      expect(firstBtn.hasClass('active')).toEqual(false);
      expect(lastBtn.hasClass('active')).toEqual(true);
      expect(wrapper.find('.tab-content.graph')).toHaveLength(1);
      expect(wrapper.find('LineChart')).toHaveLength(1);
      expect(wrapper.find('BubbleChart')).toHaveLength(1);
    });
  });

  describe('Modal', () => {
    beforeEach(() => {
      wrapper = mount(
        <Router>
          <ProjectDetail
            {...initialProps}
          />
        </Router>
      );
    });

    it('opens Modal if user click delete button', () => {
      expect(wrapper.find('.modal-container')).toHaveLength(0);

      let btn = wrapper.find('.btn-delete');
      btn.simulate('click');

      expect(wrapper.find('.modal-container')).toHaveLength(1);
    });

    it('does not call onProjectDelete if project name not match', () => {
      let btn = wrapper.find('.btn-delete');
      btn.simulate('click');

      let input = wrapper.find('.modal-container input[type="text"]');
      input.simulate('change', {target: { value: 'invalid name' }});
      wrapper.update();

      btn = wrapper.find('.modal-container .btn-basic.block');
      btn.simulate('click');

      expect(initialProps.onProjectDelete).not.toHaveBeenCalled();
      expect(wrapper.find('.label-info.txt-red').text()).toEqual('Project Name not matched!');
    });

    it('calls onProjectDelete if project name match', () => {
      let btn = wrapper.find('.btn-delete');
      btn.simulate('click');

      let input = wrapper.find('.modal-container input[type="text"]');

      input.simulate('change', {target: { value: initialProps.project.name }});

      btn = wrapper.find('.modal-container .btn-basic.block');
      btn.simulate('click');

      expect(initialProps.onProjectDelete).toHaveBeenCalledWith(initialProps.jwtoken, initialProps.match.params.token);
    });
  });
});
