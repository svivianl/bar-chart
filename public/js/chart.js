class Chart{

  constructor(){
    this.data = new Object;
    // heigh
    // width

    this.chart = {

      barSpacing: '10px'

    };

    this.title = {
      title: 'Chart Title',
      fontSize: 'large',
      fontColour: 'rgb(10,100,190)'
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

  setTitleColour(value){
    this.title.fontColour = value;
  }
}

