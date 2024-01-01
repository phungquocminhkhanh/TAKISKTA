window.io_chart = io(urlsocket, { transport: ['websocket'] });

var _id_exchange="";
var _id_exchange_old="";
var _id_period="";
var _customer_phone="";
var _customer_name="";
var tien_trade=0;
var money_tam=0;
var list_trade_tam=[];
var check_phuong_thuc_thanh_toan = 0;
var check_cmnd = 0;
var list_item=[];
var _id_item="";
var _customer_password_payment="";
var _value_currency="";
io_chart.on('check-result', function(data) {
        
    //console.log('check-result');
    $('#money_up').html("0");
    $('#money_down').html("0");
 
    setTimeout(function() {
        let tong_win=0;
        let tong_lose=0;
        let tong_hoantien=0;
        let money_win=0;
        console.log(list_trade_tam);
        console.log(data.result);
        if(list_trade_tam.length>0)
        {
            $.each(list_trade_tam,function(k,v){
                if(v.trading_type==data.result)
                {
                    money_win=v.trading_bet*91/100;
                    if(v.id_item!="")
                    {
                        if(list_item[v.id_item].id_type=="1")
                        {

                            tong_win+=money_win+(money_win*parseInt(list_item[v.id_item].item_value)/100);
                        }
                    }
                    else
                    {
                        tong_win+=money_win;
                    }
                }
                else
                {
                    if(v.id_item!="")
                    {
                        if(list_item[v.id_item].id_type=="2")
                        {

                            tong_hoantien+=(v.trading_bet*parseInt(list_item[v.id_item].item_value)/100)
                        }
                    }
                    tong_lose+=v.trading_bet;
                }
            })
            let notification=`
                <div style="color:black">Tổng tiền thắng</div>
                <div> ${money(tong_win)}</div>
                <div style="color:black">Tổng tiền thua</div>
                <div style="color:red"> ${money(tong_lose)} $</div>
                <div style="color:black">Hoàn tiền</div>
                <div> ${money(tong_hoantien)} $</div>
            `;
            demo.showNotification('top','center',notification,'success');
            list_trade_tam=[];
            show_cus();
        }
        
        
    }, 2000)

});

function get_exchange()
{
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "exchange_manager",
            type_manager:"list_exchange",
        },
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            let output="";
            if(response.success=="true")
            {
                _id_exchange=response.data[0].id_exchange;
                item_customer(response.data[0].id_exchange);
                io_chart.emit('join_exchange',{id_exchange:response.data[0].id_exchange});
                $.each(response.data, function(k, v) {

                    output+=`
                       
                        <div onclick="select_exchange(${v.id_exchange})"  class="col-12 col-sm-3">
                            <div class="div-san div-exchange" id="div-exchange${v.id_exchange}">
                             <img width="35px" height="35px" src="${urlserver+v.exchange_icon}">
                             <span style="margin-left: 5%;">${v.exchange_name}</span>
                             <span style="margin-left: 20%;color:#46D23A">+${v.exchange_percent}%</span>
                            </div> 
                        </div>    
                    `
                });
            }
            $("#content_list_exchange").html(output);
            history_period();
            $("#div-exchange"+response.data[0].id_exchange).css('background-color','#282966')

        }
    });
}
function select_exchange(id_exchange)
{
    if(_id_exchange==id_exchange) // đã chọn
    {
        console.log("đã chọn");
    }
    else
    {
        io_chart.emit('off_join_exchange',{id_exchange:_id_exchange});
        _id_exchange=id_exchange;
        io_chart.off('coordinates_real');// off nhận chart để thay cái mới
        io_chart.off('info_graph');// off nhận chart để thay cái mới
        io_chart.off('diem-g');// off nhận chart để thay cái mới
        io_chart.emit('join_exchange',{id_exchange:_id_exchange});
        change_type_chart(); //nằm bên admin_chart.js
        history_period();
        item_customer(id_exchange);
        $(".div-exchange").css('background-color','#0D0745')
        $("#div-exchange"+id_exchange).css('background-color','#282966')
    }
    

    
}
function item_customer(id_exchange)
{

    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "item_customer",
            type_manager:"list",
            id_exchange:id_exchange,
        },
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            
            let output_item='';
            if(response.success=="true")
            {
                 $.each(response.data, function(k, v) {
                    list_item[v.id_item]=v;
                    //output_item+=`<option value="${v.id_item}">${v.item_name}</option>`
                    output_item+=`<div onclick="select_item(${v.id_item})" class="col-6 col-sm-3">
                                    <div class="div-goi" id="div-goi${v.id_item}">
                                      <span class="card-title">${v.item_name}</span>
                                    </div> 
                                  </div>
                                  `;
                });
               
                $("#content_list_item").html(output_item);
            }
           

        }
    });
   
                
               
}


