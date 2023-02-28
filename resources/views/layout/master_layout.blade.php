<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="manifest" href="{{ asset('webmanifest.json') }}" />

    <link rel="apple-touch-icon" href="{{ asset('images/icons/icon-96x96.png') }}" />
    <meta name="apple-mobile-web-app-status-bar" content="#FFE1C4" />
    <meta name="theme-color" content="#FFE1C4" />

    <title>Document</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @stack('css')
</head>

<body>
    @php
        $title = 'makanm malam';
    @endphp
    <x-navbar :title="config('app.name')" />
    <div class="container-fluid mt-2">
        @yield('content')
    </div>
</body>

@stack('js')

</html>
