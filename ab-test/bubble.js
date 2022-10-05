<script src="https://d3js.org/d3.v5.min.js"></script>
<script>
window.addEventListener('DOMContentLoaded', () => {
  const { body } = document;
  const html = document.documentElement;
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const svg = d3.select('body')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0')
    .style('background-color', 'rgba(0, 0, 0, .5)')
    .style('z-index', 10000);

  svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => d[0])
    .attr('cy', (d) => d[1])
    .attr('r', 6)
    .style('fill', 'red')
    .style('opacity', '0.5')
});
