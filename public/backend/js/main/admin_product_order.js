var _type_manager = "";
var _id_order = "";
var _id_customer = "";
var page_next = 1;
function next_page(type) {
    if (type == "back") {
        if (page_next != 1) {
            page_next = page_next - 1;
            show_product_order(page_next);
            if (page_next == 1) {
                $("#page_back").css("color", "#303030");
            } else {
                $("#page_back").css("color", "rgb(60, 141, 188)");
            }
        }
    } else {
        page_next = page_next + 1;
        show_product_order(page_next);
        $("#page_back").css("color", "rgb(60, 141, 188)");
    }
}
function show_product_order(page) {
    let data_filter = {
        detect: "product_order_manager",
        type_manager: "list_admin",
        page: page,
        limit: 10,
        status: $("#status_filter").val(),
        filter: $("#key_search").val(),
    };

    $.ajax({
        url: urlapi,
        method: "POST",
        data: data_filter,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            console.log(data);
            let output = "";
            if (data.success == "true") {
                $.each(data.data, function (k, v) {
                    output += `
                        <tr>
                                <td style="width:4%;">${page * 10 - 9 + k}</td>
                                <td>${v.code}</td>
                                <td>
                                    <img class="img-product" src="${
                                        urlserver + v.img
                                    }" alt="">
                                </td>
                                <td>${v.name}</td>
                               
                                <td>${v.quantity}</td>
                                <td>${money(v.total_price)}</td>
                                <td>${v.discount}%</td>
                                <td>${money(v.total_result)}</td>
                                <td>${text_status_order(v.status)}</td>
                                <td>${v.customer_fullname}</td>
                                <td>${v.customer_phone}</td>
                                <td>${v.time_start}</td>
                                <td>
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Cài đặt
                                    <span class="caret"></span></button>
                                    <ul style="color:blue;" class="dropdown-menu">
                                        <li><a class="modal_cancel" 
                                                data-id="${v.id_order}"
                                                data-id_customer="${
                                                    v.id_customer
                                                }"
                                                data-customer_fullname="${
                                                    v.customer_fullname
                                                }"
                                                data-customer_phone="${
                                                    v.customer_phone
                                                }"
                                                data-code="${v.code}"
                                            >
                                        Hủy đơn hàng</a></li>
                                    </ul>
                                    </div>
                                </td>
                        </tr>
                    `;
                });
            }
            $("#content_product").html(output);
        },
    });
}
function show_sale() {
    let output = `<option value="">Chọn</option>`;
    $.ajax({
        type: "post",
        url: urlapi,
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            id_type: "3",
            limit: 5000,
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            $.each(response.data, function (k, v) {
                if (v.status_employee == "Y") {
                    output += `
                        <option value="${v.id}">${v.username}</option>
                    `;
                }
            });
            $("#id_account_add").html(output);
            $("#id_account_filter").html(output);
        },
    });
}
$(document).ready(function () {
    show_product_order(1);
   
    $("#table_product_order").on("click",".modal_cancel",function(){
        _id_order = $(this).data('id');
        _id_customer = $(this).data('id_customer');
        $("#cancel_form input,textarea").val('');
        $("#code_cancel").html($(this).data('code'));
        $("#cancel_modal").modal("show");
        
    });
    $("#btn_cancel").on("click",function(){
        $.ajax({
            type: "post",
            url: urlapi,
            data: {
                detect: "product_order_manager",
                type_manager: "cancel",
                id_order: _id_order,
                description: $("#description").val(),
            },
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if(response.success == "true")
                {
                    io_socket.emit('reload_data_customer',{id_customer:_id_customer+""});
                    show_product_order(1);
                    alert(response.message);
                    $("#cancel_modal").modal("hide");
                }
                else
                {
                    alert(response.message);
                }
            }
        });
    });
});
