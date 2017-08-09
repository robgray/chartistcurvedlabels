/**
 * Chartist.js plugin to display the labels on curved points.
 *
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    textAnchor: 'middle',
    align: 'center'
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.curvedDonutLabels = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function curvedDonutLabels(chart) {
        if (chart instanceof Chartist.Pie && chart.options.donut === true) {
            chart.on('draw', function(data) {                                
                if (data.type === "slice") {
                    
                    var halfDonutWidth = chart.options.donutWidth / 2;

                    // Create arc path definitions for every slice.
                    // 
                    var defsNode = chart.svg.querySelector("defs");
                    if (!defsNode)
                    {
                        defsNode = chart.svg.elem("defs", null, null, true);
                    }

                    // Check if there is only one non-zero value in the series array.
                    var hasSingleValInSeries = chart.data.series.filter(function(val) {
                        return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;
                    }).length === 1;
                    
                    // Create a new path for this slice.
                    // Create the arc.
                    var overlappigStartAngle = Math.max(0, data.startAngle - (data.index === 0 || hasSingleValInSeries ? 0 : 0.2));

                    var start = Chartist.polarToCartesian(data.center.x, data.center.y, data.radius - halfDonutWidth, overlappigStartAngle),
                        end = Chartist.polarToCartesian(data.center.x, data.center.y, data.radius - halfDonutWidth, data.endAngle);

                    var arcTextPath = new Chartist.Svg.Path()
                                        .move(start.x, start.y)
                                        .arc(data.radius - halfDonutWidth, data.radius - halfDonutWidth, 0, data.endAngle - data.startAngle > 180, 1, end.x, end.y);
                    
                    defsNode.elem("path", { id: chart.container.id + "_textPath" + data.index, d: arcTextPath.stringify() });

                } else if (data.type === "label") {                    
                    var textNode = data.element;                    
                    
                    // Get ride of the current text in the text node.
                    textNode.empty();

                    textNode.attr({ dx: "", dy: "" });                    
                    textNode.elem("textPath", { ['xlink:href']: "#" + chart.container.id + "_textPath" + data.index, startOffset: "50%" }, null, true).text(data.text);                    
                }
            });
        }
    };
  };

}(window, document, Chartist));