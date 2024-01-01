var array_order = {};
var _id_customer = "";
function money(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
}
function return_status_dautu(status) {
    html = "";
    if (status == "N") {
        html = "<span>Đang chạy</span>";
    } else {
        html = '<span style="color:#34A853;">Kết thúc</span>';
    }
    return html;
}
function return_status_money(status) {
    html = "";
    if (status == "N") {
        html = "<span>Chưa thanh toán</span>";
    } else {
        html = '<span style="color:#34A853;">Đã thanh toán</span>';
    }
    return html;
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

function fileValidation() {
    var fileInput = document.getElementById("customer_cert_img");
    var filePath = fileInput.value; //lấy giá trị input theo id
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
    //Kiểm tra định dạng
    if (!allowedExtensions.exec(filePath)) {
        alert(
            "Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only."
        );
        fileInput.value = "";
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("cert_img").innerHTML =
                    '<img style="width:150px;height:150px;" src="' +
                    e.target.result +
                    '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function efileValidation() {
    var fileInput = document.getElementById("ecustomer_cert_img");
    var filePath = fileInput.value; //lấy giá trị input theo id
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
    //Kiểm tra định dạng
    if (!allowedExtensions.exec(filePath)) {
        alert(
            "Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only."
        );
        fileInput.value = "";
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("cert_img2").innerHTML =
                    '<img style="width:150px;height:150px;" src="' +
                    e.target.result +
                    '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function fileValidation2() {
    var fileInput = document.getElementById("customer_account_img");
    var filePath = fileInput.value; //lấy giá trị input theo id
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
    //Kiểm tra định dạng
    if (!allowedExtensions.exec(filePath)) {
        alert(
            "Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only."
        );
        fileInput.value = "";
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("payment_img").innerHTML =
                    '<img style="width:150px;height:150px;" src="' +
                    e.target.result +
                    '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function efileValidation2() {
    var fileInput = document.getElementById("ecustomer_account_img");
    var filePath = fileInput.value; //lấy giá trị input theo id
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
    //Kiểm tra định dạng
    if (!allowedExtensions.exec(filePath)) {
        alert(
            "Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only."
        );
        fileInput.value = "";
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("payment_img2").innerHTML =
                    '<img style="width:150px;height:150px;" src="' +
                    e.target.result +
                    '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
}

function clear_data() {
    //clear form insert
    $("#username").val("");
    $("#password").val("");
    $("#fullname").val("");
    $("#email").val("");
    $("#phone").val("");
}

function KT_sodienthoai(sdt) {
    if ((sdt.length < 10 || sdt.length > 10) && sdt.length > 0) {
        $("#ercustomer_phone").html("Số điện thoại gồm 10 số");
        return false;
    } else {
        $("#ercustomer_phone").html("");
        return true;
    }
}

function KT_esodienthoai(sdt) {
    if ((sdt.length < 10 || sdt.length > 10) && sdt.length > 0) {
        $("#eercustomer_phone").html("Số điện thoại gồm 10 số");
        return false;
    } else {
        $("#eercustomer_phone").html("");
        return true;
    }
}

function detail_customer(id) {
    page_next_history = 1;
    page_next_list_invest_dautu = 1;
    _id_customer = id;
    $("#div-detail").show();
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "sale_support_customer",
            id_customer: id,
            type_target: "list_customer",
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            //console.log(data);
            $("#history_trading").html("");
            var output = "";
            if (data.success == "true") {
                var v = data.data[0];

                output += `<center><h3>${v.customer_name}</h3></center>
                <table class="detai_deal">
                    <tr>
                        <td><p>Số điện thoại:</p></td>
                        <td><p>${v.customer_phone}</p></td>
                    </tr>
                    <tr>
                        <td><p>Ngày giao dịch gần nhất:</p></td>
                        <td><p>${v.trading_log}</p></td>
                    </tr>
                    <tr>
                        <td><p>Ngày đăng ký:</p></td>
                        <td><p>${v.customer_registered}</p></td>
                    </tr>
                    <tr>
                        <td><p>Tổng tiền nạp:</p>
                        
                        </td>
                        <td><p>${money(v.total_money_deposit)} VND</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Tổng tiền rút:
                        
                        </td>
                        <td><p>${money(v.total_money_payment)} VND</p></td>
                    </tr>
                </table>
                <button style="font-size:10px" data-toggle="modal" onclick="history_payment(1)" data-target="#history_payment_Modal">Lịch sử giao dịch</button>
                <button style="font-size:10px" data-toggle="modal" onclick="history_rewards(${id})" data-target="#history_rewards_Modal">Lịch sử khuyến mãi</button>
                <hr>
                    <h2>
                        <strong style="color:black">Danh sách giao dịch</strong>
                       
                    </h2>
                    <table class="detail_cus">
                        <tr>
                            <td><strong>Tổng giao dịch</br>${
                                v.total_trade
                            }</strong></td>
                            
                        
                        </tr>
                    </table>
                    <hr>
                    <input type="text" hidden id="id_customer" value="${
                        v.id_customer
                    }">
                    <input type="date" style="height :30px ;width:45% ;" id="ngaybatdau_trade" > -
                    <input type="date" style="height :30px ;width:45% ;" id="ngayketthuc_trade" >

                    <form >
                    <div style="width:100%;text-align:center">
                        <h4>Loại giao dịch: </h4>
                        <input type="radio" checked id="all" value="" name="gender">
                        <label for="female">All</label> &nbsp&nbsp
                        <input type="radio" id="lose" name="gender" value="lose">
                        <label for="female">Tiền thua</label> &nbsp&nbsp
                        <input type="radio" id="win" name="gender" value="win">
                        <label for="other">Tiền thắng</label>
                    </div>
                   
                    </form>

                    <center><button type="button" onClick="filter_history('1')" class="btn btn-success btn-sm">Tìm kiếm</button></center>
                    <center id="total_win_lose">Tổng tiền :</center>
                    <hr>`;
                $("#content_detail").html(output);
            }
        },
    });
}

function show_div_detail(id) {
    detail_customer(id);

    document.querySelector("#history_trading").scrollIntoView();
}

function next_page_history(type) {
    if (type == "back") {
        if (page_next_history != 1) {
            page_next_history = page_next_history - 1;
            filter_history(page_next_history);
            if (page_next_history == 1) {
                $("#page_back_history").css("color", "#303030");
            } else {
                $("#page_back_history").css("color", "rgb(60, 141, 188)");
            }
        }
    } else {
        page_next_history = page_next_history + 1;
        filter_history(page_next_history);
        $("#page_back_history").css("color", "rgb(60, 141, 188)");
    }
}
function filter_history(page) {
    if (document.getElementById("win").checked) {
        var trading_result = $("#win").val();
    } else if (document.getElementById("lose").checked) {
        var trading_result = $("#lose").val();
    } else if (document.getElementById("all").checked) {
        var trading_result = $("#all").val();
    }
    var id = $("#id_customer").val();
    var date_begin = $("#ngaybatdau_trade").val();
    var date_end = $("#ngayketthuc_trade").val();
    if (date_begin != "" && date_end == "") {
        return;
    }
    if (date_end != "" && date_begin == "") {
        return;
    }
    // truyền thêm id account
    var data = {};
    if (date_begin && date_end) {
        data = {
            detect: "list_customer_history_admin",
            id_customer: id,
            date_begin: date_begin,
            date_end: date_end,
            trading_result: trading_result,
            limit: 20,
            page: page,
        };
    } else {
        data = {
            detect: "list_customer_history_admin",
            id_customer: id,
            trading_result: trading_result,
            limit: 20,
            page: page,
        };
    }
    $("#total_win_lose").html("...");
    $("#history_trading").html("Đang tải dữ liệu");
    $.ajax({
        url: urlapi,
        type: "POST",
        data: data,
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            var output_history = ``;
            if (response.success == "false") {
                output_history += `<center><h2><strong style="color:red">Lịch sử trống</strong></tr></h2></center>`;
                $("#history_trading").html(output_history).fadeOut();
                $("#history_trading").html(output_history).fadeIn();
            } else {
                if (response.data.length == 0) {
                } else {
                    let trading_type = "";
                    $.each(response.data, function (k, item) {
                        trading_type = item.trading_type;

                        output_history += `
                        
                        <tr style="text-align:center">
                            <td style="width:4%;">${page * 10 - 9 + k}</td>
                            <td>${item.exchange_name}</td>
                            <td>${item.period_ky}</td>
                            <td><strong>${item.trading_log}</strong></td>`;
                        if (item.trading_result == "win")
                            output_history += `
                            <td>
                                <strong style="color:green">&nbsp + ${money(
                                    item.trading_bet_win
                                )}</strong>
                            </td>`;
                        else
                            output_history += `
                            <td>
                            <strong style="color:red">&nbsp - ${money(
                                item.trading_bet
                            )}</strong>
                            </td>


                            `;

                        output_history += `
                         <td>
                            ${text_speedgame(trading_type)}
                        </td>
                        </tr>`;
                    });
                }
                let output_final = `
                    <table class="table table-striped table-hover" >
                            <tr style="text-align:center">
                                <th></th>
                                <th></th>
                                <th>Số kỳ</th>
                                <th>Thời gian</th>
                                <th>Tiền cược</th>
                                <th>Chọn</th>
                                
                            </tr>
                            <tbody>
                               ${output_history}                 
                            </tbody>
                    </table>
                    <div class="form-inline pull-right">
                                                    <div class="form-group">
                                            << <a id="page_back_history" onclick="next_page_history('back')" style="color: #303030;"><span>Trang sau</span></a>&nbsp;&nbsp;&nbsp; <a id="page_next_history" onclick="next_page_history('next')"><span>Trang trước</span></a>>>
                                                        
                                                    </div>
                                                </div>

                 `;

                var xwin = Number(response.total_win);
                var xlose = Number(response.total_lose);
                var xgiaodich = Number(response.phigiaodich);
                var xtotal = xwin + xlose;
                if (trading_result == "") {
                    $("#total_win_lose").html(`Tổng tiền thắng : ${money(
                        xwin.toFixed(0)
                    )} VND,
                         <br/> Tổng tiền thua:  ${money(xlose.toFixed(0))} VND
                         <br/> Tổng phí giao dịch:  ${money(
                             xgiaodich.toFixed(0)
                         )} VND
                         <br/> Tổng tiền thắng thua:  ${money(
                             xtotal.toFixed(0)
                         )} VND
                         `);
                } else if (trading_result == "win") {
                    $("#total_win_lose").html(
                        `Tổng tiền thắng : ${money(xwin.toFixed(0))} VND`
                    );
                } else {
                    $("#total_win_lose").html(
                        `Tổng tiền thua : ${money(xlose.toFixed(0))} VND`
                    );
                }

                $("#history_trading").html(output_final);
            }
        },
    });
}

function history_rewards(id) {
    $.ajax({
        type: "post",
        url: urlapi,
        data: {
            detect: "list_history_bonus",
            id_customer: id,
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            $("#title_history").html("Lịch sử khuyến mãi");
            var output = "";
            if (response.success == "true") {
                $.each(response.data, function (k, v) {
                    output += `
                   <tr>
                   <td>${v.request_code}</td>
                   <td>${v.request_time_completed}</td>
                   <td>${money(v.request_value)}</td>
                   </tr>
                   `;
                });
            } else {
            }
            $("#content-rewards").html(output);
        },
    });
}

function history_rewards_dongbang(id) {
    $.ajax({
        type: "post",
        url: urlapi,
        data: {
            detect: "list_customer_history_reward",
            id_customer: id,
        },
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            $("#title_history").html("Lịch sử ví đóng băng");
            var output = "";
            if (response.success == "true") {
                $.each(response.data, function (k, v) {
                    output += `
                   <tr>
                   <td>${v.request_code}</td>
                   <td>${v.request_time_completed}</td>
                   <td>${money(v.request_value)}</td>
                   <td></td>
                   </tr>
                   `;
                });
            } else {
            }
            $("#content-rewards").html(output);
        },
    });
}

