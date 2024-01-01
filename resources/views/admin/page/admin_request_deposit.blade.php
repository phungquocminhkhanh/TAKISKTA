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
                    <span class="text-muted small pull-right"></span>
                    <h2></h2>
                    <div class="input-group">
                        <input type="text" placeholder="Nhập tên, số điện thoại, mã lệnh" id="key_seach"
                            class="input form-control">
                        <span class="input-group-btn">

                            <button onclick="show_deposit(1)" type="button" class="btn btn btn-primary">Tìm
                                kiếm</button>

                    </div>
                    <div class="clients-list">
                        <div class="tab-content">
                            <div id="tab-account" class="tab-pane active">
                                <div class="full-height-scroll">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover">
                                            <tr>
                                                <th></th>
                                                <th>Họ và tên</th>
                                                <th>Số điện thoại</th>
                                                <th>Mã lệnh</th>
                                                <th>Nạp tiền</th>
                                                <th>Ngày giao dịch</th>
                                                <th>Loại</th>
                                                <th>
                                                    @if($data_admin->id_type=="1")

                                                    <center><a onClick="create_deposit()"><img
                                                                src="{{asset ('images/plus.svg')}}"></a>
                                                    </center>
                                                    @endif


                                                </th>

                                            </tr>
                                            <tbody id="content-deposit">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="form-inline pull-right">
                                    <div class="form-group" id="div_nap_tien">
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
        <div class="col-sm-12">
            <div class="inqbox" id='detail_deposit' hidden>
                <div class="inqbox-content">
                    <div id="contact-1" class="tab-pane active">
                        <center>
                            <h3><strong>Chi tiết yêu cầu giao dịch</strong></h3>
                        </center>
                    </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
                        <table class="detai_deal">

                        </table>
                        <hr>

                    </div>
                    <button type="button" data-toggle="modal" data-target="#reason_refuse"
                        class="btn btn-secondary btn-sm btn-block">Từ chối</button>
                    <button class="btn btn-danger btn-sm btn-block"> Xác nhận</button>
                </div>
            </div>
        </div>
        {{----- dialog filter request payment --}}
        <dialog id="filter_deposit1">
            <form method="dialog">
                <p><label>Thời gian bắt đầu:</label></p>
                <input type="Date" class="form-control" id="start_time_request">
                <p><label>Thời gian kết thúc:</label></p>
                <input type="Date" class="form-control" id="finish_time_request">
                <center>
                    <menu class="menu">
                        <button class="btn btn-secondary">Hủy </button>
                        <button class="btn btn-danger" onClick="filter_request_deposit()">Tìm kiếm</button>
                    </menu>
                </center>
            </form>
        </dialog>
        {{-- --------------------------- --}}
        {{-- Model_detail_customer --}}
        <div id="request_deposit" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" id="close_modal" data-dismiss="modal">&times;</button>
                        <center>
                            <h2 class="modal-title" style="color:black"><strong>Chọn: </strong></h2>
                        </center>
                        <center>
                            <select style="font-weight: bold" onchange="list_customer()" id="customer_virtual">
                                <option value="N">Tài khoản thường</option>
                            </select><br /><br />
                            <select style="font-weight: bold" id="khuyenmai">

                            </select>
                        </center>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <input type="text" placeholder="Tên khách hàng, số điện thoại" id="id_customer_search"
                                class="input form-control">
                            <span class="input-group-btn">
                                <button onclick="search_customer(1)" type="button" class="btn btn btn-primary">Tìm
                                    kiếm</button>
                        </div>
                        <br />
                        <form id="form_request_deposit">
                            {{ csrf_field() }}
                            <div class="tab-content" id="content-order"
                                style="width: 100%;height: 300px;overflow: auto;">
                                <table class="table table-striped table-hover">
                                    <tr>
                                        <th>Họ và tên</th>
                                        <th>Số điện thoại</th>

                                        <th style="20px"></th>
                                    </tr>
                                    <tbody id="list_customer">



                                    </tbody>
                                </table>
                            </div>
                        </form>
                        <div class="btn-confirm">
                            <input type="button" onClick="choose_customer()" value="Ok" class="btn btn-danger btn-sm" />
                        </div>
                        <div class="modal-footer">
                        </div>

                    </div>
                </div>
            </div>
        </div>
        {{-- ------------------------------------------------------------- --}}

    </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_request_deposit.js') }}"></script>
@endsection