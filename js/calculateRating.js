function calculateRating() {
            // parameter names, max values, and colors
            var parameterInfo = [
              { name: "Spatial Component", max: 5, color: "#ff7f0e" },
              { name: "Pre-Processing Time", max: 5, color: "#1f77b4" },
              { name: "Data Density", max: 3, color: "#2ca02c" },
              { name: "Geographical Relevance", max: 3, color: "#d62728" },
              { name: "Element Suitability", max: 3, color: "#9467bd" }
            ];

            // User input for parameter values
            var parameters = [];
            for (var i = 0; i < parameterInfo.length; i++) {
              var value = parseFloat(prompt("Enter the value for " + parameterInfo[i].name + " (Max: " + parameterInfo[i].max + ")"));
              if (isNaN(value)) {
                alert("Invalid input. Please enter a numeric value.");
                window.location.reload();
              }
              parameters.push(value);
            }

            // max value among all parameters
            var maxVal = Math.max(...parameterInfo.map(info => info.max));

            // radius for each parameter
            var radii = parameters.map((value, index) => (value / parameterInfo[index].max) * 100);

            // Create the chart using SVG
            var chart = document.getElementById("chart");
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");

            var centerX = 200; // X-coordinate of the chart center
            var centerY = 200; // Y-coordinate of the chart center
            var angle = 360 / parameterInfo.length; // Fixed angle for each sector

            var startAngle = -90;
            for (var j = 0; j < radii.length; j++) {
              var endAngle = startAngle + angle;

              var startX = centerX + Math.cos((startAngle) * Math.PI / 180) * radii[j];
              var startY = centerY + Math.sin((startAngle) * Math.PI / 180) * radii[j];
              var endX = centerX + Math.cos((endAngle) * Math.PI / 180) * radii[j];
              var endY = centerY + Math.sin((endAngle) * Math.PI / 180) * radii[j];

              var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              path.setAttribute("d", "M" + centerX + "," + centerY + " L" + startX + "," + startY + " A" + radii[j] + "," + radii[j] + " 0 0,1 " + endX + "," + endY + " Z");
              path.setAttribute("fill", parameterInfo[j].color);
              svg.appendChild(path);

              // Display parameter names outside the chart, tangent to their respective sections
              var labelX = centerX + Math.cos(((startAngle + endAngle) / 2) * Math.PI / 180) * (radii[j] + 10);
              var labelY = centerY + Math.sin(((startAngle + endAngle) / 2) * Math.PI / 180) * (radii[j] + 10);
              var parameterLabel = document.createElement("div");
              parameterLabel.innerText = parameterInfo[j].name;
              parameterLabel.style.color = parameterInfo[j].color;
              parameterLabel.style.left = labelX + "px";
              parameterLabel.style.top = labelY + "px";
              parameterLabel.classList.add("parameter-label");
              chart.appendChild(parameterLabel);

              // Display the table with the grade for each parameter
              var table = document.getElementById("parameter-table");
              var newRow = table.insertRow(-1);
              var parameterCell = newRow.insertCell(0);
              var valueCell = newRow.insertCell(1);
              var gradeCell = newRow.insertCell(2);

              parameterCell.innerHTML = parameterInfo[j].name;
              valueCell.innerHTML = parameters[j] + "/" + parameterInfo[j].max;
              gradeCell.innerHTML = ((parameters[j] / parameterInfo[j].max) * 100).toFixed(0) + "%";

              startAngle = endAngle;
            }

            chart.appendChild(svg);

            // Calculate and display the final grade
            var totalScore = parameters.reduce((acc, val) => acc + val, 0);
            var maxPossibleScore = parameterInfo.reduce((acc, info) => acc + info.max, 0);
            var finalGrade = (totalScore / maxPossibleScore) * 100;
            var finalGradeText = "Final grade: " + finalGrade.toFixed(2) + "%";
            var finalGradeElement = document.getElementById("final-grade");
            finalGradeElement.innerText = finalGradeText;
}