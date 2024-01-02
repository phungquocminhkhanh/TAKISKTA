var _type_manager = "";
var _id_period = "";
var _id_customer = "";

function show_period(page) {
    let data_filter = {
        detect: "period_manager",
        type_manager: "list_admin",
        status: $("#status_filter").val(),
        filter: $("#key_search").val(),
        id_exchange: $("#id_exchange_filter").val(),
        date_begin : $("#date_begin").val()
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
                                <td>${v.discount}%</td>
                                <td>${text_status_open_close(v.status)}</td>
                                <td>
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Cài đặt
                                    <span class="caret"></span></button>
                                    <ul style="color:blue;" class="dropdown-menu">
                                        <li><a class="modal_edit" 
                                                data-id="${v.id_period}"
                                                data-id_exchange="${
                                                    v.id_exchange
                                                }"
                                                data-period_open="${
                                                    v.period_open
                                                }"
                                                data-period_close="${
                                                    v.period_close
                                                }"
                                                data-discount="${v.discount}"
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
            $("#content_period").html(output);
        },
    });
}

$(document).ready(function () {
    show_period(1);

    $("#modal_add").on("click", function () {
        _type_manager = "create";
        $("#create_modal .btn_insert").html("Thêm");
        $("#create_modal").modal("show");
    });
    $("#btn_insert_period").on("click", function () {

        let d_start = $("#d_start").val();
        let h_start = $("#h_start").val();
        let m_start = $("#m_start").val();
        let period_open = d_start + " " + h_start + ":" + m_start + ":00";

        let d_end = $("#d_end").val();
        let h_end = $("#h_end").val();
        let m_end = $("#m_end").val();
        let period_close = d_end + " " + h_end + ":" + m_end + ":00";

        var formData = new FormData();
        formData.append("detect", "period_manager");
        if (_type_manager == "create") {
             formData.append("type_manager", "create");
        }
        else
        {
            formData.append("type_manager", "update");
            formData.append("id_period", _id_period);
        }
        formData.append("id_exchange", $("#id_exchange").val());
        formData.append("period_open", period_open);
        formData.append("period_close", period_close);
        formData.append("discount", $("#discount").val());
        formData.append("status", $("#status").val());

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
                    show_period(1);
                    $("#create_modal").modal("hide");
                } else {
                    alert(data.message);
                }
            },
        });
    });
    $("#table_period").on("click", ".modal_edit", function () {
        _type_manager = "update";
        $("#create_modal .btn_insert").html("Cập nhật");
        _id_period = $(this).data('id');
        let id_exchange = $(this).data("id_exchange");
        let period_open = $(this).data("period_open");
        let period_close = $(this).data("period_close");
       
        let d_start = moment(period_open + ":00", "DD/MM/YYYY HH:mm:ss").format(
            "YYYY-MM-DD"
        );
        let h_start = moment(period_open + ":00").hours();
        let m_start = moment(period_open + ":00").minutes();

        let d_end = moment(period_close + ":00", "DD/MM/YYYY HH:mm:ss").format(
            "YYYY-MM-DD"
        );
        let h_end = moment(period_close + ":00").hours();
        let m_end = moment(period_close + ":00").minutes();
       
        $("#d_start").val(d_start);
        $("#h_start").val(h_start);
        $("#m_start").val(m_start);

        $("#d_end").val(d_end);
        $("#h_end").val(h_end);
        $("#m_end").val(m_end);

        let status = $(this).data("status");
        let discount = $(this).data("discount");

        $("#id_exchange").find("option[value='" + id_exchange + "']").prop("selected",true);
        $("#status").find("option[value='" + status + "']").prop("selected",true);
        $("#discount").val(discount);
        $("#create_modal").modal("show");
    });
});
