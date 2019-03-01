class Colour{

  constructor(){
    let maxValue = 255;
    let sum = 100;
    this.rgb = [];
    this.elements = new Object;

    //create array with rgb colours
    for(let r = 0; r <= 255; r = r + sum){
      for(let g = 0; g <= 255; g = g + sum){
        for(let b = 0; b <= 255; b = b +  sum){
          let colour = 'rgb(' + r + ',' + g + ',' + b + ')';
          this.rgb.push(colour);
        }
      }
    }
  }

  createPopup(id, father, colour = 'rgb(0,0,0)'){
    let numDivs = Math.ceil(Math.sqrt(this.rgb.length));
    this.elements[id] = {
      selected: colour,
      colour: colour
    };

    //let count = 0;

    // creates popup
    $(father).append($('<div id="' + id + '" class="popupModal"></div>'));
    $('#' + id).append($('<div id="' + id + '_popup" class="popupBoxWrapper"></div>'));
    $('#' + id + '_popup').append($('<div id="' + id + '_append" class="popupBoxContent"></div>'));
    $('#' + id + '_append').append($('<h3>Colour Picker</h3>'));
    $('#' + id + '_append').append($('<hr class="hr-style">'));
    $('#' + id + '_append').append($('<div id="' + id + '_box" class="colour-box"></div>'));
//    debugger;
    this.rgb.forEach(function (rgb, index){
      $('#' + id + '_box').append($('<div id="' + index + '" class="pixel-div" style="background-color:' + rgb + ';"></div>'));

      if(rgb === this.elements[id].colour){
        //debugger;
        $('#' + index).addClass('focus-div');
      }

    }.bind(this));

    $('#' + id + '_append').append($('<div id="' + id + '_buttons"></div>'));
    //$('#' + id + '_append').append($('<div id="' + id + '_buttons" class="pull-right"></div>'));
    // colour selected field
    $('#' + id + '_buttons').append($('<label>Colour: </label>'));
    $('#' + id + '_buttons').append($('<div id="colour-selected" class="colour-div" style="background-color:' + this.elements[id].colour + ';"></div>'));
    // buttons
    $('#' + id + '_buttons').append($('<a style="margin-bottom:10px" class="btn btn-xs btn-warning" id= "btn_cancel_' + id + '">Cancel</a>'));
    $('#' + id + '_buttons').append($('<a style="margin-bottom:10px;margin-left: 5px;" class="btn btn-xs btn-success" id="btn_update_' + id + '">Save</a>'));

  }

  getColour(id){
    return this.elements[id].colour;
  }

  removePopup(id){
    $('#' + id).remove();
  }

  setSelected(id, colourIndex){

    $('#' + this.rgb.indexOf(this.elements[id].selected)).removeClass('focus-div');

    this.elements[id].selected = this.rgb[colourIndex];
    // focus DIV
    $('#' + colourIndex).addClass('focus-div');
    $('#colour-selected').css('background-color', this.elements[id].selected);
  }

  setColour(id){
    this.elements[id].colour = this.elements[id].selected;
  }

  cancel(id){
    this.elements[id].selected = this.elements[id].colour;
  }
}
