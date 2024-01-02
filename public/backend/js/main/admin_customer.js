var _id_customer = "";
function clear_data()
{
    $("#insert_customer_form input").val('');
}
function check_pass_dashboard22() {
    var flag = 0;
    var cpass3 = $("#dashpassword_change_customer").val();
    var cpass4 = $("#dashpassword_change_customer2").val();
    var strongRegex = new RegExp(
        "^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
    );
    var mediumRegex = new RegExp(
        "^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
    );
    if (cpass3 == "" || cpass3.length < 6) {
        flag = 1;
        $("#dasherpassword_customer").html("Mật khẩu phải ít nhất 6 ký tự");
    } else {
        // if (mediumRegex.test(cpass) || strongRegex.test(cpass)) {
        //     $('#dasherpassword').html('')
        // } else {
        //     flag = 1;
        //     $('#dasherpassword').html('Mật khẩu phải bao hồm chữ hoa, chữ thường và số')
        // }
        if (cpass3 != cpass4 && cpass3 != "") {
            flag = 1;
            $("#dasherpassword2_customer").html("Mật khẩu nhập lại không đúng");
        } else {
            $("#dasherpassword2_customer").html("");
            if (cpass3.search(" ") == -1)
                $("#dasherpassword_customer").html("");
            else {
                flag = 1;
                $("#dasherpassword_customer").html(
                    "Mật khẩu không được có ký tự dấu cách"
                );
            }
        }
    }

    if (flag == 0) return true;
    return false;
}
function quen_mk(phone) {
    $("#customer_phone_quenmk").val(phone);
    $("#detail_customer_modal").modal("hide");
}
function delete_customer(id) {
    r = confirm("Bạn có chắc muốn xóa tài khoản này không");
    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "POST",
            data: {
                detect: "customer_manager",
                type_manager: "delete",
                id_customer: id,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_customer(1);
                } else alert(data.message);
            },
        });
    } else {
    }
}
function edit_customer(id_customer) {
    _id_customer = id_customer;
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_detail",
            id_customer: id_customer,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            if (data.success == "true") {
                $.each(data.data, function (k, v) {
                    $("#ecustomer_name").val(v.customer_name);
                    $("#ecustomer_phone").val(v.customer_phone);
                    $("#ecustomer_cert_no").val(v.customer_cert_no);
                    $("#ecustomer_introduce").val(v.customer_introduce);

                    let disable = v.customer_disable == "N" ? "checked" : "";

                    $("#btn_delete_pass").html(`
                     
                     `);

                    $("#eid_bank")
                        .find("option[value='" + v.id_bank + "']")
                        .prop("selected", true);

                    $("#ecustomer_account_no").val(v.customer_account_no);
                    $("#ecustomer_account_holder").val(
                        v.customer_account_holder
                    );
                    $("#ecustomer_password_payment").val(
                        v.customer_password_payment
                    );
                    $("#ecustomer_password").val(
                        v.customer_password
                    );
                    if ($("#type_admin").val() == "3") {
                        $("#update_customer_form input").prop("readonly", true);
                    }
                    
                    $("#ecompany_name").val(v.company_name);
                });
            }
        },
    });
}
function disable_customer(id, disable) {
    var value_disable = disable == "N" ? "Y" : "N";
    var message =
        disable == "N"
            ? "Bạn có chắc muốn khóa tài khoản này không ?"
            : "Bạn có chắc muốn mở tài khoản này không ?";
    var r = confirm(message);

    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "customer_manager",
                type_manager: "update",
                id_customer: id,
                customer_disable: value_disable,
            },
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.success == "true") {
                    io_socket.emit('reload_data_customer',{id_customer:id+""});
                    show_customer(1);
                    alert(response.message);
                } else {
                    alert(response.message);
                }
            },
        });
    }
}
function vi_customer(id) {
    _id_customer = id;
    $("#money_customer").html("đang load");
    $("#money_withdraw").val("");
    $.ajax({
        url: urlapi,
        method: "post",
        data: {
            detect: "check_customer_balance",
            type_customer: "customer",
            id_customer: id,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            if (response.success == "true") {
                money_customer = Number(response.data[0].customer_wallet_bet);
                money_customer_khuyenmai = Number(
                    response.data[0].customer_wallet_rewards
                );
                $("#money_customer").html(
                    money(response.data[0].customer_wallet_bet) + " VND"
                );
            }
        },
    });
}
function show_div_detail(id_customer,customer_name,customer_phone)
{
    $("#info_edit").html(customer_name + " - " + customer_phone);
    _id_customer = id_customer;
    $("#div_detail").show();
    window.location.replace("#div_detail");
}

