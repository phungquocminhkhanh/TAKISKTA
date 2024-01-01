var _type_manager = "";
var _id_order = "";
var _id_customer = "";

function show_period(page) {
    let data_filter = {
        detect: "period_manager",
        type_manager: "list_admin",
        status: $("#status_filter").val(),
        filter: $("#key_search").val(),
        id_exchange: $("#id_exchange_filter").val(),
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
                                <td>${v.exchange_name}</td>
                                <td>${v.period_open}</td>
                                <td>${v.period_close}</td>
                                <td>${text_status_open_close(v.status)}</td>
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
            $("#content_period").html(output);
        },
    });
}

$(document).ready(function () {
    show_period(1);

    $("#table_product_order").on("click", ".modal_cancel", function () {
        _id_order = $(this).data("id");
        _id_customer = $(this).data("id_customer");
        $("#cancel_form input,textarea").val("");
        $("#code_cancel").html($(this).data("code"));
        $("#cancel_modal").modal("show");
    });
    $("#btn_cancel").on("click", function () {
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
                if (response.success == "true") {
                    io_socket.emit("reload_data_customer", {
                        id_customer: _id_customer + "",
                    });
                    show_period(1);
                    alert(response.message);
                    $("#cancel_modal").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });
});
