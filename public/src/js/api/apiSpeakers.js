var todoActions = require('../actions/todoActions');
var apiHelpers = require('../helpers/apiHelpers');
var API = {
   loadSpeakers: function(speakers){
        var data;
       return $.ajax({
            url: '/speakers',
            success: function (resp) {
               return todoActions.loadSpeakers(apiHelpers.pagination(resp));
            },
            error: function () {}
        }); // ajax asynchronus request 
        //the following line wouldn't work, since the function returns immediately
        //return data; // return data from the ajax request
        // _store.list = callback();
        // return _store.list;
    },
    searchSpeakers: function(search_category,search_main){
        var data;
       return $.ajax({
            url: '/searchCSV?search_category='+search_category+'&search_main='+search_main,
            success: function (respSpeakers) {
               
                var pagSpeakers = apiHelpers.pagination(respSpeakers.results)
                return todoActions.loadSpeakers(pagSpeakers);
               
            },
            error: function () {}
        }); // ajax asynchronus request 
        //the following line wouldn't work, since the function returns immediately
        //return data; // return data from the ajax request
        // _store.list = callback();
        // return _store.list;
    }
}
  

module.exports = API;