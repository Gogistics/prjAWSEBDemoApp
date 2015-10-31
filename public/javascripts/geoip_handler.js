/* geoip handler */
(function ($) {

	// geo query
	$(function(){
        $.ajax({ // create an AJAX call...
            data: {
                token : 'dWEF43tHwFfgG51ASeFg5087rtRBR',
                ip : '2601:646:c202:8d00:bd46:2495:cf41:856f',
            },
            type: 'POST', // GET or POST
            url: '/tests/get_ip_geo', // the file to call
            success: function(res) { // on success..
                console.log(res);
                if(res.req_status){
                    alert(res.geo);
                }else{
                    console.log(res.geo);
                };
            }
        });
    });
    
})(jQuery);
