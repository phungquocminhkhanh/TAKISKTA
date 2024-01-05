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
                    <h2>Sản phẩm</h2>
                    <div class="input-group">
                        <input type="text" placeholder="{{__('lang.enter_product_name')}}" id="key_search" value="" class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_product(1)"> <i
                                    class="fa fa-search"></i>{{__('lang.search')}}</button>
                        </span>
                    </div>
                    <div class="clients-list">
                        <ul class="nav nav-tabs tab-border-top-danger">
                            <li class="active">
                                <button type="button" onclick="clear_data()" id="modal_add"
                                    class="btn btn-warning">+</button>
                            </li>
                        </ul>
                        <ul class="nav nav-tabs tab-border-top-danger mt-2">
                            <div class="form-group col-md-2">
                                <label for="inputState">{{__('lang.status')}}</label>
                                <br />
                                <select onchange="show_product(1)" id="status_filter"
                                    style="height:40px;width: 150px;">
                                    <option value="">{{__('lang.all')}}</option>
                                    <option value="open">{{__('lang.open')}}</option>
                                    <option value="close">{{__('lang.close')}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState">{{__('lang.exchange')}}</label>
                                <br />
                                <select onchange="show_product(1)" id="id_exchange_filter" style="height:40px;width: 150px;">
                                    <option value="">{{__('lang.all')}}</option>
                                    <option value="45">Sang trọng</option>
                                    <option value="46">Đồ điện tử</option>
                                    <option value="47">Đồ gia dụng</option>  
                                    <option value="48">Mỹ phẩm chính hảng</option>
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
                                        <table id="table_product" class="table table-striped table-hover">

                                            <tr>
                                                <td></td>
                                                <td>
                                                   
                                                </td>
                                                <td>{{__('lang.product_name')}}</td>
                                                <td>{{__('lang.gia')}}</td>
                                                <td>{{__('lang.so_luong')}}</td>
                                                <td>{{__('lang.da_mua')}}</td>
                                                <td>{{__('lang.giam_gia')}}</td>
                                                <td>{{__('lang.exchange')}}</td>
                                                <td>{{__('lang.status')}}</td>
                                                <td>{{__('lang.date_create')}}</td>
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



    </div>

    <div id="add_modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{{__('lang.them_san_pham')}}</h4>
                </div>
                <div class="modal-body">
                    <form method="post" id="insert_form">
                        <label>Khu vực</label>
                        <select id="id_exchange" class="form-control">
                            <option value="">{{__('lang.all')}}</option>
                            <option value="45">Sang trọng</option>
                            <option value="46">Đồ điện tử</option>
                            <option value="47">Đồ gia dụng</option>
                            <option value="48">Mỹ phẩm chính hảng</option>
                        </select>
                        <br />
                        <label>{{__('lang.product_name')}}</label>
                        <input type="text" id="product_name" class="form-control" />
                        <br />
                        <label>{{__('lang.gia')}}</label>
                        <input type="text" id="price" class="form-control" data-type="currency"/>
                        <br />
                        <label>{{__('lang.so_luong')}}</label>
                        <input type="number" id="quantity" class="form-control" min="1" value="10" />
                        <br />
                        <label>{{__('lang.giam_gia')}}</label>
                        <div class="row">
                            <div class="col-8">
                                <input type="number" id="discount" class="form-control" min="0"/>
                            </div>
                            <div class="col-4">
                                <div class="onoffswitch">
                                    <input type="checkbox" class="onoffswitch-checkbox" id="discount_status">
                                    <label class="onoffswitch-label" for="discount_status">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <label>Hot</label>
                        <input type="number" id="hot" class="form-control" min="1" value="1" />
                        <br />
                        <label>{{__('lang.status')}}</label>
                        <select id="status_add" class="form-control">
                            <option value="open">Mở</option>
                            <option value="close">Đóng</option>
                        </select>
                        <br />
                        <label>{{__('lang.hinh_anh')}}</label>
                        <input type="file" id="img_product" class="form-control" min="1" value="1" onchange="select_img('img_product','content_img','100%')"/>
                        <div id="content_img" class="mt-2 text-center">
                        </div>
                        <br />
                        <button type="button" name="insert" id="btn_insert_product"
                            class="btn btn-success">{{__('lang.save')}}</button>
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
<script src="{{ asset('backend/js/main/admin_product.js') }}"></script>
@endsection