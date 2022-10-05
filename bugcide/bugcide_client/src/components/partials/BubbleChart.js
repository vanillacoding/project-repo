import React, { Component } from 'react';
import * as d3 from 'd3';

class BubbleChart extends Component {
  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;
    this.state = {
      data: []
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentDidMount() {
    this.mounted = true;

    if (this.props.data.length > 0) {
      this.minValue = 0.95 * d3.min(this.props.data, item => item.count);
      this.maxValue = 1.05 * d3.max(this.props.data, item => item.count);

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([ 15, 120 ])
      .domain([ this.minValue, this.maxValue ]);

    return fx(value);
  };

  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force('x', d3.forceX().strength(0.05))
      .force('y', d3.forceY().strength(0.05))
      .force(
        'collide',
        d3.forceCollide(d => this.radiusScale(d.count) + 2)
      )
      .on('tick', () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  renderBubbles = data => {
    const minValue = 0.95 * d3.min(data, item => item.count);
    const maxValue = 1.05 * d3.max(data, item => item.count);

    this.color = d3
      .scaleLinear()
      .domain([ minValue, maxValue ])
      .interpolate(d3.interpolateHcl)
      .range([ '#568a97', '#b7414f' ]);

    const texts = data.map((item, index) => {
      const radiusSize = this.radiusScale(item.count);
      const props = this.props;

      return (
        <g
          key={index}
          transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}
        >
          <circle
            r={radiusSize}
            fill={this.color(item.count * (index + 1))}
          />
          {radiusSize > 50 && (
            <text
              dy="6"
              fill="#fff"
              textAnchor="middle"
              fontSize="15px"
              fontWeight="bold"
            >
              {item.title}
            </text>
          )}
          {radiusSize > 10 && radiusSize <= 50 && (
            <text
              dy="6"
              fill="#fff"
              textAnchor="middle"
              fontSize="12px"
              fontWeight="bold"
            >
              {item.count}
            </text>
          )}
        </g>
      );
    });

    return texts;
  };

  render() {
    if (!this.mounted) {
      return <div></div>;
    }

    return (
      <div className="bubble-chart">
        <svg
          width={this.props.width}
          height={this.props.height}
        >
          {this.renderBubbles(this.state.data)}
        </svg>
        <ul className="item-list">
          {this.state.data.map((item, i) => (
            <li key={i}>
              <div
                style={{ backgroundColor: this.color(item.count * (i + 1)) }}
                className="item-color"
              >
              </div>
              <div className="item-title">
                {`${item.title} ${item.count}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BubbleChart;
