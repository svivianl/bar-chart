// toggle popup's visibility
function toggleVisibility(id) {
  let e = document.getElementById(id);
  e.style.display === 'block' ? e.style.display = 'none' : e.style.display = 'block';
}

function splitFontSize(options, fontSize){
  let absolute = /^\d+/.test(fontSize);
  // options.absolute.indexOf(fontSize.substr(fontSize.length - 2, fontSize.length));

  // did not find the absolute UOM in the fontSize
  if(absolute === false){
    return {relative: fontSize, absolute: ''};
  }else{
    //send the value of the fontSize and the UOM of the fontSize
    let splitFontSize = fontSize.replace(/(\d+)(\D+)/, "$1|$2");
    splitFontSize = splitFontSize.split('|');
    return {relative: '', absolute: {value: splitFontSize[0], uom: splitFontSize[1]}};
    //return {relative: '', absolute: {value: fontSize.replace(options.relative[index], ''), uom: options.relative[index]}};
  }
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
function setChartSettings(constants, title, fontSizes){
  // set Title
  $('#' + constants.title).attr("value", title.title);
  $('#' + constants.fontColour).css("background-color", title.fontColour);
  let newFontSize = splitFontSize(fontSizes, title.fontSize);
  let uom = '';
  if(newFontSize.relative !== ''){
    uom = newFontSize.relative;
    // hide input
    $('#' + constants.fontSize).css('display', 'none');
    // clear input
    $('#' + constants.fontSize).val("");
  }else{
    $('#' + constants.fontSize).attr("value", newFontSize.absolute.value);
    uom = newFontSize.absolute.uom;
  }
  $('#' + constants.dropbox).val(uom);
  // set font size dropbox
  /*
  let setUOM = false;
  fontSizes.absolute.forEach(size => {
    if(uom === size){ setUOM = true; }
    setDropdowm('#' + constants.dropbox, size, setUOM);
    setUOM = false;
  });
  fontSizes.relative.forEach(size => {
    if(uom === size){ setUOM = true; }
    setDropdowm('#' + constants.dropbox, size, setUOM);
    setUOM = false;
  });
  */
}

// when updates
function setChartTitleSettings(constants, fontSizes){
  let title = new Object;
  title.title = $('#' + constants.title).val();
  let uom = $('#' + constants.dropbox).val();
  if(!fontSizes.absolute.indexOf(uom)){ $('#' + constants.fontSize).attr("value", ''); }
  title.fontSize = $('#' + constants.fontSize).val() + uom;
  title.fontColour = $('#' + constants.fontColour).css( "background-color" );

  $('title').text(title.title);
  $('h1').text(title.title);
  $('h1').css({"fontSize": title.fontSize, "color": title.fontColour});

  return title;
}

$(document).ready(()=>{
  /*********************************** variables ***************************************/
  let fontSizes = {
    relative: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'font-size', 'smaller', 'larger', 'inherit', 'initial', 'unset'],
    absolute: ['px', 'em', '%']
  };

  let chart = new Chart;
  let colour = new Colour;

  let elementsIds = {
    chart: {
      title: 'title_chart',
      btnChartSettings: 'btn_chart_settings'
    },
    chartSettings: {
      popup: 'popup_chart_settings',
      changeTilte: {
        title: 'title_chart',

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


  // initial settings
  $('title').text(chart.title.title);
  $('h1').text(chart.title.title);
  $('h1').css({"fontSize": chart.title.fontSize, "color": chart.title.fontColour});

  initialization(elementsIds.chartSettings.changeTilte, fontSizes);

  /*********************************** events ***************************************/
  // display Chart Settings popup
  $("#" + elementsIds.chart.btnChartSettings).on('click', () => {
    setChartSettings(elementsIds.chartSettings.changeTilte, chart.getTitle(), fontSizes);
    toggleVisibility(elementsIds.chartSettings.popup);
  });

  // update Chart Settings
  $("#" + elementsIds.chartSettings.btnUpdate).on('click', () => {

    chart.setTitle(setChartTitleSettings(elementsIds.chartSettings.changeTilte, fontSizes));
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
});


