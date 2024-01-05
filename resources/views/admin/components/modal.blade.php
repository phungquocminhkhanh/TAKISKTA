<div id="change_password_dashboard_account_Modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">{{__('lang.d_change_pw')}}</h4>
            </div>
            <div class="modal-body">

                <form id="change_password_dashboard_account_form">
                    <div class="inqbox-content">
                        <label>{{__('lang.d_old_pw')}}</label>
                        <div class="input-group" id="show_hide_password">
                            <input class="form-control" type="password" name="old_password" id="old_password">

                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <small id="erold_password" class="text-danger"></small><br /><br />

                        <label>{{__('lang.d_new_pw')}}</label>
                        <div class="input-group" id="show_hide_password2">
                            <input class="form-control" type="password" name="account_password"
                                id="dashpassword_change">
                            <br />
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <small id="dasherpassword" class="text-danger"></small>
                        <br />
                        <br />
                        <label>{{__('lang.d_confirm_pw')}}</label>
                        <div class="input-group" id="show_hide_password3">
                            <input class="form-control" type="password" name="account_password2"
                                id="dashpassword_change2">

                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <small id="dasherpassword2" class="text-danger"></small>
                        <br />
                        <br />
                        <input type="submit" name="edit" id="btn_change_password_dashboard_account" value="Cập nhật"
                            class="btn btn-success" />
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="close_modol_changge_password_dashboard" class="btn btn-default"
                    data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>

<div id="profile_account_Modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">{{__('lang.d_account_info')}}</h4>
            </div>
            <div class="modal-body">
                <form id="profile_account_form">
                    <input type="hidden" name="detect" value="account_manager">
                    <input type="hidden" name="type_manager" value="update_account">
                    <input type="hidden" name="id_user" value="{{ $data_admin->id }}">
                    <label>{{__('lang.d_fullname')}}</label>
                    <input type="text" name="full_name" id="eefullname" value="{{ $data_admin->account_fullname }}"
                        class="form-control" />
                    <small id="eerfullname" class="text-danger"></small>
                    <br />
                    @if(true)
                    {{-- <label>{{__('lang.d_code')}}</label> --}}
                    <input type="hidden" name="account_code" id="eeeaccount_code"
                        value="{{ $data_admin->account_code }}" readonly class="form-control" />
                    <br />
                    @else
                    <label>Email</label>
                    <input type="text" name="email" id="eeemail" value="{{ $data_admin->account_email }}"
                        class="form-control" />
                    <br />
                    @endif

                    <label>{{__('lang.phone')}}</label>
                    <input type="tel" id="eephone" name="phone_number" value="{{ $data_admin->account_phone }}"
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57' onkeyup="" maxlength="10"
                        class="form-control">
                    <small id="ersdt" class="text-danger"></small>
                    <br />
                    <br />

                    <input type="submit" name="edit" id="profile_account" value="Cập nhật" class="btn btn-success" />


                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="close_modol_profile" class="btn btn-default"
                    data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="alert_change_pass_dashboard" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="background-color: #87CEEB">
        <div class="modal-content">
        </div>
        <div class="modal-body" id="content_alert_das">

        </div>
        <div class="modal-footer">
            <button type="button" id="ok_alert_das" class="btn btn-secondary" data-dismiss="modal">OK</button>
        </div>
    </div>
</div>

<div class="modal" id="logout-dasboard" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="background-color: #87CEEB">
        <div class="modal-content">
        </div>
        <div class="modal-body" id="content_alert_das">
            <h3> {{__('lang.require_logout')}}</h3>
        </div>
        <div class="modal-footer">
            <form action="{{ URL::to('/page/logout') }}" method="get">
                <button type="submid" class="btn btn-secondary">Yes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            </form>


        </div>
    </div>
</div>

<div class="modal" id="force-sign-out-dasboard" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="background-color: #A9A9A9">
        <div class="modal-content">
        </div>
        <div class="modal-body">
            <img src="{{ asset('images/force_sign_out.png') }}" alt="" width="100%">
        </div>

        <button type="submid" class="btn btn-secondary" style="margin-left: 30%" data-toggle="modal"
            data-target="#force-manage">{{__('lang.d_out_admin')}}</button>
        <button type="button" class="btn btn-secondary" data-toggle="modal"
            data-target="#force-employ">{{__('lang.d_out_employee')}}</button>


    </div>
</div>
<div class="modal" id="force-manage" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="background-color: #87CEEB">
        <div class="modal-content">
        </div>
        <div class="modal-body" id="content_alert_das">
            <h3>{{__('lang.d_require_force_admin')}}</h3>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="force_sign('admin')">Yes</button>
            <button type="button" class="btn btn-secondary" id="close_force_manage" data-dismiss="modal">No</button>
        </div>
    </div>
</div>
<div class="modal" id="force-employ" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="background-color: #87CEEB">
        <div class="modal-content">
        </div>
        <div class="modal-body" id="content_alert_das">
            <h3>{{__('lang.d_require_force_employee')}}</h3>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="force_sign('employee')">Yes</button>
            <button type="button" class="btn btn-secondary" id="close_force_employ" data-dismiss="modal">No</button>
        </div>
    </div>
</div>