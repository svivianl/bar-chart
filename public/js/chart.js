class Chart{

  constructor(){
    // for data:
    // column 1, column 2, column 3 ...
    // [column 1], [column 2], [column 3] ...
    this.data = [];

    this.chart = {
      height: {
        minValue: 0,
        maxValue: 5,
        scale: 1,
        max: {
          value: 800,
          uom: 'px'
        }
      },
      width: {
        input: {
          value: 800,
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
      barWidth: {
        value: 10,
        uom: '%'
      },
      labelColour: 'rgb(0, 0, 0)',
      barSpacing: {
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
      this.numberOfBars = this.data.length;
/*
      this.title.title = options.title;
      this.title.fontSize = this.getSplitSizes(options.titleFontSize);
      this.title.fontColour = options.titleFontColour;

      this.chart.height = options.height;
      this.chart.width = options.width;
      this.chart.barColours = options.barColours;
      this.chart.labelColour = options.labelColour;
      this.chart.barSpacing = this.getSplitSizes(options.barSpacing);
      this.chart.barSpacing.value = this.chart.barSpacing.value / 2;
      this.chart.fontSize = this.getSplitSizes(options.fontSize);
      this.chart.positionOfValues = options.positionOfValues;
*/
      //this.xAxis = options.xAxis

      // calc chart heigh and width
      let minY = 0;
      let maxY = 0;
      data.forEach((dataAux, index) => {
        //if(dataAux.length > this.numberOfBars){ this.numberOfBars = dataAux.length; }

        for(let i = 0; i < dataAux.length; i++){
          if(dataAux[i] < 0){
            if(dataAux[i] < minY){ minY += dataAux[i]; }
          }else{
            if(dataAux[i] < maxY){ maxY += dataAux[i]; }
          }
        }
      });

      this.chart.height.min = minY;
      this.chart.height.max = maxY;
     // if((this.heigh.max - this.height.min) > )
      //this.height.scale =


      //this.width = ( ( 2 * this.numberOfBars - 1 ) * this.convert.x );

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
    return {
      height: this.height,
      width: this.width
    };
  }

  setBarWidth(screenWidth){
    this.chart.barWidth.value = Math.trunc(screenWidth / (2 * this.numberOfBars - 1 ));
    //this.barWidth = Math.round(screenWidth / ((1 + ( 2 * this.numberOfBars - 1 ) ) * this.convert.x));
  }

  getBarWidth(){
    return this.barWidth;
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
    let barSpacing = this.bar.barSpacing.value + this.bar.barSpacing.uom;
    this.data.forEach((values, index) => {
      let bar = $('<div class="bar"></div>');
      bar.css({'width': this.bar.barWidth.value + this.bar.barWidth.uom, 'margin-left': barSpacing, 'margin-right': barSpacing});
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
    if(this.bar.barColours[i] !== undefined){ backgroundColour = this.bar.barColours[i]; }
    div.css({'background-color': backgroundColour, 'color': this.bar.labelColour});
  }

}
