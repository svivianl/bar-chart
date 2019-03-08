class Chart{

  constructor(){
    // for data:
    // column 1, column 2, column 3 ...
    // [column 1], [column 2], [column 3] ...
    this.data = [];

    this.title = {
      title: 'Chart Title',
      fontSize: {
        value: '',
        uom: 'large'
      },
      fontColour: 'rgb(0, 0, 100)'
    };

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
          value: 400,
          uom: 'px'
        }
      },
      width: {
        input: {
          value: 0,
          uom: 'px'
        },
        max: {
          value: 400,
          uom: 'px'
        }
      },
      numberOfBars: 0
    };

    this.bar = {
      barColours: [],
      // if labelColours has 1 to n colours
      labelColour: 'rgb(0, 0, 0)',
      width: {
        value: 10,
        uom: 'px'
      },
      spacing: {
        value: 2,
        uom: 'px'
      },
      fontSize: {
        value: '',
        uom: 'small'
      },
      // positionOf Values can be center, bottom, top
      positionOfValues: 'center'
    };

    this.axis = {
      xAxis: {
        labels: [],
        name: 'xAxis',
        colour: 'rgb(0, 0, 100)'
      },
      yAxis: {
        //labels: [],
        name: 'yAxis',
        colour: 'rgb(0, 0, 100)'
      }
    };

    // label: array of [colour, label]
    this.labels = [];
  }

  drawBarChart(data, options, element){
    if(element === '#chart'){
      let message = this.setDataProperties(data);
      if(message !== true){
        return message;
      }

      this.setTitleProperties(options);
      this.setDimensions(options);
      message = this.setBarProperties(options);
      if(message !== true){
        return message;
      }

      message = this.setProperties(options);
      if(message !== true){
        return message;
      }


      // calc chart heigh and width
      this.data.forEach((dataAux, index) => {

        let minY = 0;
        let maxY = 0;

        if(Array.isArray(dataAux)){
          for(let i = 0; i < dataAux.length; i++){
            dataAux[i] < 0 ? minY += dataAux[i] : maxY += dataAux[i];
            if(this.bar.barColours[i] === undefined){ this.bar.backgroundColour = this.setColour(this.bar.barColours); }
          }
        }else{
          dataAux < 0 ? minY += dataAux : maxY += dataAux;
          if(this.bar.barColours[0] === undefined){ this.bar.backgroundColour = this.setColour(this.bar.barColours); }
        }

        if(this.chart.height.minValue > minY){ this.chart.height.minValue = minY; }
        if(this.chart.height.maxValue < maxY){ this.chart.height.maxValue = maxY; }
      });

      this.setHeightScale();
      this.setBarWidth();

      return true;

    }else{
      return 'Element must be #chart';
    }
  }

  setDataProperties(data){
    if(! Array.isArray(data)){
      return "data must be an Array";
    }

    if((! Array.isArray(data[0]) && isNaN(data[0]) ) || (Array.isArray(data[0]) && isNaN(data[0][0]))){
      return "data must be an Array of numbers";
    }

    if(data.length === 0){
      return "empty data";
    }

    // data
    this.data = Array.from(data);
    this.chart.numberOfBars = data.length;

    return true;
  }

  setTitleProperties(options){
    // title
    if(options.hasOwnProperty('title')){
      this.title.title = options.title;
    }
    if(options.hasOwnProperty('titleFontSize')){
      this.title.fontSize = Object.assign({}, this.getSplitSizes(options.titleFontSize));
    }
    if(options.hasOwnProperty('titleFontColour')){
      this.title.fontColour = options.titleFontColour;
    }
  }

  setDimensions(options){
        // height and width
    if(options.hasOwnProperty('height')){
      this.chart.height.input = Object.assign({}, this.getSplitSizes(options.height));
    }
    if(options.hasOwnProperty('width')){
      this.chart.width.input = Object.assign({}, this.getSplitSizes(options.width));
    }
  }

  setBarProperties(options){
    // bar
    if(options.hasOwnProperty('barColours')){
      if(! Array.isArray(options.barColours)){
        return "barColours must be an Array";
      }

      if(options.barColours.length === 0){
        return "empty barColours";
      }

      this.bar.barColours = Array.from(options.barColours);
    }

    if(options.hasOwnProperty('barSpacing')){
      this.bar.spacing = Object.assign({}, this.getSplitSizes(options.barSpacing));
      this.bar.spacing.value = ( this.bar.spacing.value / 2 ).toFixed(2);
    }
    if(options.hasOwnProperty('barFontSize')){
      this.chart.fontSize = Object.assign({}, this.getSplitSizes(options.barFontSize));
    }
    if(options.hasOwnProperty('positionOfValues')){
      this.chart.positionOfValues = options.positionOfValues;
    }
    return true;
  }

  setProperties(options){
    // axis
    if(options.hasOwnProperty('xAxis')){
      if(options.xAxis.hasOwnProperty('labels')){
        if(Array.isArray(options.xAxis.labels)){
          this.axis.xAxis.labels = Array.from(options.xAxis.labels);
        }else{
          return "x-axis labels must be an Array";
        }
      }
      if(options.xAxis.hasOwnProperty('name')){
        this.axis.xAxis.name = options.xAxis.name;
      }
      if(options.xAxis.hasOwnProperty('colour')){
        this.axis.xAxis.colour = options.xAxis.colour;
      }
    }
    if(options.hasOwnProperty('yAxis')){
      if(options.yAxis.hasOwnProperty('name')){
        this.axis.yAxis.name = options.yAxis.name;
      }
      if(options.yAxis.hasOwnProperty('colour')){
        this.axis.yAxis.colour = options.yAxis.colour;
      }
    }

    // labels
    if(options.hasOwnProperty('labels')){
      if(! Array.isArray(options.labels)){
        return "labels must be an Array";
      }

      if(options.labels.length === 0){
        return "empty labels";
      }

      if(typeof options.labels[0] !== 'object'){
        return "labels must be an Array of objects";
      }

      if(! options.labels[0].hasOwnProperty('colour')){
        return "labels must be an array of objects with colour and text properties";
      }
      if(! options.labels[0].hasOwnProperty('text')){
        return "labels must be an array of objects with colour and text properties";
      }

      this.labels = Array.from(options.labels);
    }

    ///////////////////// check uoms, they must be px


    ///check number of data and labels
    if(this.data.length !== this.axis.xAxis.labels.length){
      return "number of data must be the same as the number of X-Axis labels";
    }

    return true;

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
      if(splitFontSize[1] === ''){ splitFontSize[1] = 'px'; }
      return { value: splitFontSize[0], uom: splitFontSize[1]};
    }
  }

  createChart(father){
    // Set header
    $(`#${father}`).append($('<h1 id="title_chart"></h1>'));

    let chartHeight = this.getChartHeight();
    let chartWidth = this.getChartWidth();

    $(`#${father}`).append($('<div id="chart_area"></div>'));

    // set tick
    this.setTick(chartHeight, chartWidth);

    // set Y-Axis
    $(`#${father}`).append($('<div id="y_axis"></div>'));
    $('#y_axis').append($(`<span id="span_y_axis">${this.axis.yAxis.name}</span>`));
    $('#y_axis').css('color', this.axis.yAxis.colour);
    $('#y_axis').append($(`<div id="y_labels" style="left: ${"-" + chartHeight.value + chartHeight.uom};"></div>`));

    this.setYLabel(chartHeight);

    // set Bar Chart
    $(`#${father}`).append($('<div id="bar_chart"></div>'));
    $('#bar_chart').css({"height": chartHeight.value + chartHeight.uom, "width": chartWidth.value + chartWidth.uom});

    // set bars
    let barSpacing = this.bar.spacing.value + this.bar.spacing.uom;

    let maxBarHeight = 0;

    this.data.forEach((values, index) => {
      let bar = $('<div class="bar"></div>');
      bar.css({'width': this.bar.width.value + this.bar.width.uom, 'margin-left': barSpacing, 'margin-right': barSpacing});
      $('#bar_chart').append(bar);

      let barHeight = 0;

      // set values
      if(Array.isArray(values)){
        for(let i = values.length - 1; i >= 0; i--){
          this.createBar(bar, values[i], i);
          barHeight += this.getValueHeight(values[i]);
        }
      }else{
        this.createBar(bar, values, index);
        barHeight += this.getValueHeight(values);
      }

      if(maxBarHeight < barHeight){ maxBarHeight = barHeight; }
    });

    // set the bars positions
    $('.bar').css('bottom', (maxBarHeight - chartHeight.value) + chartHeight.uom);

    // set X-Axis
    $(`#${father}`).append($(`<div id="x_axis">${this.axis.xAxis.name}</div>`));
    $('#x_axis').css({'color': this.axis.xAxis.colour, 'left': Number(chartWidth.value) - 250 + chartHeight.uom});
    $(`#${father}`).append($('<div id="x_labels"></div>'));
    this.axis.xAxis.labels.forEach(label => {
      $('#x_labels').append(`<span class="span_x_labels">${label}</span>`);
    });
    let xMargin = this.bar.spacing.value + this.bar.spacing.uom;
    //$('.span_x_labels').css({'color': this.axis.xAxis.colour, 'height': this.bar.width.value + this.bar.width.uom, 'margin-top': xMargin, 'margin-bottom': xMargin});
    $('.span_x_labels').css({'color': this.axis.xAxis.colour, 'width': this.bar.width.value + this.bar.width.uom, 'margin-left': xMargin, 'margin-right': xMargin});

    // set
    if(this.labels.length !== 0){
      $(`#${father}`).append($(`<div id="labels" style="left: ${Number(chartWidth.value) + 200 + chartWidth.uom}; top: ${"-" + chartHeight.value + chartHeight.uom};"></div>`));
      this.labels.forEach(label => {
        $('#labels').append($(`<div id="${label.text}" style="margin: 5px"></div>`));
        $(`#${label.text}`).append($(`<div class="pixel-div" style="background-color:${label.colour}; margin-right: 2px"></div>`));
        $(`#${label.text}`).append($(`<span>${label.text}</span>`));
      });
    }
  }

  createBar(bar, value, i){
    let div = $('<div class="data"></div>');
    bar.append(div);

    let height = this.getValueHeight(value);
    let position = 0;

    switch(this.bar.positionOfValues){
    case 'center':
      // 2 decimal places
      if(height > 25){
        position = 'top: ' + ( height / 2 ).toFixed(2) + this.chart.height.input.uom;
      }
      break;
    case 'bottom':
      position = 'bottom: 0';
      break;
    case 'top':
      position = 'top: 0';
      break;
    }

    div.append($(`<b style="${position}; color: ${this.bar.labelColour}">${value}</b>`));

    div.css({'height': height + this.chart.height.input.uom, 'background-color': this.bar.barColours[i]});
  }

  getConstHeight(chartHeight){
    let constHeight = 0;
    switch(chartHeight.uom){
    case 'px':
      constHeight = 50;
      break;
    case '%':
      constHeight = 20;
      break;
    default:
      constHeight = 50;
      break;
    }
    return constHeight;
  }

  setTick(chartHeight, chartWidth){
    let height = 0;
    let constHeight = this.getConstHeight(chartHeight);

    do{
      let tick = $(`<div class="tick"></div>`);
      $('#chart_area').append(tick);

      let last = false;
      let newHeight = height + constHeight;
      if(newHeight >= chartHeight.value){
        newHeight = chartHeight.value - height;
        last = true;
      }else{
        newHeight = constHeight.value;
        height += constHeight;
      }

      $('.tick').css({height: newHeight + chartHeight.uom, width: chartWidth.value + chartWidth.uom, color: this.axis.yAxis.colour});

      if(last){
        tick.css('border-bottom', 'none');
        break;
      }
    }while(height < chartHeight.value);
  }

  setYLabel(chartHeight){
    let height = 0;
    let constHeight = this.getConstHeight(chartHeight);
    let constValue = Math.round(this.getConstHeight(chartHeight) / this.chart.height.scale);
    let value = 0;

    do{
      /*
      let last = false;
      let newHeight = height + constHeight;
      if(newHeight >= chartHeight.value){
        newHeight = chartHeight.value - height;
        last = true;
      }else{
        height += constHeight;
      }

      value += constValue;

      let tickLabel = $(`<span class="span_y_axis">${value}</span>`);
      $('#y_labels').append(tickLabel);

      $('.span_y_axis').css({width: newHeight + chartHeight.uom, color: this.axis.yAxis.colour});
      if(last){ break; }
      */

      if(height + constHeight >= chartHeight.value){
        break;
      }
      height += constHeight;
      value += constValue;

      let tickLabel = $(`<span class="span_y_axis">${value}</span>`);
      $('#y_labels').append(tickLabel);

      $('.span_y_axis').css({width: constHeight + chartHeight.uom, color: this.axis.yAxis.colour});


    }while(height < chartHeight.value);
  }

  getChartHeight(){
    let height = this.chart.height.max;
    if(this.chart.height.input.value !== 0){ height = this.chart.height.input; }
    return height;
  }

  getChartWidth(){
    // get the input width if there is any
    let width = this.chart.width.max;
    if(this.chart.width.input.value !== 0){ width = this.chart.width.input; }
    return width;
  }

  setHeightScale(){
    let height = this.getChartHeight();
    // 0.05 (5%) of the height must be empty
    let factor = 0.95;
    // if we have negative values, 0.10 (10%) of the height must be empty
    if(this.chart.height.minValue !== 0){ factor = 0.9; }
    // this.height.maxValue - this.height.minValue = 100%
    this.chart.height.scale = factor * height.value / (this.chart.height.maxValue - this.chart.height.minValue);
  }

  getValueHeight(value){
    return Math.abs(value * this.chart.height.scale);
  }

  setBarWidth(){
    // get the input width if there is any
    let width = this. getChartWidth();
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
