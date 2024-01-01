<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;
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

            if (isset($data_admin) && $data_admin != "") {
                return $next($request);
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
