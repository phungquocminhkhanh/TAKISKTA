var _id_exchange = "";
function show_exchange(page) {
    let data_filter = {
        detect: "exchange_manager",
        type_manager: "list_exchange_admin",
    };

    $.ajax({
        url: urlapi,
        method: "POST",
        data: data_filter,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            let output = "";
            if (data.success == "true") {
                $.each(data.data, function (k, v) {
                    output += `
                        <tr>
                                <td>
                                <img class="img-product" src="${
                                    urlserver + v.exchange_icon
                                }" alt="">
                                </td>
                                <td>${v.exchange_name}</td>
                               
                                <td>
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">${lang_setting}
                                    <span class="caret"></span></button>
                                    <ul style="color:blue;" class="dropdown-menu">
                                        <li><a class="modal_edit" 
                                                data-id="${v.id_exchange}"
                                                data-exchange_name="${
                                                    v.exchange_name
                                                }"
                                                data-exchange_icon="${
                                                    v.exchange_icon
                                                }"
                                            >
                                            ${lang_edit}
                                            </a>
                                        </li>
                                    </ul>
                                    </div>
                                </td>
                        </tr>
                    `;
                });
            }
            $("#content_exchange").html(output);
        },
    });
}
$(document).ready(function () {
    show_exchange(1);
    $("#table_exchange").on("click", ".modal_edit", function () {
        _id_exchange = $(this).data("id");

        let exchange_name = $(this).attr("data-exchange_name");
        let img = $(this).attr("data-exchange_icon");
        let content_img = `<img style="max-width:100%;max-height:200px;" src="${
            urlserver + img
        }" />`;
        $("#content_img").html(content_img);
        $("#exchange_name").val(exchange_name);
        $("#create_modal").modal("show");
    });

    $("#btn_insert").on("click", function () {
        var formData = new FormData();
        formData.append("detect", "exchange_manager");
        formData.append("type_manager", "update_live");
        formData.append("id_exchange", _id_exchange);

        let exchange_icon = $("#exchange_icon").prop("files")[0];
        if (exchange_icon != "") {
            formData.append("exchange_icon", exchange_icon);
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
            success: function (response) {
                alert("Cập nhật thành công");
                show_exchange(1);
                $("#create_modal").modal("hide");
            },
        });
    });
});
