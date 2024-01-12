<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{env('WED_NAME')}}</title>
    <link href="{{ asset('backend/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('backend/fonts/font-awesome/css/font-awesome.css')}}" rel="stylesheet">
    <!-- Toastr style -->
    <link href="{{ asset('backend/css/plugins/toastr/toastr.min.css')}}" rel="stylesheet">
    <!-- Gritter -->
    <link href="{{ asset('backend/js/plugins/gritter/jquery.gritter.css')}}" rel="stylesheet">
    <!-- morris -->
    <link href="{{ asset('backend/css/plugins/morris/morris-0.4.3.min.css')}}" rel="stylesheet">
    <link href="{{ asset('backend/css/animate.css')}}" rel="stylesheet">
    <link href="{{ asset('backend/css/style.css')}}" rel="stylesheet">
    <link href="{{ asset('backend/css/forms/kforms.css')}}" rel="stylesheet">

</head>

<body>
    <div class="loginColumns animated fadeInDown">
        <div class="row">
            <div class="col-md-6">

                <p>

                    <img src="{{ asset('images/logo_1.png') }}" width="210px" height="210px" alt="">
                </p>
                <p>

                </p>


            </div>
            <div class="col-md-6">
                <div class="inqbox-content">
                    <form class="m-t" role="form" method="POST" action="{{route('admin_ajax_login')}}">
                        {{ csrf_field() }}

                        <div class="form-group">
                            <input type="text" name="account_username" class="form-control" placeholder="Tên đăng nhập"
                                required="">

                        </div>
                        <div class="form-group">
                            <input type="password" name="account_password" class="form-control" placeholder="Mật khẩu"
                                required="">
                            <small class="text-danger">
                                <?php $me=Session::get('mess') ;echo $me ?>
                            </small>
                        </div>

                        <button type="submit" class="btn btn-primary block full-width m-b">Đăng nhập</button>
                        <a class="animated animated-short fadeInUp" data-toggle="modal"
                            data-target="#rehibilitate_password">{{-- khoi phuc pass --}}
                            {{-- Quên mật khẩu? --}}
                        </a>


                    </form>
                    <p class="m-t">
                        <small></small>
                    </p>
                </div>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-6">

            </div>
            <div class="col-md-6 text-right">
                <small></small>
            </div>
        </div>
    </div>

</body>
<script src="{{ asset('backend/js/jquery-2.1.1.js')}}"></script>
<script src="{{ asset('backend/js/bootstrap.min.js')}}"></script>
<script src="{{ asset('backend/js/plugins/metisMenu/jquery.metisMenu.js')}}"></script>
<script src="{{ asset('backend/js/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>
<!-- Morris -->

<script src="{{ asset('backend/js/plugins/morris/morris.js')}}"></script>
<!-- Chartist -->

<!-- Custom and plugin javascript -->
<script src="{{ asset('backend/js/main.js')}}"></script>
<script src="{{ asset('backend/js/plugins/pace/pace.min.js')}}"></script>
<!-- Jvectormap -->
<script src="{{ asset('backend/js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js')}}"></script>
<script src="{{ asset('backend/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js')}}"></script>
<!-- Sparkline -->
<script src="{{ asset('backend/js/plugins/sparkline/jquery.sparkline.min.js')}}"></script>
<!-- Sparkline demo data  -->
<script src="{{ asset('backend/js/socket.js?') }}"></script>
<script src="{{ asset('backend/js/demo/sparkline-demo.js')}}"></script>
<script src="{{ asset('backend/js/plugins/chartJs/Chart.min.js')}}"></script>
<script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
<script src="{{ asset('backend/js/main/admin_login.js?v'.env('THEME_VERSION','1')) }}"></script>

</html>