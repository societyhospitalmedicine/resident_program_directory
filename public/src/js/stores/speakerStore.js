var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: {1:[], activePage:1}
};

var addItem = function(item){
  _store.list.push(item);
};

var removeItem = function(index){
  index_target = index.target.getAttribute("value");
  _store.list.splice(index_target,1);
  
}

var changePagination = function(number){
  _store.list.activePage = number;
}

var callSpeakers = function(speakers) {
  // _store.list = speakers
   _store.list = speakers;
  return _store.list;
}



var speakerStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getAllSpeakers: function(){
     return callSpeakers(function(d) {
        //processing the data
        return(d);
    });
  },
  getList: function(){
    return _store.list;
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      speakerStore.emit(CHANGE_EVENT);
      break;
    case appConstants.LOAD_SPEAKERS:
      callSpeakers(action.data);
      speakerStore.emit(CHANGE_EVENT)
      break;
     case appConstants.CHANGE_PAGINATION:
      changePagination(action.data);
      speakerStore.emit(CHANGE_EVENT)
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      speakerStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = speakerStore;