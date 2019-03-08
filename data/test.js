/*
const data = [
  // column 1
  [42, 30, 81, 23],
  // column 2
  [26, 59, 11, 77],
  // column 3
  [27, 63, 57]
  // ...
];
*/

// each elemet is a column
const data = [42, 30, 81];


const options = {
  title: "Hobbies",
  titleFontSize: "80px",
  titleFontColour: "rgb(15, 15, 15)",
  // [colour for the first value of the columns,
  //  colour for the second value of the columns,
  //  colour for the third value of the columns,
  //  ...]
  barColours: ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"],
  labelColour: "rgb(35, 35, 35)",
  barSpacing: "20px",
  fontSize: "15px",
  positionOfValues: "bottom",
  height: "400px",
  width: "400px",
  //xAxis: { name: "Hobbies", labels: ["Play sports"]},
  xAxis: { name: "Hobbies", labels: ["Play sports", "Photography", "Go out with friends"]},
  yAxis: { name: "Values"},
  //labels: [["rgb(255, 0, 0)", "label1"]]
  labels: [{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2"}, {colour: "rgb(0, 0, 255)", text: "label3"}]
};

const element = '#chart';

drawBarChart(data, options, element);
