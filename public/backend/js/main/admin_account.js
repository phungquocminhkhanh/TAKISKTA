var _id_user = "";
function money(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
}

function change_password(id) {
    $("#eold_password").val("");
    $("#epassword_change").val("");
    $("#epassword_change2").val("");
    $("#id_change_password_account").val(id);
}

function clear_data() {
    //clear form insert
    $("#username").val("");
    $("#password").val("");
    $("#fullname").val("");
    $("#email").val("");
    $("#phone").val("");
}

function ma_gioi_thieu() {
    // let u = `<br /><label>Mã giới thiệu</label>
    // <input type="text" name="account_code" id="account_code" class="form-control" />
    // <br />`;

    // if ($("#id_type").val() == "3") {
    //     $("#input_mas_gioi_thieu").html(u);
    // } else {
    //     $("#input_mas_gioi_thieu").html("");
    // }
}

async function show_detail_account(id) {
    $("#detail-account").html(` <tr>
    <td colspan="2"><div class="box-loader" id="loading_detail">
        <div class="loader"></div>
        <h3>Đang tải dữ liệu</h3>
    </div></td>
</tr>`);
    var output = "";
    $.ajax({
        url: urlapi,
        method: "post",
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            id_account: id,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            output = `<div id="contact-1" class="tab-pane active">
                                 <div class="row m-b-lg">
                                    <div class="col-lg-12">
                                       <strong>
                                     Họ và tên :
                                       </strong>
                                       <strong style="float: right;">
                                       ${data.data[0].full_name}
                                         </strong>
                                    </div>
                                 </div>
                                 <div class="client-detail">
                                    <div class="full-height-scroll">
                                       <ul class="list-group clear-list">`;
            // if (data.data[0].type_account == "sales")
            //     output += `<li class="list-group-item">Mã giới thiệu:
            //     <span class="pull-right">${data.data[0].account_code}</span>

            //  </li>`;

            output += `         <li class="list-group-item">Username:
                                             <span class="pull-right">${data.data[0].username}</span>

                                          </li>
                                          <li class="list-group-item">Email:
                                             <span class="pull-right">${data.data[0].email}</span>
                                          </li>
                                          <li class="list-group-item">Số điện thoại:
                                             <span class="pull-right">${data.data[0].phone_number}</span>

                                          </li>
                                       </ul>
                                       <strong>`;

            if (data.data[0].type_account == "admin") output += `Quyền`;

            output += ` </strong>
                                       <ul class="list-group clear-list">`;
            $.each(data.data[0].role_permission, function (k, v) {
                output += `<li class="list-group-item">${v.description}</li>`;
            });
            output += ` </ul>
                                            <hr/>
                                            <strong id="btn-disable-account">`;

            if (data.data[0].type_account == "sales") {
                //         $.ajax({
                //             url: urlapi,
                //             method: "post",
                //             data: {
                //                 detect: "sale_support_customer_for_admin",
                //                 id_account: data.data[0].id,
                //                 limit: 20,
                //                 page:1
                //             },
                //             dataType: "JSON",
                //              headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                // },
                // success: function(kk) {
                //                 output += `<h4>Danh sách khách hàng: ${kk.total??"0"}</h4>`;
                //                 output += `
                //                 <div id="div_cus" style="height: 300px;overflow: auto;">
                //                                <ul id="list_customerrrr" class="list-group clear-list">`;
                //                 if (kk.success == "true") {
                //                     $.each(kk.data, function(j, v) {
                //                         output += ` <li class="list-group-item">${j+1}. ${v.customer_name}:
                //                         <span class="pull-right">${money(v.total_money_deposit)} VND</span>
                //                      </li>`;
                //                     });
                //                 }
                //                 output += `
                //                  </div>
                //                         </ul>`
                //                 output += `</div>`;
                //                 output += `<nav aria-label="Page navigation example">
                //                                 <ul class="pagination" id="phantrang">
                //                                 `;
                //                     for (let i = 0; i < kk.total_page; i++) {
                //                      output += `<li class="page-item"><a  onclick="phantrang_list_customer('${i+1}','${data.data[0].id}')" class="page-link" href="#">${i+1}</a></li>`
                //                     }
                //                 output += `        </ul>
                //                             </nav>`;
                //                 output += `  </div>
                //                                      </div>`;
                //                 $('#detail-account').html(output)
                //             }
                //         });
            } else {
                output += `    
                </div>
    
                                            </div>
                                    </div>`;
            }
            $("#detail-account").html(output);
        },
    });
}
function phantrang_list_customer(page, id_accoutt) {
    $("#list_customerrrr").html(` <tr>
    <td colspan="2"><div class="box-loader" id="loading_detail">
        <div class="loader"></div>
        <h3>Đang tải dữ liệu</h3>
    </div></td>
</tr>`);
    $.ajax({
        url: urlapi,
        method: "post",
        data: {
            detect: "sale_support_customer_for_admin",
            id_account: id_accoutt,
            limit: 20,
            page: page,
        },
        dataType: "JSON",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (kk) {
            var output_cus = "";
            if (kk.success == "true") {
                $.each(kk.data, function (j, v) {
                    output_cus += ` <li class="list-group-item">${
                        page * 20 - 19 + j
                    }. ${v.customer_name}:
                        <span class="pull-right">${money(
                            v.total_money_deposit
                        )} VND</span>

                     </li>`;
                });
            }

            $("#list_customerrrr").html(output_cus);
        },
    });
}