function open_momo() {
    window.location.replace("https://apps.apple.com/us/app/v%C3%AD-momo-n%E1%BA%A1p-ti%E1%BB%81n-thanh-to%C3%A1n/id918751511");
}
function select_img(id,item) {
  
   
     var fileInput = document.getElementById(id);
     var filePath = fileInput.value; //lấy giá trị input theo id
     var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
     //Kiểm tra định dạng
     if (!allowedExtensions.exec(filePath)) {
         alert('Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only.');
         fileInput.value = '';
         return false;
     } else {
         //Image preview
         if (fileInput.files && fileInput.files[0]) {
             var reader = new FileReader();
             reader.onload = function(e) {
                 document.getElementById(item).innerHTML = '<img style="width:70%;height:150px;" src="' + e.target.result + '"/>';
             };
             reader.readAsDataURL(fileInput.files[0]);

             
         }
     }

 }


function money(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function clear_data_pass() {

    $('#old_password').val("");
    $('#dashpassword_change').val("");
    $('#dashpassword_change2').val("");
    $('#erold_password').html("");
    $('#dasherpassword_change').html("");
    $('#dasherpassword_change2').html("");
}
function check_pass_dashboard() {

    var flag = 0;
    var cpass = $('#dashpassword_change').val();
    var cpass2 = $('#dashpassword_change2').val();
    var strongRegex = new RegExp("^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    if (cpass == '' || cpass.length < 6) {
        flag = 1;
        $('#dasherpassword').html('Mật khẩu phải ít nhất 6 ký tự')
    } else {
        // if (mediumRegex.test(cpass) || strongRegex.test(cpass)) {
        //     $('#dasherpassword').html('')
        // } else {
        //     flag = 1;
        //     $('#dasherpassword').html('Mật khẩu phải bao hồm chữ hoa, chữ thường và số')
        // }
        if (cpass != cpass2 && cpass != "") {
            flag = 1;
            $('#dasherpassword2').html('Mật khẩu nhập lại không đúng')
        } else {
            $('#dasherpassword2').html('');
            if (cpass.search(" ") == -1)
                $('#dasherpassword').html('');
            else {
                flag = 1;
                $('#dasherpassword').html('Mật khẩu không được có ký tự dấu cách');
            }

        }

    }

    if (flag == 0)
        return true;
    return false;

}
function thao_tac_period() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_trade_one_period",
            id_period:_id_period,
            id_customer: $("#id_customer").val(),
            type_customer: $("#type_customer").val(),
        },
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
        
            let output_history = `<h5>Đang đầu tư</h5>`;
            let img_history = "";
            if (response.success == "true") {
                // output_history+=`
                // 
                // <h5 style="color: red;">Giảm : 15,000 đ</h5>`;
                $.each(response.data, function(k, v) {

                    if (v.trading_type == "up") {
                      
                       output_history+=`<h5 style="color: green;">Tăng : ${money(v.trading_bet)} $ -  ${v.trading_log}</h5>`
                    } else {
                      output_history+=`<h5 style="color: red;">Giảm : ${money(v.trading_bet)} $ -  ${v.trading_log}</h5>`
                    }
                   
                });


            } else {

            }
            $('#content_thao_tac_trade').html(output_history);
        }
    });
}
function history_period(type="") {
    //$("#lsphien_thaotacphien").toggleClass("d-none");
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_period_result",
            limit: 35,
            id_exchange:_id_exchange
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
         
            let output_history = "";
            let output_history_new = "";
            let img_history = "";
            $('#header-period').html('Lịch sử phiên')
            if (response.success == "true") {

                var v_tron=response.data;
                if(type=="detail")
                {
                    $.each(response.data, function(k, v) {

                        if (v.period_result != "") {
                            if (v.period_result == "up") {
                                img_history = `<img src="../images/len1.png" width="70px">`;
                                 
                            } else {
                                img_history = `<img src="../images/xuong2.png" width="70px">`;
                                
                            }
                            output_history+=`
                                 <tr>
                                    <th>
                                      ${v.period_open}-${v.period_close}
                                    </th>
                                    <th>
                                      ${img_history}
                                    </th>
                                  </tr>
                                `;
                            
                       
                        } else {
                            
                        }
                   
                    });
                    $('#content_history_period_detail').html(output_history);
                }
                else
                {
                    //console.log()
                    
                    for(var i=v_tron.length-1;i>=0;i--)
                    { 
                        if (v_tron[i].period_result != "") {
                            if (v_tron[i].period_result == "up") {                               
                                output_history_new+=`<div class="div-lich-su" style="background-color: #31BAA0;"></div>`;
                            } else {                 
                                output_history_new+=`<div class="div-lich-su" style="background-color: #ED5565;"></div>`;
                            }
                           
                            
                       
                        } else {
                            
                        }

                    };
                    $('#content_history_period').html(output_history_new);
                }
                

            }
            

        }
    });

}

var page_next=0;
function open_history_period()
{
    $(".show_info").hide();
    history_period("detail");
    $("#div_history_period").show();
    document.querySelector('#div_history_period').scrollIntoView();
}
function open_rut_tien()
{
    $(".show_info").hide();
    $("#div_rut_tien").show();
    
    document.querySelector('#div_rut_tien').scrollIntoView();
}
function open_history_giaodich() //hiện div giao dịch
{
    page_next=1;
    $(".show_info").hide();
    show_history_giaodich('rut_tien',1);
    $("#div_history_giaodich").show();
    
     document.querySelector('#div_history_giaodich').scrollIntoView();

}
function open_history_dautu()
{   
    page_next=1;
    $(".show_info").hide();
    $("#div_history_dautu").show();
    show_history_dautu(1);
    window.location.replace('#div_history_dautu');
}

