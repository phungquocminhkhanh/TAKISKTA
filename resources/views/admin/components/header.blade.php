<div id="header">
    <nav class="navbar navbar-fixed-top white-bg show-menu-full" id="nav" role="navigation" style="margin-bottom: 0">
        <ul class="nav navbar-top-links navbar-right">

            <li class="dropdown pull-right" style="margin-right: 30px !important">

                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <span class="pl15"><img src="{{ asset('images/iconuser.png') }}" height="20px" width="30px" alt="">
                        Name
                    </span>
                    <span class="caret caret-tp"></span>
                </a>

                <ul class="dropdown-menu animated m-t-xs">
                    <li><a class="animated animated-short fadeInUp" data-toggle="modal"
                            data-target="#change_password_dashboard_account_Modal">{{__('lang.d_change_pw')}}</a></li>
                    <li class="divider"></li>
                    <li><a class="animated animated-short fadeInUp" data-toggle="modal"
                            data-target="#profile_account_Modal">{{__('lang.d_account_info')}}</a></li>
                    <li class="divider"></li>
                    <li><a href="#" class="animated animated-short fadeInUp" data-toggle="modal"
                            data-target="#logout-dasboard"><i class="fa fa-sign-out"></i>{{__('lang.d_logout')}}</a>
                    </li>

                </ul>
            </li>
            @if(isset($data_admin->admin_level) && $data_admin->admin_level == "2")
            <li class="dropdown pull-right">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <span class="pl15">{{session()->get('locale') ?? ""}}</span>
                    <span class="caret caret-tp"></span>
                </a>

                <ul class="dropdown-menu animated m-t-xs">
                    <li><a href="{{URL::to('set-locale/vn')}}">vn</a></li>
                    <li><a href="{{URL::to('set-locale/cn')}}">cn</a></li>
                </ul>

            </li>
            @endif

        </ul>
    </nav>
</div>