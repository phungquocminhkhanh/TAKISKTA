$(document).ready(function () {
    
    let _custome_name = "";

    function get_feedback() {
        $.ajax({
            url: urlajax + "/admin/ajax-get-feedback",
            type: "GET",
            data: {
                _custome_name: _custome_name,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                $("#table_feedback").html(response);
            },
        });
    }
    get_feedback();
});
