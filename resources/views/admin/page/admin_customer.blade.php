@extends('admin.admin')

@section('title', 'Admin')

@section('theme-css')

@endsection

@section('content')
<?php 
    $data_admin = Session::get('data_admin'); 
?>
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="inqbox">
                <div class="inqbox-content">
                    <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
                    <h2>Khách hàng</h2>
                    <div class="input-group">
                        <input type="text" placeholder="Nhập tên, số điện thoại khách hàng" id="key_search" value="" class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_customer(1)"> <i
                                    class="fa fa-search"></i>Tìm kiếm</button>
                        </span>
                    </div>
                    <div class="clients-list">
                        <ul class="nav nav-tabs tab-border-top-danger">
                            <li class="active">
                                <button type="button" onclick="clear_data()" id="modal_add"
                                    class="btn btn-warning" data-toggle="modal" data-target="#create_customer">+</button>
                            </li>
                        </ul>
                        <ul class="nav nav-tabs tab-border-top-danger mt-2">
                            <div class="form-group col-md-2">
                                <label for="inputState">ngày bắt đầu</label><br />
                                <input type="date" id="ngaybatdau" onchange="show_customer(1)">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState"> ngày kết thúc</label><br />
                                <input type="date" id="ngayketthuc" onchange="show_customer(1)">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState">Trạng thái</label><br />
                                <select onchange="show_customer(1)" id="customer_disable" style="height:40px;width: 150px;">
                                    <option value="N">Tài khoản thường</option>
                                    <option value="Y">Tài khoản bị khóa</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState">Loại tài khoản</label><br />
                                <select onchange="show_customer(1)" id="customer_virtual_filter" style="height:40px;width: 150px;">
                                    <option value="N">Tài khoản thường</option>
                                    <option value="Y">Tài khoản demo</option>
                                </select>
                            </div>
                            @if($data_admin->id_type=="1" || $data_admin->id_type=="2")
                            <div class="form-group col-md-2">
                                <label for="inputState">Nhân viên</label><br />
                                <select onchange="show_customer(1)" id="id_account_filter" style="height:40px;width: 150px;">
                                   
                                </select>
                            </div>
                            @endif
                           
                        </ul>
                        <div class="tab-content">

                            <div id="tab-account" class="tab-pane active">
                                <div class="full-height-scroll">
                                    <div class="table-responsive" style="height: 100%;">
                                        <div id="total_account">
                                            <small></small>
                                        </div>
                                        <table id="table_customer" class="table table-striped table-hover">

                                            <tr>
                                                <td></td>
                                                <th>Tên Khách hàng</th>
                                                <th>Số điện thoại</th>
                                                <th class="text-center">Số lần nạp</th>
                                                <th class="text-center">Tổng nạp</th>
                                                <th class="text-center">Tổng rút</th>
                                                <th>Sale</th>
                                                <th>Ngày tạo</th>
                                                <th></th>
                                            </tr>
                                            <tbody id="content_customer">

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                <div class="form-inline pull-right">
                                    <div class="form-group">
                                        << <a id="page_back" onclick="next_page('back')" style="color: #303030;"><span
                                                id="txt_page_before">Trang sau</span></a>&nbsp;&nbsp;&nbsp; <a
                                                id="page_next" onclick="next_page('next')"><span
                                                    id="txt_page_after">Trang trước</span></a>>>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12" id="div_detail" style="display: none">
            <div class="inqbox">
                <div class="inqbox-content div-content-detail">
                    <div class="w-100 div-customer-detail">
                        <div class="w-75 mt-4">
                            <div class="row gap-2">
                                <div class="col-12 text-center">
                                    <h2 class="fw-bold" id="info_edit"></h2>
                                </div>
                                <div class="col-12"><h2 class="fw-bold">Cài đặt mua</h2></div>
                                <div class="col-12">
                                    <div class="col-4"><label>Mở mua hàng</label></div>
                                    <div class="col-8">
                                        <div class="onoffswitch">
                                            <input type="checkbox" class="onoffswitch-checkbox" id="customer_buy">
                                            <label class="onoffswitch-label" for="customer_buy">
                                                <span class="onoffswitch-inner"></span>
                                                <span class="onoffswitch-switch"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <label>Thuộc về khu vực</label><br />
                                    <div class="row">
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="checkbox" name="customer_exchange" value="45" id="">
                                            <label style="margin-left: 10px">Lịch lãm sang trọng</label>
                                        </div>
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="checkbox" name="customer_exchange" value="46" id="">
                                            <label style="margin-left: 10px">Đồ điện tử</label>
                                        </div>
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="checkbox" name="customer_exchange" value="47" id="">
                                            <label style="margin-left: 10px">Đồ gia dụng</label>
                                        </div>
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="checkbox" name="customer_exchange" value="48" id="">
                                            <label style="margin-left: 10px">Mỹ phẩm chính hãng</label>
                                        </div>
                                        
                                    </div>
                                    <br />
                                    <label>Lớp</label><br />
                                    <div class="row">
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="radio" name="customer_level" value="1" id="">
                                            <label style="margin-left: 10px">Thường gia</label>
                                        </div>
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="radio" name="customer_level" value="2" id="">
                                            <label style="margin-left: 10px">Thương gia VIP</label>
                                        </div>
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="radio" name="customer_level" value="3" id="">
                                            <label style="margin-left: 10px">Thương Gia Cao Cấp</label>
                                        </div>
                                        <div class="col-3 div-item-customer-detail bg-item">
                                            <input type="radio" name="customer_level" value="4" id="">
                                            <label style="margin-left: 10px">Thương Gia Cao Cấp VIP</label>
                                        </div>
                                    
                                    </div>
                                    <br />
                                    <label>Thời gian mua hàng (phút)</label>
                                    <input type="number" id="timeout" class="form-control" value="5" min=1/>
                                    <br />
                                    <label>Giảm giá (%)</label>
                                    <input type="number" id="discount" class="form-control" value="0" max=100 min=0/>
                                    <br />
                                    <label>Thời gian kết quả (phút)</label>
                                    <input type="number" id="time_result" class="form-control" value="3" min=1 />
                                    <br />
            
                                    <div class="col-12">
                                        <div class="col-4"><label>Tức thời</label></div>
                                        <div class="col-8">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="realtime">
                                                <label class="onoffswitch-label" for="realtime">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <button type="button" id="btn_save_setting" class="btn btn-success w-100" />Cập nhật</form>
                                </div>
                                
                               
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>

    </div>

    <div id="create_customer" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <center>
                        <h2 class="modal-title" style="color:black"><strong>Tạo mới</strong></h2>
                    </center>
                </div>
                <div class="modal-body">
    
                    <form id="insert_customer_form">
                        <br />
                        <label>Loại tài khoản</label>
                        <select name="customer_virtual" id="customer_virtual" class="form-control">
                            <option value="N">Tài khoản thường</option>
                            <option value="Y">Tài khoản demo</option>
                        </select>
                        <br />
                        <label>Tên khách hàng (<font style="color: red">*</font>)</label>
                        <input type="text" id="customer_name" class="form-control" />
                        <small id="ercustomer_name" class="text-danger"></small>
                        <br />
                        <label>Tên doanh nghiệp (<font style="color: red">*</font>)</label>
                        <input type="text" id="company_name" class="form-control" />
                        <small id="ercompany_name" class="text-danger"></small>
                        <br />
                        <label>Số điện thoại: </label>
                        <input type="text" id="customer_phone" name="customer_phone"
                            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                            maxlength="10" class="form-control" />
                        <small id="ercustomer_phone" class="text-danger"></small>
                        <br />
                        <label>Mật khẩu: </label>
                        <input type="password" id="customer_password" name="customer_password" m class="form-control" />
                        <small id="ercustomer_password" class="text-danger"></small>
                        <br />
                        <label>Mã giới thiệu:</label>
                        <input type="tel" id="customer_introduce" name="customer_introduce" class="form-control">
                        <small id="ercustomer_introduce" class="text-danger"></small>
                        <br />
                        <br />
    
                        <hr />
                        <center>
                            <h2 style="color:black"><strong>Phương thức thanh toán</strong></h2>
                        </center>
                        <br />
                        <label>Tên ngân hàng: </label>
                        <select name="id_bank" id="id_bank" class="form-control">
    
                        </select>
                        <small id="erid_bank" class="text-danger"></small>
                        <br />
                        <label>Số tài khoản:</label>
                        <input type="text" name="customer_account_no" id="customer_account_no" class="form-control" />
                        <small id="ercustomer_account_no" class="text-danger"></small>
                        <br />
                        <label>Tên chủ thẻ: </label>
                        <input type="text" name="customer_account_holder" id="customer_account_holder"
                            class="form-control" />
                        <small id="ercustomer_account_holder" class="text-danger"></small>
                        <br />
                        <label>Mật khẩu rút tiền</label>
                        <div class="input-group" id="show_hide_password7">
                            <input class="form-control" type="password" id="customer_password_payment"
                                name="customer_password_payment">
    
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <br />
                        <button type="button" name="insert" id="btn_insert_customer" class="btn btn-success">Thêm</button>
    
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close_modol_insert" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    {{-- ------------------------------------------------------------- --}}
    
    {{--EDIT ------------------------------------------------------------- --}}
    <div id="detail_customer_modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <center>
                        <h2 class="modal-title" style="color:black"><strong>Chi tiết khách hàng</strong></h2>
                    </center>
                </div>
                <div class="modal-body">
    
                    <form id="update_customer_form">
                        <label>Tên khách hàng (<font style="color: red">*</font>)</label>
                        <input type="text" name="customer_name" id="ecustomer_name" class="form-control" readonly/>
                        <small id="eercustomer_name" class="text-danger"></small>
                        <br />
                        <label>Tên doanh nghiệp</label>
                        <input type="text" id="ecompany_name" class="form-control" />
                        <small id="eercompany_name" class="text-danger"></small>
                        <br />
                        <label>Số điện thoại </label>
                        <input type="tel" id="ecustomer_phone" name="customer_phone"
                            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                           maxlength="10" class="form-control" readonly>
    
                        <small id="eercustomer_phone" class="text-danger"></small>
                        <br />
                        <label>Mã giới thiệu: </label>
                        <input type="text" id="ecustomer_introduce" name="customer_introduce" class="form-control"
                            readonly />
                        <small id="eecustomer_introduce" class="text-danger"></small>
                        <br />
                        <label>Mật khẩu</label>
                        <div class="input-group" id="show_hide_password10">
                            <input class="form-control" type="password" id="ecustomer_password" readonly> 
    
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <center>
                            <h2 style="color:black"><strong>Phương thức thanh toán</strong></h2>
                        </center>
                        <br />
                        <label>Tên ngân hàng: </label>
                        <select name="id_bank" id="eid_bank" class="form-control">
    
                        </select>
                        <small id="eerid_bank" class="text-danger"></small>
                        <br />
                        <label>Số tài khoản:</label>
                        <input type="text" name="customer_account_no" id="ecustomer_account_no" class="form-control" />
                        <small id="eercustomer_account_no" class="text-danger"></small>
                        <br />
                        <label>Tên chủ thẻ: </label>
                        <input type="text" name="customer_account_holder" id="ecustomer_account_holder"
                            class="form-control" />
                        <small id="eercustomer_account_holder" class="text-danger"></small>
                        <br />
                        <label>Mật khẩu rút tiền</label>
                        <div class="input-group" id="show_hide_password6">
                            <input class="form-control" type="password" id="ecustomer_password_payment">
    
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <br />
                        @if($data_admin->id_type=="1" || $data_admin->id_type=="2")
                        <button type="button" id="btn_update_customer" class="btn btn-success" />Cập nhật</form>
                        @endif
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close_modol_update" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>


    <div id="customer_ip_modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <center>
                        <h2 class="modal-title" style="color:black"><strong>Danh sách IP</strong></h2>
                    </center>
                </div>
                <div class="modal-body">
    
                    <div class="table-responsive" style="height: 100%;">
                        <div id="total_account">
                            <small></small>
                        </div>
                        <table id="table_ip" class="table table-striped table-hover">
                            <tr>
                                <th>Ip</th>
                                <th>Thời gian gần nhất</th>
                            </tr>
                            <tbody id="content_ip">
    
                            </tbody>
                        </table>
    
                    </div>   
                </div>
                <div class="modal-footer">
                    <button type="button" id="close_modol_update" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
   
    
    <div class="modal" id="vi_customer" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            </div>
            <div class="modal-body" id="content_alert">
                <form id="vi_customer_form">
                    <meta name="csrf-token-change-password" content="{{ csrf_token() }}" />
    
                    <div class="inqbox-content">
                        <div>
                            <input class="form-check-input" value="1" type="radio" checked name="flexRadioDefault_vi">
                            <label>Ví thường &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <label id="money_customer"></label><br />
                            
                        </div>

                        <br />
                        <br />
                        <label>Tiền thu hồi</label>
                        <input type="text" name="money_withdraw" min="0" id="money_withdraw" class="form-control"
                            data-type="currency" />
                        <small id="ermoney_withdraw" class="text-danger"></small>
                        <br />
                        <br />
                        <input type="submit" name="edit" id="btn_money_withdraw" value="Cập nhật" class="btn btn-success" />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn_slose_money_withdraw" class="btn btn-default"
                    data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
    <div class="modal" id="alert_change_pass_dashboard2" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="background-color: #87CEEB">
            <div class="modal-content">
            </div>
            <div class="modal-body" id="content_alert_das2">
    
            </div>
            <div class="modal-footer">
                <button type="button" id="ok_alert_das" class="btn btn-secondary" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
    </div>
    

    <div class="modal" id="change_password_customer_Modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            </div>
            <div class="modal-body" id="content_alert">
                <form id="update_password_form22">
                    <meta name="csrf-token-change-password" content="{{ csrf_token() }}" />
                    <input type="hidden" id="customer_phone_quenmk" value="">
                    <div class="inqbox-content">
    
                        <label>Mật khẩu mới</label>
                        <div class="input-group" id="show_hide_password4">
                            <input class="form-control" type="password" name="account_password_quenmk"
                                id="dashpassword_change_customer">
                            <br />
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <small id="dasherpassword_customer" class="text-danger"></small>
                        <br />
                        <br />
                        <label>Nhập lại mật khẩu</label>
                        <div class="input-group" id="show_hide_password5">
                            <input class="form-control" type="password" name="account_password"
                                id="dashpassword_change_customer2">
    
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <small id="dasherpassword2_customer" class="text-danger"></small>
                        <br />
                        <br />
                        <input type="submit" name="edit" id="btn_change_password_cus" value="Cập nhật"
                            class="btn btn-success" />
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="close_modol_changge_password2" class="btn btn-default"
                    data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_customer.js?v3') }}"></script>
@endsection