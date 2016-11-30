// App.jsx

import React from 'react';
import Note from './Note.jsx'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.notes = [];
    this.currId = 0;
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

   handleChange(event) {
     this.setState({value: event.target.value});
   }

   checkInput(inputText){
      if(inputText.length > 70 || inputText.length < 1){
        return false;
      }
      return !/^\s+$/.test(inputText);
    }

   addNote() {
     if(!this.checkInput(String(this.state.value))){
       this.setState({value: ''});
       return;
     }

     let tmpNote = new Note(String(this.state.value),this.currId);
     this.notes.push(tmpNote);
     this.currId++;
     this.setState({toDoDivList: this.getHTMLNoteList()});
     this.setState({value: ''});
   }

   removeNote(eventt){
     //event.stopPropagation();
     let tempId = eventt.target.id;
     let indexCounter = 0;

     for (let obj of this.notes){
       if(tempId == obj.id)
       {
         this.notes.splice(indexCounter, 1);
       }
       indexCounter++;
     }

     this.setState({toDoDivList: this.getHTMLNoteList()});
   }

   getHTMLNoteList() {
     if(this.notes == null)
       return;

     return this.notes.map((obj) =>
       <div className="note" onClick={obj.changeNoteStatus.bind(obj)} key={obj.id} id={"note_" + obj.id}>
         {obj.text}
         <button id={obj.id} className="noteXButt" onClick={this.removeNote.bind(obj.id)}>
          x
         </button>
       </div>
     );
   }

   render() {
     return (
       <div>
         <input type="text"
           placeholder="NEW TODO"
           value={this.state.value}
           onChange={this.handleChange} />
         <button id="bt_add" onClick={this.addNote}>
           Add
         </button>

          {this.state.toDoDivList}

       </div>
     );
   }
}

export default App;
