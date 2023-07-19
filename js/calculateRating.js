"use strict"
alert("this is code outside a function so is called as soon as the page loads");
function calculateRating() {
          

            // parameter names, max values, and colors
            let parameterInfo = [
              { name: "Spatial Component", max: 5, color: "#ff7f0e" },
              { name: "Pre-Processing Time", max: 5, color: "#1f77b4" },
              { name: "Data Density", max: 3, color: "#2ca02c" },
              { name: "Geographical Relevance", max: 3, color: "#d62728" },
              { name: "Element Suitability", max: 3, color: "#9467bd" }
            ];

            // User input for parameter values
            let parameters = [];
            for (let i = 0; i < parameterInfo.length; i++) {
              let value = parseFloat(prompt("Enter the value for " + parameterInfo[i].name + " (Max: " + parameterInfo[i].max + ")"));
              if (isNaN(value)) {
                alert("Invalid input. Please enter a numeric value.");
                window.location.reload();
              }
              parameters.push(value);
            }

            // max value among all parameters
            let maxVal = Math.max(...parameterInfo.map(info => info.max));

            // radius for each parameter
            let radii = parameters.map((value, index) => (value / parameterInfo[index].max) * 100);

            // Create the chart using SVG
            let chart = document.getElementById("ratingWrapper");
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");

            let centerX = 200; // X-coordinate of the chart center
            let centerY = 200; // Y-coordinate of the chart center
            let angle = 360 / parameterInfo.length; // Fixed angle for each sector

            let startAngle = -90;
            for (let j = 0; j < radii.length; j++) {
              let endAngle = startAngle + angle;

              let startX = centerX + Math.cos((startAngle) * Math.PI / 180) * radii[j];
              let startY = centerY + Math.sin((startAngle) * Math.PI / 180) * radii[j];
              let endX = centerX + Math.cos((endAngle) * Math.PI / 180) * radii[j];
              let endY = centerY + Math.sin((endAngle) * Math.PI / 180) * radii[j];

              let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              path.setAttribute("d", "M" + centerX + "," + centerY + " L" + startX + "," + startY + " A" + radii[j] + "," + radii[j] + " 0 0,1 " + endX + "," + endY + " Z");
              path.setAttribute("fill", parameterInfo[j].color);
              svg.appendChild(path);

              // Display parameter names outside the chart, tangent to their respective sections
              let labelX = centerX + Math.cos(((startAngle + endAngle) / 2) * Math.PI / 180) * (radii[j] + 10);
              let labelY = centerY + Math.sin(((startAngle + endAngle) / 2) * Math.PI / 180) * (radii[j] + 10);
              let parameterLabel = document.createElement("div");
              parameterLabel.innerText = parameterInfo[j].name;
              parameterLabel.style.color = parameterInfo[j].color;
              parameterLabel.style.left = labelX + "px";
              parameterLabel.style.top = labelY + "px";
              parameterLabel.classList.add("parameter-label");
              chart.appendChild(parameterLabel);

              // Display the table with the grade for each parameter
              let table = document.getElementById("parameter-table");
              let newRow = table.insertRow(-1);
              let parameterCell = newRow.insertCell(0);
              let valueCell = newRow.insertCell(1);
              let gradeCell = newRow.insertCell(2);

              parameterCell.innerHTML = parameterInfo[j].name;
              valueCell.innerHTML = parameters[j] + "/" + parameterInfo[j].max;
              gradeCell.innerHTML = ((parameters[j] / parameterInfo[j].max) * 100).toFixed(0) + "%";

              startAngle = endAngle;
            }

            chart.appendChild(svg);

            // Calculate and display the final grade
            let totalScore = parameters.reduce((acc, val) => acc + val, 0);
            let maxPossibleScore = parameterInfo.reduce((acc, info) => acc + info.max, 0);
            let finalGrade = (totalScore / maxPossibleScore) * 100;
            let finalGradeText = "Final grade: " + finalGrade.toFixed(2) + "%";
            let finalGradeElement = document.getElementById("final-grade");
            finalGradeElement.innerText = finalGradeText;
}