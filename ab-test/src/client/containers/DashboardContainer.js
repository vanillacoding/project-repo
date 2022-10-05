import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import Dashboard from '../components/Dashboard';

const mapStateToProps = (state) => {
  const visitDataset = [];
  const visitByRegion = {};
  const visitByAgent = {};
  const visitByCountry = {};
  const pages = state.testList.map(page => ({
    name: page.name,
    id: page._id,
    visit_count: page.visit_count,
    conversion: page.conversion,
  }));
  const stayOnPages = [];
  let totalVisit = 0;
  let totalRevisit = 0;

  state.testList.forEach((page) => {
    const pageData = {
      name: page.name,
      visits: [],
    };
    const visitByDate = {};

    totalVisit += page.visitIds.length;
    totalRevisit += page.revisit_count;

    page.visitIds.forEach((id) => {
      const visit = state.visits[id];

      if (!visit) {
        return;
      }

      if (visit.left_at) {
        stayOnPages.push(new Date(visit.left_at) - new Date(visit.connected_at));
      }

      const date = new Date(visit.connected_at).toDateString();

      if (!visitByDate[date]) {
        visitByDate[date] = {
          count: 1,
          date: new Date(new Date(visit.connected_at).toDateString()),
        };
      } else {
        visitByDate[date].count++;
      }

      if (visitByRegion[visit.geo.city]) {
        visitByRegion[visit.geo.city].count++;
      } else {
        visitByRegion[visit.geo.city] = {
          name: visit.geo.city,
          count: 1,
          ll: visit.geo.ll.slice().reverse(),
          key: visit._id,
        };
      }

      const agent = visit.useragent.isMobile ? 'Mobile' : visit.useragent.browser;

      if (visitByAgent[agent]) {
        visitByAgent[agent].count++;
      } else {
        visitByAgent[agent] = {
          count: 1,
          name: agent,
        };
      }

      if (visitByCountry[visit.geo.country]) {
        visitByCountry[visit.geo.country].count++;
      } else {
        visitByCountry[visit.geo.country] = {
          count: 1,
          name: visit.geo.country,
        };
      }
    });

    pageData.visits.push(Object.values(visitByDate));
    pageData.visits = pageData.visits.flat();
    visitDataset.push(pageData);
  });

  const useragent = Object.values(visitByAgent).map(data => ({
    value: parseInt(data.count / totalVisit * 100),
    name: data.name,
  }));

  const countries = Object.values(visitByCountry).map(data => ({
    value: (data.count / totalVisit * 100).toFixed(2),
    name: data.name,
  }));

  return {
    visitDataset,
    isVisitLoading: state.visits.isLoading,
    pages,
    dataByRegion: Object.values(visitByRegion),
    useragent,
    revisitRate: ((totalRevisit / totalVisit) * 100).toFixed(2),
    stayOnPages,
    countries,
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(Dashboard));