let page_next_history = 1;

function show_account_sale(chuyensale = "") {
    var key = $("#key_seach_sale").val();
    if (chuyensale == "chuyen_sale") {
        key = $("#key_seach_sale_chuyensale").val();
    }
    let output = "";
    let output_2 = "";
    $.ajax({
        type: "post",
        url: urlapi,
        data: {
            detect: "account_manager",
            type_manager: "list_account",
            filter: key,
            id_type: 3,
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
                    <tr>
                    <td style="width:5%"><input class="form-check-input" value="${v.id}" type="radio" name="flexRadioDefault22"></td>c
                    <td id="name${v.id}">${v.username}</td>
                    <td>${v.type_account}</td>
                    <td>`;
                    if (v.phone_number != null)
                        output += `<p class="sale">${v.phone_number}</p>`;

                    output += `</td>
                    <td>Đang hoạt động</td>`;

                    output += `</tr>
                    `;

                    output_2 += `
                    <tr>
                    <td style="width:5%"><input class="form-check-input" value="${v.id}" type="radio" name="flexRadioDefault_sale"></td>c
                    <td id="name_sale${v.id}">${v.username}</td>
                    <td>${v.type_account}</td>
                    <td>`;
                    if (v.phone_number != null)
                        output_2 += `<p class="sale">${v.phone_number}</p>`;

                    output_2 += `</td>
                    <td>Đang hoạt động</td>`;

                    output_2 += `</tr>
                    `;
                }
            });
            $("#content-account").html(output);
            $("#content-account-chuyensale").html(output_2);
        },
    });
}

function edit_customer(id) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_detail",
            id_customer: id,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (data) {
            if (data.success == "true") {
                $.each(data.data, function (k, v) {
                    $("#id_customer").val(id);
                    $("#ecustomer_name").val(v.customer_name);
                    $("#ecustomer_phone").val(v.customer_phone);
                    // $('#ecustomer_password').val(v.email);
                    $("#ecustomer_cert_no").val(v.customer_cert_no);
                    $("#ecustomer_introduce").val(v.customer_introduce);

                    let disable = v.customer_disable == "N" ? "checked" : "";

                    $("#btn_delete_pass").html(`
                     
                     `);
                    //list_bank
                    let outputbank = "";
                    $.each(list_bank, function (j, b) {
                        if (b.id_bank == v.id_bank)
                            outputbank += `<option value="${b.id_bank}" selected>${b.bank_short_name}</option>`;
                        else
                            outputbank += `<option value="${b.id_bank}">${b.bank_short_name}</option>`;
                    });
                    $("#eid_bank").html(outputbank);

                    $("#ecustomer_account_no").val(v.customer_account_no);
                    $("#ecustomer_account_holder").val(
                        v.customer_account_holder
                    );
                    $("#ecustomer_password_payment").val(
                        v.customer_password_payment
                    );
                    $("#ecustomer_limit_payment").val(
                        money(v.customer_limit_payment)
                    );

                    if (v.customer_boss == "Y") {
                        $("#ecustomer_boss").prop("checked", true);
                    } else {
                        $("#ecustomer_boss").prop("checked", false);
                    }

                    if ($("#type_admin").val() == "3") {
                        $("#update_customer_form input").prop("readonly", true);
                    }
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
                    io_socket.emit("customer_block", {
                        id_customer: id,
                    });
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
function update_payment_customer(id, status) {
    var value_status = status == "N" ? "Y" : "N";
    var message =
        status == "N"
            ? "Bạn có chắc muốn khóa rút tiền tài khoản này không ?"
            : "Bạn có chắc muốn mở rút tiền tài khoản này không ?";
    var r = confirm(message);

    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "customer_manager",
                type_manager: "update",
                id_customer: id,
                customer_payment_status: value_status,
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
function update_lixi_customer(id, status) {
    var value_status = status == "N" ? "Y" : "N";
    var message =
        status == "N"
            ? "Bạn có chắc muốn khóa lì xì tài khoản này không ?"
            : "Bạn có chắc muốn mở lì xì tài khoản này không ?";
    var r = confirm(message);

    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "customer_manager",
                type_manager: "update",
                id_customer: id,
                customer_lixi: value_status,
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
                    show_authen_customer(1);
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
var check_click_authen = 0; //xem đang ở màn hình authen hay ko

function quen_mk(phone) {
    $("#customer_phone_quenmk").val(phone);
    $("#detail_customer").modal("hide");
}
var magioithieu = "";

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
function show_customer_parent() {}
function show_customer(page) {
    let phone_cha = $("#phone_customer_parent").val();
    if (phone_cha == "") {
    } else if (phone_cha.length < 9) {
        alert("Nhập đủ số điện thoại");
        return;
    } else {
    }

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
    var key = $("#key_seach").val();
    let id_account = "";
    var data = {};

    if ($("#type_admin").val() == "1" || $("#type_admin").val() == "2") {
        if ($("#check_sale").prop("checked")) {
            id_account = $("input[name=flexRadioDefault22]:checked").val()
                ? $("input[name=flexRadioDefault22]:checked").val()
                : "";
            $("#btn_sale").html($("#name" + id_account).html());
            if (id_account == "") {
                return;
            }
        } else {
            id_account = "";
        }
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
            customer_virtual: $("#customer_virtual").val(),
            limit: 10,
            page: page,
            type_admin: "admin",
            customer_cha: phone_cha,
            customer_boss: $("#customer_boss").val(),
        };
    } else {
        data = {
            detect: "list_customer_customer",
            filter: key,
            id_account: id_account,
            customer_virtual: $("#customer_virtual").val(),
            customer_disable: $("#customer_disable").val(),
            limit: 10,
            page: page,
            type_admin: "admin",
            customer_cha: phone_cha,
            customer_boss: $("#customer_boss").val(),
        };
    }
    console.log(data);
    $("#content-customer").html(` <tr>
    <td colspan="7"><div class="box-loader" id="loading_detail">
        <div class="loader"></div>
        <h3>Đang tải dữ liệu</h3>
    </div></td>
    </tr> `);
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
                    text_payment =
                        v.customer_payment_status == "Y"
                            ? "Khóa rút tiền"
                            : "Mở rút tiền";
                    text_lixi =
                        v.customer_lixi == "Y" ? "Khóa lì xì" : "Mở lì xì";
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
                                        <li><a onclick="customer_lag('${v.id_customer}','Y')">Làm đơ</a></li>
                                        <li><a onclick="customer_lag('${v.id_customer}','N')">Tắt đơ</a></li>
                                        <li><a onclick="chuyen_f0('${v.id_customer}')">Chuyển F0</a></li>
                                        <li><a onclick="chuyen_sale('${v.id_customer}','${v.customer_phone}')">Chuyển Sale</a></li>
                                        <li><a onclick="edit_customer('${v.id_customer}')" data-toggle="modal" data-target="#detail_customer">Sửa</a></li>
                                        ${btn_xem_vi}
                                        <li><a onclick="disable_customer('${v.id_customer}','${v.customer_disable}')">${text_disable}</a></li>
                                        <li><a onclick="delete_customer('${v.id_customer}')">Xóa tài khoản</a></li>
                                        <li><a onclick="quen_mk('${v.customer_phone}')" data-toggle="modal" data-target="#change_password_customer_Modal">Cập nhật mật khẩu</a></li>
                                        <li><a onclick="update_payment_customer('${v.id_customer}','${v.customer_payment_status}')">${text_payment}</a></li>
                                        <li><a onclick="update_lixi_customer('${v.id_customer}','${v.customer_lixi}')">${text_lixi}</a></li>
                                        <li><a onclick="show_div_detail('${v.id_customer}')">Xem</a></li>
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
                                        <li><a onclick="edit_customer('${v.id_customer}')" data-toggle="modal" data-target="#detail_customer">Chi tiết</a></li>
                                        <li><a onclick="show_div_detail('${v.id_customer}')">Xem</a></li>
                                      </ul>
                                    </div>`;
                    }

                    output += `
                    <tr>
                        <td style="width:4%;">${page * 10 - 9 + k}</td>
                        <td>${v.customer_name}</td>
                        <td><p class="groove">${v.customer_phone}</p></td>
                        <td>${v.solan_nap}</td>
                        <td>${money(v.total_nap)}</td>
                        <td>${money(v.total_rut)}</td>
                        <td>${money(v.customer_wallet_bet)}</td>
                        <td><p class="groove">${v.customer_parent}</p></td>
                        <td>${v.customer_sale}</td>
                        <td>${v.customer_registered}</td>
                        <td>
                            ${btn_dieuhanh}
                        </td>
                    </tr>
                   `;
                });
                $("#report-total").html(
                    `<small>Tổng : ${response.total}</small><br /><small>Tổng trong ngày : ${i}</small>`
                );
                $("#content-customer").html(output);
            } else {
                $("#report-total").html(
                    `<small>Tổng : 0</small><br /><small>Tổng trong ngày : 0</small>`
                );
                $("#content-customer").html("");
                $("#phantrang").html("");
            }
        },
    });
}
function confirm_chuyen_sale() {
    let r = confirm("Bạn có chắc muốn cập nhật không ?");
    if (r == true) {
        id_account = $("input[name=flexRadioDefault_sale]:checked").val()
            ? $("input[name=flexRadioDefault_sale]:checked").val()
            : "";
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "customer_manager",
                type_manager: "confirm_chuyen_sale",
                id_customer: _id_customer,
                id_account: id_account,
                id_account_thaotac: $("#id_account").val(),
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.success == "true") {
                    alert("chuyển thành công");
                    $("#chuyen_sale_modal").modal("hide");
                    show_customer(1);
                } else {
                    alert("chuyển thất bại");
                }
            },
        });
    }
}
function chuyen_sale(id_customer, phone) {
    _id_customer = id_customer;

    $.ajax({
        url: urlapi,
        method: "post",
        data: {
            detect: "customer_manager",
            type_manager: "list_full_child",
            id_customer: id_customer,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            if (response.success == "true") {
                $("#total_full_child").html(
                    `Tổng toàn bộ con: ${response.total} người`
                );
            } else {
                $("#total_full_child").html("Tổng toàn bộ con : 0" + " người");
            }
        },
    });
    $("#customer_phone_chuyensale").html(phone);
    $("#chuyen_sale_modal").modal("show");
}
function chuyen_f0(id_customer) {
    _id_customer = id_customer;
    $("#chuyen_f0_modal").modal("show");
}
function confirm_chuyen_f0() {
    let r = confirm("Bạn có chắc muốn cập nhật không ?");
    if (r == true) {
        $.ajax({
            url: urlapi,
            method: "post",
            data: {
                detect: "customer_manager",
                type_manager: "chuyen_f0",
                id_customer: _id_customer,
                customer_phone: $("#customer_phone_f0").val(),
                id_account: $("#id_account").val(),
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                if (response.success == "true") {
                    alert(response.message);

                    show_customer(1);
                } else {
                    alert(response.message);
                }
                $("#chuyen_f0_modal").modal("hide");
            },
        });
    }
}
function giaodich_trongngay() {
    let phone_cha = $("#phone_customer_parent").val();
    if (phone_cha == "") {
    } else if (phone_cha.length < 9) {
        alert("Nhập đủ số điện thoại");
        return;
    } else {
    }

    let id_account = "";
    let ngaybatdau = $("#ngaybatdau_hoatdong").val();
    let ngayketthuc = $("#ngayketthuc_hoatdong").val();

    if ($("#type_admin").val() == "1" || $("#type_admin").val() == "2") {
        if ($("#check_sale").prop("checked")) {
            id_account = $("input[name=flexRadioDefault22]:checked").val()
                ? $("input[name=flexRadioDefault22]:checked").val()
                : "";
            $("#btn_sale").html($("#name" + id_account).html());
            if (id_account == "") {
                return;
            }
        } else {
            id_account = "";
        }
    } else {
        id_account = $("#id_account").val();
    }
    $.ajax({
        url: urlapi,
        method: "post",
        data: {
            detect: "report_new",
            type_manager: "giaodich_trongngay",
            id_account: id_account,
            date_begin: ngaybatdau,
            date_end: ngayketthuc,
            customer_cha: phone_cha,
        },
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            if (response.success == "true") {
                $("#total_giaodich").html(money(response.total) + " người");
            } else {
                $("#total_giaodich").html("0 người");
            }
        },
    });
}

