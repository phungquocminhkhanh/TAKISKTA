var page_next=1;
function next_page(type)
{
    if(type=="back")
    {
        if(page_next!=1)
        {
            page_next=page_next-1;
            show_payment(page_next);
            if(page_next==1)
            {
                $("#page_back").css('color','#303030')
            }
            else
            {
                $("#page_back").css('color','rgb(60, 141, 188)')
            }
        }
    }
    else
    {
        page_next=page_next+1;
        show_payment(page_next);
        $("#page_back").css('color','rgb(60, 141, 188)')
    }
}
function show_payment(page) {
     var ngaybatdau = $('#ngaybatdau').val();
    var ngayketthuc = $('#ngayketthuc').val();
    let id_account="";
    if($("#id_type").val()=="3")
    {
        id_account=$("#id_account").val();
    }
    
    if (ngaybatdau && ngayketthuc) {
         data={
            detect: 'list_request_payment',
            type_manager: 'admin',
            id_account:id_account,
            date_begin: ngaybatdau,
            date_end: ngayketthuc,
            filter:$("#key_seach").val(),
            filter_status:$("#status_payment").val(),
            limit: '10',
            page:page  
        }
    } else {
         data={
            detect: 'list_request_payment',
            type_manager: 'admin',
            id_account:id_account,
            filter:$("#key_seach").val(),
            filter_status:$("#status_payment").val(),
            limit: '10',
            page:page  
        }
    }
    
    $.ajax({
        url: urlapi,
        type: 'POST',
        data:data,
        dataType: 'json',
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log(response);
            var output = ``;
            $.each(response.data, function(k, item) {
                output += `
                <tr>
                    <td style="width:4%;">${page*10-9+k}</td>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td> - ${formatNumber(item.request_value)} VND</td>
                    <td>${item.request_created}</td>
                    <td id="${item.id_request}_id_request">${request_status(item.request_status)}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_payment(${item.id_request},${item.id_customer})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr> `;
            });

            $('#content-deal').html(output);
        }
    });
}


function request_status(status) {
    if (status == 1) {
        return '<p>Tạo lệnh</p>';
    }
    if (status == 2) {
        return '<p style="color:blue">Chờ xử lý</p>';
    }
    if (status == 3) {
        return '<p style="color:green">Hoàn tất</p>'
    }
    if (status == 4) {
        return '<p style="color:red">Hủy lệnh</p>';
    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function detail_payment(id, id_customer) {
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: { detect: 'list_payment_detail', id_request: id },
        dataType: 'json',
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {

            var item = response.data[0];
            console.log(response);
            var output = `
           <form id="insert_news_form" enctype="multipart/form-data">

           <div class="inqbox-content">
           <div id="contact-1" class="tab-pane active">
               <center><h3><strong>Chi tiết lệnh rút tiền</strong></h3></center>
          </div>

           <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">

           <table class="detai_deal">
                   <tr>
                       <td><p>Trạng thái:</p></td>
                       <td id = "id_status"><p>${request_status(item.request_status)}</p></td>
                   </tr>
                   <tr>
                       <td><p>Họ & Tên:</p></td>
                       <td><p>${item.customer_name}</p></td>
                   </tr>
                   <tr>
                        <td><p>Số điện thoại:</p></td>
                        <td><p>${item.customer_phone}</p></td>
                    </tr>
                   <tr>
                       <td><p>Mã lệnh:</p></td>
                       <td><p>${item.request_code}</p></td>
                   </tr>
                   <tr>
                       <td><p>Thời gian:</p></td>
                       <td><p>${item.request_created}</p></td>
                   </tr>
                   <tr>
                       <td><p>Hạn mức:</p></td>
                       <td><p>${formatNumber(item.customer_limit_payment)} VND</p></td>
                   </tr>
                 
                   <tr>
                        <td><p>% thu:</p></td>
                        <td><p>${item.request_fee} %</p></td>
                    </tr>
                   
                   <tr>
                       <td><p>Đã giao dịch:</p></td>
                       <td><p>${formatNumber(item.customer_paymented)} VND</p></td>
                   </tr>
                   <tr>
                       <td><p style="color:red">Rút tiền:</p></td>
                       <td><p style="color:red"> - ${formatNumber(item.request_value)} VND</p></td>
                   </tr>
               </table>
                <hr>
              <center><h3><strong>Phương thức thanh toán</strong></h3></center>
               <table class="detai_deal">
                   <tr>
                       <td><p>Tên ngân hàng:</p></td>
                       <td><p>${item.bank_name}</p></td>
                   </tr>
                   <tr>
                       <td><p>Tên chủ thẻ:</p></td>
                       <td><p>${item.customer_account_holder}</p></td>
                   </tr>
                   <tr>
                       <td><p>Số tài khoản:</p></td>
                       <td><p>${item.customer_account_no}</p></td>
                   </tr>`;
            if (item.request_status == 2)
                output += `
                   <tr>
                       <td style="height:20px"></td>
                   </tr>
                
                   <tr><td> <img id="output_image" width="100%"/></td></tr>
                   `;
           
            if (item.request_status == 4)
                output += `
                   <tr>
                       <td><strong style="color:red">Lý do:</strong></td>
                   </tr>
                   <tr>
                       <td><strong style="color:red">${item.request_comment}</strong></td>
                   </tr>
                   `;
            output += `
               </table>
          </div>`;
          if($("#id_type").val()!="3")
          {
            if (item.request_status == 2)
                output += `<div id="${item.id_request}_btn">
                <button type="button" data-toggle="modal" data-target="#reason_refuse" class="btn btn-secondary btn-sm btn-block">Từ chối</button>
            <button type="button" onClick="final_reuqest_payment(${item.id_request},${item.id_customer})"  class="btn btn-danger btn-sm btn-block"> Hoàn tất</button>
           </div>`;
            output += `</div></form>`
          }
            
            var a = `<input type="text" hidden id="id_request" value="${item.id_request}">`;
            $('#id_request_text').html(a);
            $('#detail_deal').fadeOut().html(output);
            $('#detail_deal').fadeIn().html(output);
        }
    });
}
/// hien thị hình
function preview_image(event, id, id_customer) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('output_image');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    var btn = `
    <button type="button" data-toggle="modal" data-target="#reason_refuse" class="btn btn-secondary btn-sm btn-block">Từ chối</button>
    <button type="button" onClick="final_reuqest_payment(${id},${id_customer})"  class="btn btn-danger btn-sm btn-block"> Hoàn tất</button>`;
    $('#' + id + '_btn').html(btn);
    var close = `<button type="button" onClick="remove_img(${id})" class="close" >&times;</button>`;
    $('#' + id + '_close_img').html(close);

}

