$(document).ready(function () {
    let _code = "";
    let _id_about = "";
    let _type_post = "";
    function get_about() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-about",
            type: "GET",
            data: {
                code: _code,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_about").html(response);
            },
        });
    }
    get_about();
    $("#filter_code").on("change", function () {
        _code = $(this).val();
        get_about();
    });
    $("#btn_add_about").on("click", function () {
        _type_post = "add";
        $("#content_icon").html("");
        $("#icon").val("");
        $("#title").val("");
        $("#content").val("");
        $("#addAbout").modal("show");
        _id_about = " ";
    });
    $("#btn_save_add").on("click", function () {
        var formdata = new FormData();

        if (_type_post == "add"){
            formdata.append("code", $("#code").val());
            formdata.append("title", $("#title").val());
            formdata.append("content", $("#content").val());
            let file_about=$("#icon").prop("files")[0];
            if (file_about != "") {
                formdata.append("file_about", file_about);
            }
        }else{
            formdata.append("code", $("#code").val());
            formdata.append("title", $("#title").val());
            formdata.append("content", $("#content").val());
            formdata.append("id_about", _id_about);
            let file_about = $("#icon").prop("files")[0];
            if (file_about != "") {
                formdata.append("file_about", file_about);
            }
        }
        $.ajax({
            url: urlajax + "/admin/ajax-add-about",
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
                    get_about();
                    alert(response.message);
                    $("#addAbout").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });
    $("#page_about").on("click", ".btn-update-about", function () {
        $("#icon").val(""); // đặt file về  = null
        _id_about = $(this).data("id");
        let code = $(this).data("code");
        let icon = $(this).data("icon");
        let title = $(this).data("title");
        let content = $(this).data("content");
        $("#code")
            .find("option[value=" + code + "]")
            .prop("selected", true);
        $("#code").prop("disabled", true);
        _type_post = "update";
        $("#content_icon").html(
            `<img style="max-width:100%;max-height:200px;" src="${
                urlajax + "/" + icon
            }" />`
        );
        $("#title").val(title);
        $("#content").val(content);
        $("#addAbout").modal("show");
    });
    $("#page_about").on("click", ".btn-delete-about", function () {
        var r = confirm("Bạn có chắc muốn xóa không ?");
        if (r == true) {
            let id = $(this).data("id");
            let formdata = new FormData();
            formdata.append("id_about", id);
            $.ajax({
                url: urlajax + "/admin/ajax-delete-about",
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
                        get_about();
                        alert("Xóa thành công");
                    } else {
                        alert("Thất bại");
                    }
                },
            });
        }
    });
});