function disable_account(id, status) {
    let status_update = "";
    let mess = "";
    if (status == "Y") {
        status_update = "N";
        mess = "Bạn có chắc muốn vô hiệu hóa tài khoản này không !";
    } else {
        status_update = "Y";
        mess = "Bạn có chăc muốn mở lại tài khoản này không !";
    }
    var r = confirm(mess);
    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "account_manager",
                type_manager: "update_user_status",
                status: status_update,
                id_user: id,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    show_account(1);
                }
            },
        });
    }
}

function author_account(id, type) {
    _id_user = id;
    $("#account_permission checkbox").attr("checked", false);
    $("#exchange_permission checkbox").attr("checked", false);
    $.ajax({
        url: urlapi,
        method: "post",
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            id_account: id,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            console.log(data);
            if (data.success == "true") {
                if (type == "account") {
                    $.each(data.data[0].role_permission, function (k, v) {
                        $("#check_au_ac" + v.id).attr("checked", true);
                    });
                }
                if (type == "exchange") {
                    let arr_exchange =
                        data.data[0].permission_exchange.split(",");
                    $.each(arr_exchange, function (k, v) {
                        $("#check_au_ex" + v).attr("checked", true);
                    });
                }
            }
        },
    });
}

function delete_account(id) {
    r = confirm("Bạn có chắc muốn xóa tài khoản này không");
    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "POST",
            data: {
                detect: "account_manager",
                type_manager: "delete_account",
                id_user: id,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_account(1);
                    $("#close_modol_edit").click();
                } else alert(data.message);
            },
        });
    } else {
    }
}

function edit_account(id) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            id_account: id,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            if (data.success == "true") {
                $.each(data.data, function (k, v) {
                    $("#eusername").val(v.username);
                    $("#efullname").val(v.full_name);
                    $("#eemail").val(v.email);
                    $("#ephone").val(v.phone_number);
                    $("#id_edit_account").val(v.id);
                    $("#eerusername").html("");
                    $("#eerfullname").html("");
                });

                if (data.data[0].id_type == 3) {
                    // let u = `<label>Mã giới thiệu</label>
                    // <input type="text" value="${data.data[0].account_code}" name="account_code" id="eeaccount_code" class="form-control" />
                    // <br />`;
                    // $("#einput_mas_gioi_thieu").html(u);
                } else {
                    $("#einput_mas_gioi_thieu").html("");
                }
             
                

                $("#etype_account").find("option[value="+data.data[0].id_type+"]").prop("selected",true);
            }
        },
    });
}

