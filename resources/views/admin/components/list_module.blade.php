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
                                        class="nav-label">Trang chủ</span></a>
                            </li>
                            @if($data_admin->type_account=='admin')
                            @foreach ($data_admin->role_permission as $k=>$v)
                            @if($v->permission=="module_exchange")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý khu vực</span></a>
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-exchange') }}">Danh sách khu vực</a>
                                    </li>
                                    <li><a href="{{ URL::to('admin/manage-period') }}">Danh sách thời gian</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_account")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span class="nav-label">Quản lý Tài
                                        Khoản</span></a>
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-account') }}">Danh sách Tài khoản</a>
                                    </li>

                                    <li><a href="{{ URL::to('admin/manage-permission-type') }}">Quyền hạn và
                                            loại tài khoản</a></li>

                                </ul>
                            </li>
                            @endif

                            @if($v->permission=="module_introduce")
                            <li class="nav-parent">

                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px"
                                        height="25px">&nbsp;&nbsp;<span class="nav-label">Quản lý mã mời</span></a>

                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-introduce') }}">Danh sách mã mời</a>
                                    </li>
                                </ul>
                            </li>
                            @endif

                            @if($v->permission=="module_product")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý sản phẩm</span></a>
                            
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-product') }}">Danh sách sản phẩm</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_customer")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý khách hàng</span></a>
                            
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-customer') }}">Danh sách khách hàng</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_confirm_deposit")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý nạp tiền</span></a>
                            
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-deposit') }}">Danh sách nạp tiền</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_request_payment")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý rút tiền</span></a>
                            
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-payment') }}">Danh sách rút tiền</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_product_order")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý đơn hàng</span></a>
                            
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-order') }}">Danh sách đơn hàng</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            @if($v->permission=="module_popup")
                            <li class="nav-parent">
                            
                                <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                        class="nav-label">Quản lý popup</span></a>
                            
                                <ul class="children nav">
                                    <li><a href="{{ URL::to('admin/manage-popup') }}">Danh sách popup</a>
                                    </li>
                                </ul>
                            </li>
                            @endif
                            
                            @endforeach
                            @elseif($data_admin->type_account=='sales')
                                <li class="nav-parent">
                                
                                    <a href="#"><img src="{{asset('/images/icon_account.svg')}}" width="25px" height="25px">&nbsp;&nbsp;<span
                                            class="nav-label">Quản lý khách hàng</span></a>
                                
                                    <ul class="children nav">
                                        <li><a href="{{ URL::to('admin/manage-customer') }}">Danh sách khách hàng</a>
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