/* handsontable for demo */
$(function(){
  var container = document.getElementById('finance_example');
  var data = function () {
    return Handsontable.helper.createSpreadsheetData(100, 12);
  };
  
  $.ajax({ // create an AJAX call...
      data: {
          req_purpose : 'get_demo_data'
      },
      type: 'POST', // GET or POST
      url: '/services/get_demo_data', // the file to call
      success: function(res) { // on success..
        // console.log(res);
        if(res.req_status === true){
          var finance_data = res.index_data;

          var hot = new Handsontable(container, {
            data: finance_data,
            height: 396,
            colHeaders: ["Price", "Date", "1D Chg", "YTD Chg", "Vol BTC"],
            rowHeaders: true,
            stretchH: 'all',
            columnSorting: true,
            contextMenu: true,
            columns: [
              {type: 'text', format: '$0,0.00'},
              {type: 'date', dateFormat: 'DD/MM/YYYY', correctFormat: true},
              {type: 'text', format: '0.00%'},
              {type: 'text', format: '0.00%'},
              {type: 'text', format: '0.00'}
            ]
          });

          // auto-update mechanism
          $('div#finance_example').keyup(function(){
            console.log(finance_data);
          });

          // click listener (incomplete)

        }else{
          throw "fail to get data from mongodb";
        };

        // fade out popup cover
        $("#preloader").delay(100).fadeOut("slow");
      }
  });
});