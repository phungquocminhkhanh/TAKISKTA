//window.io = io('https://socket.muabannhanh.xyz/'); // mở ra và thay đổi serve socket đúng là chạy
window.io_socket = io(urlsocket, { transport: ["websocket"] });

//

io_socket.on('reload_data_customered',function(data){
    console.log(data);
})

var index = 0;

function clear_data_pass() {
    $("#old_password").val("");
    $("#dashpassword_change").val("");
    $("#dashpassword_change2").val("");
    $("#erold_password").html("");
    $("#dasherpassword_change").html("");
    $("#dasherpassword_change2").html("");
}

function check_pass_dashboard() {
    var flag = 0;
    var cpass = $("#dashpassword_change").val();
    var cpass2 = $("#dashpassword_change2").val();
    var strongRegex = new RegExp(
        "^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
    );
    var mediumRegex = new RegExp(
        "^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
    );
    if (cpass == "" || cpass.length < 6) {
        flag = 1;
        $("#dasherpassword").html(lang_mat_khau_phai_co_it_nhat_6_ky_tu);
    } else {
        // if (mediumRegex.test(cpass) || strongRegex.test(cpass)) {
        //     $('#dasherpassword').html('')
        // } else {
        //     flag = 1;
        //     $('#dasherpassword').html('Mật khẩu phải bao hồm chữ hoa, chữ thường và số')
        // }
        if (cpass != cpass2 && cpass != "") {
            flag = 1;
            $("#dasherpassword2").html(lang_mat_khau_nhap_lai_khong_dung);
        } else {
            $("#dasherpassword2").html("");
            if (cpass.search(" ") == -1) $("#dasherpassword").html("");
            else {
                flag = 1;
                $("#dasherpassword").html(lang_mat_khau_khong_co_dau_cach);
            }
        }
    }

    if (flag == 0) return true;
    return false;
}

function KT_esodienthoai(sdt) {
    if ((sdt.length < 10 || sdt.length > 10) && sdt.length > 0) {
        $("#ersdt").html("");
        return false;
    } else {
        $("#ersdt").html("");
        return true;
    }
}
var arrayper = {};

function force_sign(type) {
    $.ajax({
        type: "post",
        url: urlapi,
        data: { detect: "force_signout", target: type },
        dataType: "JSON",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            if (response.success == "true") {
                io_socket.emit("force_sign_out", { type: type });
                // viet ham update force = 1 cho tat ca neu bang 0
                $("#close_force_manage").click();
                $("#close_force_employ").click();
                alert(response.message);
            }
        },
    });
}

$(document).ready(function () {
    // Add slimscroll to element
    $(".full-height-scroll").slimscroll({
        height: "100%",
    });

    $("#change_password_dashboard_account_form").on("submit", function (event) {
        event.preventDefault();

        if (check_pass_dashboard() == false) {
        } else {
            $.ajax({
                url: urlapi,
                method: "post",
                data: {
                    detect: "change_pass",
                    type_account: "employee",
                    id_account: $("#id_account").val(),
                    new_pass: $("#dashpassword_change").val(),
                    old_pass: $("#old_password").val(),
                },
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                success: function (data) {
                    if (data.success == "true") {
                        $("#content_alert_das").html(
                            "<h3>" + data.message + "</h3>"
                        );
                        $("#alert_change_pass_dashboard").modal("show");
                        $("#close_modol_changge_password_dashboard").click();
                    } else {
                        $("#erold_password").html(data.message);
                    }
                },
            });
        }
    });
    $("#profile_account_form").on("submit", function (event) {
        event.preventDefault();
        id = $("#id_edit_account").val();

        $.ajax({
            url: urlapi,
            method: "post",
            data: $("#profile_account_form").serialize(),
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success == "true") {
                    alert(data.message);
                    $("#close_modol_profile").click();
                } else {
                    alert(data.message);
                }
            },
        });
    });
    $("#show_hide_password a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password input").attr("type") == "text") {
            $("#show_hide_password input").attr("type", "password");
            $("#show_hide_password i").addClass("fa-eye-slash");
            $("#show_hide_password i").removeClass("fa-eye");
        } else if ($("#show_hide_password input").attr("type") == "password") {
            $("#show_hide_password input").attr("type", "text");
            $("#show_hide_password i").removeClass("fa-eye-slash");
            $("#show_hide_password i").addClass("fa-eye");
        }
    });

    $("#show_hide_password2 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password2 input").attr("type") == "text") {
            $("#show_hide_password2 input").attr("type", "password");
            $("#show_hide_password2 i").addClass("fa-eye-slash");
            $("#show_hide_password2 i").removeClass("fa-eye");
        } else if ($("#show_hide_password2 input").attr("type") == "password") {
            $("#show_hide_password2 input").attr("type", "text");
            $("#show_hide_password2 i").removeClass("fa-eye-slash");
            $("#show_hide_password2 i").addClass("fa-eye");
        }
    });

    $("#show_hide_password3 a").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password3 input").attr("type") == "text") {
            $("#show_hide_password3 input").attr("type", "password");
            $("#show_hide_password3 i").addClass("fa-eye-slash");
            $("#show_hide_password3 i").removeClass("fa-eye");
        } else if ($("#show_hide_password3 input").attr("type") == "password") {
            $("#show_hide_password3 input").attr("type", "text");
            $("#show_hide_password3 i").removeClass("fa-eye-slash");
            $("#show_hide_password3 i").addClass("fa-eye");
        }
    });
});
