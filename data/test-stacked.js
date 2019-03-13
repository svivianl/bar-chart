
// data 1
const data = [
  // column 1
  [42, 30, 81, 23],
  // column 2
  [26, 59, 11, 77],
  // column 3
  [27, 63, 57]
  // ...
];

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
  height: "400px",
  width: "400px",
  //xAxis: { name: "Hobbies", labels: ["Play sports"]},
  xAxis: { name: "Hobbies", labels: ["Play sports", "Photography", "Go out with friends"], colour: "rgb(0, 150, 150)"},
  yAxis: { name: "Values", colour: "rgb(150, 0, 0)"},
  //must return error
  //labels: [["rgb(255, 0, 0)", "label1"]]
  //labels: [{colour: "rgb(0, 0, 200)", text: "label1"}, {colour: "rgb(0, 200, 100)", text: "label2"}, {colour: "rgb(80, 50, 155)", text: "label 3", labelColour: "rgb(240, 240, 240)"}, {colour: "rgb(255, 0, 100)", text: "label4"}, {colour: "rgb(177, 200, 20)", text: "label5"}, {colour: "rgb(50, 250, 155)", text: "label6"}]
  //labels: [{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2"}, {colour: "rgb(0, 0, 255)", text: "label3"}]
  //labels: [{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2", labelColour: "rgb(240, 240, 240)"}, {colour: "rgb(0, 0, 255)", text: "label3"}, {text: "label      4"}, {text: "label5"}, {text: "label6", labelColour: "rgb(240, 240, 240)"}, {text: "label7"}, {text: "label      8"}, {text: "label9"}, {text: "label     10", labelColour: "rgb(40, 40, 40)"}, {text: "label11"}, {text: "label  12"}, {text: "label  13", labelColour: "rgb(40, 40, 40)"}, {text: "label14"}]
  //
  //correct for data 1
  //labels: [[{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2", labelColour: "rgb(240, 240, 240)"}, {colour: "rgb(0, 0, 255)", text: "label3"}, {text: "label      4", fontSize: '25px'}]]
  labels: [{colour: "rgb(255, 0, 0)", text: "label1"}, {colour: "rgb(0, 255, 0)", text: "label2", labelColour: "rgb(240, 240, 240)"}, {colour: "rgb(0, 0, 255)", text: "label3"}, {text: "label      4"}, {text: "label5"}, {text: "label6", labelColour: "rgb(240, 240, 240)"}, {text: "label7"}, {text: "label      8"}, {text: "label9"}, {text: "label     10", labelColour: "rgb(40, 40, 40)"}, {text: "label11"}]
};

const element = '#chart';

drawBarChart(data, options, element);
