class Colour{

  constructor(){
    this.data = new Object;
    // heigh
    // width

    this.chart = {

      barSpacing: '10px'

    };

    this.title = {
      title: 'Chart Title',
      fontSize: '50px',
      fontColour: 'red'
    };
  }

  getTitle(){
    return this.title;
  }

  setTitle(title){
    this.title.title = title.title;
    this.title.fontSize = title.fontSize;
    this.title.fontColour = title.fontColour;
  }
}