function open_giai_dau()
{
    page_next=1;
    $(".show_info").hide();
    $("#div_giai_dau").show();
    show_giai_dau(1);
    //window.location.replace('#xxxxxx');
    document.querySelector('#div_giai_dau').scrollIntoView();

}

function open_mua_sam()
{
    
    $(".show_info").hide();
    $("#div_mua_sam").show();
    show_mua_sam();
     document.querySelector('#div_mua_sam').scrollIntoView();
}

function show_mua_sam(){
    $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "item_manager",
                    type_manager:"list",
                    id_customer: $('#id_customer').val(),
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
                   
            
                    let output_mua = "";
                    let btn_mua="";
                    if (response.success == "true") {
                    
                        $.each(response.data, function(k, v) {
                            if(v.buy=='N')
                            {
                                btn_mua=`<button onclick="confirm_mua_sam(${v.id_item})" class="btn btn-primary-orange">Mua</button>`;
                            }
                            else
                            {
                                btn_mua=``;

                            }
                            output_mua +=`
                                <tr >
                                    <td>
                                       ${v.item_name}
                                    </td>
                                    <td>
                                      ${v.item_description}
                                    </td>
                                    <td>
                                      ${money(v.item_trade_limit)}$
                                    </td>
                                    <td>
                                      ${money(v.item_price)}$/${v.item_quantity}
                                    </td>
                                    <td>
                                      ${btn_mua}
                                    </td>
                                </tr>

                            `;
                        });

                    } else {
                        output_mua = "";
                    }
                    $('#content_mua_sam').html(output_mua);

            }
        });
}
function confirm_mua_sam(id_item)
{
    $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "item_customer",
                    type_manager:"create",
                    id_item:id_item,
                    id_customer: $('#id_customer').val(),
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
   
                if (response.success == "true") {
                        demo.showNotification('top','center','Mua gói hổ trợ thành công','warning');
                        //profile_customer();
                        show_mua_sam();
                } else {
                    
                }
                    

            }
        });
}
function next_page_show_giai_dau(type)
{
    if(type=="back")
    {
        if(page_next!=1)
        { 
            page_next=page_next-1;
            show_giai_dau(page_next);
        }
    }
    else
    {
        page_next=page_next+1;
        show_giai_dau(page_next); 
    }
}
function show_giai_dau(page){
    $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "tournaments_manager",
                    type_manager:"list",
                    id_customer:$("#id_customer").val(),
                    limit:5,
                    page:page
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
                
                    let output_giaidau = "";
                    let btn_play="";
                    if (response.success == "true") {
                        
                        $.each(response.data, function(k, v) {
                            if(v.status=="2")
                            {
                                btn_play=`<button class="btn btn-primary-orange">Đã bắt đầu</button>`;
                            }
                            else
                            {
                                if(v.customer_play=='N')
                                {
                                    btn_play=`<button  onclick="confirm_play_giai_dau(${v.id_t})" class="btn btn-primary-orange">Tham gia</button>`;
                                }
                                else
                                {
                                    btn_play=`<button  class="btn btn-primary-orange">Đã tham gia</button>`;

                                }
                            }
                            
                            output_giaidau +=`
                                <tr class="item_giai_dau" onclick="show_giai_dau_detail('${v.id_t}')">
                                    <td>
                                       ${v.name}
                                    </td>
                                    <td>
                                      ${v.description}
                                    </td>
                                    <td>
                                      ${money(v.trading_bet_limit)}
                                    </td>
                                    <td >
                                        <div>#top 1: ${money(v.content.prize.top1)}</div>
                                        <div>#top 2: ${money(v.content.prize.top2)}</div>
                                        <div>#top 3: ${money(v.content.prize.top3)}</div>
                                    </td>
                                    <td>
                                        <div>${v.date_begin}</div>
                                        <div>đến</div>
                                        <div>${v.date_end}</div>
                                    </td>
                                    <td>
                                        ${btn_play}
                                    </td>
                                </tr>

                            `;
                        });

                    } else {
                        output_giaidau = "";
                    }
                    $('#content_giai_dau').html(output_giaidau);

            }
        });
}
function show_giai_dau_detail(id_t)
{
 
    $("#div_giai_dau_detail").show();
    document.querySelector('#div_giai_dau_detail').scrollIntoView();
    $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "tournaments_manager",
                    type_manager:"list",
                    id_t:id_t,
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {

                    let output_giaidau = "";
                    let btn_play="";
                    if (response.success == "true") {
                        $("#title_giaidau_detail").html(response.data[0].name)
                        $.each(response.data[0].rank, function(k, v) {
                           
                            output_giaidau +=`
                                <tr>
                                    <td>
                                       #Top${k+1}
                                    </td>
                                    <td>
                                      ${v.customer_fullname}
                                    </td>
                                    <td>
                                      ${money(v.total_trade)}
                                    </td>
                                    
                                </tr>

                            `;
                        });

                    } else {
                        output_giaidau = "";
                    }

                    $('#content_giai_dau_detail').html(output_giaidau);

            }
        });
}
function confirm_play_giai_dau(id_t)
{
    $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "tournaments_manager",
                    type_manager:"play",
                    id_t:id_t,
                    id_customer: $('#id_customer').val(),
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
   
                if (response.success == "true") {
                        demo.showNotification('top','center','Tham gia giải đấu thành công','warning');
                        show_giai_dau(1);
                } else {
                    
                }
                    

            }
        });
}



