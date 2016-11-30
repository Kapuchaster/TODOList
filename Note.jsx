export default class Note{
  constructor(text, id) {
    this.id = id;
    this.text = text;
    this.selected = false;    
  }

  changeNoteStatus(){
    let obj = document.getElementById("note_"+this.id);

    if(!this.selected){
       obj.style.background = "yellow";
       obj.style.textDecoration = "line-through";
    }
    else{
       obj.style.background = "white";
       obj.style.textDecoration = "none";
    }
    this.selected = !this.selected;
  }
}