function check_img() {
    alert('Bạn chưa thêm hình ảnh');
}

function remove_img(id) {
    detail_payment(id);
}

function final_reuqest_payment(id, id_cus) {

    //var fileToUpload = $('#id_img').prop('files')[0];
    var formData = new FormData();
    formData.append("detect", "payment_manager");
    formData.append("type_manager", "update_img_payment");
    formData.append("id_request", id);
    formData.append("id_customer", id_cus);
    //formData.append("request_img", fileToUpload);
    var r = confirm('Kiểm tra thông tin trước khi xác nhận');
    if (r == true) {
        $.ajax({
            url: urlapi,
            type: 'POST',
            data: formData,
            dataType: 'JSON',
            contentType: false,
            processData: false,
             headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log(response);
                if (response.success == "true") {
                    alert(response.message);
                    show_payment(1);
                    detail_payment(id, id_cus)
                } else
                    alert(response.message)
            }
        });
    } else {

    }
}

function cancel_money() {
    var id_request = $('#id_request').val();
    var reason_cancel = $('#reason_cancel').val();
    var r = confirm('Bạn có muốn hủy lệnh không');
    if (r == true) {
        $.ajax({
            url: urlapi,
            type: 'POST',
            data: {
                detect: 'officer_payment_request',
                type_manager: 'cancel_request_payment',
                id_request: id_request,
                request_comment: reason_cancel
            },
            dataType: 'json',
             headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
                var output = `<p style="color:red">Hủy lệnh</p>`;
                $('#' + id_request + '_btn').html(''); //remove btn
                $('#' + id_request + '_id_request').html(output); // list
                $('#id_status').html(output); //detail
                $("#reason_refuse").modal("hide");
                alert('Hủy lệnh rút tiền thành công')

            }
        });
    }

}

function show_openclose_payment()
{
    $.ajax({
            url: urlapi,
            type: 'POST',
            data: {
                detect: 'payment_manager',
                type_manager: 'list_openclose_payment',
            },
            dataType: 'json',
             headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
                if(response.success=="true")
                {
                    if(response.open=="Y")
                    {
                        $("#open_close").prop("checked",true);
                    }
                    else
                    {
                        $("#open_close").prop("checked",false);
                    }
                }

            }
        });
}

$(document).ready(function() {
    show_payment(1);
    show_openclose_payment();

    $("#open_close").change(function(){
        let open="";
        if($("#open_close").is(":checked"))
       {
            open="Y";
       }
       else
       {
             open="N";
       }
        let r=confirm((open=="Y")?"Bạn có chắc muốn đóng rút tiền ?":"Bạn có chắc muốn mở lại rút tiền");
        if(r==true)
        {
            $.ajax({
                    url: urlapi,
                    type: 'POST',
                    data: {
                        detect: 'payment_manager',
                        type_manager: 'update_openclose_payment',
                        open:open
                    },
                    dataType: 'json',
                     headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(response) {
                    if(response.success=="true")
                    {
                        alert(response.message);
                    }

                }
            });
        }

    })
});



