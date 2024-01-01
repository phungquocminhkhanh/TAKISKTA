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
                        <input type="text" placeholder="Nhập tên sản phẩm" id="key_search" value="" class="input form-control">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="show_product(1)"> <i
                                    class="fa fa-search"></i>Tìm kiếm</button>
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
                                <label for="inputState">Trạng thái</label>
                                <br />
                                <select onchange="show_product(1)" id="status_filter"
                                    style="height:40px;width: 150px;">
                                    <option value="">Tất cả</option>
                                    <option value="open">Mở</option>
                                    <option value="close">Đóng</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputState">Danh mục</label>
                                <br />
                                <select onchange="show_product(1)" id="id_exchange_filter" style="height:40px;width: 150px;">
                                    <option value="">Tất cả</option>
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
                                                <td>Tên sản phẩm</td>
                                                <td>Giá</td>
                                                <td>Số lượng</td>
                                                <td>Đã mua</td>
                                                <td>Giảm giá</td>
                                                <td>Danh mục</td>
                                                <td>Trạng thái</td>
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

    <div id="add_modal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Thêm sản phẩm</h4>
                </div>
                <div class="modal-body">
                    <form method="post" id="insert_form">
                        <label>Danh mục</label>
                        <select id="id_exchange" class="form-control">
                            <option value="">Tất cả</option>
                            <option value="45">Sang trọng</option>
                            <option value="46">Đồ điện tử</option>
                            <option value="47">Đồ gia dụng</option>
                            <option value="48">Mỹ phẩm chính hảng</option>
                        </select>
                        <br />
                        <label>Tên sản phẩm</label>
                        <input type="text" id="product_name" class="form-control" />
                        <br />
                        <label>Giá</label>
                        <input type="text" id="price" class="form-control" data-type="currency"/>
                        <br />
                        <label>Số lượng</label>
                        <input type="number" id="quantity" class="form-control" min="1" value="10" />
                        <br />
                        <label>Giảm giá</label>
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
                        <label>Trạng thái</label>
                        <select id="status_add" class="form-control">
                            <option value="open">Mở</option>
                            <option value="close">Đóng</option>
                        </select>
                        <br />
                        <label>Hỉnh ảnh</label>
                        <input type="file" id="img_product" class="form-control" min="1" value="1" onchange="select_img('img_product','content_img','100%')"/>
                        <div id="content_img" class="mt-2 text-center">
                        </div>
                        <br />
                        <button type="button" name="insert" id="btn_insert_product"
                            class="btn btn-success">Lưu</button>
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
<script src="{{ asset('backend/js/main/admin_product.js') }}"></script>
@endsection