function customer_double_trade(id, customer_double_trade) {
    _id_customer = id;
    $("#customer_double_trade").val(customer_double_trade);
    $("#double_trade_modal").modal("show");
}
function customer_lag(id, status) {
    io_socket.emit("customer_lag", {
        id_customer: id,
        status: status,
    });
    alert("Thành công");
}

var id_cus = 0;
var money_customer = 0;
var money_customer_khuyenmai = 0;

function vi_customer(id) {
    id_cus = id;
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
                $("#money_customer_khuyenmai").html(
                    money(response.data[0].customer_wallet_rewards) + " VND"
                );
            }
        },
    });
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

var flag_back = 0;
var page_his = 0;
var flag_date = 0;

function back_history() {
    if (flag_back == 0) {
        if (flag_date == 0) {
            history_payment(page_his);
        } else {
            seach_his(page_his);
        }
    } else {
        history_deposit(page_his);
    }
}

function detail_payment(id) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_payment_detail",
            id_request: id,
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            if (response.success == "true") {
                flag_back = 0;
                var detail_his = "";

                detail_his = `
                                <tr class="detail_his">
                                    <td colspan="2" style="text-align: center"><h4>Chi tiết lịch sử giao dịch</h4></td>
                                </tr>
                             <tr class="detail_his">
                                    <td >Trạng thái :</td>
                                    <td >${response.data[0].request_status}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Họ tên :</td>
                                    <td >${response.data[0].customer_name}</td>

                                </tr>
                                <tr class="detail_his">
                                    <td >Mã lệnh :</td>
                                    <td >${response.data[0].request_code}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Thời gian :</td>
                                    <td >${
                                        response.data[0].request_created
                                    }</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Hạn mức :</td>
                                    <td >${money(
                                        response.data[0].customer_limit_payment
                                    )}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Rút tiền :</td>
                                    <td >${money(
                                        response.data[0].request_value
                                    )} VND</td>
                                </tr>
                                <tr class="detail_his">
                                    <td colspan="2"><hr></td>

                                 </tr>
                                <tr class="detail_his">
                                    <td colspan="2" style="text-align: center">Phương thức thanh toán</td>
                                </tr>
                                <tr class="detail_his">
                                    <td>Ngân hàng :</td>
                                    <td></td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Chủ thẻ :</td>
                                    <td >${
                                        response.data[0].customer_account_holder
                                    }</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Số tài khoản :</td>
                                    <td >${
                                        response.data[0].customer_account_no
                                    }</td>
                                </tr>
               `;
                if (response.data[0].request_status == 4) {
                    detail_his += ` <tr class="detail_his">
                                     <td colspan="2" style="text-align: center">Lý do</td>
                                    </tr>
                                <tr class="detail_his">
                                    <td colspan="2" style="text-align: center;color:red;">${response.data[0].request_comment}</td>
                                </tr>`;
                }
                $("#history-deal").html(detail_his);
                $("#phantrang_his").html("");
            }
        },
    });
}