var type_giaodich="";
function next_page_history_giaodich(type)
{
    if(type=="back")
    {
        if(page_next!=1)
        { 
            page_next=page_next-1;
            show_history_giaodich(type_giaodich,page_next);
        }
    }
    else
    {
        page_next=page_next+1;
        show_history_giaodich(type_giaodich,page_next); 
    }
}

function show_history_giaodich(type,page)
{
    ngaybatdau = $('#d_start').val();
    ngayketthuc = $('#d_end').val();



    let detect=(type=='rut_tien')?"list_request_payment":"list_request_deposit";

    if(type=='rut_tien')
    {
        type_giaodich=type;
        $("#btn_history_ruttien").removeClass('btn-default');
        $("#btn_history_ruttien").addClass('btn-primary');

        $("#btn_history_naptien").removeClass('btn-primary');
        $("#btn_history_naptien").addClass('btn-default');

        $("#d_start").attr("onchange","show_history_giaodich('rut_tien',1)");
        $("#d_end").attr("onchange","show_history_giaodich('rut_tien',1)");
    }
    else{
        type_giaodich=type;
        $("#btn_history_ruttien").removeClass('btn-primary');
        $("#btn_history_ruttien").addClass('btn-default');

        $("#btn_history_naptien").removeClass('btn-default');
        $("#btn_history_naptien").addClass('btn-primary');

        $("#d_start").attr("onchange","show_history_giaodich('nap_tien',1)");
        $("#d_end").attr("onchange","show_history_giaodich('nap_tien',1)");
    }
     $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: detect,
                    id_customer: $('#id_customer').val(),
                    type_manager: $('#type_customer').val(),
                    date_begin: ngaybatdau,
                    date_end: ngayketthuc,
                    limit: 10,
                    page: page
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
                   

                    var output_his = "";
        
                    if (response.success == "true") {
                    
                        $.each(response.data, function(k, v) {
                            if(type=="rut_tien")
                            {
                                output_his += `
                                <tr >
                                    <td>
                                       <span style="text-decoration: underline;">
                                            ${v.request_code}
                                        </span>
                                    </td>
                                    <td>
                                      -${money(v.request_value)} $
                                    </td>
                                    <td>
                                      ${v.request_created}
                                    </td>
                                    <td>
                                      ${return_status_payment(v.request_status)}
                                    </td>
                                </tr>
                                `;
                            }
                            else // nạp tiền
                            {
                                output_his += `
                                <tr >
                                    <td>
                                       <span style="text-decoration: underline;">
                                            ${v.request_code}
                                       </span>
                                    </td>
                                    <td>
                                      -${money(v.request_value)} $
                                    </td>
                                    <td>
                                      ${v.request_created}
                                    </td>
                                    <td>
                                      
                                    </td>
                                </tr>
                                `;
                            }
                            
                        });

                    } else {
                        output_his = "";
                    }
                    $('#content_history_giaodich').html(output_his);

            }
        });
}

function next_page_history_dautu(type)
{
    if(type=="back")
    {
        if(page_next!=1)
        { 
            page_next=page_next-1;
            show_history_dautu(page_next);
        }
    }
    else
    {
        page_next=page_next+1;
        show_history_dautu(page_next); 
    }
}
function show_history_dautu(page)
{
    
    var start = $("#trade_start").val();
    var end = $("#trade_end").val();
    var type = $('input[name=inlineRadioOptions]:checked').val();
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_history",
            id_customer: $('#id_customer').val(),
            type_target: $('#type_customer').val(),
            type_list:"customer",
            trading_result: type,
            date_begin: start,
            date_end: end,
            limit: 10,
            page:page
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
           
            var output_his = "";
            if (response.success == "true") {
                //console.log(response);
                $.each(response.data, function(k, v) {

                    if(v.trading_result!="")
                    {
                       if (v.trading_result == "win") {
                        output_his += `
                        <tr>
                            <td>
                                <img width="28px" height="28px" src="${urlserver+v.exchange_icon}">
                            </td>
                            <td>${v.trading_log} 
                                 <span  style="color: #40FF00">+${v.trading_percent}%</span>
                            </td>
                            <td>
                                <span  style="color: #40FF00">+${money(v.trading_bet)}</span>
                            </td>
                            <td>
                             <img height="50px" width="50px" src="../images/len1.png">
                            </td>            
                        </tr>


                                    `;
                        }
                        else {
                            output_his += `
                                <tr>
                                    <td>
                                        <img width="28px" height="28px" src="${urlserver+v.exchange_icon}">
                                    </td>
                                    <td>
                                    ${v.trading_log} 
                                        
                                    </td>
                                    <td>
                                        <span  style="color: #FE2E2E">-${money(v.trading_bet)}</span>
                                    </td>
                                    <td>
                                     <img height="50px" width="50px" src="../images/xuong2.png">
                                    </td>            
                                </tr>

                            `;
                        }
     
                    }
                    else
                    {
                        output_his += `

                             <tr>
                                    <td>
                                        <img width="28px" height="28px" src="${urlserver+v.exchange_icon}">
                                    </td>
                                    <td>
                                    ${v.trading_log} 
                                        
                                    </td>
                                    <td>
                                        <span  style="color: #FE2E2E">-${money(v.trading_bet)}</span>
                                    </td>
                                    <td>
                
                                    </td>            
                                </tr>

                        `;
                    }
                    

                });
                $('#content_dautu').html(output_his);
            }

        }
    });
}

