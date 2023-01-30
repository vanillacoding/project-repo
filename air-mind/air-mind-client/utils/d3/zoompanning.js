import * as d3 from 'd3';

export default function zoomPanning(groupRef) {
  const group = d3.select(groupRef.current);

  const handleZoom = e => group.attr('transform', e.transform);

  const zoom = d3.zoom().on('zoom', handleZoom);

  d3.select('svg').call(zoom);
}
