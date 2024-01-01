var _type_manager = "";
var _id_introduce = "";
function show_introduce(page) {
    let data_filter = {
        detect: "introduce_manager",
        type_manager: "list",
        page: page,
        limit: 10,
        id_account: $("#id_account_filter").val(),
        status: $("#status_filter").val(),
        filter : $("#key_search").val()
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
                                <td>${v.account_username}</td>
                                <td>${v.introduce}</td>
                                <td>${v.quantity}</td>
                                <td>${v.quantity_used}</td>
                                <td>${text_status_open_close(v.status)}</td>
                                <td>${v.created}</td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Cài đặt
                                        <span class="caret"></span></button>
                                        <ul style="color:blue;" class="dropdown-menu">
                                            <li><a class="modal_edit" 
                                                    data-id="${v.id}"
                                                    data-id_account="${
                                                        v.id_account
                                                    }"
                                                    data-quantity="${
                                                        v.quantity
                                                    }"
                                                    data-status="${v.status}"

                                                >
                                            Sửa</a></li>
                                        </ul>
                                    </div>
                                </td>
                        </tr>
                    `;
                });
            }
            $("#content_introduce").html(output);
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
    show_introduce(1);
    show_sale();
    $("#modal_add").on("click", function () {
        _type_manager = "add";
        $("#add_modal").modal("show");
    });
    $("#table_introduce").on("click", ".modal_edit", function () {
        _type_manager = "update";
        _id_introduce = $(this).data("id");
        let id_account = $(this).data("id_account");
        let quantity = $(this).data("quantity");
        
        $("#id_account_add").find("option[value='" + id_account + "']").prop("selected",true);
        $("#quantity").val(quantity);

        $("#add_modal").modal("show");
    });
    $("#btn_insert_introduce").on("click", function () {
        var formData = new FormData();

        if ($("#id_account_add").val() == "") {
            alert("Chọn nhân viên");
            return;
        }
        formData.append("detect", "introduce_manager");
        if (_type_manager == "add") {
            formData.append("type_manager", "create");
        } else {
            formData.append("type_manager", "update");
            formData.append("id_introduce", _id_introduce);
        }
        formData.append("id_account", $("#id_account_add").val());
        formData.append("quantity", $("#quantity").val());
        formData.append("status", $("#status_add").val());

        $.ajax({
            url: urlapi,
            method: "post",
            data: formData,
            dataType: "JSON",
            contentType: false,
            cache: false,
            processData: false,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_introduce(1);
                    $("#add_modal").modal("hide");
                } else {
                    alert(data.message);
                }
            },
        });
    });



});
