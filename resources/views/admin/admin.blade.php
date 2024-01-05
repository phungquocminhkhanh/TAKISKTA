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
        $urlapi_2 = "http://qtc.test/AB_TIKIL/api_tikil/api/"; //"https://api-link.tikiskta.com";//
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
    

    <script>
        const lang_detail = "{{__('lang.detail')}}";
        const lang_status = "{{__('lang.status')}}";
        const lang_fullname = "{{__('lang.fullname')}}";
        const lang_phone = "{{__('lang.phone')}}";
        const lang_code = "{{__('lang.code')}}";
        const lang_date = "{{__('lang.date')}}";
        const lang_limit_payment = "{{__('lang.limit_payment')}}";
        const lang_fee = "{{__('lang.fee')}}";
        const lang_payment = "{{__('lang.payment')}}";
        const lang_payment_methods = "{{__('lang.payment_methods')}}";
        const lang_bank_name = "{{__('lang.bank_name')}}";
        const lang_tenchuthe = "{{__('lang.tenchuthe')}}";
        const lang_sotaikhoan = "{{__('lang.sotaikhoan')}}";

        const lang_dagiaodich = "{{__('lang.dagiaodich')}}";
        const lang_reason = "{{__('lang.reason')}}";
        const lang_refuse = "{{__('lang.refuse')}}";
        const lang_wait = "{{__('lang.wait')}}";
        const lang_hoantat = "{{__('lang.hoantat')}}";
        const lang_ban_co_muon_huy_lenh = "{{__('lang.ban_co_muon_huy_lenh')}}";
        const lang_cancel = "{{__('lang.cancel')}}";
        const lang_kiem_tra_thong_tin_truoc_khi_xac_nhan = "{{__('lang.kiem_tra_thong_tin_truoc_khi_xac_nhan')}}"

        const lang_so_tien_nap = "{{__('lang.so_tien_nap')}}";
        const lang_so_tien_khuyen_mai = "{{__('lang.so_tien_khuyen_mai')}}";
        const lang_chu_thich = "{{__('lang.chu_thich')}}";
        const lang_thuong = "{{__('lang.thuong')}}";

        const lang_tao_lenh_nap_tien = "{{__('lang.tao_lenh_nap_tien')}}";
        const lang_vi_tai_khoan = "{{__('lang.vi_tai_khoan')}}";
        const lang_ban_chua_chon_khach_hang = "{{__('lang.ban_chua_chon_khach_hang')}}";
        const lang_create = "{{__('lang.create')}}";
        const lang_select = "{{__('lang.select')}}";
        const lang_edit = "{{__('lang.edit')}}";
        const lang_huy_don_hang = "{{__('lang.huy_don_hang')}}";
        const lang_setting = "{{__('lang.setting')}}";
        const lang_update = "{{__('lang.update')}}";
        const lang_quyen = "{{__('lang.quyen')}}";
        const lang_ban_co_chac_muon_vo_hieu_hoa = "{{__('lang.lang_ban_co_chac_muon_vo_hieu_hoa')}}";
        const lang_ban_co_chac_muon_mo = "{{__('lang.lang_ban_co_chac_muon_mo')}}";
        const lang_ban_co_chac_muon_xoa = "{{__('lang.lang_ban_co_chac_muon_xoa')}}";
        const lang_phan_quyen_quan_ly = "{{__('lang.lang_phan_quyen_quan_ly')}}";
        const lang_dat_lai_mat_khau = "{{__('lang.dat_lai_mat_khau')}}";
        const lang_xoa_tai_khoan = "{{__('lang.xoa_tai_khoan')}}";
        const lang_view = "{{__('lang.view')}}";
        const lang_vo_hieu_hoa = "{{__('lang.vo_hieu_hoa')}}";
        const lang_mo_tai_khoan = "{{__('lang.mo_tai_khoan')}}";
        const lang_mat_khau_phai_co_it_nhat_6_ky_tu = "{{__('lang.mat_khau_phai_co_it_nhat_6_ky_tu')}}";
        const lang_mat_khau_nhap_lai_khong_dung = "{{__('lang.mat_khau_nhap_lai_khong_dung')}}";
        const lang_mat_khau_khong_co_dau_cach = "{{__('lang.mat_khau_khong_co_dau_cach')}}";
        const lang_phan_quyen_thanh_cong = "{{__('lang.phan_quyen_thanh_cong')}}";
        const lang_chon_nhan_vien = "{{__('lang.chon_nhan_vien')}}";
        const lang_cai_dat_mua = "{{__('lang.cai_dat_mua')}}";
        const lang_khoa_tai_khoan = "{{__('lang.khoa_tai_khoan')}}";
        const lang_xem_vi = "{{__('lang.xem_vi')}}";
        const lang_so_tien_thu_hoi_phai_nho_hon_hoac_bang = "{{__('lang.so_tien_thu_hoi_phai_nho_hon_hoac_bang')}}";
        const lang_open = "{{__('lang.open')}}";
        const lang_close = "{{__('lang.close')}}";
        const lang_tao_lenh = "{{__('lang.tao_lenh')}}";
        
    </script>
    <script src="{{ asset('backend/js/main/admin_local.js')}}"></script>
    <script src="{{ asset('backend/js/main/admin_dashboard.js')}}"></script>

    @yield('js')
</body>

</html>