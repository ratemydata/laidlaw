"use strict";

function loadMappabilityRating() {
    let isMapVisible = $('#mapWrapper').is(":visible");
    if (isMapVisible) {
        let mapCollapse = document.getElementById('mapWrapper');
        let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
            toggle: true
        });
    }

    let isGraphVisible = $('#assetDataWrapperWrapper').is(":visible");
    if (isGraphVisible) {
        let graphCollapse = document.getElementById('assetDataWrapperWrapper');
        let gsGraphCollapse = new bootstrap.Collapse(graphCollapse, {
            toggle: true
        });
    }

    let isRatingVisible = $('#mapAbilityWrapper').is(":visible");
    if (!isRatingVisible) {
        let ratingCollapse = document.getElementById('mapAbilityWrapper');
        let gsRatingCollapse = new bootstrap.Collapse(ratingCollapse, {
            toggle: true
        });
    }

    document.getElementById("mapAbilityWrapper").innerHTML = `<div><button type="button" class="btn btn-primary ms-4" onclick="closeMappability()">Close Rating</button>`
        + `<div id="mapAbility" class="vw-100" style="height:calc(100% - 165px);width:100%;border-color='blue';border-width=5px;"></div>`;

    // Integrate HTML structure here
    document.getElementById("mapAbility").innerHTML += `
        <div id="mapAbility" class="vw-100" style="height:calc(100% - 165px);width:100%;border-color='blue';border-width=5px;">
            <style>
                #layout-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                #chart-container {
                    width: 700px;
                    height: 700px;
                }
                #input-container {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    justify-content: center;
                }
                .input-container {
                    margin: 0;
                }
                #action-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                    margin-top: 20px;
                }
                #weighted-mean {
                    font-size: 16px;
                    color: black;
                }
            </style>
            <div id="layout-container">
                <div id="input-container">
                    <div class="input-container">
                        <div style="display: inline-block; width: 12px; height: 12px; background-color: ${d3.schemeCategory10[0]}; margin-right: 5px;"></div>
                        <label for="rating1">Data format:</label>
                        <input type="number" id="rating1" min="0" max="5" step="1">
                    </div>
                    <div class="input-container">
                        <div style="display: inline-block; width: 12px; height: 12px; background-color: ${d3.schemeCategory10[1]}; margin-right: 5px;"></div>
                        <label for="rating2">Pre-processing time:</label>
                        <input type="number" id="rating2" min="0" max="5" step="1">
                    </div>
                    
                    <div class="input-container">
                        <div style="display: inline-block; width: 12px; height: 12px; background-color: ${d3.schemeCategory10[2]}; margin-right: 5px;"></div>
                        <label for="rating3">Spatial density:</label>
                        <input type="number" id="rating3" min="0" max="5" step="1">
                    </div>
                    
                    <div class="input-container">
                        <div style="display: inline-block; width: 12px; height: 12px; background-color: ${d3.schemeCategory10[3]}; margin-right: 5px;"></div>
                        <label for="rating4">Geographical relevance:</label>
                        <input type="number" id="rating4" min="0" max="5" step="1">
                    </div>
                    
                    <div class="input-container">
                        <div style="display: inline-block; width: 12px; height: 12px; background-color: ${d3.schemeCategory10[4]}; margin-right: 5px;"></div>
                        <label for="rating5">Choice of representation:</label>
                        <input type="number" id="rating5" min="0" max="5" step="1">
                    </div>

                    <div class="input-container">
                        <div style="display: inline-block; width: 12px; height: 12px; background-color: ${d3.schemeCategory10[5]}; margin-right: 5px;"></div>
                        <label for="rating6">Time density:</label>
                        <input type="number" id="rating6" min="0" max="5" step="1">
                    </div>

                    <div id="action-container">
                        <button id="calculate-button">Calculate</button>
                        <div id="weighted-mean"></div>
                    </div>
                </div>
                <div id="chart-container">
                    <svg id="chart"></svg>
                </div>
            </div>
        </div>
    `; 


    // Integrate JavaScript logic here
    const factors = [
        { label: "Factor 1", weighting: 0.25 },
        { label: "Factor 2", weighting: 0.25 },
        { label: "Factor 3", weighting: 0.2 },
        { label: "Factor 4", weighting: 0.1 },
        { label: "Factor 5", weighting: 0.1 },
        { label: "Factor 6", weighting: 0.1 }
    ];

    const chartContainer = document.getElementById('chart-container');
    const chart = document.getElementById('chart');
    const weightedMean = document.getElementById('weighted-mean');

    const width = chartContainer.offsetWidth;
    const height = chartContainer.offsetHeight;
    const radius = Math.min(width, height) / 2;

    const colorScheme = d3.schemeCategory10;

    const pie = d3.pie()
        .value(d => d.weighting)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius((d, i) => (d.data.rating / 5) * radius)
        .cornerRadius(8)
        .padAngle(0.02);

    const svg = d3.select('#chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const radarCircles = [1, 2, 3, 4, 5];
    const radarLines = factors.length;

    const radarCircleData = svg.selectAll('.radar-circle')
        .data(radarCircles)
        .enter()
        .append('circle')
        .attr('class', 'radar-circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', d => (d / 5) * radius)
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('stroke-width', '1px')
        .style('stroke-opacity', '0.3');

    const radarLineData = d3.range(radarLines).map(d => {
        const angle = (d / radarLines) * Math.PI * 2;
        return [
            { x: 0, y: 0 },
            { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
        ];
    });

    const radarLabelsData = svg.selectAll('.radar-label')
        .data(radarCircles)
        .enter()
        .append('text')
        .attr('class', 'radar-label')
        .attr('x', 0)
        .attr('y', d => -((d / 5) * radius)+10)
        .attr('dy', '0.3em')
        .text(d => d);

    const chartSectors = svg.selectAll('path')
        .data(pie(factors))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => {
            const color = d3.color(colorScheme[i]);
            color.opacity = 0.8;
            return color + '';
        });

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

        const updatedData = factors.map((factor, i) => ({
            label: factor.label,
            weighting: factor.weighting,
            rating: ratings[i]
        }));

        chartSectors.data(pie(updatedData))
            .transition()
            .duration(500)
            .attrTween('d', function (d) {
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        const weightedMeanValue = calculateWeightedMean(ratings);
        weightedMean.innerHTML = `Weighted Mean: ${weightedMeanValue}`;
    }

    document.getElementById('calculate-button').addEventListener('click', updateChart);
}

function closeMappability() {
    let isMapVisible = $('#mapWrapper').is(":visible");
    if (!isMapVisible) {
        let mapCollapse = document.getElementById('mapWrapper');
        let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
            toggle: true
        });
    }

    let isRatingVisible = $('#mapAbilityWrapper').is(":visible");
    if (isRatingVisible) {
        let ratingCollapse = document.getElementById('mapAbilityWrapper');
        let rsratingCollapse = new bootstrap.Collapse(ratingCollapse, {
            toggle: true
        });
    }

    let isGraphVisible = $('#assetDataWrapperWrapper').is(":visible");
    if (isGraphVisible) {
        let graphCollapse = document.getElementById('assetDataWrapperWrapper');
        let gsGraphCollapse = new bootstrap.Collapse(graphCollapse, {
            toggle: true
        });
    }
}