var page_next = 1;
function next_page(type) {
    if (type == "back") {
        if (page_next != 1) {
            page_next = page_next - 1;
            show_account(page_next);
            if (page_next == 1) {
                $("#page_back").css("color", "#303030");
            } else {
                $("#page_back").css("color", "rgb(60, 141, 188)");
            }
        }
    } else {
        page_next = page_next + 1;
        show_account(page_next);
        $("#page_back").css("color", "rgb(60, 141, 188)");
    }
}
function show_account(page) {
    console.log(111);
    let output = "";
    $.ajax({
        type: "post",
        url: urlapi,
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            filter: $("#key_seach").val(),
            id_type: $("#id_type_seach").val(),
            limit: 10,
            page: page,
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            console.log(response);
            let tt = 0;
            tt = response.total;
            let btn_dieuhanh = "";
            let btn_phanquyen = "";
            $.each(response.data, function (k, v) {
                text_status =
                    v.status_employee == "Y" ? "Vô hiệu hóa" : "Mở tài khoản";

                btn_phanquyen = "";
                if (v.type_account == "admin") {
                    btn_phanquyen = `
                        <li><a onclick="author_account('${v.id}','account')" data-toggle="modal" data-target="#author_account_Modal">Phân quyền quản lý</a></li>
                       
                    `;
                }

                btn_dieuhanh = `
                     <div class="dropdown">
                      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Cài đặt
                      <span class="caret"></span></button>
                      <ul style="color:blue;" class="dropdown-menu">
                        <li><a onclick="edit_account('${v.id}')" data-toggle="modal" data-target="#edit_account_Modal">Sửa</a></li>
                        ${btn_phanquyen}
                        <li><a onclick="author_account('${v.id}','exchange')" data-toggle="modal" data-target="#author_exchange_Modal">Phân quyền sàn</a></li>
                        <li><a onclick="change_password('${v.id}')" data-toggle="modal" data-target="#change_password_account_Modal">Đặt lại mật khẩu</a></li>
                        <li><a onclick="disable_account('${v.id}','${v.status_employee}')">${text_status}</a></li>
                        <li><a onclick="delete_account('${v.id}')">Xóa tài khoản</a></li>
                        <li><a onclick="show_detail_account('${v.id}')">Xem</a></li>
                      </ul>
                    </div>
                `;

                output += `
                
                <tr>
                <td style="width:4%;">${page * 10 - 9 + k}</td>
                <td><a data-toggle="tab" href="#contact-1" class="client-link">${
                    v.full_name
                }</a></td>
                <td>${v.type_account}</td>
                <td>`;
                if (v.phone_number != null)
                    output += `<p class="groove">${v.phone_number}</p>`;

                output += `</td>
                <td>${v.account_code ?? ""}</td>
                <td>

                `;
                if (v.status_employee == "Y") output += `Đang hoạt động`;
                else output += `<p style="color:red">Không hoạt động</p>`;
                output += `</td>`;

                output += `
                    <td>
                        ${btn_dieuhanh}
                    </td>   
                    
                </tr>
                `;
            });
            $("#total_account").html(`<small>Tổng : ${tt}</small>`);
            $("#content-account").html(output);
        },
    });
}

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function passwordChanged() {
    var strength = document.getElementById("erpassword");
    var strongRegex = new RegExp(
        "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
    );
    var mediumRegex = new RegExp(
        "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
    );
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    var pwd = document.getElementById("password");
    // if (pwd.value.length == 0) {
    //     strength.innerHTML = 'Nhập mật khẩu';
    // } else if (false == enoughRegex.test(pwd.value)) {
    //     strength.innerHTML = 'Mật khẩu ít nhất 6 ký tự';
    // } else if (strongRegex.test(pwd.value)) {
    //     strength.innerHTML = '<span style="color:green">Mạnh!</span>';
    // } else if (mediumRegex.test(pwd.value)) {
    //     strength.innerHTML = '<span style="color:orange">Trung bình!</span>';
    // } else {
    //     strength.innerHTML = '<span style="color:red">Yếu!</span>';
    // }
    if (false == enoughRegex.test(pwd.value)) {
        strength.innerHTML = "Mật khẩu ít nhất 6 ký tự";
    } else {
        strength.innerHTML = "";
    }
}

function passwordChanged2() {
    var strength = document.getElementById("cerpassword");
    var strongRegex = new RegExp(
        "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
    );
    var mediumRegex = new RegExp(
        "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
    );
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    var pwd = document.getElementById("epassword_change");
    // if (pwd.value.length == 0) {
    //     strength.innerHTML = 'Nhập mật khẩu';
    // } else if (false == enoughRegex.test(pwd.value)) {
    //     strength.innerHTML = 'Mật khẩu ít nhất 6 ký tự';
    // } else if (strongRegex.test(pwd.value)) {
    //     strength.innerHTML = '<span style="color:green">Mạnh!</span>';
    // } else if (mediumRegex.test(pwd.value)) {
    //     strength.innerHTML = '<span style="color:orange">Trung bình!</span>';
    // } else {
    //     strength.innerHTML = '<span style="color:red">Yếu!</span>';
    // }

    //phần màu xanh khi nào cần thì khôi phục lại và xóa cái ở dưới đi
    if (false == enoughRegex.test(pwd.value)) {
        strength.innerHTML = "Mật khẩu ít nhất 6 ký tự";
    } else {
        strength.innerHTML = "";
    }
}

