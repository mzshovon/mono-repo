<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSurveyRequest;
use Google\Cloud\Speech\V1\RecognitionAudio;
use Google\Cloud\Speech\V1\RecognitionConfig;
use Google\Cloud\Speech\V1\RecognitionConfig\AudioEncoding;
use Google\Cloud\Speech\V1\SpeechClient;
use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function uploadAudio(StoreSurveyRequest $request)
    {
        // Store the uploaded file
        $audioFile = $request->file('audio');
        $audioPath = $audioFile->store('audio_files', 'public');

        // Convert audio to text
        $transcript = $this->convertAudioToText(storage_path('app/public/' . $audioPath));
        dd(trim($transcript));
        // Save to database
        $audioRecord =AudioModel();
        $audioRecord->file_path = $audioPath;
        $audioRecord->transcript = $transcript;
        $audioRecord->save();

        return response()->json([
            'message' => 'Audio uploaded and processed successfully',
            'transcript' => $transcript,
        ]);
    }

    private function convertAudioToText($audioPath)
    {
        // dd(file(config('services.google_cloud.key_file_path')));
        // Use Google Cloud Speech-to-Text API
        $speechClient = new SpeechClient([
            'credentials' => config('services.google_cloud.key_file_path'),
        ]);
        // dd(true);
        $audioContent = file_get_contents($audioPath);
        // dd($audioContent);

        $audio = (new RecognitionAudio())->setContent($audioContent);
        $config = (new RecognitionConfig())
            ->setEncoding(AudioEncoding::LINEAR16)
            // ->setSampleRateHertz(16000) // Adjust based on your recording
            ->setLanguageCode('en-US'); // Use 'bn-BN' for Bengali
        
        $response = $speechClient->recognize($config, $audio);
        $transcript = '';
        
        foreach ($response->getResults() as $result) {
            $transcript .= $result->getAlternatives()[0]->getTranscript() . " ";
        }
        
        $speechClient->close();
        // dd($transcript);
        return $transcript;
    }
}
