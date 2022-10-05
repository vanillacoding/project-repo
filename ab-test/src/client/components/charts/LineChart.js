import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import './LineChart.scss';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
  }

  componentDidMount() {
    const { width, height, data } = this.props;
    const margin = 30;
    const duration = 250;
    let maxVisit = 0;

    const lineOpacity = '0.25';
    const lineOpacityHover = '0.85';
    const otherLinesOpacityHover = '0.1';
    const lineStroke = '1.5px';
    const lineStrokeHover = '2.5px';

    const circleOpacity = '0.85';
    const circleOpacityOnLineHover = '0.25';
    const circleRadius = 3;
    const circleRadiusHover = 6;

    data.forEach((d) => {
      d.visits.forEach((d) => {
        d.date = d.date;
        d.count = +d.count;
      });
    });

    data.forEach((page) => {
      const curMax = d3.max(page.visits, d => d.count);

      if (maxVisit < curMax) {
        maxVisit = curMax;
      }
    });

    const xScale = d3.scaleTime()
      .domain(d3.extent(data[0].visits, d => d.date))
      .range([0, width - margin]);

    const yScale = d3.scaleLinear()
      .domain([0, maxVisit])
      .range([height - margin, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(this.svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.count));

    const lines = svg.append('g')
      .attr('class', 'lines');

    const newLines = lines.selectAll('.line-group').data(data);

    newLines.enter()
      .append('g')
      .attr('class', 'line-group')
      .on('mouseover', (d, i) => {
        svg.append('text')
          .attr('class', 'title-text')
          .style('fill', color(i))
          .text(d.name)
          .attr('text-anchor', 'middle')
          .attr('x', (width - margin) / 2)
          .attr('y', 5);
      })
      .on('mouseout', function (d) {
        svg.select('.title-text').remove();
      })
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.visits))
      .style('stroke', (d, i) => color(i))
      .style('opacity', lineOpacity)
      .on('mouseover', function (d) {
        d3.selectAll('.line')
          .style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
          .style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style('stroke-width', lineStrokeHover)
          .style('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.selectAll('.line')
          .style('opacity', lineOpacity);
        d3.selectAll('.circle')
          .style('opacity', circleOpacity);
        d3.select(this)
          .style('stroke-width', lineStroke)
          .style('cursor', 'none');
      });

    svg.selectAll('path').exit().remove();

    newLines.exit().remove();

    const lineDraw = lines.selectAll('circle-group').data(data);

    lineDraw.enter()
      .append('g')
      .style('fill', (d, i) => color(i))
      .selectAll('circle')
      .data(d => d.visits)
      .enter()
      .append('g')
      .attr('class', 'circle')
      .on('mouseover', function (d) {
        d3.select(this)
          .style('cursor', 'pointer')
          .append('text')
          .attr('class', 'text')
          .text(`${d.count}`)
          .attr('x', d => xScale(d.date) + 5)
          .attr('y', d => yScale(d.count) - 10);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .style('cursor', 'none')
          .transition()
          .duration(duration)
          .selectAll('.text')
          .remove();
      })
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.count))
      .attr('r', circleRadius)
      .style('opacity', circleOpacity)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr('r', circleRadiusHover);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr('r', circleRadius);
      });

    svg.selectAll('.lines').exit().remove();
    svg.selectAll('.line').exit().remove();
    lineDraw.exit().remove();

    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('fill', '#000')
      .text('Total visits');
  }

  render() {
    if (!this.props.data.length) {
      return <div>Loading</div>;
    }

    const { width, height } = this.props;

    return (
      <svg width={width + 50} height={height + 50} ref={this.svgRef} />
    );
  }
}

export default LineChart;

LineChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};
