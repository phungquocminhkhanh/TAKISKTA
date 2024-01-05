<nav class="navbar-default navbar-static-side fixed-menu" role="navigation">
    <div class="sidebar-collapse">
        <div id="hover-menu">

        </div>
        <ul class="nav metismenu" id="side-menu">
            <li>
                <div class="logopanel" style="margin-left: 0px; z-index: 99999">
                    <div class="profile-element">
                        <h3><a href="{{ route('admin_dashboard') }}">
                                {{env('WED_NAME')}}
                            </a>
                        </h3>
                    </div>
                    <div class="logo-element">

                    </div>
                </div>
            </li>
            <li>
                <!-- START : Left sidebar -->
                <div class="nano left-sidebar">
                    <div class="nano-content">
                        <ul class="nav nav-pills nav-stacked nav-inq" id="list_manage">
                            <li class="active">
                                <a href="{{ route('admin_dashboard') }}"><i class="fa fa-home"></i> <span
                                        class="nav-label">{{__('lang.d_home')}}</span></a>
                            </li>
                            @if($data_admin->type_account=='admin')
                            @foreach ($data_admin->role_permission as $k=>$v)
                            @if($v->permission=="module_exchange")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span class="nav-label">{{__('lang.quan_ly_khu_vuc')}}</span></a>
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-exchange') }}">{{__('lang.d_list_area')}}</a>
                                    </li>
                                    <li><a href="{{ URL::to('admin/manage-period') }}">{{__('lang.d_list_time')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_account")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_account_manage')}}</span></a>
                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-account') }}">{{__('lang.d_list_account')}}</a>
                                    </li>

                                    <li><a
                                            href="{{ URL::to('admin/manage-permission-type') }}">{{__('lang.d_permission_type_account')}}</a>
                                    </li>

                                </ul>
                            </li>
                            @endif

                            @if($v->permission=="module_introduce")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_code_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-introduce') }}">{{__('lang.d_list_code')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif

                            @if($v->permission=="module_product")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span class="nav-label">{{__('lang.quan_ly_san_pham')}}</span></a>

                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-product') }}">{{__('lang.d_list_product')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_customer")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_customer_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-customer') }}">{{__('lang.d_list_customer')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_confirm_deposit")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_deposit_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-deposit') }}">{{__('lang.d_list_deposit')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_request_payment")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_payment_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-payment') }}">{{__('lang.d_list_payment')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_product_order")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_order_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-order') }}">{{__('lang.d_list_order')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_popup")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_popup_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-popup') }}">{{__('lang.d_list_popup')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif


                            @endforeach

                            @if(isset($data_admin->admin_level) && $data_admin->admin_level == "2")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.report_statistics')}}</span></a>

                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-report-deposit-payment') }}">{{__('lang.report_statistics')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif


                            @elseif($data_admin->type_account=='sales')
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_code_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-introduce') }}">{{__('lang.d_list_code')}}</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">{{__('lang.d_customer_manage')}}</span></a>

                                <ul class="children nav">
                                    <li><a
                                            href="{{ URL::to('admin/manage-customer') }}">{{__('lang.d_list_customer')}}</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                        </ul>
                    </div>
                </div>

            </li>
        </ul>
    </div>
</nav>