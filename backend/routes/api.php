<?php

use App\Http\Controllers\Frontend\AudioController;
use App\Http\Controllers\Frontend\QuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function(){
    $status = [200];
    $message = ["Application is up", "Application is down"];
    sleep(1);
    return response(
        [
            "status" => $status[array_rand($status, 1)],
            "message" => $message[array_rand($message, 1)]
        ]
    );
});
Route::get('questions/{token}', [QuestionController::class, 'questions']);
Route::post('upload-audio', [AudioController::class, 'uploadAudio']);

