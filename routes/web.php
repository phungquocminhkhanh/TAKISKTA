<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('chat-subiz', function () {
    return view('customer.chat_subiz');
});

Route::get('/set-locale/{locale}', function ($locale) {
    if (!in_array($locale, ['en', 'vn'])) {
        abort(400);
    }
    App::setLocale($locale);
    session()->put('locale', $locale);
    return redirect()->back();
});

Route::get('rs-server-mk', function () {
    return view('customer.rs_server_mk');
});

Route::get('chat-subiz', function () {
    return view('customer.chat_subiz');
});
Route::get('chat-subiz-ios', function () {
    return view('customer.chat_subiz_ios');
});

Route::post('call_api', [\App\Http\Controllers\loginController::class, 'call_api'])->name('call_api');

Route::get('/', function () {
    return view('admin.page.login');
})->name('admin_login');
Route::get('/admin', function () {
    return view('admin.page.login');
})->name('admin_login');

Route::group(['prefix' => 'page'], function () {
    Route::post('login', [\App\Http\Controllers\loginController::class, 'login'])->name("admin_ajax_login");
    Route::get('logout', [\App\Http\Controllers\loginController::class, 'logout'])->name("admin_ajax_logout");;
});


Route::get('/dashboard', function () {
    return view('admin.page.dashboard');
})->name('admin_dashboard')->middleware('auth.roles2');;




Route::group(['prefix' => 'admin'], function () {

    Route::get('manage-account', function () {
        return view('admin.page.account');
    })->middleware('auth.roles2:module_account');


    Route::get('manage-permission-type', function () {
        return view('admin.page.account_permission_type');
    })->middleware('auth.roles2');


    Route::get('manage-introduce', function () {
        return view('admin.page.acount_introduce');
    })->middleware('auth.roles2:module_introduce');


    Route::get('manage-product', function () {
        return view('admin.page.admin_product');
    })->middleware('auth.roles2:module_product');

    Route::get('manage-customer', function () {
        return view('admin.page.admin_customer');
    })->middleware('auth.roles2:module_customer');

    Route::get('manage-deposit', function () {
        return view('admin.page.admin_request_deposit');
    })->middleware('auth.roles2:module_confirm_deposit');

    Route::get('manage-payment', function () {
        return view('admin.page.admin_request_payment');
    })->middleware('auth.roles2:module_request_payment');

    Route::get('manage-order', function () {
        return view('admin.page.admin_product_order');
    })->middleware('auth.roles2:module_product_order');

    Route::get('manage-period', function () {
        return view('admin.page.admin_period');
    })->middleware('auth.roles2:module_exchange');

    // Route::get('manage-admin-deal', function () {
    //     return view('admin.page.admin_exchange');
    // })->middleware('auth.roles2:module_exchange');

    // Route::get('manage-help-deposit', function () { // yêu cầu nạp tiền
    //     return view('admin.page.admin_request_deposit');
    // })->middleware('auth.roles2:module_account');

    // Route::get('manage-admin-request-deal', function () { // yêu cầu
    //     return view('admin.page.admin_request_payment');
    // })->middleware('auth.roles2:module_request_payment');


    // Route::get('manage-admin-customer', function () {
    //     return view('admin.page.admin_customer');
    // })->middleware('auth.roles2:module_customer');

    // Route::get('manage-admin-lixi', function () {
    //     return view('admin.page.admin_lixi');
    // })->middleware('auth.roles2:module_customer');



    // Route::get('manage-report-nap-rut', function () {
    //     return view('admin.page.admin_report_nap_rut');
    // })->middleware('auth.roles2:module_report');


    // Route::get('sale-report-nap-rut', function () {
    //     return view('admin.page.sale_report_nap_rut');
    // })->middleware('auth.roles2');
    // Route::get('sale-report-salary', function () {
    //     return view('admin.page.sale_report_salary');
    // })->middleware('auth.roles2');


    // Route::get('manage-report-list-customer-sale', function () {
    //     return view('admin.page.admin_report_sale_customer');
    // })->middleware('auth.roles2:module_report');

    // Route::get('manage-report-history-trade', function () {
    //     return view('admin.page.admin_report_history_trade');
    // })->middleware('auth.roles2:module_report');

    // Route::get('manage-report-salary-sale', function () {
    //     return view('admin.page.admin_report_salary_sale');
    // })->middleware('auth.roles2:module_report');

    // Route::get('manage-report-phi-dichvu', function () {
    //     return view('admin.page.admin_report_phi_dichvu');
    // })->middleware('auth.roles2:module_report');

    // Route::get('manage-report-loi-lo', function () {
    //     return view('admin.page.admin_report_loi_lo');
    // })->middleware('auth.roles2:module_report');

    // Route::get('manage-report-lixi', function () {
    //     return view('admin.page.admin_report_lixi');
    // })->middleware('auth.roles2:module_report');

    // Route::get('manage-report-cap0', function () {
    //     return view('admin.page.admin_report_cap_0');
    // })->middleware('auth.roles2:module_report');




    // Route::get('manage-help-deal', function () {
    //     return view('admin.page.help_deal');
    // })->middleware('auth.roles2');

    // Route::get('manage-help-chat', function () {
    //     return view('admin.page.help_chat');
    // })->middleware('auth.roles2');



    // //  Route::get('manage-notify',function () {
    // //     return view('admin.page.admin_notify');
    // // })->middleware('auth.roles2:module_notify');

    // // Route::get('manage-quangcao',function () {
    // //     return view('admin.page.admin_quangcao');
    // // })->middleware('auth.roles2:module_notify');

    // Route::get('manage-win-lose', function () {
    //     return view('admin.page.admin_win_lose');
    // })->middleware('auth.roles2:module_win_lose');




    // Route::get('manage-admin-authend', function () {
    //     return view('admin.page.admin_authen');
    // })->middleware('auth.roles2:module_authend_customer');


    // Route::get('manage-admin-thanhtoantructuyen', function () {
    //     return view('admin.page.admin_thanhtoantructuyen');
    // })->middleware('auth.roles2:module_payment_online');

    // Route::get('manage-admin-hoantientructuyen', function () {
    //     return view('admin.page.admin_hoantientructuyen');
    // })->middleware('auth.roles2:module_payment_online');

    // Route::get('manage-admin-item', function () {
    //     return view('admin.page.admin_item');
    // })->middleware('auth.roles2:module_item');

    // Route::get('manage-admin-tournaments', function () {
    //     return view('admin.page.admin_tournaments');
    // })->middleware('auth.roles2:module_tournaments');

    // Route::get('manage-admin-invest', function () {
    //     return view('admin.page.admin_invest');
    // })->middleware('auth.roles2:module_invest');


    // Route::get('manage-admin-thanhtoantructuyen', function () {
    //     return view('admin.page.admin_thanhtoantructuyen');
    // })->middleware('auth.roles2:module_payment_online');

    // Route::get('manage-admin-hoantientructuyen', function () {
    //     return view('admin.page.admin_hoantientructuyen');
    // })->middleware('auth.roles2:module_payment_online');
});

