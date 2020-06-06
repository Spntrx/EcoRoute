// Get results array from local storage
var storageResults = JSON.parse(sessionStorage.getItem("results"));
var allModes = [];
var co2Values = [];

// Split up results array into two new arrays to populate the graph
for(i=0; i<storageResults.length; i++){
    allModes.push(keyTranslator(storageResults[i].mode)); 
    co2Values.push(storageResults[i].co2);
}

// Render graph
var ctx = document.getElementById('emissionsGraph').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: allModes,
        datasets: [{
            label: "CO₂ Emissions in grams",
            backgroundColor: 'rgb(20, 125, 20)',
            borderColor: 'rgb(20, 125, 20)',
            borderWidth: 1,
            data: co2Values
            }]
        },
        options: {
            animation: {
                duration: 1,
                onProgress: function() {
                  var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
          
                  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';
        
                  this.data.datasets.forEach(function(dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                      var data = dataset.data[index];
                      ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                  });
                }
            },
            legend: {
                display: true
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }],
            }
        }
    });

//Filling in map content
