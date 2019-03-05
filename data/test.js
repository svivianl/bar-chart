const data = [
  // column 1
  [42, 30, 81, 23, -5],
  // column 2
  [26, 59, 11, 77],
  // column 3
  [27, 63, 57],
  // column 4
  [-42, -30, -81, -23]
];


const options = {
  "title": "Hobbies",
  "titleFontSize": "80px",
  "titleFontColour": "rgb(15, 15, 15)",
  // [colour for the first value of the columns,
  //  colour for the second value of the columns,
  //  colour for the third value of the columns,
  //  ...]
  "barColours": ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"],
  "labelColour": "rgb(35, 35, 35)",
  "barSpacing": "10px",
  "fontSize": "15px",
  "positionOfValues": "bottom",
  xAxis: { name: "Hobbies", labels: ["Play sports", "Photography", "Go out with friends", "Cooking" ]},
  yAxis: { name: "Values"}
};

const element = '#chart';

drawBarChart(data, options, element);
