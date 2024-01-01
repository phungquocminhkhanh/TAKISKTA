function show_permisson() {
    var output = "";
    $.ajax({
        url: urlapi,
        method: "post",
        data: { detect: "account_type_manager", type_manager: "list_module" },
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(data) {
            if (data.success == "true") {
                var output3 = "";
                $.each(data.data, function(k, v) {
                    output3 += `
                    <tr>
                    <td>${v.permission}</td>
                    <td>${v.description}</td>
                    </tr>`;

                });
                $("#content-per").html(output3)
            }


        }
    });
}

function show_type() {
    $.ajax({
        url: urlapi,
        method: "post",
        data: { detect: "account_type_manager", type_manager: "list_type" },
         headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(data) {
            if (data.success == "true") {
                var output = "";
                $.each(data.data, function(k, v) {
                    output += `
                    <tr>
                    <td>${v.type_account}</td>
                    <td>${v.description}</td>
                    </tr>`;

                });
                $("#content-type").html(output)
            }


        }
    });
}

$(document).ready(function() {
    show_permisson();
    show_type();

});