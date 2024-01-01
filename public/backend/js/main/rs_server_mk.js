window.io_socket = io(urlsocket, { transport: ['websocket'] });

io_socket.emit('join_exchange',{id_exchange:"45"});

io_socket.on('info_period',function(data){
    console.log(data);
})


function open_mk(id,type)
{
	var r=confirm("Bạn có chắc ko");
	if(r==true)
	{
		$.ajax({
	        url: "./check_otp_rs_server",
	        method: "post",
	        data: { 
	        	otp: $("#otp_xx").val(),
	        },
	       	dataType: 'JSON',
	        headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        },
	        success: function(data) {
	        	console.log(data);
	            if (data.success == "true") {
	            	if(type=="open")
	            	{
	            		io_socket.emit('exchange_active',{id_exchange:id,exchange_active:"Y"});
	            	}
	            	if(type=="close")
	            	{
	            		io_socket.emit('exchange_active',{id_exchange:id,exchange_active:"N"});
	            	}
	            	
					$(".xx"+id).prop("disabled",true);
					alert("Thành công")
	            } else {
	               	alert("Sai mk")
	            }

	        }
	    })
	}
	
	
}