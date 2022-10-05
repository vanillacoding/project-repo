import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import './LineChart.scss';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
  }

  componentDidMount() {
    const { data } = this.props;
    const margin = { top: 40, right: 15, bottom: 50, left: 15 };
    const { width, height } = this.props;

    data.forEach((page) => {
      page.value = (page.conversion / page.visit_count) * 100;
    });

    const t = d3.transition()
      .duration(750)
      .ease(d3.easeQuadOut);

    const colorScale = d3.scaleLinear()
      .range([1, 0])
      .domain([d3.max(data, d => d.value), 0]);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.name))
      .padding(0.7);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100]);

    const svg = d3.select(this.svgRef.current)
      .attr('viewBox', `0 0 ${(width + margin.left + margin.right)} ${(height + margin.top + margin.bottom)}`)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
      .attr('class', 'x-axis axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width)
      .attr('y', 30)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Item');

    svg.append('g')
      .attr('class', 'y-axis axis')
      .call(d3.axisLeft(y).ticks(10, 's'))
      .append('text')
      .attr('y', -20)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Value');

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('width', x.bandwidth())
      .attr('y', d => y(0))
      .attr('height', height - y(0))
      .transition(t)
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value))
      .attr('fill', '#0071b9')
      .attr('fill-opacity', d => colorScale(d.value));
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

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};
