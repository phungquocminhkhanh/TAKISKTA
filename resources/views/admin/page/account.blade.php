@extends('admin.admin')

@section('title', 'Admin')

@section('theme-css')

@endsection

@section('content')

<div class="wrapper wrapper-content animated fadeInRight">
   <div class="row">
      <div class="col-sm-8">
         <div class="inqbox">
            <div class="inqbox-content">
               <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
               <h2>{{__('lang.sale')}}</h2>
               <div class="input-group">
                  <input type="text" placeholder="{{__('lang.d_enter_filed_register')}}" id="key_seach" value=""
                     class="input form-control">
                  <span class="input-group-btn">
                     <button type="button" class="btn btn btn-primary" onclick="show_account(1)"> <i
                           class="fa fa-search"></i>{{__('lang.search')}}</button>
                  </span>
               </div>
               <div class="clients-list">
                  <ul class="nav nav-tabs tab-border-top-danger">
                     <li class="active"> <button type="button" onclick="clear_data()" name="x" id="x"
                           data-toggle="modal" data-target="#add_account_Modal" class="btn btn-warning">+</button>
                     </li>
                  </ul>
                  <ul class="nav nav-tabs tab-border-top-danger">
                     <div class="form-group col-md-3">
                        <label for="inputState">{{__('lang.d_type_employee')}}</label>
                        <select onchange="show_account(1)" id="id_type_seach" style="height:40px;width: 150px;">
                           <option value="">{{__('lang.d_all')}}</option>
                           <option value="1">{{__('lang.d_admin')}}</option>
                           <option value="3">{{__('lang.d_business')}}</option>
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
                              <table class="table table-striped table-hover">

                                 <tr onclick="show_detail_account(${v.id})">
                                    <td></td>
                                    <td>Tên</td>
                                    <td>{{__('lang.d_type_employee')}}</td>
                                    <td>{{__('lang.phone')}}</td>
                                    <td>{{__('lang.d_referral_code')}}</td>
                                    <td>{{__('lang.d_status')}}</td>
                                    <td></td>
                                    <td></td>
                                 </tr>
                                 <tbody id="content-account">

                                 </tbody>
                              </table>

                           </div>
                        </div>
                        <div class="form-inline pull-right">
                           <div class="form-group">
                              << <a id="page_back" onclick="next_page('back')" style="color: #303030;"><span
                                    id="txt_page_before">back</span></a>&nbsp;&nbsp;&nbsp; <a
                                    id="page_next" onclick="next_page('next')"><span
                                       id="txt_page_after">next</span></a>>>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="col-sm-4">
         <div class="inqbox ">
            <div class="inqbox-content">
               <div class="tab-content" id="detail-account">

               </div>
            </div>
         </div>
      </div>


   </div>
   <meta name="csrf-token-get-permission" content="{{ csrf_token() }}" />
   <meta name="csrf-token-disable-account" content="{{ csrf_token() }}" />
   <meta name="csrf-token-detail" content="{{ csrf_token() }}" />

   <div id="add_account_Modal" class="modal fade">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">{{__('lang.d_add_employee')}}</h4>
            </div>
            <div class="modal-body">
               <meta name="csrf-token-insert" content="{{ csrf_token() }}" />
               <form method="post" id="insert_account_form">

                  <input type="hidden" name="detect" value="account_manager">
                  <input type="hidden" name="type_manager" value="create_account">
                  <label>Username (<font style="color: red">*</font>)</label>
                  <input type="text" name="username" id="username" class="form-control" />
                  <small id="erusername" class="text-danger"></small>
                  <br />
                  <br />
                  <label>Password (<font style="color: red">*</font>)</label>

                  <div class="input-group" id="show_hide_password_insert">
                     <input class="form-control" type="password" name="password" id="password"
                        onkeyup="passwordChanged()">

                     <div class="input-group-addon">
                        <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                     </div>
                  </div>
                  <small id="erpassword" class="text-danger"></small>
                  <br />
                  <br />
                  <label>{{__('lang.d_fullname')}} (<font style="color: red">*</font>)</label>
                  <input type="text" name="full_name" id="fullname" class="form-control" />
                  <small id="erfullname" class="text-danger"></small>
                  <br />
                  <br />
                  <label>Email</label>
                  <input type="text" name="email" id="email" class="form-control" />
                  <small id="eremail" class="text-danger"></small>
                  <br />
                  <br />
                  <label>{{__('lang.phone')}}</label>
                  <input type="tel" id="phone" name="phone_number"
                     onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                     onkeyup="KT_sodienthoai(this.value)" maxlength="10" class="form-control">
                  <small id="ersdt" class="text-danger"></small>
                  <br />
                  <label>{{__('lang.d_type_employee')}} (<font style="color: red">*</font>)</label>
                  <select id="id_type" name="id_type" onchange="ma_gioi_thieu()">
                     <option value="1">{{__('lang.d_manager')}}</option>
                     {{-- <option value="2">{{__('lang.d_customer_service')}}</option> --}}
                     <option value="3">{{__('lang.d_business')}}</option>
                  </select>
                  <br />
                  <br />
                  <div id="input_mas_gioi_thieu"></div>
                  <input type="submit" name="insert" id="insert_account" value="Thêm" class="btn btn-success" />
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" id="close_modol_insert" class="btn btn-default"
                  data-dismiss="modal">{{__('lang.close')}}</button>
            </div>
         </div>
      </div>
   </div>


   <div id="edit_account_Modal" class="modal fade">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">{{__('lang.sale')}}</h4>
            </div>
            <div class="modal-body">
               <meta name="csrf-token-edit" content="{{ csrf_token() }}" />
               <form id="edit_account_form">
                  <input type="hidden" name="detect" value="account_manager">
                  <input type="hidden" name="type_manager" value="update_account">
                  <input type="hidden" name="id_user" id="id_edit_account" value="">

                  <label>Username (<font style="color: red">*</font>)</label>
                  <input type="text" name="username" id="eusername" readonly class="form-control" />
                  <small id="eerusername" class="text-danger"></small>
                  <br />

                  <label>Họ và tên đầy đủ (<font style="color: red">*</font>)</label>
                  <input type="text" name="full_name" id="efullname" class="form-control" />
                  <small id="eerfullname" class="text-danger"></small>
                  <br />


                  <label>Email</label>
                  <input type="text" name="email" id="eemail" class="form-control" />
                  <br />
                  <label>{{__('lang.phone')}}</label>
                  <input type="tel" id="ephone" name="phone_number"
                     onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                     onkeyup="KT_esodienthoai(this.value)" maxlength="10" class="form-control">
                  <small id="eersdt" class="text-danger"></small>

                  <br />
                  <div id="einput_mas_gioi_thieu"></div>
                  <label>{{__('lang.d_type_employee')}} (<font style="color: red">*</font>)</label>
                  <select id="etype_account" name="id_type">
                     <option value="1">{{__('lang.d_manager')}}</option>
                     {{-- <option value="2">{{__('lang.d_customer_service')}}</option> --}}
                     <option value="3">{{__('lang.d_business')}}</option>
                  </select>
                  <br />
                  <br />
                  <input type="submit" name="edit" id="edit_account" value="Cập nhật" class="btn btn-success" />


               </form>
            </div>
            <div class="modal-footer">
               <button type="button" id="close_modol_edit" class="btn btn-default"
                  data-dismiss="modal">{{__('lang.close')}}</button>
            </div>
         </div>
      </div>
   </div>


   <div id="author_account_Modal" class="modal fade">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">{{__('lang.d_decentralization_of_management')}}</h4>
            </div>
            <div class="modal-body">

               <form id="author_account_form">
                  <meta name="csrf-token-author" content="{{ csrf_token() }}" />
                  <div class="inqbox-content">
                     <table class="table table-striped">
                        <thead>
                           <tr>
                              <th></th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody id="account_permission">
                        </tbody>
                     </table>
                  </div>

                  <input id="id_author_account" value="" type="hidden">
                  <br />
                  <input type="submit" name="edit" id="btn_author_account" value="{{__('lang.d_update')}}"
                     class="btn btn-success" />
                  {{-- <button type="button" id="btn-author_account"
                     class="btn btn-success">{{__('lang.d_decentralization')}}</button> --}}
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" id="close_modol_author" class="btn btn-default"
                  data-dismiss="modal">{{__('lang.close')}}</button>
            </div>
         </div>
      </div>
   </div>

   <div id="author_exchange_Modal" class="modal fade">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">{{__('lang.d_decentralization_exchange')}}</h4>
            </div>
            <div class="modal-body">

               <form id="author_exchange_form">

                  <div class="inqbox-content">
                     <table class="table table-striped" id="au_ex_content">
                        <thead>
                           <tr>
                              <th></th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody id="exchange_permission">
                        </tbody>
                     </table>
                  </div>


                  <br />

                  <button type="button" id="btn_author_exchange"
                     class="btn btn-success">{{__('lang.d_decentralization')}}</button>
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" id="close_modol_exchange" class="btn btn-default"
                  data-dismiss="modal">{{__('lang.close')}}</button>
            </div>
         </div>
      </div>
   </div>


   <div id="change_password_account_Modal" class="modal fade">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">{{__('lang.d_change_pw')}}</h4>
            </div>
            <div class="modal-body">

               <form id="change_password_account_form">
                  <meta name="csrf-token-change-password" content="{{ csrf_token() }}" />
                  <input type="hidden" id="id_change_password_account" value="">
                  <div class="inqbox-content">

                     <label>{{__('lang.d_new_pw')}}</label>
                     <div class="input-group" id="show_hide_password4">
                        <input class="form-control" type="password" name="account_password" id="epassword_change"
                           onkeyup="passwordChanged2()">
                        <br />
                        <div class="input-group-addon">
                           <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                        </div>
                     </div>
                     <small id="cerpassword" class="text-danger"></small>
                     <br />
                     <br />
                     <label>{{__('lang.d_confirm_pw')}}</label>
                     <div class="input-group" id="show_hide_password5">
                        <input class="form-control" type="password" name="account_password" id="epassword_change2">

                        <div class="input-group-addon">
                           <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                        </div>
                     </div>
                     <small id="cerpassword2" class="text-danger"></small>
                     <br />
                     <br />
                     <input type="submit" name="edit" id="btn_change_password_account" value="{{__('lang.d_update')}}"
                        class="btn btn-success" />
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" id="close_modol_changge_password" class="btn btn-default"
                  data-dismiss="modal">{{__('lang.close')}}</button>
            </div>
         </div>
      </div>
   </div>

   <div class="modal" id="alert_change_pass" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document" style="background-color: darkgray">
         <div class="modal-content">
         </div>
         <div class="modal-body" id="content_alert">

         </div>
         <div class="modal-footer">
            <button type="button" id="ok_alert" class="btn btn-secondary" data-dismiss="modal">OK</button>
         </div>
      </div>
   </div>
</div>
@endsection

@section('js')
<script src="{{ asset('backend/js/main/admin_account.js?v'.env('THEME_VERSION','1')) }}"></script>
@endsection