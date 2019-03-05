class Chart{

  constructor(){
    // for data:
    // column 1, column 2, column 3 ...
    // [column 1], [column 2], [column 3] ...
    this.data = [];

    this.chart = {
      height: {
        minValue: 0,
        maxValue: 0,
        scale: 1,
        input: {
          value: 0,
          uom: 'px'
        },
        max: {
          value: 800,
          uom: 'px'
        }
      },
      width: {
        input: {
          value: 0,
          uom: 'px'
        },
        max: {
          value: 800,
          uom: 'px'
        }
      },
      numberOfBars: 0
    };

    this.title = {
      title: 'Chart Title',
      fontSize: {
        value: '',
        uom: 'large'
      },
      fontColour: 'rgb(0, 0, 100)'
    };

    this.bar = {
      barColours: ["rgb(200, 0, 0)", "rgb(0, 200, 0)", "rgb(0, 0, 200)"],
      width: {
        value: 10,
        uom: '%'
      },
      labelColour: 'rgb(0, 0, 0)',
      spacing: {
        value: 2,
        uom: 'px'
      },
      fontSize: {
        value: '',
        uom: 'small'
      },
      positionOfValues: 'middle'
    };

    this.axis = {
      xAxis: {
        labels: [],
        name: 'xAxis',
        colour: 'rgb(0, 0, 100)'
      },
      yAxis: {
        labels: [],
        name: 'yAxis',
        colour: 'rgb(0, 0, 100)'
      }
    };
  }

  drawBarChart(data, options, element){
    if(element === '#chart'){
      this.data = data;
      this.chart.numberOfBars = data.length;
/*
      this.title.title = options.title;
      this.title.fontSize = this.getSplitSizes(options.titleFontSize);
      this.title.fontColour = options.titleFontColour;

      this.chart.height = options.height;
      this.chart.width = options.width;
      this.chart.barColours = options.barColours;
      this.chart.labelColour = options.labelColour;
      this.bar.spacing = this.getSplitSizes(options.barSpacing);
      this.bar.spacing.value = this.bar.spacing.value / 2;
      this.chart.fontSize = this.getSplitSizes(options.fontSize);
      this.chart.positionOfValues = options.positionOfValues;
*/
      //this.xAxis = options.xAxis

      // calc chart heigh and width
      let minY = 0;
      let maxY = 0;
      data.forEach((dataAux, index) => {
        if(Array.isArray(dataAux)){
          for(let i = 0; i < dataAux.length; i++){
            if(dataAux[i] < 0){
              if(dataAux[i] < minY){ minY += dataAux[i]; }
            }else{
              if(dataAux[i] > maxY){ maxY += dataAux[i]; }
            }
          }
        }else{
          if(dataAux < 0){
            if(dataAux < minY){ minY += dataAux; }
          }else{
            if(dataAux > maxY){ maxY += dataAux; }
          }
        }
      });

      this.chart.height.minValue = minY;
      this.chart.height.maxValue = maxY;

      this.setHeightScale();
      this.setBarWidth();

      return true;

    }else{
      return 'Element must be #chart';
    }
  }

  getTitle(){
    return this.title;
  }

  setTitle(title){
    this.title.title = title.title;
    this.title.fontSize = title.fontSize;
    this.title.fontColour = title.fontColour;
  }

  setTitleColour(value){
    this.title.fontColour = value;
  }

  getMeasure(){
    // get the input height if there is any
    let height = this.chart.height.max;
    if(this.chart.height.input.value !== 0){ height = this.chart.height.input; }

    // get the input width if there is any
    let width = this.chart.width.max;
    if(this.chart.width.input.value !== 0){ width = this.chart.width.input; }

    return {
      height: height,
      width: width
    };
  }

  getSplitSizes(value){
    let absolute = /^\d+/.test(value);
    if(absolute === false){
      return { value: '', uom: value};
    }else{
      let splitFontSize = value.replace(/(\d+)(\D+)/, "$1|$2");
      splitFontSize = splitFontSize.split('|');
      return { value: splitFontSize[0], uom: splitFontSize[1]};
    }
  }

  createChart(father){
    // Set header
    $(`#${father}`).append($('<h1 id="title_chart"></h1>'));

    // set Y-Axis
    $(`#${father}`).append($('<div id="y_axis"></div>'));
    $('#y_axis').append($(`<span id="span_y_axis">${this.axis.yAxis.name}</span>`));
    $('#y_axis').append($('<div id="y_labels"></div>'));

    //$('#y_labels').append($(`<span id="span_y_axis">${this.chart.yAxis.name}</span>`));

    // set Bar Chart
    $(`#${father}`).append($('<div id="bar_chart"></div>'));
    // set bars
    let barSpacing = this.bar.spacing.value + this.bar.spacing.uom;
    this.data.forEach((values, index) => {
      let bar = $('<div class="bar"></div>');
      bar.css({'width': this.bar.width.value + this.bar.width.uom, 'margin-left': barSpacing, 'margin-right': barSpacing});
      $('#bar_chart').append(bar);

      // set values
      if(Array.isArray(values)){
        for(let i = values.length - 1; i >= 0; i--){
          this.createBar(bar, values[i], i);
        }
      }else{
        this.createBar(bar, values, 0);
      }
    });

    // set X-Axis
    $(`#${father}`).append($(`<div id="x_axis">${this.axis.xAxis.name}</div>`));
  }

  createBar(bar, value, i){
    let div = $('<div class="data"></div>');
    bar.append(div);
    div.append($(`<b>${value}</b>`));
    let backgroundColour = 'rgb(255, 255, 0, .25)';
    if(this.bar.barColours[i] === undefined){ this.bar.backgroundColour = this.setColour(this.bar.barColours); }
    backgroundColour = this.bar.barColours[i];
    div.css({'height': Math.abs(value * this.chart.height.scale) + this.chart.height.input.uom, 'background-color': backgroundColour, 'color': this.bar.labelColour});
  }

  setHeightScale(){
    // get the input height if there is any
    let height = this.chart.height.max;
    if(this.chart.height.input.value !== 0){ height = this.chart.height.input; }
    // 0.05 (5%) of the height must be empty
    let factor = 0.95;
    // if we have negative values, 0.10 (10%) of the height must be empty
    if(this.chart.height.min !== 0){ factor = 0.9; }
    // this.height.maxValue - this.height.minValue = 100%
    this.chart.height.scale = factor * height.value / (this.chart.height.maxValue - this.chart.height.minValue);
  }

  setBarWidth(){
    // get the input width if there is any
    let width = this.chart.width.max;
    if(this.chart.width.input.value !== 0){ width = this.chart.width.input; }
    this.bar.width.value = width.value / this.chart.numberOfBars - 2 * this.bar.spacing.value;
    this.bar.width.uom = width.uom;
  }

  setColour(colours){
    let colour = 'rgb(255, 255, 0, .25)';

    do{
      colour = this.randomColour();
    }while(colours.includes(colour));

    colours.push(colour);
    return colours;
  }

  randomColour(){
    // random goes from 0 to 1 and does not include 1
    // use Math.floor to make the number withdout decimal

    // get a "red" from 0 to 255
    let r = Math.floor(Math.random() * 256);
    // get a "green" from 0 to 255
    let g = Math.floor(Math.random() * 256);
    // get a "blue" from 0 to 255
    let b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

}
