<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="{{ route('home') }}">{{ $title }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="{{ route('home') }}">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('add-news') }}">Add without ajax</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('add-news-no-ajax') }}">Add with ajax</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('scanner') }}">Default Scan qr code </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('custom-scanner') }}">Custom Scan qr code </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
