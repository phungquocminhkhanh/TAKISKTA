@extends('admin.admin')

@section('title', 'Admin')

@section('theme-css')
<link href="{{ asset('backend/css/custom_chat.css?v'.env('THEME_VERSION','1')) }}" rel="stylesheet">
@endsection

@section('content')

<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="inqbox">
                <div class="inqbox-content">

                   <div class="wrapper-chat">
                    <div class="container-chat">
                        <div class="left">
                            <div class="top">
                                <input type="text" placeholder="Search" />
                                <a href="javascript:;" class="search"></a>
                            </div>
                            <ul class="people">
                                <li class="person active" data-chat="person1">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
                                    <span class="name">Thomas Bangalter</span>
                                    <span class="time">2:09 PM</span>
                                    <span class="preview">I was wondering...</span>
                                </li>
                                <li class="person" data-chat="person2">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png" alt="" />
                                    <span class="name">Dog Woofson</span>
                                    <span class="time">1:44 PM</span>
                                    <span class="preview">I've forgotten how it felt before</span>
                                </li>
                               
                               
                            </ul>
                        </div>
                        <div class="right">
                            <div class="top"><span>To: <span class="name">Dog Woofson</span></span></div>
                           
                           
                            <div class="chat" data-chat="person3">
                                <div class="conversation-start">
                                    <span>Today, 3:38 AM</span>
                                </div>
                                <div class="bubble you">
                                    Hey human!
                                </div>
                                <div class="bubble you">
                                    Umm... Someone took a shit in the hallway.
                                </div>
                                <div class="bubble me">
                                    ... what.
                                </div>
                                <div class="bubble me">
                                    Are you serious?
                                </div>
                                <div class="bubble you">
                                    I mean...
                                </div>
                                <div class="bubble you">
                                    It’s not that bad...
                                </div>
                                <div class="bubble you">
                                    But we’re probably gonna need a new carpet.
                                </div>
                            </div>
                           
                            <div class="write">
                                <label class="icon-img-chat" for="img_chat">
                                    <img src="{{asset('images/iconimg.png')}}" alt="Icon" class="icon" width="20px" height="20px">
                                </label>
                                <input type="file" id="img_chat" style="display: none;">

                                <textarea class="chat-input" rows="1" placeholder=""></textarea>
                               
                                <a href="javascript:;" class="write-link send"></a>
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
<script src="{{ asset('backend/js/main/admin_popup.js?v'.env('THEME_VERSION','1')) }}"></script>
@endsection