<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function(){
    $status = [200, 400, 500];
    $message = ["Application is up", "Application is down"];
    return response(
        [
            "status" => $status[array_rand($status, 1)],
            "message" => $message[array_rand($message, 1)]
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
