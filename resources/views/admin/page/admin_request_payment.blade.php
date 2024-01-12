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
        <div class="col-sm-8">
            <div class="inqbox">
                <div class="inqbox-content">
                    <span class="text-muted small pull-right"></span>
                    <h2></h2>
                    <div class="input-group">
                        <input type="text" placeholder="......" id="key_seach" class="input form-control">
                        <span class="input-group-btn">

                            <button type="button" class="btn btn btn-primary" onclick="show_payment(1)"></i>{{__('lang.search')}}</button>
                        </span>

                        <style type="text/css">

                        </style>

                    </div>
                    <div class="clients-list">
                        <ul class="nav nav-tabs tab-border-top-danger">
                            <div class="form-group col-md-3">
                                <label for="inputState">{{__('lang.date_start')}}</label><br />
                                <input type="date" id="ngaybatdau" onchange="show_payment(1)">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="inputState">{{__('lang.date_end')}}</label><br />
                                <input type="date" id="ngayketthuc" onchange="show_payment(1)">
                            </div>
                            <div class="form-group col-md-3" id="end_date">
                                <label for="inputState">{{__('lang.status')}}</label>
                                <select class="form-control" id="status_payment" onchange="show_payment(1)"
                                    style="height:40px;width: 150px;">
                                    <option value="">{{__('lang.all')}}</option>
                                   
                                    <option value="2">{{__('lang.wait')}}</option>
                                    <option value="3">{{__('lang.finish')}}</option>
                                    <option value="4">{{__('lang.cancel')}}</option>
                                </select>
                            </div>
                            

                        </ul>
                        <div class="tab-content">
                            <div id="tab-account" class="tab-pane active">
                                <div class="full-height-scroll">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover">
                                            <tr>
                                                <th></th>
                                                <th>{{__('lang.fullname')}}</th>
                                                <th>{{__('lang.code')}}</th>
                                                <th>{{__('lang.money')}}</th>
                                                <th>{{__('lang.date_transaction')}}</th>
                                                <th>{{__('lang.status')}}</th>
                                                <th style="width:5%"></th>
                                            </tr>
                                            <tbody id="content-deal">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="form-inline pull-right">
                                    <div class="form-group">
                                        << <a id="page_back" onclick="next_page('back')" style="color: #303030;"><span
                                                id="txt_page_before">Back</span></a>&nbsp;&nbsp;&nbsp; <a
                                                id="page_next" onclick="next_page('next')"><span
                                                    id="txt_page_after">Next</span></a>>>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="inqbox" id='detail_deal' hidden>
                <div class="inqbox-content">
                    <div id="contact-1" class="tab-pane active">
                        <center>
                            <h3><strong>{{__('lang.detail')}}</strong></h3>
                        </center>
                    </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
                        <table class="detai_deal">

                        </table>
                    </div>
                    <button type="button" data-toggle="modal" data-target="#reason_refuse"
                        class="btn btn-secondary btn-sm btn-block">{{__('lang.refuse')}}</button>
                    <button class="btn btn-danger btn-sm btn-block">{{__('lang.confirm')}}</button>
                </div>
            </div>
        </div>

        <div id="reason_refuse" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <center>
                            <h2 class="modal-title" style="color:black"><strong>{{__('lang.reason_refuse')}}</strong></h2>
                        </center>
                    </div>
                    <div class="modal-body">
                        <form id="id_reason_refuse">
                            {{ csrf_field() }}
                            <center><img src="{{asset ('images/icons8_cheap_2_1 1.svg')}}"></center>
                            <textarea rows="8" cols="73" placeholder="..." id="reason_cancel"></textarea>
                            <div id="id_request_text"></div>
                            <input type="button" onClick="cancel_money()" name="insert" id="insert_customer"
                                value="{{__('lang.refuse')}}" class="btn btn-success btn-sm btn-block" />
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_request_payment.js?v'.env('THEME_VERSION','1')) }}"></script>
@endsection