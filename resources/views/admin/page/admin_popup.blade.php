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
                    <h2>{{__('lang.d_order')}}</h2>

                    <div class="clients-list">

                        <div class="tab-content">

                            <div id="tab-account" class="tab-pane active">
                                <div class="full-height-scroll">
                                    <div class="table-responsive" style="height: 100%;">
                                        <div id="total_account">
                                            <small></small>
                                        </div>
                                        <table id="table_popup" class="table table-striped table-hover">

                                            <tr>
                                                <td></td>
                                                <td>{{__('lang.d_content')}}</td>
                                                <td>{{__('lang.d_update_time')}}</td>
                                                <td></td>
                                            </tr>
                                            <tbody id="content_popup">

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
                        <h2 class="modal-title" style="color:black"><strong>Popup</strong></h2>
                    </center>
                </div>
                <div class="modal-body">

                    <form id="insert_form">
                        <label>Nội dung</label>
                        <textarea id="content" rows="20"></textarea>
                        <br />
                        <br />
                        <button type="button" name="edit" id="btn_insert" class="btn btn-success">Cập nhật</button>

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
<script src="{{ asset('ckeditor/ckeditor.js') }}"></script>
<script src="{{ asset('backend/js/main/admin_popup.js?v'.env('THEME_VERSION','1')) }}"></script>
<script>
    CKEDITOR.replace( 'content');
</script>
@endsection