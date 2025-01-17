<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function(){
    return response(
        [
            "status" => Response::HTTP_OK,
            "message" => "Application is up"
        ]
    );
});
Route::get('start-container', function(){
    return response(
        [
            "status" => Response::HTTP_OK,
            "message" => "Container is started"
        ]
    );
});
