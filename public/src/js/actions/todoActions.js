var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var todoActions = {
   loadSpeakers: function(speakers){
    AppDispatcher.handleServerAction({
      actionType: appConstants.LOAD_SPEAKERS,
      data: speakers  
    });
  },
  changePagination: function(number){
    AppDispatcher.handleAction({
      actionType: appConstants.CHANGE_PAGINATION,
      data: number  
    });
  },
  addItem: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  }
};

module.exports = todoActions;