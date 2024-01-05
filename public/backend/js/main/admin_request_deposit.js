var _value_currency="";

var page_next=1;
function next_page(type)
{
    if(type=="back")
    {
        if(page_next!=1)
        {
            page_next=page_next-1;
            show_deposit(page_next);
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
        show_deposit(page_next);
        $("#page_back").css('color','rgb(60, 141, 188)')
    }
}
function show_deposit(page) {
    let id_account="";
    if($("#id_type").val()=="3")
    {
        id_account=$("#id_account").val();
    }
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {
            detect: 'list_request_deposit',
            type_manager: 'admin',
            filter:$("#key_seach").val(),
            id_account:id_account,
            limit: '10', 
            page:page
        },
        dataType: 'json',
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            var output = ``;
            let type = "";
            $.each(response.data, function(k, item) {
                type = (item.request_type == "1") ? "tài khoản" : "giới thiệu";
                output += `
                <tr>
                    <td style="width:4%;">${page * 10 - 9 + k}</td>
                    <td>${item.customer_name}</td>
                    <td>${item.customer_phone}</td>
                    <td>${item.request_code}</td>
                    <td>${money(item.request_value)} VND</td>
                    <td>${item.request_created}</td>
                    <td>${
                        item.customer_virtual == "N" ? lang_thuong : "demo"
                    }</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_deposit(${
                        item.id_request
                    })" ><i class="fa fa-info"></i> ${lang_detail}</button></td>
                </tr> `;
            });

            $('#content-deposit').html(output);
        }
    });
}


function detail_deposit(id) {
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: { detect: 'list_deposit_detail', id_request: id },
        dataType: 'json',
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log(response);
            var item = response.data[0];
            var output = `
           <div class="inqbox-content">
           <div id="contact-1" class="tab-pane active">
               <center><h3><strong>${lang_detail}</strong></h3></center>
          </div>
          
           <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
           
           <table class="detai_deal">
                   <tr>
                       <td><p>${lang_fullname}:</p></td>
                       <td><p>${item.customer_name}</p></td>
                   </tr>
                   
                   <tr>
                       <td><p>${lang_code}:</p></td>
                       <td><p>${item.request_code}</p></td>
                   </tr>
                   <tr>
                       <td><p>${lang_date}:</p></td>
                       <td><p>${item.request_time_complete}</p></td>
                   </tr>
                  
               </table>
                <hr>
            </div>
            </div>
            `;
            var a = `<input type="text" hidden id="id_request" value="${item.id_request}">`;
            $('#id_request_text').html(a);
            $('#detail_deposit').fadeOut().html(output);
            $('#detail_deposit').fadeIn().html(output);
             window.location.replace("#div_nap_tien")
        }
    });
}




function create_deposit() {

    var output = `
           <div class="inqbox-content">
           <div id="contact-1" class="tab-pane active">
               <center><h3 ><strong>${lang_tao_lenh_nap_tien}</strong></h3></center>
          </div>
          
           <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
           
           <div>
                <tr>
                    <td><p>${lang_fullname}: <a onClick="list_customer()" data-toggle="modal" data-target="#request_deposit"><img src="../images/chon.svg"></a></p></td>
                    
                </tr>
               

            </div>
            <hr>
            </div>
            </div>
            `;
    $('#detail_deposit').fadeOut().html(output);
    $('#detail_deposit').fadeIn().html(output);
    window.location.replace("#div_nap_tien")
    
    
}

function list_customer() {
    if ($("#customer_virtual").val() == 'N') {
        $("#khuyenmai").show();
        $("#khuyenmai").html(`<option value="1">${lang_vi_tai_khoan}</option>`);
    } else {
        $("#khuyenmai").hide();
    }
    $.ajax({
        url: urlapi,
        type: "POST",
        data: {
            detect: "list_customer_customer",
            limit: "20",
            customer_virtual: $("#customer_virtual").val(),
        }, //N la thường, Y là nhà cái
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            var output = ``;
            response.data.forEach(function (item) {
                output += `
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.customer_phone}</td>
                   
                    <td><input type="radio" name="radio" value="${item.id_customer}" data-customer_name="${item.customer_name}"></td>
                </tr> `;
            });
            $("#list_customer").html(output);
        },
    });

}

