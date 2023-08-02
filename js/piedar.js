document.addEventListener('DOMContentLoaded', function() {
  const factors = [
    { label: "Spatial Component", weighting: 0.4 },
    { label: "Spatial Density", weighting: 0.1 },
    { label: "Time Density", weighting: 0.05 },
    { label: "Geographical Relevance", weighting: 0.15 },
    { label: "Spatial Elements", weighting: 0.1 },
    { label: "Pre-Processing Steps", weighting: 0.2 }
  ];

  const chartContainer = document.getElementById('chart-container');
  const chart = document.getElementById('chart');
  const weightedMean = document.getElementById('weighted-mean');

  const width = chartContainer.offsetWidth;
  const height = chartContainer.offsetHeight;
  const radius = Math.min(width, height) / 2;

  const margin = 100; // Increase the margin size for the chart

  const colorScheme = d3.schemeCategory10;

  const pie = d3.pie()
    .value(d => d.weighting)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - margin) // Reduce the radius by the margin
    .cornerRadius(8)
    .padAngle(0.02);

  const svg = d3.select('#chart')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const radarCircles = [1, 2, 3, 4, 5];

  const radarCircleData = svg.selectAll('.radar-circle')
    .data(radarCircles)
    .enter()
    .append('circle')
    .attr('class', 'radar-circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', d => (d / 5) * (radius - margin)) // Reduce the radius by the margin
    .style('fill', 'none')
    .style('stroke', '#000')
    .style('stroke-width', '1px')
    .style('stroke-opacity', '0.3');

  const radarNumbersData = svg.selectAll('.radar-number')
    .data(radarCircles)
    .enter()
    .append('text')
    .attr('class', 'radar-number')
    .attr('x', 0)
    .attr('y', d => -((d / 5) * (radius - margin))) // Reduce the radius by the margin
    .attr('dy', '0.3em')
    .text(d => d);

  const chartSectors = svg.selectAll('path')
    .data(pie(factors))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => colorScheme[i]);

  function calculateWeightedMean(ratings) {
    let weightedSum = 0;
    let totalWeight = 0;

    ratings.forEach((rating, i) => {
      weightedSum += rating * factors[i].weighting;
      totalWeight += factors[i].weighting;
    });

    return (weightedSum / totalWeight).toFixed(2);
  }

  function updateChart() {
    const ratings = factors.map((factor, i) => parseInt(document.getElementById(`rating${i + 1}`).value));
    const rating6 = parseInt(document.getElementById('rating6').value);
    ratings.push(rating6);

    const updatedData = factors.map((factor, i) => ({
      label: factor.label,
      weighting: factor.weighting,
      rating: ratings[i]
    }));

    const newFactorData = {
      label: factors[5].label,
      weighting: factors[5].weighting,
      rating: ratings[5]
    };
    updatedData.push(newFactorData);

    const updatedArc = d3.arc()
      .innerRadius(0)
      .outerRadius(d => (d.data.rating / 5) * (radius - margin)) // Reduce the radius by the margin
      .cornerRadius(8)
      .padAngle(0.02);

    const updatedPie = d3.pie()
      .value(d => d.weighting)
      .sort(null);

    const updatedChartSectors = svg.selectAll('path')
      .data(updatedPie(updatedData));

    updatedChartSectors
      .enter()
      .append('path')
      .attr('class', 'radar-sector')
      .merge(updatedChartSectors)
      .transition()
      .duration(500)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return updatedArc(interpolate(t));
        };
      })
      .attr('fill', (d, i) => colorScheme[i]);

    updatedChartSectors.exit().remove();

    const weightedMeanValue = calculateWeightedMean(ratings);
    weightedMean.innerHTML = `Weighted Mean: ${weightedMeanValue}`;
  }

  document.getElementById('calculate-button').addEventListener('click', updateChart);
});
