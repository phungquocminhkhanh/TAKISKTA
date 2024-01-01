$(document).ready(function () {
    let _id_product = "";
    let _type_post = "";
    function get_product() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-product",
            type: "GET",
            data: {},
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_product").html(response);
            },
        });
    }
    get_product();

    $("#btn_add_product").on("click", function () {
        _type_post = "add";
        $("#name").html("");
        $("#description").val("");
        $("#product_modal").modal("show");
        _id_product = "";
    });

    $("#page_product").on("click", ".btn-update-product", function () {
        _type_post = "update";
        let name = $(this).data("name");
        let description = $(this).data("description");
        let id_category = $(this).data("id_category");
        $("#id_category")
            .find("option[value=" + id_category + "]")
            .prop("selected", true);
        $("#name").val(name);
        $("#description").val(description);

        let icon = $(this).data("icon");
        $("#content_icon").html(
            `<img style="max-width:100%;max-height:200px;" src="${
                urlajax + "/" + icon
            }" />`
        );
        _id_product = $(this).data("id");
        $("#product_modal").modal("show");
    });

    $("#btn_save_add").on("click", function () {
        var formdata = new FormData();
        if (_type_post == "add") {
            formdata.append("id_category", $("#id_category").val());
            formdata.append("name", $("#name").val());
            formdata.append("description", $("#description").val());
            let file_service = $("#icon").prop("files")[0];
            if (file_service != "") {
                formdata.append("file_product", file_service);
            }
        } else {
            formdata.append("id_product", _id_product);
            formdata.append("id_category", $("#id_category").val());
            formdata.append("name", $("#name").val());
            formdata.append("description", $("#description").val());
            let file_service = $("#icon").prop("files")[0];
            if (file_service != "") {
                formdata.append("file_product", file_service);
            }
        }

        $.ajax({
            url: urlajax + "/admin/ajax-add-product",
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
                    get_product();
                    alert(response.message);
                    $("#product_modal").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });
});