function seach_his(page) {
    let ngaybatdau = $("#ngaybatdau").val();
    let ngayketthuc = $("#ngayketthuc").val();
    if (ngaybatdau && ngayketthuc) {
        if (flag_back == 0) {
            //rút tiền
            $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "list_request_payment",
                    id_customer: $("#id_customer").val(),
                    type_manager: "customer",
                    date_begin: ngaybatdau,
                    date_end: ngayketthuc,
                    limit: 4,
                    page: page,
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (response) {
                    page_his = page;

                    var output_his = "";
                    var output_phantrang = "";
                    if (response.success == "true") {
                        flag_date = 1; // lưu cái nút back, nếu bật flag_date thì khi detail quay về là resul của seach_his

                        $.each(response.data, function (k, v) {
                            output_his += `<tr>
                            <td>
                            <a  onclick="detail_payment(${v.id_request})">
                            <small>Mã : ${v.request_code} </small><br />
                            <small>Rút tiền : -${v.request_value} VND</small><br />
                            <small>${v.request_created}</small></a>`;
                            if (v.request_status == 4)
                                output_his += ` <h4 style = "color: red" > Hủy lệnh </h4>`;
                            if (v.request_status == 3)
                                output_his += ` <h4 style = "color: green" > Hoàn tất </h4>`;
                            if (v.request_status == 2)
                                output_his += ` <h4> Chờ xác nhận </h4>`;
                            if (v.request_status == 1)
                                output_his += ` <h4> Tạo lệnh </h4>`;

                            output_his += `</td> </tr>`;
                        });

                        for (let i = 0; i < response.total_page; i++) {
                            output_phantrang += `<li class="page-item"><a onclick="seach_his(${
                                i + 1
                            })" class="page-link" href="#">${i + 1}</a></li>`;
                        }
                    } else {
                        output_his = "";
                        output_phantrang = "";
                    }
                    $("#phantrang_his").html(output_phantrang);
                    $("#history-deal").html(output_his);
                },
            });
        } else {
            // Nạp tiền

            $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "list_request_deposit",
                    id_customer: $("#id_customer").val(),
                    type_manager: "customer",
                    date_begin: ngaybatdau,
                    date_end: ngayketthuc,
                    limit: 4,
                    page: page,
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (response) {
                    page_his = page;

                    var output_his = "";
                    var output_phantrang = "";
                    if (response.success == "true") {
                        flag_date = 1; // lưu cái nút back, nếu bật flag_date thì khi detail quay về là resul của seach_his

                        $.each(response.data, function (k, v) {
                            output_his += `<tr>
                                             <td>
                                                <a>
                                                <small>Mã : ${
                                                    v.request_code
                                                } </small><br />
                                                <small>Nạp tiền : ${money(
                                                    v.request_value
                                                )} VND</small><br />
                                                <small>${
                                                    v.request_created
                                                }</small></a><br /><br />
                                             </td>
                                            </tr>`;
                        });

                        for (let i = 0; i < response.total_page; i++) {
                            output_phantrang += `<li class="page-item"><a onclick="seach_his(${
                                i + 1
                            })" class="page-link" href="#">${i + 1}</a></li>`;
                        }
                    } else {
                        output_his = "";
                        output_phantrang = "";
                    }
                    $("#phantrang").html(output_phantrang);
                    $("#history-deal").html(output_his);
                },
            });
        }
    }
}

