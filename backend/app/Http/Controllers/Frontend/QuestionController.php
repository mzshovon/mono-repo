<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\QuestionService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class QuestionController extends Controller
{
    use ApiResponseTrait;

    public QuestionService $serviceRepo;

    public function __construct(
        QuestionService $questionService
    )
    {
        $this->serviceRepo = $questionService;
    }

    /**
     * @param Request $request
     * @param string $token
     * 
     * @return JsonResponse
     */
    public function questions(Request $request, string $token) : JsonResponse
    {
        try {
            $attemptId = $request->attemptId ?? null;
            $channel = $request->channel ?? null;
            $flag = $request->flag ?? null;
            $data = $this->serviceRepo->all();
            return $this->success($data, !empty($data) ? Response::HTTP_OK : Response::HTTP_GONE);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), null, 500);
        }
    }
}
