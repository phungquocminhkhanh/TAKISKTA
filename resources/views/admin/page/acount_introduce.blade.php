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
                    <h2>Mã mời</h2>
                    <div class="input-group">
                        <input type="text" placeholder="Nhập mã" id="key_search" value="" class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_introduce(1)"> <i
                                    class="fa fa-search"></i>Tìm kiếm</button>
                        </span>
                    </div>
                    <div class="clients-list">
                        @if($data_admin->id_type=="1" || $data_admin->id_type=="2")
                        <ul class="nav nav-tabs tab-border-top-danger">
                            <li class="active">
                                <button type="button" onclick="clear_data()" id="modal_add"
                                    class="btn btn-warning">+</button>
                            </li>
                        </ul>
                        @endif
                        <ul class="nav nav-tabs tab-border-top-danger mt-2">
                            <div class="form-group col-md-2">
                                <label for="inputState">Trạng thái</label>
                                <br />
                                <select onchange="show_introduce(1)" id="status_filter"
                                    style="height:40px;width: 150px;">
                                    <option value="">Tất cả</option>
                                    <option value="open">Mở</option>
                                    <option value="close">Đóng</option>
                                </select>
                            </div>
                            @if($data_admin->id_type=="1" || $data_admin->id_type=="2")
                            <div class="form-group col-md-2">
                                <label for="inputState">Nhân viên</label>
                                <br />
                                <select onchange="show_introduce(1)" id="id_account_filter"
                                    style="height:40px;width: 150px;">

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
                                        <table id="table_introduce" class="table table-striped table-hover">

                                            <tr>
                                                <td></td>
                                                <td>Nhân viên</td>
                                                <td>Mã mời</td>
                                                <td>Tổng số lần</td>
                                                <td>Đã sử dụng</td>
                                                <td>Trạng thái</td>
                                                <td>Ngày tạo</td>
                                                <td></td>
                                            </tr>
                                            <tbody id="content_introduce">

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

    <div id="add_modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Thêm mã mời</h4>
                </div>
                <div class="modal-body">
                    <form method="post" id="insert_form">
                        <label>Nhân viên</label>
                        <select id="id_account_add" class="form-control">

                        </select>
                        <br />
                        <label>Số lượng</label>
                        <input type="number" id="quantity" class="form-control" min="1" value="10" />
                        <br />
                        <label>Trạng thái</label>
                        <select id="status_add" class="form-control">
                            <option value="open">Mở</option>
                            <option value="close">Đóng</option>
                        </select>
                        <br />
                        <br />
                        <button type="button" name="insert" id="btn_insert_introduce"
                            class="btn btn-success">Thêm</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close_modol_insert" class="btn btn-default"
                        data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_introduce.js?v2') }}"></script>
@endsection