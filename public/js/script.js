let elementsIds = {
  chart: {
    id: 'chart',
    title: 'title_chart',
    btnChartSettings: 'btn_chart_settings'
  },
  chartSettings: {
    popup: 'popup_chart_settings',
    changeTilte: {
      title: 'title_chart_change',

      fontSize: 'title_font_size',
      dropbox: 'select_title_font_size',
      fontColour: 'title_font_colour',
      changeColour: 'btn_change_chart_title_colour',
      colour: {
        id: 'chart_title_colour',
        pixel: 'pixel-div',
        btnUpdate: 'btn_update_chart_title_colour',
        btnCancel: 'btn_cancel_chart_title_colour'
      }

    },

    btnUpdate: 'btn_update_chart_settings',
    btnCancel: 'btn_cancel_chart_settings'
  }
};

function setMessage(message){
  $('.container').css('display', 'block');
  $('#message').text(message);
}

let chart = new Chart;

function drawBarChart(data, options, element){
  let message = chart.drawBarChart(data, options, element);
  //message !== true ? $('.container').css('display', '') : chart.createChart(elementsIds.chart.id);
  if(message !== true){
    setMessage(message);
  }else{
    chart.createChart(elementsIds.chart.id);
    /*try{
      chart.createChart(elementsIds.chart.id);
    }catch(e){
      setMessage(e.message);
    }*/
  }
}

// toggle popup's visibility
function toggleVisibility(id) {
  let e = document.getElementById(id);
  e.style.display === 'block' ? e.style.display = 'none' : e.style.display = 'block';
}

function setDropdowm(id, value, setValue){
  $(id).append($('<option value="' + value + '">' + value + '</option>'));
  if(setValue === true){ $(id).text(value); }
}

function initialization(constants, fontSizes){
  // set font size dropbox
  fontSizes.absolute.forEach(size => {
    setDropdowm('#' + constants.dropbox, size, false);
    setUOM = false;
  });
  fontSizes.relative.forEach(size => {
    setDropdowm('#' + constants.dropbox, size, false);
  });
}

// when displays popup
function setChartSettings(constants, chart, fontSizes){
  // set Title
  let title = chart.getTitle();
  $('#' + constants.title).attr("value", title.title);
  $('#' + constants.fontColour).css("background-color", title.fontColour);
  // let newFontSize = splitFontSize(fontSizes, title.fontSize);
  if(title.fontSize.value === ''){
    // hide input
    $('#' + constants.fontSize).css('display', 'none');
    // clear input
    $('#' + constants.fontSize).val("");
  }else{
    $('#' + constants.fontSize).attr("value", title.fontSize.value);
  }
  $('#' + constants.dropbox).val(title.fontSize.uom);
}

// when updates
function setChartTitleSettings(chartConst, constants, fontSizes){
  let title = new Object;
  title.title = $('#' + constants.title).val();
  let fontSize = new Object;
  fontSize.uom = $('#' + constants.dropbox).val();
  if(!fontSizes.absolute.indexOf(fontSize.uom)){ $('#' + constants.fontSize).attr("value", ''); }
  fontSize.value = $('#' + constants.fontSize).val();
  title.fontSize = fontSize;
  fontSize = title.fontSize.value + title.fontSize.uom;
  title.fontColour = $('#' + constants.fontColour).css( "background-color" );

  $('title').text(title.title);
  $(`#${chartConst.title}`).text(title.title);
  $(`#${chartConst.title}`).css({"fontSize": fontSize, "color": title.fontColour});

  return title;
}

$(document).ready(()=>{
  /*********************************** variables ***************************************/
  let fontSizes = {
    relative: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'font-size', 'smaller', 'larger', 'inherit', 'initial', 'unset'],
    absolute: ['px', 'em', '%']
  };

  let colour = new Colour;

  // initial settings
  $('title').text(chart.title.title);
  $(`#${elementsIds.chart.title}`).text(chart.title.title);
  $(`#${elementsIds.chart.title}`).css({"fontSize": chart.title.fontSize.value + chart.title.fontSize.uom, "color": chart.title.fontColour});

  initialization(elementsIds.chartSettings.changeTilte, fontSizes);

  //chart.setBarWidth($(elementsIds.chart.id).width());

  /*********************************** events ***************************************/
  // display Chart Settings popup
  $("#" + elementsIds.chart.btnChartSettings).on('click', () => {
    setChartSettings(elementsIds.chartSettings.changeTilte, chart, fontSizes);
    toggleVisibility(elementsIds.chartSettings.popup);
  });

  // update Chart Settings
  $("#" + elementsIds.chartSettings.btnUpdate).on('click', () => {

    chart.setTitle(setChartTitleSettings(elementsIds.chart, elementsIds.chartSettings.changeTilte, fontSizes));
    toggleVisibility(elementsIds.chartSettings.popup);
  });

  // cancel Chart Settings
  $("#" + elementsIds.chartSettings.btnCancel).on('click', () => {
    toggleVisibility(elementsIds.chartSettings.popup);
  });

  // display/hide font size input
  $('#' + elementsIds.chartSettings.changeTilte.dropbox).on('change', () =>{
    let select = $('#' + elementsIds.chartSettings.changeTilte.dropbox).val();
    //hide
    let display = 'none';

    if(fontSizes.absolute.includes(select)){
      display = '';
      //display = 'block';
    }else{
      // clear input
      $('#' + elementsIds.chartSettings.changeTilte.fontSize).val("");
    }

    $('#' + elementsIds.chartSettings.changeTilte.fontSize).css('display', display);
  });

  /******************* colour ******************/
  // change title's chart colour
  $('#' + elementsIds.chartSettings.changeTilte.changeColour).on('click', () =>{
    colour.createPopup(elementsIds.chartSettings.changeTilte.colour.id, 'body', chart.title.fontColour);
    toggleVisibility(elementsIds.chartSettings.changeTilte.colour.id);
  });

  // set event on click
  $('body').on('click', '.' + elementsIds.chartSettings.changeTilte.colour.pixel, (e) => {
    e.stopPropagation();
    //$(this).data('id'));
    colour.setSelected(elementsIds.chartSettings.changeTilte.colour.id, e.target.id);
  });

  // update colour
  $("body").on('click', '#' + elementsIds.chartSettings.changeTilte.colour.btnUpdate, (e) => {
    e.stopPropagation();
    //
    //debugger;
    colour.setColour(elementsIds.chartSettings.changeTilte.colour.id);
    let newColour = colour.getColour(elementsIds.chartSettings.changeTilte.colour.id);
    chart.setTitleColour(newColour);
    $('#' + elementsIds.chartSettings.changeTilte.fontColour).css("background-color", newColour);
    toggleVisibility(elementsIds.chartSettings.changeTilte.colour.id);
    // remove popup
    colour.removePopup(elementsIds.chartSettings.changeTilte.colour.id);
  });

  // cancel colour
  $("body").on('click', '#' + elementsIds.chartSettings.changeTilte.colour.btnCancel, (e) => {
    //e.stopPropagation();
    toggleVisibility(elementsIds.chartSettings.changeTilte.colour.id);
    // remove popup
    colour.cancel(elementsIds.chartSettings.changeTilte.colour.id);
    colour.removePopup(elementsIds.chartSettings.changeTilte.colour.id);
  });

  $('body').on('click', () => {
    $('.container').css('display', 'none');
  });
});


