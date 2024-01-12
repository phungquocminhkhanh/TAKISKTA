@extends('admin.admin')

@section('title', 'Admin')

@section('theme-css')

@endsection

@section('content')
<div class="wrapper wrapper-content animated fadeInRight">

   <div class="row">
      <div class="col-sm-6">
         <div class="inqbox">
            <div class="inqbox-content">
               <span class="text-muted small pull-right"></span>
               <h2>{{__('lang.d_list_permission')}}</h2>
               <div class="clients-list">

                  <div class="tab-content">

                     <div id="tab-category" class="tab-pane active">
                        <div class="full-height-scroll">
                           <div class="table-responsive">
                              <table class="table table-striped table-hover">
                                 <tr>
                                    <td>{{__('lang.d_permission')}}</td>
                                    <td>{{__('lang.d_decription')}}</td>
                                 </tr>
                                 <tbody id="content-per">

                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>



      <div class="col-sm-6">
         <div class="inqbox">
            <div class="inqbox-content">
               <span class="text-muted small pull-right"></span>
               <h2>{{__('lang.d_list_type_account')}}</h2>
               <div class="clients-list">

                  <div class="tab-content">

                     <div id="tab-category" class="tab-pane active">
                        <div class="full-height-scroll">
                           <div class="table-responsive">
                              <table class="table table-striped table-hover">
                                 <tr>
                                    <td>{{__('lang.d_type_account')}}</td>
                                    <td>{{__('lang.d_decription')}}</td>
                                 </tr>
                                 <tbody id="content-type">

                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

   </div>
   @endsection

   @section('js')
   <script src="{{ asset('backend/js/main/admin_account_permission.js?v'.env('THEME_VERSION','1')) }}"></script>
   @endsection