async function profile_customer() {
    let a = "";
    if($("#type_customer").val()=="customer")
    {
        await $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "check_customer_payment_reward",
                    id_customer: $('#id_customer').val(),
                }, // chuyen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
                "Authorization": "Basic " +xtk
                },
                success: function(response) {
                    if (response.success == 'true') {
                        a = "true";

                    } else {
                        a = "false";
                    }
                }
                    
        });
    }

    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_detail",
            id_customer: $("#id_customer").val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            console.log('profile')
            console.log(response);

            if (response.success == "true") {
               
                let data=response.data[0];
                $("#customer_introduce").val(data.customer_introduce)
                $("#customer_names").val(data.customer_name)
                $("#customer_phone").val(data.customer_phone)

                _customer_phone=data.customer_phone;
                _customer_name=data.customer_name;

                

                $("#customer_cert_no").val(data.customer_cert_no)
    


                // //phuong thuc thanh toan
                $("#customer_account_no").val(data.customer_account_no)
                $("#customer_account_holder").val(data.customer_account_holder);
                $("#customer_password_payment").val(data.customer_password_payment)
                _customer_password_payment=data.customer_password_payment;

                if (data.id_bank == "" || data.customer_account_no == "")
                    check_phuong_thuc_thanh_toan = 1;
                else {
                    $("#id_bank option[value="+data.id_bank+"]").attr('selected','selected');
                    check_phuong_thuc_thanh_toan = 0;
                    $("#insert_payment").hide();
                    $("#customer_account_no").prop('readonly', true);
                    $("#customer_password_payment").prop('readonly', true);
                    $("#customer_password_payment").css('border-radius', '8px');
                    $("#customer_account_holder").prop('readonly', true);
                    $("#mat_mkrt").hide();
                }

                let v = `<input class="form-check-input" value="1" type="radio" checked name="flexRadioDefault">
                    Ví tài khoản: <span id="customer_wallet_rut_tien_modal">${money(data.customer_wallet_bet)} $</span> <br /><br />
                   
                    
                    
                `;
                if (a == "true") {
                    v += ` <input class="form-check-input" value="2" type="radio" name="flexRadioDefault">
                    Ví giới thiệu: ${money(data.customer_wallet_rewards)} $  <button type="button" class="label label-primary" onclick="chuyen_tien_khuyenmai()">chuyển lên ví tài khoản</button>`
                } else {
                    v += `Ví giới thiệu: ${money(data.customer_wallet_rewards)} $  <font style="color: red">(Bạn chưa đủ điều kiện để rút)</font> `
                }
                
                $("#vitaikhoan").html(v)
               
                //NEW
                

            }

        }
    });


   
    
}
async function show_cus() {
    
    let detect={};
    if($("#type_customer").val()=="customer")
    {
         detect={
            detect: "list_customer_detail",
            id_customer: $('#id_customer').val(),
        }
    }
    if($("#type_customer").val()=="trainghiem")
    {
       
        detect={
            detect: "check_customer_balance",
            id_customer: $('#id_customer').val(),
            type_customer: "trainghiem",
        }
    }
    $.ajax({
        url: urlapi,
        method: "POST",
        data:detect,
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
         
            if (response.success == 'true') {
                let data=response.data[0];
                $("#customer_wallet").html(""+money(data.customer_wallet_bet) + " $");
                $("#customer_wallet_2").html(""+money(data.customer_wallet_bet) + " $");
                $("#customer_wallet_value").val(data.customer_wallet_bet);
                output_vi=`<tr>
                                <td id="customer_wallet_rut_tien">
                                  ${money(data.customer_wallet_bet)} $
                                </td>
                                <td>
                                  ${money(data.customer_wallet_payment)} $
                                </td>
                                <td>
                                  ${money(data.customer_wallet_rewards)} $
                                </td>
                                <td class="text-center">
                                  <button type="button" style="border-radius: 6px" class="btn btn-primary-orange" data-toggle="modal" data-target="#rut_tien_modal">Rút tiền</button>
                                </td>
                            </tr>`;
                $("#content_rut_tien").html(output_vi);


                money_tam = data.customer_wallet_bet;

                
                customer_wallet_bet = Number(data.customer_wallet_bet);
                customer_wallet_rewards = Number(data.customer_wallet_rewards);
                

            } else {

            }
        }
    });
}
// function chon_tien() {

