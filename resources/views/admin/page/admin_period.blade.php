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
                    <h2>{{__('lang.d_time')}}</h2>
                    <div class="input-group">
                        <input type="text" placeholder="" id="key_search" value="" class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_period(1)"> <i
                                    class="fa fa-search"></i>{{__('lang.search')}}</button>
                        </span>
                    </div>
                    <div class="clients-list">
                        <ul class="nav nav-tabs tab-border-top-danger">
                            <li class="active">
                                <button type="button" id="modal_add" class="btn btn-warning">+</button>
                            </li>
                        </ul>
                        <ul class="nav nav-tabs tab-border-top-danger mt-2">
                            <div class="form-group col-md-2">
                                <label for="inputState">{{__('lang.d_area')}}</label>
                                <br />
                                <select onchange="show_period(1)" id="id_exchange_filter"
                                    style="height:40px;width: 150px;">
                                    <option value="">{{__('lang.d_all')}}</option>
                                    <option value="45">{{__('lang.d_luxury')}}</option>
                                    <option value="46">{{__('lang.d_electronic')}}</option>
                                    <option value="47">{{__('lang.d_houseware')}}</option>
                                    <option value="48">{{__('lang.d_cosmetics')}}</option>
                                </select>

                            </div>

                            <div class="form-group col-md-2">
                                <label for="inputState">{{__('lang.d_date')}}</label>
                                <br />
                                <input type="date" id="date_begin" onchange="show_period(1)">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState">{{__('lang.d_status')}}</label>
                                <br />
                                <select onchange="show_period(1)" id="status_filter" style="height:40px;width: 150px;">
                                    <option value="">{{__('lang.d_all')}}</option>
                                    <option value="open">{{__('lang.d_open')}}</option>
                                    <option value="close">{{__('lang.close')}}</option>
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
                                                <td>{{__('lang.d_area')}}</td>
                                                <td>{{__('lang.d_begin_time')}}</td>
                                                <td>{{__('lang.d_end_time')}}</td>
                                                <td>{{__('lang.d_discount')}}</td>
                                                <td>{{__('lang.d_status')}}</td>
                                                <td>{{__('lang.d_create_date')}}</td>
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



    <div id="create_modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <center>
                        <h2 class="modal-title" style="color:black"><strong>Thời gian</strong></h2>
                    </center>
                </div>
                <div class="modal-body">

                    <form id="insert_form">
                        <label>{{__('lang.exchange')}}</label>
                        <select id="id_exchange" class="form-control">
                            <option value="">{{__('lang.select')}}</option>
                            <option value="45">Sang trọng</option>
                            <option value="46">Đồ điện tử</option>
                            <option value="47">Đồ gia dụng</option>
                            <option value="48">Mỹ phẩm chính hảng</option>
                        </select>
                        <br />

                        <?php $now = date("Y-m-d"); ?>
                        <div class="row">

                            <div class="col-12 col-sm-6">
                                <label>{{__('lang.d_begin_time')}}</label>
                                <input type="date" id="d_start" class="form-control" value="{{$now}}">
                            </div>
                            <div class="col-6 col-sm-3">
                                <label>{{__('lang.hour')}}</label>
                                <select id="h_start" class="form-control">
                                    @for($i = 0 ; $i <= 23 ; $i++) <option value="{{($i<10)? $i : $i}}">{{($i<10)?'0'.$i
                                            : $i}}</option>
                                            @endfor
                                </select>
                            </div>
                            <div class="col-6 col-sm-3">
                                <label>{{__('lang.phut')}}</label>
                                <select id="m_start" class="form-control">
                                    @for($i = 0 ; $i <= 59 ; $i++) <option value="{{($i<10)? $i : $i}}">{{($i<10)?'0'.$i
                                            : $i}}</option>
                                            @endfor
                                </select>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label>{{__('lang.d_end_time')}}</label>
                                <input type="date" id="d_end" class="form-control" value="{{$now}}">
                            </div>
                            <div class="col-6 col-sm-3">
                                <label>{{__('lang.hour')}}</label>
                                <select id="h_end" class="form-control">
                                    @for($i = 0 ; $i <= 23 ; $i++) <option value="{{($i<10)? $i : $i}}">{{($i<10)?'0'.$i
                                            : $i}}</option>
                                            @endfor
                                </select>
                            </div>
                            <div class="col-6 col-sm-3">
                                <label>{{__('lang.phut')}}</label>
                                <select id="m_end" class="form-control">
                                    @for($i = 0 ; $i <= 59 ; $i++) <option value="{{($i<10)? $i : $i}}">{{($i<10)?'0'.$i
                                            : $i}}</option>
                                            @endfor
                                </select>
                            </div>
                        </div>
                        <br />
                        <label>{{__('lang.giam_gia')}} (%)</label>
                        <input type="number" id="discount" class="form-control" min=1 max=100>
                        <br />
                        <label>{{__('lang.status')}}</label>
                        <select id="status" class="form-control">
                            <option value="open">{{__('lang.open')}}</option>
                            <option value="close">{{__('lang.close')}}</option>
                        </select>
                        <br />
                        <br />
                        <button type="button" name="insert" id="btn_insert_period"
                            class="btn btn-success btn_insert">Thêm</button>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close_modol_insert" class="btn btn-default"
                        data-dismiss="modal">{{__('lang.close')}}</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_period.js?v'.env('THEME_VERSION','1')) }}"></script>
@endsection