function check_input() {
    var flag = 0;
    var name = $("#username").val();
    var pass = $("#password").val();
    var fullname = $("#fullname").val();
    var email = $("#email").val();
    var sdt = $("#phone").val();
    var strongRegex = new RegExp(
        "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
    );
    var mediumRegex = new RegExp(
        "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
    );

    if (name == "") {
        flag = 1;
        $("#erusername").html("Không được bỏ trống tên đăng nhập");
    } else {
        $("#erusername").html("");
    }
    if (pass == "" || pass.length < 6) {
        flag = 1;
        $("#erpassword").html("Mật khẩu phải ít nhất 6 ký tự");
    } else {
        // if (mediumRegex.test(pass) || strongRegex.test(pass)) {
        //     $('#erpassword').html('')
        // } else {
        //     flag = 1;
        //     $('#erpassword').html('mật khẩu phải bao hồm chữ hoa, chữ thường và số')
        // }
        $("#erpassword").html("");
        if (pass.search(" ") == -1) $("#erpassword").html("");
        else {
            flag = 1;
            $("#erpassword").html("Mật khẩu không được có ký tự dấu cách");
        }
    }
    if (fullname == "") {
        flag = 1;
        $("#erfullname").html("Không được bỏ trống họ và tên đầy đủ");
    } else {
        $("#erfullname").html("");
    }
    if (validateEmail(email) || email == "") {
        $("#eremail").html("");
    } else {
        flag = 1;
        $("#eremail").html("Email không hợp lệ");
    }
    if (KT_sodienthoai(sdt) || sdt == "") {
        $("#ersdt").html("");
    } else {
        flag = 1;
        $("#ersdt").html("Số điện thoại phải là 10 số");
    }
    if (flag == 0) return true;
    return false;
}

function check_change_password() {
    var flag = 0;
    var cpass = $("#epassword_change").val();
    var cpass2 = $("#epassword_change2").val();
    var strongRegex = new RegExp(
        "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
    );
    var mediumRegex = new RegExp(
        "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
    );
    if (cpass == "" || cpass.length < 6) {
        flag = 1;
        $("#cerpassword").html("Mật khẩu phải ít nhất 6 ký tự");
    } else {
        // if (mediumRegex.test(cpass) || strongRegex.test(cpass)) {
        //     $('#cerpassword').html('')
        // } else {
        //     flag = 1;
        //     $('#cerpassword').html('Mật khẩu phải bao hồm chữ hoa, chữ thường và số')
        // }
        if (cpass != cpass2) {
            flag = 1;
            $("#cerpassword2").html("Mật khẩu nhập lại không đúng");
        } else {
            $("#cerpassword2").html("");
            if (cpass.search(" ") == -1) $("#cerpassword").html("");
            else {
                flag = 1;
                $("#cerpassword").html("Mật khẩu không được có ký tự dấu cách");
            }
        }
    }

    if (flag == 0) return true;
    return false;
}

function check_einput() {
    var flag = 0;
    var name = $("#eusername").val();
    var fullname = $("#efullname").val();
    var email = $("#eemail").val();
    var sdt = $("#ephone").val();
    if (name == "") {
        flag = 1;
        $("#eerusername").html("Không được bỏ trống tên đăng nhập");
    } else {
        $("#eerusername").html("");
    }

    if (fullname == "") {
        flag = 1;
        $("#eerfullname").html("Không được bỏ trống họ và tên đầy đủ");
    } else {
        $("#eerfullname").html("");
    }
    if (validateEmail(email) || email == "") {
        $("#eeremail").html("");
    } else {
        flag = 1;
        $("#eeremail").html("Email không hợp lệ");
    }
    if (KT_sodienthoai(sdt) || sdt == "") {
        $("#eerphone").html("");
    } else {
        flag = 1;
        $("#eerphone").html("Số điện thoại phải là 10 số");
    }
    if (flag == 0) return true;
    return false;
}

function KT_sodienthoai(sdt) {
    if ((sdt.length < 10 || sdt.length > 10) && sdt.length > 0) {
        $("#ersdt").html("Số điện thoại gồm 10 số");
        return false;
    } else {
        $("#ersdt").html("");
        return true;
    }
}