//     $('#money_trade').val(money(Number($('#op_tien').val())));

// }
$(".btn_select_money").click(function(){
    $('#money_trade').val($(this).html());
})


function show_money_trade() {
   

    setTimeout(function(){
        
        $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_trade_one_period",
            id_customer: $("#id_customer").val(),
            type_customer: $('#type_customer').val(),
            id_period:_id_period,
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
           
            let totalup = 0;
            let totaldown = 0;
            if (response.success == "true") {
                $.each(response.data, function(k, v) {
                    tien_trade += Number(v.trading_bet);
                    if (v.trading_type == "up") {

                        totalup += Number(v.trading_bet);
                    } else {

                        totaldown += Number(v.trading_bet);
                    }

                });


            } else {

            }
            $('#money_up').html(money(totalup));
            $('#money_down').html(money(totaldown));
        }
    });
    },3000)
    
}

function select_item(id_item)
{

    if(_id_item==id_item)  // bỏ chọn
    {
        _id_item="";
        $(".div-goi").css('background-color','#282966')
    }
    else
    {
        console.log(id_item);
        _id_item=id_item;
        $(".div-goi").css('background-color','#282966')
        $("#div-goi"+id_item).css('background-color','#5EC7CD')

    }
}

function trade(type)
{   
    //console.log(type);

    var money_value = $('#money_trade').val();
    
    if (money_value) {
        money_value = parseInt(Number($('#money_trade').val().replaceAll(',', '')));
        if (money_value < 30000) {
            demo.showNotification('top','center','Tiền cược 1 $','warning');
        } else {
            //console.log(money_value);
            $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "customer_trading",
                    id_customer: $('#id_customer').val(),
                    trading_bet: money_value,
                    trading_type: type,
                    type_customer: $('#type_customer').val(),
                    customer_phone: _customer_phone,
                    customer_name: _customer_name,
                    id_exchange:_id_exchange,
                    id_item:_id_item
                }, // chuyen vao bien name vs du lieu cua input do
                dataType: "json",
                 headers: {
                "Authorization": "Basic " +xtk
                },
                success: function(response) {
                   
                    if (response.success == "true") {
                        let x =parseInt(Number($('#money_' + type).html().replaceAll(',', '')));
                        let total = Number(x) + money_value;
                        tien_trade += money_value;
                        
                        
                        let  customer_wallet = parseInt(Number($('#customer_wallet_value').val()));
                        let  customer_wallet_last=customer_wallet-money_value;
                       
                        money_tam=customer_wallet_last;
                        $("#customer_wallet").html("Ví tiền: "+money(customer_wallet_last) + " $");
                        $("#customer_wallet_2").html("Ví tiền: "+money(customer_wallet_last) + " $");
                        $('#customer_wallet_value').val(customer_wallet_last)
                        $('#customer_wallet_rut_tien').html(money(customer_wallet_last) + " $");
                        $('#customer_wallet_rut_tien_modal').html(money(customer_wallet_last) + " $");
                        $('#money_' + type).html(money(total));

                        //save lại tiền cược,item đã dung
                        //list_trade_tam
                        list_trade_tam.push({
                            trading_type:type,
                            trading_bet: money_value,
                            id_item:_id_item
                        });
                
                        
                    } else {
                        demo.showNotification('top','center',response.message,'warning');
                    }

                }
            });
        }

    

    } else {

    }
}

var check_baotri = 0;
var check_trade_saukhithongbao = 7;