function show_ip(id_customer)
{
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_ip",
            id_customer : id_customer
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            let output = ``;
            if (response.success == "true") {
                $.each(response.data, function (k, v) {
                    output += `
                    <tr>
                        <td>${v.ip}</td>
                        <td>${v.updated}</td>
                    </tr>
                    `;
                });
                $("#content_ip").html(output);
                $("#customer_ip_modal").modal("show");
            } else {
            }
        },
    });
}
var page_next = 1;
function next_page(type) {
    if (type == "back") {
        if (page_next != 1) {
            page_next = page_next - 1;
            show_customer(page_next);
            if (page_next == 1) {
                $("#page_back").css("color", "#303030");
            } else {
                $("#page_back").css("color", "rgb(60, 141, 188)");
            }
        }
    } else {
        page_next = page_next + 1;
        show_customer(page_next);
        $("#page_back").css("color", "rgb(60, 141, 188)");
    }
}

function show_customer(page) {
    let ngaybatdau = $("#ngaybatdau").val();
    let ngayketthuc = $("#ngayketthuc").val();
    if (ngaybatdau != "" && ngayketthuc == "") {
        alert("Vui long chọn ngày kết thúc");
        return;
    }
    if (ngayketthuc != "" && ngaybatdau == "") {
        alert("Vui long chọn ngày bắt đầu");
        return;
    }
    var key = $("#key_search").val();
    let id_account = "";
    var data = {};

    if ($("#type_admin").val() == "1" || $("#type_admin").val() == "2") {
        id_account = $("#id_account_filter").val();
    } else {
        id_account = $("#id_account").val();
    }

    if (ngaybatdau && ngayketthuc) {
        data = {
            detect: "list_customer_customer",
            date_begin: ngaybatdau,
            date_end: ngayketthuc,
            filter: key,
            customer_disable: $("#customer_disable").val(),
            id_account: id_account,
            limit: 10,
            page: page,
            type_admin: "admin",
        };
    } else {
        data = {
            detect: "list_customer_customer",
            filter: key,
            id_account: id_account,
            customer_disable: $("#customer_disable").val(),
            limit: 10,
            page: page,
            type_admin: "admin",
        };
    }
   
    $("#content-customer").html(` <tr>
    <td colspan="7"><div class="box-loader" id="loading_detail">
        <div class="loader"></div>
        <h3>Đang tải dữ liệu</h3>
    </div></td>
    </tr> `);
    $.ajax({
        url: urlapi,
        method: "POST",
        data: data,
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
      
            $("#content-customer").html(``);
            var output = "";
            var output_phantrang = "";

            let date = new Date().toISOString().split("T")[0];
            let i = 0;
            let btn_dieuhanh = "";
            let btn_xem_vi = "";
            let text_disable = "";
            let text_payment = "";
            let text_lixi = "";
            if (response.success == "true") {
                $.each(response.data, function (k, v) {
                    text_disable =
                        v.customer_disable == "N"
                            ? "Khóa tài khoản"
                            : "Mở tài khoản";
            
                    btn_dieuhanh = "";
                    btn_xem_vi = "";
                    var date_cus = new Date(v.customer_registered)
                        .toISOString()
                        .split("T")[0];
                    if (date_cus == date) {
                        i++;
                    }
                    if ($("#type_admin").val() == "1") {
                        btn_xem_vi = `<li><a onclick="vi_customer('${v.id_customer}')" data-toggle="modal" data-target="#vi_customer">Xem ví</a></li>`;
                    }
                    if (
                        $("#type_admin").val() == "1" ||
                        $("#type_admin").val() == "2"
                    ) {
                        //admin vs chắm sóc
                        btn_dieuhanh = `
                                     <div class="dropdown">
                                      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Cài đặt
                                      <span class="caret"></span></button>
                                      <ul style="color:blue;" class="dropdown-menu">
                                        <li><a onclick="edit_customer('${v.id_customer}')" data-toggle="modal" data-target="#detail_customer_modal">Sửa</a></li>
                                        ${btn_xem_vi}
                                        <li><a onclick="disable_customer('${v.id_customer}','${v.customer_disable}')">${text_disable}</a></li>
                                        <li><a onclick="quen_mk('${v.customer_phone}')" data-toggle="modal" data-target="#change_password_customer_Modal">Cập nhật mật khẩu</a></li>
                                        <li><a onclick="show_ip('${v.id_customer}')">Xem IP</a></li>
                                        <li><a onclick="show_div_detail('${v.id_customer}','${v.customer_name}','${v.customer_phone}')">Cài đặt mua</a></li>
                                      </ul>
                                    </div>
                            `;
                    }
                    if ($("#type_admin").val() == "3") {
                        btn_dieuhanh = `
                                     <div class="dropdown">
                                      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Cài đặt
                                      <span class="caret"></span></button>
                                      <ul style="color:blue;" class="dropdown-menu">
                                        <li><a onclick="edit_customer('${v.id_customer}')" data-toggle="modal" data-target="#detail_customer_modal">Chi tiết</a></li>
                                      </ul>
                                    </div>`;
                    }

                    output += `
                    <tr>
                        <td style="width:4%;">${page * 10 - 9 + k}</td>
                        <td>${v.customer_name}</td>
                        <td><p class="groove">${v.customer_phone}</p></td>
                        <td class="text-center">${v.solan_nap}</td>
                        <td class="text-center">${money(v.total_nap)}</td>
                        <td class="text-center">${money(v.total_rut)}</td>
                        <td>${v.customer_sale}</td>
                        <td>${v.customer_registered}</td>
                        <td>
                            ${btn_dieuhanh}
                        </td>
                    </tr>
                   `;
                });
                // $("#report-total").html(
                //     `<small>Tổng : ${response.total}</small><br /><small>Tổng trong ngày : ${i}</small>`
                // );
                $("#content_customer").html(output);
            } else {
                // $("#report-total").html(
                //     `<small>Tổng : 0</small><br /><small>Tổng trong ngày : 0</small>`
                // );
                $("#content_customer").html("");
            }
        },
    });
}
function get_list_bank() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_bank",
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            let outputbank = ``;
            if (response.success == "true") {
                list_bank = response.data;
                $.each(response.data, function (k, v) {
                    outputbank += `<option value="${v.id_bank}">${v.bank_short_name}</option>`;
                });
                $("#id_bank").html(outputbank);
                $("#eid_bank").html(outputbank);
            } else {
            }
        },
    });
}
function show_sale() {
    let output = `<option value="">Chọn</option>`;
    $.ajax({
        type: "post",
        url: urlapi,
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            id_type: "3",
            limit: 5000,
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            $.each(response.data, function (k, v) {
                if (v.status_employee == "Y") {
                    output += `
                        <option value="${v.id}">${v.username}</option>
                    `;
                }
            });
            $("#id_account_filter").html(output);
        },
    });
}
$(document).ready(function () {
   
    show_customer(1);
    get_list_bank();
    show_sale();
    $("#btn_insert_customer").on("click", function (event) {
        event.preventDefault();

        var formData = new FormData();
        formData.append("detect", "customer_manager");
        formData.append("type_manager", "create");
        formData.append("customer_virtual", "N");
        formData.append("customer_name", $("#customer_name").val());
        formData.append("customer_phone", $("#customer_phone").val());
        formData.append("customer_introduce", $("#customer_introduce").val());
        formData.append("customer_password", $("#customer_password").val());
        formData.append("id_bank", $("#id_bank").val());
        formData.append("customer_account_no", $("#customer_account_no").val());
        formData.append("customer_account_holder",$("#customer_account_holder").val());
        formData.append("customer_password_payment",$("#customer_password_payment").val());
        formData.append("company_name", $("#company_name").val());
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
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_customer(1);
                    $("#create_customer").modal('hide');
                } else {
                    alert(data.message);
                }
            },
        });
    });

    $("#btn_update_customer").on("click", function (event) {
        event.preventDefault();

        var formData = new FormData();
        formData.append("detect", "customer_manager");
        formData.append("type_manager", "update");
        formData.append("id_customer", _id_customer);

        formData.append("customer_name", $("#ecustomer_name").val());

        formData.append("customer_phone", $("#ecustomer_phone").val());

        formData.append("id_bank", $("#eid_bank").val());
        formData.append(
            "customer_account_no",
            $("#ecustomer_account_no").val()
        );
        formData.append(
            "customer_account_holder",
            $("#ecustomer_account_holder").val()
        );
        formData.append(
            "customer_password_payment",
            $("#ecustomer_password_payment").val()
        );
        formData.append("company_name", $("#ecompany_name").val());    
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
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_customer(1);
                    $("#detail_customer_modal").modal('hide');
                } else {
                    alert(data.message);
                }
            },
        });
    })
    ;
    $("#vi_customer_form").on("submit", function (event) {
        let flag = 0;

        event.preventDefault();
        var type_thuhoi = $("input[name=flexRadioDefault_vi]:checked").val()
            ? $("input[name=flexRadioDefault_vi]:checked").val()
            : "";
        var money_value = $("#money_withdraw").val();
        if (money_value) {
            money_value = get_value_money($("#money_withdraw").val());
            if (type_thuhoi == 1) {
                if (money_value > money_customer) flag = 1;
            }
            if (type_thuhoi == 2) {
                if (money_value > money_customer_khuyenmai) flag = 1;
            }

            if (flag == 1) {
                alert(
                    "Số tiền thu hồi phải nhỏ hơn hoặc bằng số tiền trong ví"
                );
            } else {
                $.ajax({
                    url: urlapi,
                    method: "post",
                    data: {
                        detect: "edit_customer_wallet",
                        id_customer: _id_customer,
                        id_account: $("#id_account").val(),
                        money_withdraw: money_value,
                        request_type: type_thuhoi,
                    },
                    dataType: "JSON",
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                    success: function (data) {
                        if (data.success == "true") {
                            alert(data.message);
                            show_customer(1);
                            $("#vi_customer").modal('hide');
                        } else {
                            alert(data.message);
                        }
                    },
                });
            }
        } else {
        }
    });

    $("#update_password_form22").on("submit", function (event) {
        event.preventDefault();

        if (check_pass_dashboard22() == false) {
        } else {
            $.ajax({
                url: urlapi,
                method: "post",
                data: {
                    detect: "forgot_password",
                    customer_phone: $("#customer_phone_quenmk").val(),
                    new_pass: $("#dashpassword_change_customer").val(),
                },
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (data) {
                    if (data.success == "true") {
                        $("#content_alert_das2").html(
                            "<h3>" + data.message + "</h3>"
                        );
                        $("#alert_change_pass_dashboard2").modal("show");
                        $("#close_modol_changge_password2").click();
                    }
                },
            });
        }
    });

    $("#btn_save_setting").on("click", function (event) {

        let customer_buy = "";
        if ($("#customer_buy").is(":checked")) {
            customer_buy = "open";
        } else {
            customer_buy = "close";
        }
        
        let customer_exchange = [];
        $("#div_detail")
            .find("input[name='customer_exchange']:checked")
            .each(function () {
                customer_exchange.push($(this).val());
            });
        customer_exchange = customer_exchange.toString(); 
        let customer_level = $("#div_detail").find("input[name='customer_level']:checked").val();
        

        let timeout = $("#timeout").val();
        let discount = $("#discount").val();
        let time_result = $("#time_result").val();
            
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "product_order_manager",
                type_manager: "setting_buy",
                id_customer: _id_customer,
                customer_level: customer_level,
                customer_buy: customer_buy,
                customer_exchange: customer_exchange,
                timeout: timeout,
                discount: discount,
                time_result: time_result,
            },
            dataType: "JSON",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            },
        });
    });


    $("#show_hide_password4 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password4 input").attr("type") == "text") {
            $("#show_hide_password4 input").attr("type", "password");
            $("#show_hide_password4 i").addClass("fa-eye-slash");
            $("#show_hide_password4 i").removeClass("fa-eye");
        } else if ($("#show_hide_password4 input").attr("type") == "password") {
            $("#show_hide_password4 input").attr("type", "text");
            $("#show_hide_password4 i").removeClass("fa-eye-slash");
            $("#show_hide_password4 i").addClass("fa-eye");
        }
    });
    $("#show_hide_password5 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password5 input").attr("type") == "text") {
            $("#show_hide_password5 input").attr("type", "password");
            $("#show_hide_password5 i").addClass("fa-eye-slash");
            $("#show_hide_password5 i").removeClass("fa-eye");
        } else if ($("#show_hide_password5 input").attr("type") == "password") {
            $("#show_hide_password5 input").attr("type", "text");
            $("#show_hide_password5 i").removeClass("fa-eye-slash");
            $("#show_hide_password5 i").addClass("fa-eye");
        }
    });

    $("#show_hide_password6 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password6 input").attr("type") == "text") {
            $("#show_hide_password6 input").attr("type", "password");
            $("#show_hide_password6 i").addClass("fa-eye-slash");
            $("#show_hide_password6 i").removeClass("fa-eye");
        } else if ($("#show_hide_password6 input").attr("type") == "password") {
            $("#show_hide_password6 input").attr("type", "text");
            $("#show_hide_password6 i").removeClass("fa-eye-slash");
            $("#show_hide_password6 i").addClass("fa-eye");
        }
    });

    $("#show_hide_password7 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password7 input").attr("type") == "text") {
            $("#show_hide_password7 input").attr("type", "password");
            $("#show_hide_password7 i").addClass("fa-eye-slash");
            $("#show_hide_password7 i").removeClass("fa-eye");
        } else if ($("#show_hide_password7 input").attr("type") == "password") {
            $("#show_hide_password7 input").attr("type", "text");
            $("#show_hide_password7 i").removeClass("fa-eye-slash");
            $("#show_hide_password7 i").addClass("fa-eye");
        }
    });

    $("#show_hide_password10 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password10 input").attr("type") == "text") {
            $("#show_hide_password10 input").attr("type", "password");
            $("#show_hide_password10 i").addClass("fa-eye-slash");
            $("#show_hide_password10 i").removeClass("fa-eye");
        } else if ($("#show_hide_password10 input").attr("type") == "password") {
            $("#show_hide_password10 input").attr("type", "text");
            $("#show_hide_password10 i").removeClass("fa-eye-slash");
            $("#show_hide_password10 i").addClass("fa-eye");
        }
    });
});
