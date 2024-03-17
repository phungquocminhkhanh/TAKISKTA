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
    if (!in_array($locale, ['cn', 'vn'])) {
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

Route::get('/TIKISKTA-@dmin', function () {
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

    
    Route::get('manage-exchange', function () {
        return view('admin.page.admin_exchange');
    })->middleware('auth.roles2:module_exchange');
    Route::get('manage-period', function () {
        return view('admin.page.admin_period');
    })->middleware('auth.roles2:module_exchange');

    Route::get('manage-popup', function () {
        return view('admin.page.admin_popup');
    })->middleware('auth.roles2:module_popup');

    Route::get('manage-report-deposit-payment', function () {
        return view('admin.page.admin_report_nap_rut');
    })->middleware('auth.roles2:module_account');


    // Route::get('manage-chat', function () {
    //     return view('admin.page.admin_chat');
    // })->middleware('auth.roles2:module_account');
   
});

