import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class DonutChart extends Component {
  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
  }

  componentDidMount() {
    const text = '';
    const { width, height, data } = this.props;
    const thickness = 30;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(this.svgRef.current)
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height)
      .style('margin-top', 20);

    const g = svg.append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('g')
      .on('mouseover', function (d) {
        let g = d3.select(this)
          .style('cursor', 'pointer')
          .style('fill', 'black')
          .append('g')
          .attr('class', 'text-group');

        g.append('text')
          .attr('class', 'name-text')
          .text(`${d.data.name}`)
          .attr('text-anchor', 'middle')
          .attr('dy', '-1.2em');

        g.append('text')
          .attr('class', 'value-text')
          .text(`${d.data.value} %`)
          .attr('text-anchor', 'middle')
          .attr('dy', '.6em');
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .style('cursor', 'none')
          .style('fill', color(this._current))
          .select('.text-group')
          .remove();
      })
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(text);
  }

  render() {
    const { width, height } = this.props;

    return (
      <svg className="donut-chart" width={width} height={height} ref={this.svgRef} />
    );
  }
}

export default DonutChart;

DonutChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};
