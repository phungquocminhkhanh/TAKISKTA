function authen_customer(id) {
    var r = confirm("Bạn có chắc muốn xác nhận tài khoản này không");

    if (r == true) {
        let dis = "";

        if ($("#check_authen").is(":checked")) {
            dis = "Y";
        } else {
            dis = "N";
        }
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "customer_manager",
                type_manager: "update",
                id_customer: id,
                customer_authend: dis,
            },
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.success == "true") {
                    show_customer(1);
                    alert(response.message);
                } else {
                    alert(response.message);
                }
            },
        });
    } else {
        edit_customer(id);
    }
}
function show_customer(page) {
    ngaybatdau = $("#ngaybatdau").val();
    ngayketthuc = $("#ngayketthuc").val();
    var key = $("#key_seach").val();
    var data = {};
    if (ngaybatdau && ngayketthuc) {
        data = {
            detect: "list_customer_customer",
            date_begin: ngaybatdau,
            date_end: ngayketthuc,
            filter: key,
            customer_authend: "N",
            limit: 10,
            page: page,
        };
    } else {
        data = {
            detect: "list_customer_customer",
            filter: key,
            customer_authend: "N",
            limit: 10,
            page: page,
        };
    }
    $.ajax({
        url: urlapi,
        method: "POST",
        data: data, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            console.log(response);
            var output = "";
            var output_phantrang = "";
            $("#report-total").html(`<small>Tổng : ${response.total}</small>`);
            $.each(response.data, function (k, v) {
                output += `
               <tr>
               <th style="width:4%;">${page * 10 - 9 + k}</th>
               <td>${v.customer_name}</td>
               <td class="td_phone"><p class="groove">${
                   v.customer_phone
               }</p></td>
               <td>${v.customer_cert_no}</td>
               <td>${v.customer_registered}</td>


               <td>
              <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox"  onChange="authen_customer(${
                                v.id_customer
                            })" class="onoffswitch-checkbox" id="check_authen">
                            <label class="onoffswitch-label" for="check_authen">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
             
                  
                  </td>
           </tr>
              `;
            });
            $("#content-customer").html(output);
            for (let i = 0; i < response.total_page; i++) {
                output_phantrang += ` <li class="page-item"><a class="page-link" style="width:40px;" onclick="show_authen_customer(${
                    i + 1
                })" href="#">${i + 1}</a></li>`;
            }
            $("#phantrang").html(output_phantrang);
        },
    });
}
$(document).ready(function () {
    show_customer(1);
});
