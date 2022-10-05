import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { feature } from 'topojson-client';
import { select, json, geoPath, geoNaturalEarth1, zoom, event, selectAll } from 'd3';

import workingHolidayData from './workingHoliday.json';

import Header from '../Header/Header';
import Select from '../Select/Select';

import './Map.scss';

function Map({ onSetCountry, user, onSetUser }) {
  const [selectedAge, setAge] = useState('ALL');
  const [selectedContinent, setContinent] = useState('ALL');
  const [selectedPeriod, setPeriod] = useState('ALL');
  const age = ['18 ~ 31', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  const month = ['상시', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const WORLD_MAP_DATA = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  const CONTINENT = {
    ALL: '모든 국가',
    EUROPE: '유럽',
    ASIA: '아시아',
    AMERICA: '아메리카',
    OCEANIA: '오세아니아'
  };

  useEffect(() => {
    loadWorldMap();

    async function loadWorldMap() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const worldMap = await json(WORLD_MAP_DATA);
      const countries = feature(worldMap, worldMap.objects.countries);
      const projection = geoNaturalEarth1()
        .scale((width / 640) * 100)
        .translate([width / 2, height / 2]);
      const pathGenerator = geoPath().projection(projection);
      const svg = select('svg');
      const g = svg.append('g');

      svg.call(
        zoom().on('zoom', () => g.attr('transform', event.transform))
      );

      g.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({ type: 'Sphere' }));

      g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('fill', '#e8e8e8')
        .attr('d', d => pathGenerator(d))
        .on('mouseover', function () {
          select(this).attr('opacity', '0.6');
        })
        .on('mouseout', function () {
          select(this).attr('opacity', '1');
        })
        .append('title')
        .text(d => d.properties.name);

      const title = selectAll('title').each(function () {
        const path = select(this.parentNode).attr('id', function () {
          return this.textContent.replace(/ /gi, '-').toLowerCase();
        });
      });

      const allPath = selectAll('path');
      const allCountries = allPath._groups[0];
      const activeCountries = workingHolidayData.map(
        workingHolidayCountry => workingHolidayCountry.country
      );

      workingHolidayData.forEach(country => {
        allCountries.forEach(path => {
          if (country.country === path.id) {
            select(`#${path.id}`).attr('class', country.id);
          }
        });
      });

      allCountries.forEach(country => {
        if (activeCountries.includes(country.id)) {
          select(`#${country.id}`)
            .attr('fill', '#2c64ff')
            .on('mouseover', function () {
              select(this).attr('cursor', 'pointer');
            })
            .on('mouseout', function () {
              select(this).attr('cursor', 'default');
            })
            .on('click', function () {
              const countryId = this.className.baseVal;
              
              onSetCountry(countryId);
              window.location.href = `/countries/${countryId}`;
            });
        }
      });

      svg.attr('class', 'active');
    }
  }, []);

  useEffect(() => {
    let activeList = JSON.parse(JSON.stringify(workingHolidayData));

    if (selectedContinent !== 'ALL') {
      activeList = activeList.filter(country => country.continent === selectedContinent);
    }

    if (selectedAge !== 'ALL') {
      activeList = activeList.filter(country => country.age_limit >= selectedAge);
    }

    if (selectedPeriod !== 'ALL') {
      activeList = activeList.filter(
        country =>
          country.application_period.includes(selectedPeriod) ||
          country.application_period.includes('상시')
      );
    }

    if (!activeList.length) alert('선택하신 조건에 맞는 나라가 없습니다.');

    const allPath = selectAll('path');
    const allCountries = allPath._groups[0];
    const activeCountries = activeList.map((active) => active.country);

    allPath.attr('fill', '#e8e8e8');

    allCountries.forEach((country) => {
      if (activeCountries.includes(country.id)) {
        const path = select(`#${country.id}`);
        path.attr('fill', '#2c64ff');
      }
    });
  }, [selectedContinent, selectedAge, selectedPeriod]);

  return (
    <>
      <Header user={user} onSetUser={onSetUser} color='gray' />
      <div className='map-wrap'>
        <svg></svg>
        <div className='select-wrap'>
          <Select onSelect={setContinent} list={CONTINENT} />
          <Select onSelect={setAge} list={age} />
          <Select onSelect={setPeriod} list={month} />
        </div>
      </div>
    </>
  );
}

Map.propTypes = {
  onSetCountry: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onSetUser: PropTypes.func.isRequired
};

export default Map;
