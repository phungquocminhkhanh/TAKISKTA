var _id_popup = "";
function show_popup(page) {
    let data_filter = {
        detect: "list_popup",
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
                                <td style="width:4%;">${v.index}</td>
                                <td>${v.content}</td>
                                <td>${v.updated}</td>
                                <td>
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">${lang_setting}
                                    <span class="caret"></span></button>
                                    <ul style="color:blue;" class="dropdown-menu">
                                        <li><a class="modal_edit" 
                                                data-id="${v.id}"
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
            $("#content_popup").html(output);
        },
    });
}
$(document).ready(function () {
    show_popup(1);
    $("#table_popup").on("click", ".modal_edit", function () {
        _id_popup = $(this).data('id');
        $.ajax({
            type: "post",
            url: urlapi,
            data: {
                detect: "list_popup",
                id_popup: _id_popup,
            },
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                var v = response.data[0];
                CKEDITOR.instances["content"].setData(v.content);
                $("#create_modal").modal("show");
            },
        });
        
    });

    $("#btn_insert").on("click", function () {
        var formData = new FormData();
        formData.append("detect", "popup_manager");
        formData.append("type_manager", "update");
        formData.append("id_popup", _id_popup);
        let content = CKEDITOR.instances.content.getData();
        formData.append("content", content);
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
            success: function (response) {
                alert(response.message);
                show_popup(1);
                $("#create_modal").modal("hide");
            },
        });
    });
});