function history_payment(page) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_request_payment",
            id_customer: $("#id_customer").val(),
            type_manager: "customer",
            limit: 4,
            page: page,
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            page_his = page;
            flag_back = 0;

            if (response.success == "true") {
                var output_his = "";
                var output_phantrang = "";

                $.each(response.data, function (k, v) {
                    output_his += `<tr>
                    <td>
                    <a  onclick="detail_payment(${v.id_request})">
                    <small>Mã : ${v.request_code} </small><br />
                    <small>Rút tiền : -${money(
                        v.request_value
                    )} VND</small><br />
                    <small>${v.request_created}</small></a>`;
                    if (v.request_status == 4)
                        output_his += ` <h4 style = "color: red" > Hủy lệnh </h4>`;
                    if (v.request_status == 3)
                        output_his += ` <h4 style = "color: green" > Hoàn tất </h4>`;
                    if (v.request_status == 2)
                        output_his += ` <h4> Chờ xác nhận </h4>`;
                    if (v.request_status == 1)
                        output_his += ` <h4> Tạo lệnh </h4>`;

                    output_his += `</td> </tr>`;
                });
                $("#history-deal").html(output_his);

                for (let i = 0; i < response.total_page; i++) {
                    output_phantrang += `<li class="page-item"><a onclick="history_payment(${
                        i + 1
                    })" class="page-link" href="#">${i + 1}</a></li>`;
                }
                $("#phantrang_his").html(output_phantrang);
            }
        },
    });
}

