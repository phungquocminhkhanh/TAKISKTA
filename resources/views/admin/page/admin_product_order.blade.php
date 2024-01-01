@extends('admin.admin')

@section('title', 'Admin')

@section('theme-css')

@endsection

@section('content')

<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="inqbox">
                <div class="inqbox-content">
                    <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
                    <h2>Đơn hàng</h2>
                    <div class="input-group">
                        <input type="text" placeholder="Nhập mã đơn hàng, tên sản phẩm, tên số điện thoại khách hàng" id="key_search" value=""
                            class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_product_order(1)"> <i
                                    class="fa fa-search"></i>Tìm kiếm</button>
                        </span>
                    </div>
                    <div class="clients-list">
                        
                        <ul class="nav nav-tabs tab-border-top-danger mt-2">
                            <div class="form-group col-md-2">
                                <label for="inputState">Trạng thái</label>
                                <br />
                                <select onchange="show_product_order(1)" id="status_filter" style="height:40px;width: 150px;">
                                    <option value="">Tất cả</option>
                                    <option value="wait">Chờ xử lý</option>
                                    <option value="finish">Hoàn thành</option>
                                    <option value="cancel">Hủy</option>
                                </select>
                            </div>
                        </ul>
                        <div class="tab-content">

                            <div id="tab-account" class="tab-pane active">
                                <div class="full-height-scroll">
                                    <div class="table-responsive" style="height: 100%;">
                                        <div id="total_account">
                                            <small></small>
                                        </div>
                                        <table id="table_product_order" class="table table-striped table-hover">

                                            <tr>
                                                <td></td>
                                                <td>code</td>
                                                <td>

                                                </td>
                                                <td>Tên sản phẩm</td>
                                                <td>Số lượng</td>
                                                <td>Tổng giá</td>
                                                <td>Giảm giá</td>
                                                <td>Nhận thưởng</td>
                                                <td>Trạng thái</td>
                                                <td>Khách hàng</td>
                                                <td>Số điện thoại</td>
                                                <td>Ngày tạo</td>
                                                <td></td>
                                            </tr>
                                            <tbody id="content_product">

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



    </div>



    <div class="modal" id="cancel_modal" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"><strong>Đơn hàng : </strong><span id="code_cancel"></span></h2>
                </div>
                <div class="modal-body" id="content_alert">
                    <form id="cancel_form">
                    
                        <div class="inqbox-content">
                          
                            <label>Lý do hủy</label>
                            <textarea type="text" id="description" class="form-control"></textarea>
                            <br />
                            <br />
                            <button type="button" name="edit" id="btn_cancel" class="btn btn-success">Hủy đơn hàng</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" id="btn_slose_money_withdraw" class="btn btn-default"
                    data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_product_order.js') }}"></script>
@endsection