function KT_esodienthoai(sdt) {
    if ((sdt.length < 10 || sdt.length > 10) && sdt.length > 0) {
        $("#eersdt").html("Số điện thoại gồm 10 số");
        return false;
    } else {
        $("#eersdt").html("");
        return true;
    }
}
function show_author() {
    $.ajax({
        url: urlapi,
        method: "post",
        data: { detect: "account_type_manager", type_manager: "list_module" },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            if (data.success == "true") {
                output3 = "";
                $.each(data.data, function (k, v) {
                    output3 += `
                    <tr>
                    <th>${v.description}</th>
                    <th><div class="checkbox checkbox-danger">
                        <input id="check_au_ac${v.id}" value="${v.id}" name="list_permission[]" type="checkbox">
                         </div>
                    </th>
                    </tr>`;
                });
                $("#account_permission").html(output3);
            }
        },
    });
    $.ajax({
        url: urlapi,
        method: "post",
        data: { detect: "exchange_manager", type_manager: "list_exchange" },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            console.log(data);
            if (data.success == "true") {
                let output_ex = "";
                $.each(data.data, function (k, v) {
                    output_ex += `
                    <tr>
                    <th>${v.exchange_name}</th>
                    <th><div class="checkbox checkbox-danger">
                        <input id="check_au_ex${v.id_exchange}" value="${v.id_exchange}" type="checkbox">
                         </div>
                    </th>
                    </tr>`;
                });
                $("#exchange_permission").html(output_ex);
            }
        },
    });
}
$(document).ready(function () {
    show_account(1);
    show_author();
    $("#insert_account_form").on("submit", function (event) {
        event.preventDefault();
        if (check_input() == false) {
        } else {
            $.ajax({
                url: urlapi,
                method: "post",
                data: $("#insert_account_form").serialize(),
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (data) {
                    if (data.success == "true") {
                        alert(data.message);
                        show_account(1);
                        $("#close_modol_insert").click();
                    } else {
                        alert(data.message);
                    }
                },
            });
        }
    });
    $("#edit_account_form").on("submit", function (event) {
        event.preventDefault();
        id = $("#id_edit_account").val();

        $.ajax({
            url: urlapi,
            method: "post",
            data: $("#edit_account_form").serialize(),
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    show_account(1);
                    $("#close_modol_edit").click();
                } else {
                    alert(data.message);
                }
            },
        });
    });
    $("#author_account_form").on("submit", function (event) {
        event.preventDefault();
        let permission = "";

        $(":checkbox:checked").each(function (i) {
            permission += $(this).val() + ",";
        });
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "account_manager",
                type_manager: "update_account",
                id_user: _id_user,
                role_permission: permission,
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert("Phân quyền thành công");
                    $("#close_modol_author").click();
                    show_detail_account(_id_user);
                } else {
                    alert("Phân quyền không thành công");
                }
            },
        });
    });
    $("#btn_author_exchange").click(function () {
        let permission = [];

        $(":checkbox:checked").each(function (i) {
            let x = $(this).val();
            console.log(x);
            permission.push(x);
        });
        console.log(permission.toString());
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "account_manager",
                type_manager: "update_account",
                id_user: _id_user,
                permission_exchange: permission.toString(),
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert("Phân quyền thành công");
                    $("#close_modol_exchange").click();
                } else {
                    alert("Phân quyền không thành công");
                }
            },
        });
    });
    $("#change_password_account_form").on("submit", function (event) {
        event.preventDefault();
        if (check_change_password() == false) {
        } else {
            $.ajax({
                url: urlapi,
                method: "post",
                data: {
                    detect: "account_manager",
                    type_manager: "resset_password_account",
                    id_user: $("#id_change_password_account").val(),
                    password_reset: $("#epassword_change").val(),
                },
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (data) {
                    if (data.success == "true") {
                        $("#content_alert").html(
                            "<h3>" + data.message + "</h3>"
                        );
                        $("#alert_change_pass").modal("show");
                        $("#close_modol_changge_password").click();
                    } else {
                        $("#content_alert").html(
                            "<h3>" + data.message + "</h3>"
                        );
                        $("#alert_change_pass").modal("show");
                    }
                },
            });
        }
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
    $("#show_hide_password_insert a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password_insert input").attr("type") == "text") {
            $("#show_hide_password_insert input").attr("type", "password");
            $("#show_hide_password_insert i").addClass("fa-eye-slash");
            $("#show_hide_password_insert i").removeClass("fa-eye");
        } else if (
            $("#show_hide_password_insert input").attr("type") == "password"
        ) {
            $("#show_hide_password_insert input").attr("type", "text");
            $("#show_hide_password_insert i").removeClass("fa-eye-slash");
            $("#show_hide_password_insert i").addClass("fa-eye");
        }
    });
});
