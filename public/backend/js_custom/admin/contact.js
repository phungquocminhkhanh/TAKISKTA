$(document).ready(function () {
    let _id_contact = "";
    _type_post="";
    function get_contact() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-contact",
            type: "GET",
            data: {},
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_contact").html(response);
            },
        });
    }
    get_contact();
    $("#page_contact").on("click",'.btn-update-contact',function () {
        _id_contact = $(this).data("id");
        let address = $(this).data("address");
        let phone = $(this).data("phone");
        let email = $(this).data("email");
        let time_work = $(this).data("time_work");
        _type_post = "update";
       
        $("#address").val(address);
        $("#phone").val(phone);
        $("#email").val(email);
        $("#time_work").val(time_work);
        $("#addContact").modal("show");
    });
    $("#btn_save_add").on("click", function () {
        var formdata = new FormData();

        if (_type_post == "update"){
            formdata.append("address", $("#address").val());
            formdata.append("phone", $("#phone").val());
            formdata.append("email", $("#email").val());
            formdata.append("time_work", $("#time_work").val());
            formdata.append("id_contact", _id_contact);
        }
        $.ajax({
            url: urlajax + "/admin/ajax-add-contact",
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
                    get_contact();
                    alert(response.message);
                    $("#addContact").modal("hide");
                } else {
                    alert(response.message);
                }
            },
        });
    });
});
