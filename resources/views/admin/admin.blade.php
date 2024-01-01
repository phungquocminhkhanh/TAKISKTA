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
    <link href="{{ asset('backend/css/custom.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap-grid.min.css"
        integrity="sha512-Aa+z1qgIG+Hv4H2W3EMl3btnnwTQRA47ZiSecYSkWavHUkBF2aPOIIvlvjLCsjapW1IfsGrEO3FU693ReouVTA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <?php 
        $data_admin = Session::get('data_admin');
        $urlapi = env('API_WEB') ?? route('call_api');
        $urlserver = env('API_IMG');
        $urlapi_2 = env('API_WEB') ?? route('call_api'); //"https://api-link.tikiskta.com";//env('API_WEB') ?? route('call_api');
        $xtk = env('XTK');
        $socket = env('SOCKET');
        
    ?>
    <input type="hidden" id="id_account" value="{{ $data_admin->id }}">
    <input type="hidden" id="type_admin" value="{{$data_admin->id_type}}">
    <div id="wrapper">
        @include('admin.components.list_module')
        <div id="page-wrapper" class="gray-bg">
            @include('admin.components.header')
            <div style="clear: both; height: 61px;"></div>
            @yield('content')
        </div>
        @include('admin.components.modal')

    </div>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <script>
        //const urlapi = "{{route('call_api')}}"; //API chính
        const urlapi = "{{$urlapi}}"; //API chính
        const urlserver = "{{$urlserver}}";
        const urlsocket = "{{$socket}}";
        const urlapi_2 = "{{$urlapi_2}}";
        const xtk="{{$xtk}}";
    </script>
    <script src="{{ asset('backend/js/jquery-3.5.1.js') }}"></script>
    <script src="{{ asset('backend/js/laravel_echo.js') }}"></script>
    <script src="{{ asset('backend/js/jquery-2.1.1.js')}}"></script>
    <script src="{{ asset('backend/js/bootstrap.min.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/metisMenu/jquery.metisMenu.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/morris/morris.js')}}"></script>
    <script src="{{ asset('backend/js/main.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/pace/pace.min.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js')}}"></script>
    <script src="{{ asset('backend/js/plugins/sparkline/jquery.sparkline.min.js')}}"></script>
    <script src="{{ asset('backend/js/demo/sparkline-demo.js')}}"></script>
    <script src="{{ asset('backend/js/socket.js') }}"></script>
    <script src="{{ asset('backend/js/moment.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js')}}"></script>
    
    
    <script src="{{ asset('backend/js/main/admin_dashboard.js')}}"></script>
    @yield('js')
</body>

</html>