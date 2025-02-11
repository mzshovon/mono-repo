<?php

namespace App\Traits;

use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

trait FormValidationResponse
{
    /**
     * Return a validation error JSON response.
     *
     * @param array|string $validators
     * @param string|null $response
     * @return JsonResponse
     */
    public function failedValidation(
        \Illuminate\Contracts\Validation\Validator $validator
    ) // Built in form validation override
    {
        $response = new Response(
            ['status'=>'Error','message' => $validator->errors()
        ], 422);
        throw new ValidationException($validator, $response);
    }
}
