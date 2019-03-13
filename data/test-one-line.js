// data 2
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
  //barColours: ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"],
  //barLabelColour: "rgb(255, 255, 255)",
  barSpacing: "20px",
  //barFontSize: "20px",
  positionOfValues: "bottom",
  height: "200px",
  width: "300px",
  //xAxis: { name: "Hobbies", labels: ["Play sports"]},
  xAxis: { name: "Hobbies", labels: ["Play sports", "Photography", "Go out with friends"], colour: "rgb(0, 150, 150)"},
  yAxis: { name: "Values", colour: "rgb(150, 0, 0)"},
  // correct for data 2
  labels: [[{colour: "rgb(255, 0, 0)", text: "label1"}]]
  //labels: [{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2", labelColour: "rgb(240, 240, 240)"}, {colour: "rgb(0, 0, 255)", text: "label3"}]
  // error
  //labels: [{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2", labelColour: "rgb(240, 240, 240)"}, {colour: "rgb(0, 0, 255)", text: "label3"}, {text: "label      4"}]
  //
};

const element = '#chart';

drawBarChart(data, options, element);
