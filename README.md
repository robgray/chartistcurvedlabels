# Curved labels plugin for Chartist.js

This is a chartist-js (https://gionkunz.github.io/chartist-js/index.html) javascript plugin that converts horizontal labels to curved labels on donut charts.

Labels are placed horizontally by default.  This plugin will orient the labels inside each donut "slice" and curve the labels, following the curve of the donut.

To use, simply include this plugin in your list plugins in the option object you pass into the chartist chart you create.  It looks for Pie charts with donut = true, so will only work with those types.

```javascript
var defaultOptions = {
  textAnchor: "middle",
  align: "center"
}
```

Example to create a chart with curved labels
```javascript
var curvedOptions = {
        donut: true,
        donutWidth: 45,
        donutSolid: true,
        startAngle: 0,
        showLabel: true,
        width: 400,
        height: 400, 
        plugins: [            
          Chartist.plugins.curvedDonutLabels(),                                
        ]          
      };  

      new Chartist.Pie("#donutCurvedLabels", donutData, curvedOptions);
```
