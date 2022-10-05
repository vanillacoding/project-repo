import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import PropTypes from 'prop-types';
import mapData from './world-110m.json';
import './WorldMap.scss';

class WorldMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      worldData: [],
    };

    this.svgRef = React.createRef();
  }

  projection() {
    return geoMercator()
      .scale(95)
      .translate([730 / 2, 450 / 2]);
  }

  componentDidMount() {
    this.setState({
      worldData: feature(mapData, mapData.objects.countries).features,
    });
  }

  render() {
    let key = 0;

    return (
      <svg width={580} height={300} ref={this.svgRef} viewBox="0 0 800 300">
        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={`path-${key++}`}
                d={geoPath().projection(this.projection())(d)}
                className="country"
                fill="rgba(38, 50, 56, .1)"
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))
          }
        </g>
        <g>
          {
            this.props.data.map((city, i) => (
              <circle
                key={key++}
                cx={this.projection()(city.ll)[0]}
                cy={this.projection()(city.ll)[1]}
                r={5}
                fill="#E91E63"
                stroke="#ffffff"
                className="marker"
              />
            ))
          }
        </g>
      </svg>
    );
  }
}

export default WorldMap;

WorldMap.propTypes = {
  data: PropTypes.array,
};
