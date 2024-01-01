$(document).ready(function () {
    let _code = "";
    let _id_slide = "";
    let _type_post = "";
    function get_slide() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-slide",
            type: "GET",
            data: {
                code: _code,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_slide").html(response);
            },
        });
    }
    get_slide();
    $("#filter_code").on("change", function () {
        _code = $(this).val();
        get_slide();
    });
    $("#btn_add_slide").on("click", function () {
        _type_post = "add";
        $("#content_link").html("");
        $("#link").val("");
        $("#addSlide").modal("show");
        _id_slide = "";
    });
    $("#btn_save_add").on("click", function () {
        var formdata = new FormData();

        if (_type_post == "add") {
            formdata.append("code", $("#code").val());
            let file_slide = $("#link").prop("files")[0];
            if (file_slide != "") {
                formdata.append("file_slide", file_slide);
            }
        } else {
            // update
            formdata.append("code", $("#code").val());
            formdata.append("id_slide", _id_slide); // update thi có chuyen id lên
            let file_slide = $("#link").prop("files")[0];
            if (file_slide != "") {
                formdata.append("file_slide", file_slide);
            }
        }

        $.ajax({
            url: urlajax + "/admin/ajax-add-slide",
            type: "POST",
            data: formdata,
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success == true) {
                    get_slide();
                    alert(response.message);
                    $("#addSlide").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });

    $("#page_slide").on("click", ".btn-update-slide", function () {
        $("#link").val(""); // đặt file về  = null
        _id_slide = $(this).data("id");
        let code = $(this).data("code");
        let link = $(this).data("link");
        $("#code")
            .find("option[value=" + code + "]")
            .prop("selected", true);
        $("#code").prop("disabled", true);
        _type_post = "update";
        $("#content_link").html(
            `<img style="max-width:100%;max-height:200px;" src="${
                urlajax + "/" + link
            }" />`
        );

        $("#addSlide").modal("show");
    });
    $("#page_slide").on("click", ".btn-delete-slide", function () {
        console.log(111);
        var r = confirm("Bạn có chắc muốn xóa không ?");
        if (r == true) {
            let id = $(this).data("id");
            let formdata = new FormData();
            formdata.append("id_slide", id);
            $.ajax({
                url: urlajax + "/admin/ajax-delete-slide",
                type: "POST",
                data: formdata,
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                processData: false,
                contentType: false,
                success: function (response) {
                    if (response.success == true) {
                        get_slide();
                        alert("Xóa thành công");
                    } else {
                        alert("Thất bại");
                    }
                },
            });
        }
    });
});
