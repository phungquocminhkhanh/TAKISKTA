<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Http;
session_start();
class AcessPermission2
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {

       
        if (!empty($roles)) {
            $data_admin = Session::get('data_admin');

            if (isset($data_admin) && $data_admin != "") 
            {
               
                if($request->path() == "admin/manage-report-deposit-payment")
                {
                    
                    if(isset($data_admin->admin_level) && $data_admin->admin_level == "2") {
                        return $next($request);
                    }
                    else
                    {
                        return redirect(route('admin_dashboard'));
                    }
                }
                
                if ($data_admin->id_type == "1") {
                    $response = Http::withHeaders([
                        'Authorization' => 'Basic ' . env('XTK')
                    ])->post(env('API_LOCAL'), [
                        'detect' => 'account_type_manager',
                        'type_manager' => "check_role",
                        'id_user' => $data_admin->id
                    ]);
                    $a = $response->getBody();

                    $b = json_decode($a);

                    foreach ($b->data[0]->role_permission as $k => $v) {
                        if ($v->permission == $roles[0]) {
                            return $next($request);
                        }
                    }
                    return redirect(route('admin_login'));
                } else {
                    $path_role_sale = [
                        "admin/manage-introduce",
                        "admin/manage-customer"
                    ];
                    if(in_array($request->path(), $path_role_sale))
                    {
                        return $next($request);
                    }   
                    else
                    {
                        return redirect(route('admin_dashboard'));
                    }
                    
                }
            } else {
                return redirect(route('admin_login'));
            }
        } else {
            $cus = Session::get('data_admin');

            if (isset($cus) && !empty($cus)) {
                return $next($request);
            } else {
                return redirect(route('admin_login'));
            }
        }
    }
}
