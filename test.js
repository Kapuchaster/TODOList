import React from 'react'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import {mount, render, shallow} from 'enzyme'
import App from './App.jsx'
var expect = chai.expect;

var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const wrapper = mount(<App />)
// console.log(wrapper)

 describe("Check if input text to the new Note is correct checkInput(text)", function() {
   it("only letters", function() {
       expect(wrapper.node.checkInput("dasda")).equal(true);
   });
   it("only numbers", function() {
       expect(wrapper.node.checkInput("123123")).equal(true);
   });
   it("letters and numbers", function() {
       expect(wrapper.node.checkInput("1sd231fasd23")).equal(true);
   });
   it("text with spaces", function() {
       expect(wrapper.node.checkInput("1s d231fa   sd23")).equal(true);
   });
   it("only spaces", function() {
       expect(wrapper.node.checkInput("     ")).equal(false);
   });
   it("empty field", function() {
       expect(wrapper.node.checkInput("")).equal(false);
   });
 });
describe("Check the initial state of methods inside App.jsx class", function() {
  it("Check indexing of notes: currId", function() {
    expect(wrapper.node.currId).equal(0);
  });
  it("Check length of Notes array", function() {
    expect(wrapper.node.notes).to.have.length(0);
  });
  it("Check empty value in the text field", function() {
    expect(wrapper.node.state.value).equal('');
  });
});

describe("Check App.jsx methods", function() {
  describe("Check addNote()", function() {
    it("add 10 new Note of name \"clean the dish\" to the list ", function() {
      for(let i=0; i<10; i++){
        wrapper.node.state.value = "clean the dish";
        wrapper.node.addNote();
      }
      expect(wrapper.node.notes[0].text).equal("clean the dish");
    });
    it("check size of notes array", function() {
      expect(wrapper.node.notes).to.have.length(10);
    });
    it("check currId", function() {
      expect(wrapper.node.currId).equal(10);
    });
  });

  describe("Check removeNote()", function() {
    var ev = {"target":{
        id: 8
    }}
    it("remove element of id 8", function() {
       wrapper.node.removeNote(ev);
       expect(wrapper.node.notes[8].id).equal(9);
    });
    it("check length of nodes", function() {
      expect(wrapper.node.notes).to.have.length(9);
    });
  });
});

describe("Check validation of a Note attributes", function() {
  for(let i=0; i<8; i++){
    it("Check Note id: "+ i +" attribute", function() {
        expect(wrapper.node.notes[i].id).equal(i);
    });
  }
  for(let i=8; i<10-1; i++){
    it("Check Note id: "+ i +" attribute", function() {
        expect(wrapper.node.notes[i].id).equal(i+1);
    });
  }
  it("Check if Note is not selected", function() {
      wrapper.node.notes[0].changeNoteStatus();
      expect(wrapper.node.notes[0].selected).equal(true);
  });
  it("Check if Note is selected", function() {
      expect(wrapper.node.notes[0].selected).equal(false);
  });
});
