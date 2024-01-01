$(document).ready(function () {
    let _id_category = "";
    let _type_post = "";
    function get_category() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-category",
            type: "GET",
            data: {},
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_category").html(response);
            },
        });
    }
    get_category();
    $("#btn_add_category").on("click", function () {
        _type_post = "add";
        $("#name").html("");
        $("#description").val("");
        $("#addCategory").modal("show");
        _id_category = "";
    });

    $("#page_category").on("click", ".btn_update_category", function () {
        _type_post = "update";
        let name = $(this).data("name");
        let description = $(this).data("description");
        $("#name").val(name);
        $("#description").val(description);
        _id_category = $(this).data("id");
        $("#addCategory").modal("show");
    });

    $("#btn_save_add").on("click", function () {
        var formdata = new FormData();
        if (_type_post == "add") {
            formdata.append("name", $("#name").val());
            formdata.append("description", $("#description").val());
        } else {
            formdata.append("id_category", _id_category);
            formdata.append("name", $("#name").val());
            formdata.append("description", $("#description").val());
        }

        $.ajax({
            url: urlajax + "/admin/ajax-add-category",
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
                    get_category();
                    alert(response.message);
                    $("#addCategory").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });
});
