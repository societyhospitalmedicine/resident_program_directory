var apiHelpers = {
    pagination: function(arr){
        var spkArr=[];
        var pagination={};
        var pagNumber=0;
        arr.forEach(function(spk,index){
            if((index)%6 === 0){
              pagNumber=pagNumber+1;
              pagination[pagNumber]=[spk];
            }else{
              pagination[pagNumber].push(spk);
            }
        });
        pagination['activePage'] = 1;
        return pagination;
    }    
    
}

module.exports = apiHelpers;