function money(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
var id_cus = "";

var _customer_new="";
function type_total(customer_cha="") {

    
    let customer_new=$("#old_new_customer").val();

    ngaybatdau = $('#ngaybatdau').val();
    ngayketthuc = $('#ngayketthuc').val();

    if(ngaybatdau!="" && ngayketthuc=="")
    {
        return;
    }
    if(ngayketthuc!="" && ngaybatdau=="")
    {
        return;
    }
    
    let id_account="";
    if($("#type_admin").val()=="1")
    {
        id_account = ($('input[name=flexRadioDefault]:checked').val()) ? $('input[name=flexRadioDefault]:checked').val() : "";
        $("#btn_sale").html($("#name" + id_account).html());
    }
    else
    {
        id_account=$("#id_account_sale").val();
    }
    let data_filter = {
        detect: "statictis_money",
        type_manager: $("#type").val(),
        date_begin: ngaybatdau,
        date_end: ngayketthuc,
        id_account: id_account,
        filter: $("#key_seach").val(),
    };
   
     $('#content-customer').html(`<tr>
                                    <td colspan="7"><div class="box-loader" id="loading_detail">
                                        <div class="loader"></div>
                                            <h3>Loading</h3>
                                        </div>
                                    </td>
                                </tr> `);
     $.ajax({
            url: urlapi,
            method: "post",
            data: data_filter,
             headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(data) {
                console.log(data);
                let t = 0;
                var output = "";
                
                if (data.success == "true") {
                    let total_tinh = data.total;
                    let tongkhachhang = data.total_customer;
                    $.each(data.data, function (k, v) {
                        output += `<tr>
                            <td>${v.customer_fullname}</td>
                            <td>${v.customer_phone}</td>
                            <td>${money(v.total_money)}</td>
                            <td>${v.customer_sale}</td>
                        </tr>`;
                    });
                    //$("#total_wallet").html(`Tổng tiền thực tế còn lại: ${money(data.total_wallet)} vnd`)
                    $("#content-customer").html(output);
                    $("#number-total").html(money(total_tinh) + " VND");
                    $("#total-cus").html(tongkhachhang);

                    $("#total_customer").html(data.data_customer.total);
                    $("#total_customer_in_day").html(
                        data.data_customer.total_in_day
                    );

                    $("#close_sale").click();
                } else {
                    alert(data.message);
                    $("#content-customer").html(output);
                }
            }
    });

}

function show_account_sale() {
    var key = $("#key_seach_sale").val();
    let output = "";
    $.ajax({
        type: "post",
        url: urlapi,
        data: { detect: "account_manager", type_manager: "list_account", filter: key, id_type: 3, limit: 5000 },
        dataType: "json",
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {

            $.each(response.data, function(k, v) {
                if (v.status_employee == "Y") {
                    output += `
                    <tr>
                    <td style="width:5%"><input class="form-check-input" value="${v.id}" type="radio" name="flexRadioDefault"></td>c
                    <td id="name${v.id}">${v.username}</td>
                    <td>`
                    if (v.phone_number != null)
                        output += `<p class="sale">${v.phone_number}</p>`

                    output += `</td>
                    `;
                    output += `</tr>
                    `;
                }


            });
            $("#content-account").html(output)

        }
    });
}
$(document).ready(function() {
    show_account_sale();
    type_total();

})