function history_deposit(page) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_request_deposit",
            id_customer: $("#id_customer").val(),
            type_manager: "customer",
            limit: 4,
            page: page,
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            page_his = page;
            flag_back = 1;
            if (response.success == "true") {
                var output_his = "";
                var output_phantrang = "";
                var xx = 0;
                $.each(response.data, function (k, v) {
                    if (v.type == "deposit") {
                        output_his += `<tr>
                                     <td>
                                        <a>
                                        <small>Mã : ${
                                            v.request_code
                                        } </small><br />
                                        <small>Nạp tiền : ${money(
                                            v.request_value
                                        )} VND</small><br />
                                        <small>${
                                            v.request_created
                                        }</small></a><br /><br />
                                     </td>
                                    </tr>`;
                    }
                });

                $("#history-deal").html(output_his);

                for (let i = 0; i < response.total_page; i++) {
                    output_phantrang += `<li class="page-item"><a onclick="history_deposit(${
                        i + 1
                    })" class="page-link" href="#">${i + 1}</a></li>`;
                }
                $("#phantrang_his").html(output_phantrang);
            }
        },
    });
}
var list_bank = [];

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
            } else {
            }
        },
    });
}
let page_next_list_invest_dautu = 1;
function next_page_list_customer(type) {
    if (type == "back") {
        if (page_next_list_invest_dautu != 1) {
            page_next_list_invest_dautu = page_next_list_invest_dautu - 1;
            list_invest_customer(page_next_list_invest_dautu);
            if (page_next_list_invest_dautu == 1) {
                $("#page_back").css("color", "#303030");
            } else {
                $("#page_back").css("color", "rgb(60, 141, 188)");
            }
        }
    } else {
        page_next_list_invest_dautu = page_next_list_invest_dautu + 1;
        list_invest_customer(page_next_list_invest_dautu);
        $("#page_back").css("color", "rgb(60, 141, 188)");
    }
}

