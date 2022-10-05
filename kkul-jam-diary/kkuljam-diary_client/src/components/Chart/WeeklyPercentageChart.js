import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Chart.css';

const WeeklyPercentageChart = props => {
  const { sleepList, keys, colors, term } = props;
  const data = sleepList;
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 370,
      height = 350;

    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const stackGenerator = d3.stack().keys(keys),
      sleepsByType = stackGenerator(data),
      maxRange = [0, d3.max(sleepsByType, sleeps => d3.max(sleeps, sequence => sequence[1]))],
      dayShort = d3.map(data, d => (d.day)).keys();

    const x = d3.scaleBand()
      .domain(dayShort)
      .range([0, width - margin.left - margin.right])
      .padding([0.3]);

    const y = d3.scaleLinear()
      .domain(maxRange)
      .range([height - margin.top - margin.bottom, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .attr('class', 'axis')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const bars = svg.append('g')
      .selectAll('g')
      .data(sleepsByType)
      .enter();

    const barByType = bars.append('g')
      .attr('fill', sleepByType => colors[sleepByType.key]);

    bars.selectAll('.text-duration-hours')
      .data(d => d)
      .enter().append('text')
      .attr('class', 'text-duration-hours')
      .attr('text-anchor', 'middle')
      .attr('x', d => x(d.data.day) + x.bandwidth() / 2)
      .attr('y', 20)
      .text(d => d.data.durationHours);

    bars.selectAll('.text-duration-minutes')
      .data(d => d)
      .enter().append('text')
      .attr('class', 'text-duration-minutes')
      .attr('text-anchor', 'middle')
      .attr('x', d => x(d.data.day) + x.bandwidth() / 2)
      .attr('y', 40)
      .text(d => d.data.durationMinutes);

    barByType.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', d => x(d.data.day))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', 0)
      .transition()
      .duration(200)
      .delay((d, i) => i * 100)
      .attr('width', x.bandwidth());

    barByType.selectAll('.text-deepPercent')
      .data(d => d)
      .enter().append('text')
      .attr('class', 'text-deepPercent')
      .attr('text-anchor', 'middle')
      .attr('x', d => x(d.data.day) + x.bandwidth() / 2)
      .attr('y', 300)
      .text(d => `${d.data.deepSleepPercentage}%`);
  }, []);

  return (
    <>
      <div className="term">{term}</div>
      <div ref={svgRef} />
      <div className="description">
        <span className="total">총 수면시간</span>
        <span className="light">얕은 수면</span>
        <span className="deep">깊은 수면</span>
        <br />
        <span className="deepPercentage">하루 중, 깊은 수면의 비율</span>
      </div>
    </>
  );
};

export default WeeklyPercentageChart;
