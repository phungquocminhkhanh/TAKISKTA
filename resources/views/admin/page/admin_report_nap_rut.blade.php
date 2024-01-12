@extends('admin.admin')

@section('title', 'Admin')

@section('theme-css')

@endsection

@section('content')
<?php $data_admin = Session::get('data_admin');
    $id_account_sale = "";
    if ($data_admin->id_type == '3')
        $id_account_sale = $data_admin->id;
    ?>
<input type="hidden" value="{{$data_admin->id_type}}" id="id_type">
<input type="hidden" value="{{$id_account_sale}}" id="id_account_sale">

<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="inqbox">
                <div class="inqbox-content">
                    <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i> </span>
                    <div style="width: 100%;">
                        <span id="total_wallet" style="font-size:17px"></span>
                    </div>
                    <div style="width: 100%;font-size: 15px">
                       <div>{{__('lang.total_customer')}}: </span><span class="fw-bold" id="total_customer"></div>
                       <div>{{__('lang.total_customer_in_day')}}: </span><span class="fw-bold" id="total_customer_in_day"></div>
                    </div>
                    <hr>
                    <br />
                    <br />
                    <br />
                    <h2 style="text-align: center">{{__('lang.report_total_naprut')}}</h2>
                    <select onchange="type_total()" id="type"
                        style="margin-left: 44%;width: 130px;font-size:21px;font-weight: bold">
                        <option value="request_deposit">{{__('lang.deposit')}}</option>
                        <option value="request_payment">{{__('lang.payment')}}</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    @if($data_admin->id_type=='1')

                    <button class="label label-primary" id="btn_sale" data-toggle="modal" data-target="#list_sale">{{__('lang.report_sale')}}</button>
                    @endif
                    <div class="clients-list">
                        <ul class="nav nav-tabs tab-border-top-danger">
                        </ul>
                        <div class="tab-content">

                            <div id="tab-account" class="tab-pane active">
                                <div class="full-height-scroll">
                                    <div class="table-responsive" style="text-align: center;height: 30%;overflow: unset;">
                                        <style>
                                            .total-customer {
                                                width: 100%;
                                                height: 190px;
                                                text-align: center;
                                            }

                                            #xxx {
                                                margin-top: 2%;
                                                font-weight: bold;
                                            }

                                            #number-total {
                                                color: red;
                                                font-size: 50px
                                            }

                                            p.groove {
                                                border-style: outset;
                                                text-align: center;
                                                font-weight: 550;
                                                width: 38%;
                                            }

                                            p.sale {
                                                border-style: outset;
                                                text-align: center;
                                                font-weight: 550;
                                                width: 90%;
                                            }
                                        </style>
                                        <div class="input-group">
                                            <input type="text" placeholder="{{__('lang.enter_name_phone')}}" id="key_seach"
                                                value="" class="input form-control">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn btn-primary"
                                                    onclick="type_total()"> <i class="fa fa-search"></i>{{__('lang.search')}}</button>
                                            </span>
                                        </div>
                                        <div class="form-group col-md-2" id="start_date" style="margin-left: 14%">
                                            <label for="inputState">{{__('lang.date_start')}}</label>
                                            <br />
                                            <input type="date" id="ngaybatdau" onchange="type_total()">
                                        </div>

                                        <div class="form-group col-md-2" id="end_date" style="align-items: center">
                                            <label for="inputState">{{__('lang.date_end')}}</label>
                                            <br />

                                            <input type="date" id="ngayketthuc" onchange="type_total()">
                                        </div>
                                    </div>

                                    <div class="total-customer">
                                        <h3 id="xxx">{{__('lang.number_customer')}}</h3>
                                        <h3 id="total-cus">0</h3>
                                        <h3 id="xxx">{{__('lang.total_revenue')}}</h3>
                                        <h2 id="number-total">0 VND</h2>
                                    </div>
                                    <div>

                                    </div>

                                    <table class="table table-striped table-hover">
                                        <tr>
                                            <td>{{__('lang.name')}}</td>
                                            <td>{{__('lang.phone')}}</td>
                                            <td>{{__('lang.money')}}</td>
                                            <td>{{__('lang.sale')}}</td>
                                            

                                        </tr>
                                        <tbody id="content-customer">

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
    <style>
        thead,
        tbody tr {
            display: table ;
            width: 100%;
            table-layout: fixed;
            /* even columns width , fix width of table too*/
        }
    
        thead {
            width: calc(100% - 1em)
                /* scrollbar is average 1em/16px width, remove it from thead width */
        }
    
        #dd {
            width: 100%;
        }
    </style>
    
    <div class="modal" id="list_sale" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            </div>
            <div class="modal-body" style="left:-21%" id="content_alert">
    
    
                <div class="inqbox-content" style="width: 806px;">
                    <div class="tab-content">
    
                        <div id="tab-account" class="tab-pane active">
                            <div>
                                <div class="table-responsive">
                                    <div class="input-group">
                                        <input type="text" placeholder="{{__('lang.enter_name_phone')}}" id="key_seach_sale"
                                            value="" class="input form-control">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn btn-primary" onclick="show_account_sale()">
                                                <i class="fa fa-search"></i>{{__('lang.search')}}</button>
                                        </span>
                                    </div>
                                    <table class="table table-striped table-hover">
    
                                        <tr>
                                            <td style="width:5%">{{__('lang.select')}}</td>
                                            <td>{{__('lang.name')}}</td>
                                            <td class="text-center">{{__('lang.phone')}}</td>
                                         
                                        </tr>
                                        <tbody style="height: 400px;overflow: auto;display: block;" id="content-account">
    
                                        </tbody>
                                    </table>
    
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" name="edit" onclick="type_total()" value="{{__('lang.report')}}" class="btn btn-success" />
                </div>
    
    
    
    
            </div>
    
            <div class="modal-footer">
                <button type="button" id="close_sale" class="btn btn-default" data-dismiss="modal">{{__('lang.close')}}</button>
            </div>
        </div>
    </div>

</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_report_nap_rut.js?v'.env('THEME_VERSION','1')) }}"></script>
@endsection