$(document).ready(function () {
    show_customer(1);
    show_account_sale();
    get_list_bank();

    $("#insert_customer_form").on("submit", function (event) {
        event.preventDefault();
        //  if (check_input() == false) {

        let formData = new FormData(this);
        for (const value of formData.values()) {
        }
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
                    $("#close_modol_insert").click();
                } else {
                    alert(data.message);
                }
            },
        });
    });
    $("#update_customer_form").on("submit", function (event) {
        event.preventDefault();

        var formData = new FormData();
        formData.append("detect", "customer_manager");
        formData.append("type_manager", "update");
        formData.append("id_customer", $("#id_customer").val());

        formData.append("customer_name", $("#ecustomer_name").val());

        formData.append("customer_phone", $("#ecustomer_phone").val());

        formData.append("customer_password", $("#ecustomer_password").val());

        formData.append("customer_cert_no", $("#ecustomer_cert_no").val());

        if ($("#ecustomer_boss").is(":checked")) {
            formData.append("customer_boss", "Y");
        } else {
            formData.append("customer_boss", "N");
        }

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

        formData.append(
            "customer_limit_payment",
            parseInt(
                Number($("#ecustomer_limit_payment").val().replaceAll(",", ""))
            )
        );
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
                    $("#close_modol_update").click();
                } else {
                    alert(data.message);
                }
            },
        });
    });
    $("#vi_customer_form").on("submit", function (event) {
        let flag = 0;

        event.preventDefault();
        var type_thuhoi = $("input[name=flexRadioDefault_vi]:checked").val()
            ? $("input[name=flexRadioDefault_vi]:checked").val()
            : "";
        var money_value = $("#money_withdraw").val();
        if (money_value) {
            money_value = parseInt(
                Number($("#money_withdraw").val().replaceAll(",", ""))
            );
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
                        id_customer: id_cus,
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
                            $("#btn_slose_money_withdraw").click();
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

    $("#btn_double_trade").click(function () {
        var r = confirm("Bạn có chắc muốn xác nhận tài khoản này không");

        if (r == true) {
            let xdouble = parseInt($("#customer_double_trade").val());
            $.ajax({
                url: urlapi,
                method: "post",
                data: {
                    detect: "customer_manager",
                    type_manager: "update",
                    id_customer: _id_customer,
                    customer_double_trade: xdouble,
                },
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (response) {
                    if (response.success == "true") {
                        $("#double_trade_modal").modal("hide");
                        show_customer(1);

                        alert(response.message);
                    } else {
                        alert(response.message);
                    }
                },
            });
        } else {
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

    // format tien
    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        },
    });

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") {
            return;
        }

        // original length
        var original_len = input_val.length;

        // initial caret position
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {
            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = "" + left_side + "." + right_side;
        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = "" + input_val;

            // final formatting
            if (blur === "blur") {
                input_val += "";
            }
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }
});
