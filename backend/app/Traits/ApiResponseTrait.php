<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/*
|--------------------------------------------------------------------------
| Api Responser Trait
|--------------------------------------------------------------------------
|
| This trait will be used for any response we sent to clients.
|
*/

trait ApiResponseTrait
{
    /**
     * Return a success JSON response.
     *
     * @param array|string $data
     * @param int $code
     * @param array $other
     * @return JsonResponse
     */
    protected function success(
        $data, 
        int $code = Response::HTTP_OK, 
        array $other = []
    ): JsonResponse
    {
        return response()->json([
            'status' => 'Success',
            'statusCode' => $code,
        ] + $other + ['data' => $data ?? []]
        , $code);
    }

    /**
     * Return an error JSON response.
     *
     * @param string|null $message
     * @param string|array|null $trace
     * @param int $code
     * @param array|null $data
     * @return JsonResponse
     */
    protected function error(
        string $message = null, 
        string | array $trace = null, 
        int $code = Response::HTTP_INTERNAL_SERVER_ERROR, 
        ?array $data = []
    ) : JsonResponse
    {
        return response()->json([
            'status' => 'Error',
            'statusCode' => $code,
            'message' => $message,
            'data' => $data,
        ] + (in_array(strtolower(config('app.env')), ['test', 'local']) ?
                ['trace' => $trace] : []
            ), $code);
    }

    /**
     * Return an error JSON response.
     *
     * @param string $message
     * @param int $code
     * @param array|null $data
     * @return JsonResponse
     */
    protected function customError(
        string $message, 
        int $code = Response::HTTP_FORBIDDEN, 
        ?array $data = []
    ): JsonResponse
    {
        return response()->json([
                'status' => 'Error',
                'message' => $message,
                'data' => $data
            ], $code);
    }
}
