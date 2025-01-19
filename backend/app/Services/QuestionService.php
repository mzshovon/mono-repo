<?php

namespace App\Services;

use App\Contracts\Frontend\QuestionServiceInterface;

class QuestionService implements QuestionServiceInterface
{
    public function all()
    {
        try {
            $data = [];
            // Set dummy for setting frontend
            $data['nps'] = config('question.nps');
            $data['theme'] = config('question.theme');
            $data['questions'] = config('question.questions');
            return $data;
            
        } catch (\Exception $ex) {
            throw new \Exception("No Question found!");
        }

    }

    public function find($id)
    {
        // code here....
    }

    public function create(array $data)
    {
        // code here....
    }

    public function update($id, array $data)
    {
        // code here....
    }

    public function delete($id)
    {
        // code here....
    }
}
