<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Exception;
use App\local;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class loginController extends Controller
{
    public $urlapi;
    public $xtk;
    public  function  __construct() {
        $this->urlapi = env('API_LOCAL');
        $this->xtk = env('XTK');
    }
    public function login(Request $request)
    {

        $local = new local;
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $this->xtk
        ])->post($this->urlapi, [
            'detect' => 'login',
            'username' => $request->account_username,
            'password' => $request->account_password,
            'type' => "admin"

        ]);
        $a = $response->getBody();

        $b = json_decode($a);
        if ($b == null) {
            return Redirect(route('admin_login'));
        }
        if ($b->success == "true") {
            if ($b->data[0]->type_account != "customer") {

                Session::put("mess", "");
                Session::put("data_admin", $b->data[0]);
                return Redirect("/dashboard");
            } else {
                Session::put("mess", "Username hoặc password không đúng");
                return Redirect(route('admin_login'));
            }
        } else {
            Session::put("mess", "Username hoặc password không đúng");
            return Redirect(route('admin_login'));
        }
    }
    public function call_api(Request $request)
    {
        $local = new local;
        $detect = $request->all();
        $detect = array_filter($detect, function ($value) {
            return $value !== null;
        });
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $this->xtk
        ])->post($this->urlapi, $detect);
        $a = $response->getBody();

        $b = json_decode($a);
        return response()->json($b);
    }
    public function check_otp_rs_server(Request $request)
    {
        $local = new local;
        $otp = $request->otp;
        $success = "false";
        if ($otp == "Password#1998") {
            $success = "true";
            $detect = [
                'detect' => 'fix_code',
                'type_manager' => "update_time_exchange",
            ];
            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . $this->xtk
            ])->post($this->urlapi, $detect);

            $a = $response->getBody();
            $b = json_decode($a);
        }
        $a = [
            "success" => $success
        ];
        return response()->json($a);
    }

    public function logout()
    {
        Session::put("data_admin", '');
        return Redirect(route('admin_login'));
    }
    public function chat_tawk()
    {
        return view('customer.chat_tawk');
    }


    public function cus_login(Request $request)
    {
        // $response = Http::post('http://192.168.100.21/kse_trade/api/', [
        //     'detect' => 'login',
        //     'username' => $request->account_username,
        //     'password' => $request->account_password
        // ]);
        $local = new local;
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $this->xtk
        ])->post($this->urlapi, [
            'detect' => 'login',
            'username' => $request->account_username,
            'password' => $request->account_password,
            'currency' => 'usd'
        ]);
        $a = $response->getBody();
        $b = json_decode($a);
        if ($b == null) {
            return Redirect("/");
        }
        if ($b->success == "true") {

            if ($b->data[0]->type_account == "customer") {
                if ($b->data[0]->customer_authend == "N") {
                    Session::put("block", "xxxxxxx");
                    Session::put("mess_block", "Tài khoản của bạn chưa được xác thực, vui lòng liên hệ CSKH để được hổ trợ");
                    return Redirect("/");
                } else {

                    Session::put("data_customer", $b->data[0]);
                    // $aMobileUA = array(
                    //     '/iphone/i' => 'iPhone', 
                    //     '/ipod/i' => 'iPod', 
                    //     '/ipad/i' => 'iPad', 
                    //     '/android/i' => 'Android', 
                    //     '/blackberry/i' => 'BlackBerry', 
                    //     '/webos/i' => 'Mobile'
                    // );

                    // if($_SERVER['HTTP_USER_AGENT']==null || $_SERVER['HTTP_USER_AGENT']=="")
                    // {
                    //     return header("HTTP/1.0 404 Not Found");
                    // }

                    // //Return true if Mobile User Agent is detected
                    // foreach($aMobileUA as $sMobileKey => $sMobileOS){
                    //     if(preg_match($sMobileKey, $_SERVER['HTTP_USER_AGENT'])){
                    //         return Redirect("/customer/chart-ios");
                    //     }
                    // }
                    Session::put("block", "");
                    Session::put("mess", "");
                    Session::put("mess_block", "");

                    return Redirect(route('customer.chart'));
                    //return Redirect(route('customer.chart'));


                }
            } else {
                Session::put("block", " ");
                Session::put("mess_block", " ");
                Session::put("mess", "Username hoặc password không đúng");
                return Redirect("/");
            }
        } else {

            if ($b->message == "Tài khoản đã bị khóa") {
                Session::put("block", "xxxxxxx");
                Session::put("mess_block", "Tài khoản đã bị khóa");
            } else {
                Session::put("mess", "Username hoặc password không đúng");
            }


            return Redirect("/");
        }
    }

    public function cus_logout(Request $request)
    {

        Session::put("data_customer", '');
        return Redirect("/");
    }


    public function demo_login(Request $request)
    {

        $name = isset($request->name) ? $request->name : "";

        $local = new local;
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $this->xtk
        ])->post($this->urlapi, [
            'detect' => 'register',
            'customer_name' => $name,
            'type_customer' => "trainghiem",
            'currency' => 'usd'
        ]);
        $a = $response->getBody();

        $b = json_decode($a);
        if ($b == null) {
            return Redirect("/");
        }
        Session::put("block", "");
        if ($b->success == "true") {
            Session::put("data_customer", $b->data[0]);
            return Redirect("/customer/chart");
        } else {
            return Redirect("/");
        }
    }

    public function chart_mobile(Request $request)
    {
        return view('customer.chart_mobile')->with("data", $request->all());
    }

    public function chart_mobile_finhay(Request $request)
    {
        return view('customer.chart_mobile_finhay')->with("data", $request->all());
    }
}