function search_customer() {
    var key_seach = $('#id_customer_search').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {
            detect: 'list_customer_customer',
            limit: '20',
            filter: key_seach,
        },
        dataType: 'json',
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            var output = ``;
            if(response.success=="true")
            {
                 response.data.forEach(function (item) {
                     output += `
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.customer_phone}</td>
                    <td><input type="radio" name="radio" value="${item.id_customer}" data-customer_name="${item.customer_name}"></td>
                </tr> `;
                 });
            }
           
            $('#list_customer').html(output);
        }
    });
}

function choose_customer() {
    var id_customer = $(':radio:checked').val();
    var customer_name = $(":radio:checked").attr('data-customer_name');
    if ($("#khuyenmai").val() == 1) {
        type = lang_vi_tai_khoan;
    } else if ($("#khuyenmai").val() == 2) {
        type = "Ví giới thiệu";
    } else {
        type = "Ví đầu tư";
    }
    if (typeof(id_customer) == "undefined") {
        alert(lang_ban_chua_chon_khach_hang);
    } else {
       
        var output = `
                <div class="inqbox-content">
                <div id="contact-1" class="tab-pane active">
                    <center><h3><strong>${lang_tao_lenh_nap_tien}</strong></h3></center>
                </div>
                <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
                <div>
                    <tr>
                    <input type="text" hidden  value="${id_customer}">
                        <td><p>Tên khách hàng: <a onClick="list_customer()" data-toggle="modal" data-target="#request_deposit"><img src="../images/chon.svg"></a></p></td>
                        <td><p><input type="text" value="${customer_name}" placeholder="Tên khách hàng" class="form-control" readonly></p></td>
                    </tr>
                    
                   
                   `;

        if ($("#khuyenmai").val() == 1) {
            output += ` <tr>

                    <td><p style="margin-top:14px">${lang_so_tien_nap} (VND):</p></td>
                    <td><input type="text" min="1" id="depoit_money" placeholder="000.000.000" class="form-control request" data-type="currency"></td>
                   
                
                </tr>
                
                <tr>
                <td><p style="margin-top:14px">${lang_so_tien_khuyen_mai} (VND):</p></td>
                    <td><input type="text" onkeyup="disable_chutich()" min="1" id="reward_money" placeholder="000.000.000" class="form-control bonus" data-type="currency"></td>
                     
                </tr>
                <tr>
                <td><p style="margin-top:14px">${lang_chu_thich}: </p></td>
                    <td><p><textarea readonly rows="3" id="bonus_description" value="" class="form-control"></textarea></p></td>
                </tr>
                <tr>
                <td><font style="color: red">${type}</font>
                </td>
                </tr>
                `;
        } else {
            if ($("#khuyenmai").val() == 2) {
                output += `<tr>
                        <td><p>${lang_so_tien_nap} (VND):</p></td>
                            <td><input type="text" min="1" id="reward_money" placeholder="000.000.000" class="form-control request" data-type="currency"></td>
                             <small id="out_usd_request" style="color:red"></small>
                             <br />
                        </tr>
                        <tr>
                        <td><font style="color: red">${type}</font></td>
                    </tr>`;
            } else {
                output += `
                        <tr>
                            <td><p style="margin-top:14px">Số tiền đầu tư (VND):</p></td>
                            <td><input type="text" min="1" id="reward_money" placeholder="000.000.000" class="form-control request" data-type="currency">
                                <small id="out_usd_request" style="color:red"></small>
                                <br />
                            </td>
                                 
                        </tr>
                        <tr>
                            <td><p style="color: red;margin-top:14px">${type}</p>
                            </td>
                        </tr>`;
            }
        }
        output += `
               
                </div>
                <hr>
                <button class="btn btn-danger btn-sm btn-block" onClick="create_request_comfirm(${id_customer})">${lang_create}</button>
                </div>
                </div>
                    `;

        $("#detail_deposit").fadeOut().html(output);
        $("#detail_deposit").fadeIn().html(output);
        $("#close_modal").click();
        $("input[data-type='currency']").on({
            keyup: function () {
                formatCurrency($(this));
            },
            blur: function () {
                formatCurrency($(this), "blur");
            },
        });

               

    }
}
function disable_chutich()
{
    console.log(1);
    if($("#reward_money").val()!="")
    {
        $("#bonus_description").attr("readonly", false); 
    }
    else
    {
         $("#bonus_description").attr("readonly", true); 
    }
}
function create_request_comfirm(id_customer) {
    
    //  var r = confimr('Xác nhận lại số tiền muốn chuyển');
    var request_value = $('#depoit_money').val();
    var reward_money = $("#reward_money").val();
    if (request_value)
        request_value = parseInt(Number($('#depoit_money').val().replaceAll(',', '')));
    if (reward_money)
        reward_money = parseInt(Number($("#reward_money").val().replaceAll(',', '')));
    var type = $("#khuyenmai").val();
    if (type == 1) {
        console.log(id_customer);
        $('#mess_deposit').html(``);
        var r = confirm(lang_kiem_tra_thong_tin_truoc_khi_xac_nhan);
        if (r == true) {
            $.ajax({
                url: urlapi,
                type: 'POST',
                data: {
                    detect: 'deposit_manager',
                    type_manager: 'create_request_comfirm',
                    request_value: request_value,
                    request_bonus: reward_money,
                    bonus_description:$("#bonus_description").val(),
                     // tiền khuyến mãi
                    id_customer: id_customer,
                    request_type: type, // 1 la thuong, 2 khuyen mai

                },
                dataType: 'json',
                 headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
                    if (response.success == "true") {
                        console.log(id_customer);
                        io_socket.emit('reload_data_customer',{id_customer:id_customer+""});
                        show_deposit(1);
                        alert(response.message);
                        window.location.replace('#content-deposit')
                        $("#detail_deposit").html('');
                    } else {
                        alert(response.message);
                    }

                }
            });
        } else {}
    } else if (type == 3) { // nạp tiền đầu tư
        if (reward_money == ``) {
            alert("vui lòng nhập giá trị tiền muốn nạp")
            alert("vui lòng nhập giá trị tiền muốn nạp")
        } else {
            var r = confirm('Kiểm tra thông tin trước khi xác nhận');
            if (r == true) {
                $.ajax({
                    url: urlapi,
                    type: 'POST',
                    data: {
                        detect: 'deposit_manager',
                        type_manager: 'create_request_comfirm',
                        request_bonus: reward_money,
                        id_customer: id_customer,
                        request_type: "1", //1 là thường, 2 là khuyến mãi,
                        invest: "Y" // có cái này là nạp đầu tư

                    },
                    dataType: 'json',
                     headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
                        if (response.success == "true") {
                            show_deposit(1);
                            alert('Nạp tiền thành công');
                            window.location.replace('#content-deposit')
                            
                           $("#detail_deposit").html('');
                        } else {
                            alert(response.message);
                        }

                    }
                });
            } else {}
        }

    } else {
        if (reward_money == ``) {
            alert("vui lòng nhập giá trị tiền muốn nạp")
        } else {

            var r = confirm('Kiểm tra thông tin trước khi xác nhận');
            if (r == true) {
                $.ajax({
                    url: urlapi,
                    type: 'POST',
                    data: {
                        detect: 'deposit_manager',
                        type_manager: 'create_request_comfirm',
                        request_value: reward_money,
                        id_customer: id_customer,
                        request_type: type, // t la thuong, 2 khuyen mai
                    },
                    dataType: 'json',
                     headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
                        if (response.success == "true") {
                            show_deposit(1);
                            alert('Nạp tiền thành công');
                            window.location.replace('#content-deposit')
                            $("#detail_deposit").html('');
                        } else {
                            alert('Nạp tiền thất bại');
                        }

                    }
                });
            } else {}
        }
    }


}
// tìm kiếm nạp tiền
function search_request_deposit() {
    var key_seach1 = $('#key_seach_deposit').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {
            detect: 'list_request_deposit',
            type_manager: 'admin',
            filter: key_seach1,
            customer_virtual: $("#customer_virtual").val(),
            limit: "20"
        },
        dataType: 'json',
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log(response);
            var output = ``;
            let type = "";
            response.data.forEach(function(item) {
                type = (item.request_type == "1") ? "tài khoản" : "giới thiệu";
                output += `
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td>${money(item.request_value)} VND</td>
                    <td>${item.request_created}</td>
                    <td>${type}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_deposit(${item.id_request})" ><i class="fa fa-info"></i> ${lang_detail}</button></td>
                </tr> `;
            });

            $('#content-deposit').html(output);
        }
    });

}



$(document).ready(function() {
    show_deposit(1);
    
});



