@extends('layout.master_layout')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    @if (\Session::has('success'))
                        <div class="alert alert-success p-3 m-2" role="alert">
                            {!! \Session::get('success') !!}
                        </div>
                    @endif
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-stiped table-hovered" id="datatable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Sub Title</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Author</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($news as $key => $news_item)
                                        <tr>
                                            <td>{{ $key + 1 }}</td>
                                            <td>{{ $news_item->title }}</td>
                                            <td>{{ $news_item->sub_title }}</td>
                                            <td>{{ $news_item->category->name }}</td>
                                            <td>{{ $news_item->status }}</td>
                                            <td>{{ $news_item->author }}</td>
                                            <td>
                                                <a href='{{ route('delete-news', $news_item->id) }}'
                                                    class='btn btn-danger btn-sm'>delete</a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script type="module">
        $(document).ready(function() {
            $('#datatable').DataTable();
        })
    </script>
@endpush
