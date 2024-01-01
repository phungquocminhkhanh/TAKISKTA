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
                    <h2>Thời gian</h2>
                    <div class="input-group">
                        <input type="text" placeholder=""
                            id="key_search" value="" class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_period(1)"> <i
                                    class="fa fa-search"></i>Tìm kiếm</button>
                        </span>
                    </div>
                    <div class="clients-list">

                        <ul class="nav nav-tabs tab-border-top-danger mt-2">
                            <div class="form-group col-md-2">
                                <label for="inputState">Khu vực</label>
                                <br />
                                <select onchange="show_period(1)" id="id_exchange_filter" style="height:40px;width: 150px;">
                                    <option value="45">Sang trọng</option>
                                    <option value="46">Đồ điện tử</option>
                                    <option value="47">Đồ gia dụng</option>
                                    <option value="48">Mỹ phẩm chính hảng</option>
                                </select>
                            
                            </div>

                            <div class="form-group col-md-2">
                                <label for="inputState">Ngày</label>
                                <br />
                                <input type="date">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState">Trạng thái</label>
                                <br />
                                <select onchange="show_period(1)" id="status_filter" style="height:40px;width: 150px;">
                                    <option value="">Tất cả</option>
                                    <option value="open">Mở</option>
                                    <option value="close">Đóng</option>
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
                                        <table id="table_period" class="table table-striped table-hover">

                                            <tr>
                                                <td></td>
                                                <td>Khuc vực</td>
                                                <td>Thời gian bắt đầu</td>
                                                <td>Thời gian kết thức</td>
                                                <td>Trạng thái</td>
                                                <td>Ngày tạo</td>
                                                <td></td>
                                            </tr>
                                            <tbody id="content_period">

                                            </tbody>
                                        </table>

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
                            <button type="button" name="edit" id="btn_cancel" class="btn btn-success">Hủy đơn
                                hàng</button>
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
<script src="{{ asset('backend/js/main/admin_period.js') }}"></script>
@endsection