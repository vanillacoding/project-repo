import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Chart.css';

const DailyPatternChart = props => {
  const { sleep } = props;
  const svgRef = useRef();

  useEffect(() => {
    if (sleep) {
      const margin = { top: 10, right: 30, bottom: 20, left: 10 },
        width = 60,
        height = 400;

      const svg = d3.select(svgRef.current)
        .append('svg')
        .attr('class', 'dailyChart')
        .attr('width', width)
        .attr('height', height)
        .append('g');

      const Tooltip = d3.select(svgRef.current)
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip');

      const stackGenerator = d3.stack().keys(Object.keys(sleep[0])),
        sleepsByType = stackGenerator(sleep),
        maxRange = [0, d3.max(sleepsByType, sleeps => d3.max(sleeps, sequence => sequence[1]))];

      const y = d3.scaleLinear()
        .domain(maxRange)
        .range([height - margin.top - margin.bottom, 0]);

      const bars = svg.append('g')
        .selectAll('g')
        .data(sleepsByType)
        .enter();

      const barByType = bars.append('g')
        .attr('fill', (d, i) => (i % 2 ? '#371E38' : '#C597E8'));

      barByType.selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('y', d => y(d[1]))
        .attr('x', d => (width - margin.top - margin.bottom) / 2 - 20)
        .attr('width', 60)
        .attr('height', 0)
        .on('mouseover', function (d) {
          d3.select(this).transition()
            .duration(100)
            .attr('opacity', '.8');
          Tooltip.transition()
            .duration(800)
            .style('opacity', 1);
          Tooltip.html(`${new Date(d[1] - d[0]).getHours()}시 ${new Date(d[1] - d[0]).getMinutes()}분 ~`)
            .style('left', `${d3.event.pageX - 10}px`)
            .style('top', `${d3.event.pageY - 250}px`);
        })
        .on('mouseout', function () {
          d3.select(this).transition()
            .duration(100)
            .attr('opacity', '1');
          Tooltip.transition()
            .duration(800)
            .style('opacity', 0);
        })
        .transition()
        .duration(500)
        .delay((d, i) => i * 1000)
        .attr('height', d => y(d[0]) - y(d[1]));

      const removeChart = () => {
        svg.selectAll('.dailyChart').remove();
      };

      return () => removeChart();
    }
  }, [sleep]);

  return (
    <div className="dailyWrapper" ref={svgRef} />
  );
};

export default DailyPatternChart;
