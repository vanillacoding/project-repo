import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.mounted = false;
  }

  componentDidMount() {
    const { data, width, height } = this.props;
    if (data.length > 0) {
      this.setState({ data: data });
    }

    const minX = -1;
    const maxX = 24;
    const minY = d3.min(data.map(item => item.count));
    const maxY = d3.max(data.map(item => item.count));

    let x = d3
      .scaleLinear()
      .domain([ minX + 0.5, maxX - 0.5 ])
      .range([ 0, width ]);

    let y = d3
      .scaleLinear()
      .domain([ minY, maxY ])
      .range([ height, height / 3 ]);

    this.line = d3
      .line()
      .x(d => x(d.time))
      .y(d => y(d.count));

    this.area = d3
      .area()
      .x(d => x(d.time))
      .y0(() => height)
      .y1(d => y(d.count));

    const margin = 5;
    const h = height - 1 * margin;
    this.xTicks = x.ticks(data.length).map(d => (
      <g
        key={'tick' + d}
        transform={`translate(${x(d) - 6}, ${h})`}
      >
        <text
          fontSize="12"
        >
          {`${d}h`}
        </text>
      </g>
    ));
    this.xValues = x.ticks(data.length).map((d, i) => (
      <g
        key={'value' + d}
        transform={`translate(${x(d) - 6}, ${y(data[i + 1].count) - 10})`}
      >
        <text
          fontSize="18"
          className="xvalue"
          fill="#0b2333"
        >
          {data[i + 1].count > 0 && data[i + 1].count}
        </text>
      </g>
    ));
    this.xLines = x.ticks(data.length).map(d => (
      <g
        key={'line' + d}
        transform={`translate(${x(d) - 10}, 0)`}
      >
        <line
          x1="10"
          x2="10"
          y1={height}
          y2="0"
          transform="translate(0, -20)"
          strokeWidth="1"
          stroke="#fff"
        />
      </g>
    ));
    this.mounted = true;
  }

  componentDidUpdate() {
    const line = d3.selectAll('.line');
    const totalLength = line.node().getTotalLength();

    line
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .attr('stroke-width', 8)
      .attr('stroke', '#0b2333')
      .transition()
      .duration(3000)
      .attr('stroke-width', 3)
      .attr('stroke-dashoffset', 0);

    const area = d3.selectAll('.area');
    area
      .attr('transform', 'translate(0, 300)')
      .attr('fill', 'transparent')
      .transition()
      .duration(2000)
      .attr('fill', '#a8dbd4')
      .attr('transform', 'translate(0, 0)');

    const xvalue = d3.selectAll('.xvalue');
    xvalue
      .attr('fill', 'transparent')
      .attr('transform', 'translate(0, -20)')
      .transition()
      .delay((d, i) => 100 * i)
      .duration(500)
      .attr('fill', '#0b2333')
      .attr('transform', 'translate(0, 0)');
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { data } = this.state;
    if (!this.mounted) {
      return <div></div>;
    }

    return (
      <div className="line-chart">
        <svg width={this.props.width} height={this.props.height}>
          <g className="axis-labels">
            {this.xLines}
          </g>
          <g>
            <path
              className="line"
              d={this.line(data)}
              fill="transparent"
              stroke="transparent"
            />
            <path
              className="area"
              d={this.area(data)}
              style={{ opacity: 1 }}
            />
          </g>
          <g className="axis-labels">
            {this.xTicks}
          </g>
          <g className="axis-labels">
            {this.xValues}
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
