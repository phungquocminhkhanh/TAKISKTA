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
                    <h2>{{__('lang.ma_moi')}}</h2>
                    <div class="input-group">
                        <input type="text" placeholder="{{__('lang.d_enter_code')}}" id="key_search" value=""
                            class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_introduce(1)"> <i
                                    class="fa fa-search"></i>{{__('lang.search')}}</button>
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
                                <label for="inputState">{{__('lang.d_status')}}</label>
                                <br />
                                <select onchange="show_introduce(1)" id="status_filter"
                                    style="height:40px;width: 150px;">
                                    <option value="">{{__('lang.d_all')}}</option>
                                    <option value="open">{{__('lang.d_open')}}</option>
                                    <option value="close">{{__('lang.close')}}</option>
                                </select>
                            </div>
                            @if($data_admin->id_type=="1" || $data_admin->id_type=="2")
                            <div class="form-group col-md-2">
                                <label for="inputState">{{__('lang.sale')}}</label>
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
                                                <td>{{__('lang.sale')}}</td>
                                                <td>{{__('lang.d_code')}}</td>
                                                <td>{{__('lang.d_total')}}</td>
                                                <td>{{__('lang.d_used')}}</td>
                                                <td>{{__('lang.d_status')}}</td>
                                                <td>{{__('lang.d_create_date')}}</td>
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
                                                id="txt_page_before">back</span></a>&nbsp;&nbsp;&nbsp;
                                            <a id="page_next" onclick="next_page('next')"><span
                                                    id="txt_page_after">next</span></a>>>

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
                    <h4 class="modal-title">{{__('lang.d_add_code')}}</h4>
                </div>
                <div class="modal-body">
                    <form method="post" id="insert_form">
                        <label>{{__('lang.sale')}}</label>
                        <select id="id_account_add" class="form-control">

                        </select>
                        <br />
                        <label>{{__('lang.d_quantity')}}</label>
                        <input type="number" id="quantity" class="form-control" min="1" value="10" />
                        <br />
                        <label>{{__('lang.d_status')}}</label>
                        <select id="status_add" class="form-control">
                            <option value="open">{{__('lang.d_open')}}</option>
                            <option value="close">{{__('lang.close')}}</option>
                        </select>
                        <br />
                        <br />
                        <button type="button" name="insert" id="btn_insert_introduce"
                            class="btn btn-success">{{__('lang.d_add')}}</button>
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
<script src="{{ asset('backend/js/main/admin_introduce.js?v'.env('THEME_VERSION','1')) }}"></script>
@endsection