$(document).ready(function () {
    let _code = "";
    let _id_service = "";
    let _type_post = "";
    function get_service() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-service",
            type: "GET",
            data: {
                code: _code,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_service").html(response);
            },
        });
    }
    get_service();
    $("#filter_code").on("change", function () {
        _code = $(this).val();
        get_service();
    });
    $("#btn_add_service").on("click", function () {
        _type_post = "add";
        $("#content_icon").html("");
        $("#icon").val("");
        $("#title").val("");
        $("#content").val("");
        $("#addService").modal("show");
        _id_service = "";
    });
    $("#btn_save_add").on("click", function () {
        var formdata = new FormData();
        if(_type_post == "add"){
            formdata.append("code", $("#code").val());
            formdata.append("title", $("#title").val());
            formdata.append("content", $("#content").val());
            let file_service=$("#icon").prop("files")[0];
            if (file_service != "") {
                formdata.append("file_service", file_service);
            }
        }else{
            formdata.append("code", $("#code").val());
            formdata.append("title", $("#title").val());
            formdata.append("content", $("#content").val());
            formdata.append("id_service", _id_service);

            let file_service=$("#icon").prop("files")[0];
            if (file_service != "") {
                formdata.append("file_service", file_service);
            }
        }
        $.ajax({
            url: urlajax + "/admin/ajax-add-service",
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
                    get_service();
                    alert(response.message);
                    $("#addService").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });
    $("#page_service").on("click", ".btn-update-service", function () {
        $("#icon").val(""); // đặt file về  = null
        _id_service = $(this).data("id");
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
        $("#addService").modal("show");
    });
    $("#page_service").on("click", ".btn-delete-service", function () {
        var r = confirm("Bạn có chắc muốn xóa không ?");
        if (r == true) {
            let id = $(this).data("id");
            let formdata = new FormData();
            formdata.append("id_service", id);
            $.ajax({
                url: urlajax + "/admin/ajax-delete-service",
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
                        get_service();
                        alert("Xóa thành công");
                    } else {
                        alert("Thất bại");
                    }
                },
            });
        }
    });
});
