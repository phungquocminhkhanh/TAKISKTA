function return_status_payment(status) {
    html = "";
    if (status == 1) {
        html = "<span>Tạo lệnh</span>";
    } else if (status == 2) {
        html = '<span style="color:#FFCB5A;">Chờ xử lý</span>';
    } else if (status == 3) {
        html = '<span style="color:#00CC00;"> Hoàn tất </span>';
    } else {
        html = '<span style="color:red;">Hủy lệnh</span>';
    }
    return html;
}
function text_speedgame(text) {
    if (text == "small") return "nhỏ";
    if (text == "large") return "lớn";
    if (text == "double") return "chẳn";
    if (text == "single") return "lẻ";
    return text;
}
function text_ketqua(text) {
    if (text == "win") return "thắng";
    return "thua";
}


function text_status_open_close(status) {
    if (status == "close") {
        return '<span style="color:red;">Đóng</span>';
    } else if (status == "open") {
        return "Mở";
    }
    return "";
}

function text_status_order(status) {
    if (status == "wait") {
        return '<span style="color:#FFCB5A;">Chờ xử lý</span>';
    } else if (status == "finish") {
        return '<span style="color:#00CC00;">Hoàn tất</span>';
    }
    else if (status == "cancel") {
        return '<span style="color:red;">Hủy</span>';
    }
    return "";
}
function select_img(id, item, width = "100%", height = "") {
    var fileInput = document.getElementById(id);
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
                document.getElementById(
                    item
                ).innerHTML = `<img style="max-width:${width};max-height:200px;" src="${e.target.result}" />`;
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

//format tiền
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
function money(x) {
    // let final = parseInt(parseInt(x)/currency_currency);
    // final = final.toString();
    let final = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(final)) final = final.replace(pattern, "$1,$2");
    return final ;
}
function get_value_money(value)
{
    return parseInt(Number(value.replaceAll(",", "")));
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
