var _type_manager = "";
var _id_product = "";

var page_next = 1;
function next_page(type) {
    if (type == "back") {
        if (page_next != 1) {
            page_next = page_next - 1;
            show_product(page_next);
            if (page_next == 1) {
                $("#page_back").css("color", "#303030");
            } else {
                $("#page_back").css("color", "rgb(60, 141, 188)");
            }
        }
    } else {
        page_next = page_next + 1;
        show_product(page_next);
        $("#page_back").css("color", "rgb(60, 141, 188)");
    }
}
function show_product(page) {
    let data_filter = {
        detect: "product_manager",
        type_manager: "list_admin",
        page: page,
        limit: 10,
        id_exchange: $("#id_exchange_filter").val(),
        status: $("#status_filter").val(),
        filter: $("#key_search").val(),
    };
    console.log(data_filter);
    $.ajax({
        url: urlapi,
        method: "POST",
        data:data_filter,
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
                                <td>
                                    <img class="img-product" src="${
                                        urlserver + v.img
                                    }" alt="">
                                </td>
                                <td>${v.name}</td>
                                <td>${money(v.price)}</td>
                                <td>${v.quantity}</td>
                                <td>${v.quantity_used}</td>
                                <td>${v.discount}</td>
                                 <td>${v.exchange_name}</td>
                                <td>${text_status_open_close(v.status)}</td>
                                <td>${v.created}</td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">${lang_setting}
                                        <span class="caret"></span></button>
                                        <ul style="color:blue;" class="dropdown-menu">
                                            <li><a class="modal_edit" 
                                                    data-id="${v.id_product}"
                                                    data-id_exchange="${
                                                        v.id_exchange
                                                    }"
                                                    data-img="${v.img}"
                                                    data-name="${v.name}"
                                                    data-price="${v.price}"
                                                    data-hot="${v.hot}"
                                                    data-quantity="${
                                                        v.quantity
                                                    }"
                                                    data-discount="${
                                                        v.discount
                                                    }"
                                                    data-discount_status="${
                                                        v.discount_status
                                                    }"
                                                    data-status="${v.status}"

                                                >
                                            ${lang_edit}</a></li>
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
    show_product(1);
    //show_sale();
    $("#modal_add").on("click", function () {
        _type_manager = "add";
        $("#insert_form").find("input").val("");
        $("#add_modal").modal("show");
    });
    $("#table_product").on("click", ".modal_edit", function () {
        _type_manager = "update";
        _id_product = $(this).attr("data-id");
        let id_exchange = $(this).attr("data-id_exchange");
        let img = $(this).attr("data-img");
        let name = $(this).attr("data-name");
        let price = $(this).attr("data-price");
        let quantity = $(this).attr("data-quantity");
        let hot = $(this).attr("data-hot");
        let discount = $(this).attr("data-discount");
        let discount_status = $(this).attr("data-discount_status");
        
        let content_img = `<img style="max-width:100%;max-height:200px;" src="${
            urlserver + img
        }" />`;
        $("#content_img").html(content_img);
        $("#id_exchange").find("option[value='" + id_exchange + "']").prop("selected", true);
        $("#product_name").val(name);
        $("#price").val(money(price));
        $("#quantity").val(quantity);
        $("#hot").val(hot);
        $("#discount").val(discount);

        $("#discount_status").prop("checked", false);
        if(discount_status == "open")
        {
            $("#discount_status").prop("checked", true);
        }
       

        $("#add_modal").modal("show");
    });
    $("#btn_insert_product").on("click", function () {
        var formData = new FormData();

        formData.append("detect", "product_manager");
        if (_type_manager == "add") {
            formData.append("type_manager", "create");
        } else {
            formData.append("type_manager", "update");
            formData.append("id_product", _id_product);
        }
        let discount_status = "";
        if ($("#discount_status").is(":checked"))
        {
            discount_status = "open";
        }
        else
        {
            discount_status = "close";
        }

        let price = get_value_money($("#price").val());
       
        formData.append("id_exchange", $("#id_exchange").val());
        formData.append("name", $("#product_name").val());
        formData.append("price", price);
        formData.append("quantity", $("#quantity").val());
        formData.append("hot", $("#hot").val());
        formData.append("discount", $("#discount").val());
        formData.append("discount_status", discount_status);
        formData.append("status", $("#status_add").val());

        let img_product = $("#img_product").prop("files")[0];
        if (img_product != "") {
           
            formData.append("img", img_product);
        }

        $.ajax({
            url: urlapi_2,
            method: "post",
            data: formData,
            dataType: "JSON",
            contentType: false,
            cache: false,
            processData: false,
            headers: {
                Authorization: "Basic " + xtk,
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_product(1);
                    $("#add_modal").modal("hide");
                } else {
                    alert(data.message);
                }
            },
        });
    });



});