function real_time_time_duration(dangchay, trade) {

    if (dangchay <= trade+4) {
        check_trade_saukhithongbao = 0;
        $("#time_run_trade").css('color','red');
        $('#tradeup').prop('disabled', true);
        $('#tradedown').prop('disabled', true);
        $('#tradeup').css('background-color', '#0D0745');
        $('#tradedown').css('background-color', '#0D0745');

        $("#time_run_trade").addClass('animation-chop-tat');
        $("#time_run_trade").html(dangchay);
    } else {
        if (check_trade_saukhithongbao < 4) {
            $('#tradeup').prop('disabled', true);
            $('#tradedown').prop('disabled', true);
            $('#tradeup').css('background-color', '#0D0745');
            $('#tradedown').css('background-color', '#0D0745');
            check_trade_saukhithongbao++;
        } else {
            $('#tradeup').prop('disabled', false);
            $('#tradedown').prop('disabled', false);
            $('#tradeup').css('background-color', '#5EC7CD');
            $('#tradedown').css('background-color', '#282966');
        }

        $("#time_run_trade").removeClass('animation-chop-tat');
        $("#time_run_trade").html(dangchay);
    }
}
var interval="";
io_chart.on('info_period',function(data){
   
    clearInterval(interval);
    if(data.limit_client=="Y")
    {
        check_baotri = 1;
        _id_period="";
        $('#tradeup').css('background-color', '#0D0745');
        $('#tradedown').css('background-color', '#0D0745');
        $('#tradeup').prop('disabled', true);
        $('#tradedown').prop('disabled', true);
        $("#time_run_trade").html("0");
        $("#chartdiv").html('Sàn hiện tại đã quá tải');
    }
    else
    {
        if (data.status == 'close') {
            check_baotri = 1;
            _id_period="";
            $('#tradeup').css('background-color', '#0D0745');
            $('#tradedown').css('background-color', '#0D0745');
            $('#tradeup').prop('disabled', true);
            $('#tradedown').prop('disabled', true);
            $("#time_run_trade").html("0");
            $("#chartdiv").html('Sàn đã đóng');
        }
        else
        {   
            _id_period=data.id_period
            var all = data.time_1_period;
            var dangchay =all-data.time_run;
            var trade = all-data.time_trade;// thời gian ko dc trade
           
            
            time_1_trade = data.time_1_period;

            $("#time_run_trade").html(dangchay);
            if (dangchay < trade) {

                $("#time_run_trade").css('color','red');
                $("#time_run_trade").addClass('animation-chop-tat');
                
            } else {
                $("#time_run_trade").removeClass('animation-chop-tat');
                $("#time_run_trade").css('color','white');
            }

            interval = setInterval(function() {
                if (dangchay == 1) {
                    dangchay = all;
                    $("#time_run_trade").html(dangchay);
                    $('#money_up').html("0");
                    $('#money_down').html("0");
                    check_customer_disable();
                }
                real_time_time_duration(dangchay, trade);
                dangchay -= 1;
            }, 1000)
        }
    }
    
})



function check_customer_disable() {
    if($("#type_customer")=="customer")
    {
        $.ajax({
            url: urlapi,
            method: "POST",
            data: {
                detect: "check_customer_disable",
                id_customer: $('#id_customer').val()
            },
            dataType: "json",
             headers: {
            "Authorization": "Basic " +xtk
            },
            success: function(response) {
                if (response.success == 'true') {

                } else {
                    window.location.replace("../");
                }

            }
        });
    }
    
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
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            let outputbank = ``;

            if (response.success == 'true') {
                list_bank = response.data;
                $.each(response.data, function(k, v) {
                    outputbank += ` <option value="${v.id_bank}">${v.bank_short_name}</option>`
                });
                $('#id_bank').html(outputbank);
            } else {

            }

        }
    });
}
function show_info_nap_tien()
{
     $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_request_deposit",
            id_customer: $("#id_customer").val(),
            type_customer: "customer" // demo thì thay bằng demo
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
         headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
          
            var output_momo ="";
            var output_bank ="";
            $.each(response.data, function(k, v) {
                if(v.type=="momo")
                {
                   if(v.customer_name!="")
                   {
                        
                        output_momo += `<h4 style="color:black;">Tên : ${v.customer_name} </h4>
                            <h4 style="color:black;">Số điện thoại : ${v.customer_phone}</h4>
                            <h4 style="color:black;">Cứu pháp : ${v.request_syntax}</h4>
                            <br />
                            `;
                   }
                   else{
                        $("#div-info-momo").hide();
                   }     
                 
                }
                else
                {
                    if(v.bank_name!="")
                   {
                        output_bank+=`
                                    <h4 style="color:black;">Ngân hàng :${v.bank_name} </h4>
                                    <h4 style="color:black;">Chủ tài khoản : ${v.bank_holder} </h4>
                                    <h4 style="color:black;">Số tài khoản : ${v.bank_number} </h4>
                                    <br />
                        `;
                   }
                   else
                   {
                        $("#div-info-nganhang").hide();
                   }
                    
                }
            });
           
            //console.log(output_bank);
            $("#info_momo").html(output_momo);
            $("#info_bank").html(output_bank);

        }
    });
}

