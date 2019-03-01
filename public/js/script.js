// toggle popup's visibility
function toggleVisibility(id) {
  let e = document.getElementById(id);
  e.style.display === 'block' ? e.style.display = 'none' : e.style.display = 'block';
}

function splitFontSize(options, fontSize){
  let index = options.absolute.indexOf(fontSize);

  // did not find the absolute UOM in the fontSize
  if(index === -1){
    return {relative: fontSize, absolute: ''};
  }else{
    //send the value of the fontSize and the UOM of the fontSize
    return {relative: '', absolute: {value: fontSize.replace(options.relative[index], ''), uom: options.relative[index]}};
  }
}

function setDropdowm(id, value, setValue){
  $(id).append($('<option value="' + value + '">' + value + '</option>'));
  if(setValue === true){ $(id).text(value); }
}

function setChartSettings(title, fontSizes){
  // set Title
  $('#title_chart').attr("value", title.title);
  $('#title_font_colour').attr("value", title.fontColour);
  let newFontSize = splitFontSize(fontSizes, title.fontSize);
  let uom = '';
  if(newFontSize.relative !== ''){
    $('#title_font_size').attr("value", newFontSize.absolute.value);
    uom = newFontSize.absolute.uom;
  }else{
    uom = newFontSize.relative;
  }

  // set font size dropbox
  let setUOM = false;
  fontSizes.absolute.forEach(size => {
    if(uom === size){ setUOM = true; }
    setDropdowm('#select_title_font_size', size, setUOM);
    setUOM = false;
  });
  fontSizes.relative.forEach(size => {
    if(uom === size){ setUOM = true; }
    setDropdowm('#select_title_font_size', size, setUOM);
    setUOM = false;
  });
}

function setChartTitleSettings(fontSizes){
  let title = new Object;
  title.title = $('#title_chart').val();
  let uom = $('#select_title_font_size').val();
  if(!fontSizes.absolute.indexOf(uom)){ $('#title_font_size').attr("value", ''); }
  title.fontSize = $('#title_font_size').val() + uom;
  //title.fontColour = $('#title_font_colour');

  $('title').text(title.title);
  $('h1').text(title.title);
  $('h1').css({"fontSize": title.fontSize, "color": title.fontColour});

  return title;
}

$(document).ready(()=>{

  let fontSizes = {
    relative: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'font-size', 'smaller', 'larger', 'inherit', 'initial', 'unset'],
    absolute: ['px', 'em', '%']
  };

  let chart = new Chart;

  // initial settings
  $('title').text(chart.title.title);
  $('h1').text(chart.title.title);
  $('h1').css({"fontSize": chart.title.fontSize, "color": chart.title.fontColour});

  /****************** events *******************/
  // display Chart Settings popup
  $("#btn_chart_settings").on('click', () => {
    setChartSettings(chart.getTitle(), fontSizes);
    toggleVisibility("popup_chart_settings");
  });

  // update Chart Settings
  $("#btn_update_chart_settings").on('click', () => {
    chart.setTitle(setChartTitleSettings(fontSizes));
    toggleVisibility("popup_chart_settings");
  });

  // cancel Chart Settings
  $("#btn_cancel_chart_settings").on('click', () => {
    toggleVisibility("popup_chart_settings");
  });

  // display/hide font size input
  $('#select_title_font_size').on('change', () =>{
    let select = $('#select_title_font_size').val();
    //hide
    let display = 'none';

    if(fontSizes.absolute.includes(select)){
      display = 'block';
    }

    $('#title_font_size').css('display', display);
  });
});


