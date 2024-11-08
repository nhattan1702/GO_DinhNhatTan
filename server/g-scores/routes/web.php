<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScoreController;

Route::get('/', function () {
    return view('welcome');
});
Route::prefix('api')->group(function () {
    Route::post('/check-score', [ScoreController::class, 'checkScore']);
    Route::get('/report-score-levels', [ScoreController::class, 'reportScoreLevels']);
    Route::get('/score-statistics', [ScoreController::class, 'scoreStatisticsBySubject']);
    Route::get('/top-10-group-a', [ScoreController::class, 'top10GroupA']);
    Route::get('/top-10-group-b', [ScoreController::class, 'top10GroupB']);
    Route::get('/top-10-group-c', [ScoreController::class, 'top10GroupC']);
});