$(document).ready(function() {

    

    get_exchange();
    show_cus();
    profile_customer();
    get_list_bank();
    show_money_trade();
    $('#form_profile').on("submit", function(event) {
        event.preventDefault();
        var customer_cert_img = $('#customer_cert_img').prop('files')[0];
        var formData = new FormData();
        formData.append("detect", "customer_manager");
        formData.append("type_manager", "update");
        formData.append("id_customer", $("#id_customer").val());
        formData.append("customer_cert_img", customer_cert_img);
        $.ajax({
            url: urlapi,
            method: "post",
            data: formData,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
             headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(data) {
                if (data.success == 'true') {
                    demo.showNotification('top','center',data.message,'warning');
                    $('#close_modol_profile').click();
                    profile_customer();
                } else {
                    demo.showNotification('top','center',data.message,'warning');
                }
            }
        });
    });

    $('#form_phuong_thuc_thanh_toan').on("submit", function(event) {
        event.preventDefault();

        var formData = new FormData();
        formData.append("detect", "customer_method_payment");
        formData.append("id_bank", $("#id_bank").val());
        formData.append("id_customer", $("#id_customer").val());
        formData.append("customer_account_no", $("#customer_account_no").val());
        formData.append("customer_account_holder", $("#customer_account_holder").val());
        formData.append("customer_password_payment", $("#customer_password_payment").val());
        $.ajax({
            url: urlapi,
            method: "post",
            data: formData,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
             headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(data) {
                if (data.success == 'true') {
                    demo.showNotification('top','center',data.message,'warning');
                    $('#close_modol_funciton_payment').click();
                    profile_customer();
                } else {
                    demo.showNotification('top','center',data.message,'warning');
                }
            }
        });
    });

    if($("#type_customer").val()=="trainghiem")
    {
        $("#div_rut_tien").hide();
        $("#btn_rut_tien_main").prop('disabled',true);
        $("#btn_nap_tien_main").prop('disabled',true);
    }

    $('#rut_tien_form').on("submit", function(event) {
        event.preventDefault();
        var type_rut = ($('input[name=flexRadioDefault]:checked').val()) ? $('input[name=flexRadioDefault]:checked').val() : "";
        var flaggg = 0;
        var request_value = 0;
        var request_value_2 = $("#request_value").val();

        if($("#customer_password_payment_ruttien").val()!=_customer_password_payment)
        {
            $("#ercustomer_password_payment_ruttien").html('Mật khẩu rút tiền không đúng');
            return;
        }
        $("#ercustomer_password_payment_ruttien").html('');

        if (request_value_2) {
            request_value_2 = parseInt(Number($("#request_value").val().replaceAll(",", "")));
            if(request_value_2<50000)
            {
                demo.showNotification('top','center','Số tiền rút tối thiểu là 2 $','warning');

                return;
            }
            
            if (type_rut == 1) {

                if (customer_wallet_bet < request_value_2) {
                    flaggg = 1;
                }
            }
            if (type_rut == 2) {
                if (customer_wallet_rewards < request_value_2) {
                    flaggg = 1;
                }
            }
            if (flaggg == 1) {
                demo.showNotification('top','center','Số dư không đủ','warning');
                show_cus();
                $('#close_modol_rut_tien').click();
            } else {
                $.ajax({
                    url: urlapi,
                    method: "post",
                    data: {
                        detect: "customer_request_payment",
                        id_customer: $("#id_customer").val(),
                        request_value: request_value_2,
                        request_type: type_rut
                    },
                     headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(data) {
                        if (data.success == 'true') {
                            demo.showNotification('top','center','Rút tiền thành công','warning');
                            show_cus();
                            $('#close_modol_rut_tien').click();
                        } else {
                           
                            demo.showNotification('top','center',data.message,'warning');
                        }
                    }
                });
            }
        } else {

        }

    });


     $('#change_password_dashboard_account_form').on("submit", function(event) {
        event.preventDefault();

        if (check_pass_dashboard() == false) {} else {
            $.ajax({
                url: urlapi,
                method: "post",
                data: {
                    detect: "change_pass",
                    type_account: "customer",
                    id_account: $("#id_customer").val(),
                    new_pass: $('#dashpassword_change').val(),
                    old_pass: $("#old_password").val()
                },
                 headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(data) {

                    if (data.success == "true") {
                        demo.showNotification('top','center',data.message,'warning');
                        $('#close_modol_changge_password_dashboard').click();

                    } else {
                        $('#erold_password').html('Mật khẩu cũ không đúng');
                    }
                }
            });
        }


    });

      $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });

    $("#show_hide_password2 a").on('click', function(event) {
        event.preventDefault();
        if ($('#show_hide_password2 input').attr("type") == "text") {
            $('#show_hide_password2 input').attr('type', 'password');
            $('#show_hide_password2 i').addClass("fa-eye-slash");
            $('#show_hide_password2 i').removeClass("fa-eye");
        } else if ($('#show_hide_password2 input').attr("type") == "password") {
            $('#show_hide_password2 input').attr('type', 'text');
            $('#show_hide_password2 i').removeClass("fa-eye-slash");
            $('#show_hide_password2 i').addClass("fa-eye");
        }
    });

    $("#show_hide_password3 a").on('click', function(event) {
        event.preventDefault();
        if ($('#show_hide_password3 input').attr("type") == "text") {
            $('#show_hide_password3 input').attr('type', 'password');
            $('#show_hide_password3 i').addClass("fa-eye-slash");
            $('#show_hide_password3 i').removeClass("fa-eye");
        } else if ($('#show_hide_password3 input').attr("type") == "password") {
            $('#show_hide_password3 input').attr('type', 'text');
            $('#show_hide_password3 i').removeClass("fa-eye-slash");
            $('#show_hide_password3 i').addClass("fa-eye");
        }
    });

    $("#show_hide_password4 a").on('click', function(event) {
        event.preventDefault();
        if ($('#show_hide_password4 input').attr("type") == "text") {
            $('#show_hide_password4 input').attr('type', 'password');
            $('#show_hide_password4 i').addClass("fa-eye-slash");
            $('#show_hide_password4 i').removeClass("fa-eye");
        } else if ($('#show_hide_password4 input').attr("type") == "password") {
            $('#show_hide_password4 input').attr('type', 'text');
            $('#show_hide_password4 i').removeClass("fa-eye-slash");
            $('#show_hide_password4 i').addClass("fa-eye");
        }
    });


    
})