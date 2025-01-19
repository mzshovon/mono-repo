<?php

return [
    'nps' => [
        "question_en" => "How likely are you to recommend MyBL App to a friends or family member?",
        "question_bn" => " আপনি MyBL অ্যাপ ব্যবহার করতে আপনার বন্ধু বা পরিবারের সদস্যকে কতটুকু উৎসাহিত করবেন?",
        "selection_type"=> "rating_0_10_number",
        "options" => '[{"id":"1","value":"0","title_bn":"0","title_en":"0"},
                        {"id":"2","value":"1","title_bn":"\u09e7","title_en":"1"},
                        {"id":"3","value":"2","title_bn":"\u09e8","title_en":"2"},
                        {"id":"4","value":"3","title_bn":"\u09e9","title_en":"3"},
                        {"id":"5","value":"4","title_bn":"\u09ea","title_en":"4"},
                        {"id":"6","value":"5","title_bn":"\u09eb","title_en":"5"},
                        {"id":"7","value":"6","title_bn":"\u09ec","title_en":"6"},
                        {"id":"8","value":"7","title_bn":"\u09ed","title_en":"7"},
                        {"id":"9","value":"8","title_bn":"\u09ee","title_en":"8"},
                        {"id":"10","value":"9","title_bn":"\u09ef","title_en":"9"},
                        {"id":"11","value":"10","title_bn":"\u09e7\u09e6","title_en":"10"}
                    ]',
        "range"=> "0-0",
        "status"=> 1,
        "children"=> [],
        "nps_rating_mapping"=> [
            "en"=> [
                "low"=> "Not at all likely",
                "high"=> "Extremely likely"
            ],
            "bn"=> [
                "low"=> "মোটেই না",
                "high"=> "অবশ্যই"
                ]
            ]
    ],
    'questions' => [
        "question_en" => "How likely are you to recommend MyBL App to a friends or family member?",
        "question_bn" => " আপনি MyBL অ্যাপ ব্যবহার করতে আপনার বন্ধু বা পরিবারের সদস্যকে কতটুকু উৎসাহিত করবেন?",
        "selection_type"=> "rating_0_1_no-yes",
        "options" => '[{"id":"1","value":"0","title_bn":"\u09a8\u09be","title_en":"No"},
                        {"id":"2","value":"1","title_bn":"\u09b9\u09cd\u09af\u09be\u0981","title_en":"Yes"}]',
        "range"=> "0-0",
        "status"=> 1,
        "children"=> [],
    ],
    'theme' => [
        'error' => [
            "403" => [
                "header" => [
                    "text_en" => "Sorry!",
                    "text_bn" => "দুঃখিত!",
                    "text_color" => "#f16522",
                    "bg_color" => "#f16522"
                ],
                "content" => [
                    "text_en" => "Feedback submission failed.",
                    "text_bn" => "মতামত প্রদান সফল হয়নি।",
                    "text_color" => "#000",
                ],
                "submit_button" => [
                    "text_en" => "Close",
                    "text_bn" => "বন্ধ করুন",
                    "text_color" => "#fff",
                    "bg_color" => "#f16522"
                ],
            ],
            "500" => [
                "header" => [
                    "text_en" => "Sorry!",
                    "text_bn" => "দুঃখিত!",
                    "text_color" => "#f16522",
                    "bg_color" => "#f16522"
                ],
                "content" => [
                    "text_en" => "Feedback submission failed.",
                    "text_bn" => "মতামত প্রদান সফল হয়নি।",
                    "text_color" => "#000",
                ],
                "submit_button" => [
                    "text_en" => "Close",
                    "text_bn" => "বন্ধ করুন",
                    "text_color" => "#fff",
                    "bg_color" => "#f16522"
                ],
            ],
            "default" => [
                "header" => [
                    "text_en" => "Sorry!",
                    "text_bn" => "দুঃখিত!",
                    "text_color" => "#f16522",
                    "bg_color" => "#f16522"
                ],
                "content" => [
                    "text_en" => "Feedback submission failed.",
                    "text_bn" => "মতামত প্রদান সফল হয়নি।",
                    "text_color" => "#000",
                ],
                "submit_button" => [
                    "text_en" => "Close",
                    "text_bn" => "বন্ধ করুন",
                    "text_color" => "#fff",
                    "bg_color" => "#f16522"
                ],
            ],
        ],
        'form' => [
            "header" => [
                "text_en" => "Feedback",
                "text_bn" => "ফিডব্যাক",
                "text_color" => "#fff",
                "bg_color" => "#f16522"
            ],
            "submit_button" => [
                "text_en" => "Submit",
                "text_bn" => "জমা দিন",
                "text_color" => "#fff",
                "bg_color" => "#f16522"
            ],
        ],
        'end' => [
            "header" => [
                "text_en" => "Thank You!",
                "text_bn" => "ধন্যবাদ!",
                "text_color" => "#1ec993",
                "bg_color" => "#f16522"
            ],
            "content" => [
                "text_en" => "We have received your feedback.",
                "text_bn" => "আপনার মতামতটি সফলভাবে সংগৃহীত হয়েছে।",
                "text_color" => "#000",
            ],
            "submit_button" => [
                "text_en" => "Close",
                "text_bn" => "বন্ধ করুন",
                "text_color" => "#fff",
                "bg_color" => "#f16522"
            ],
        ],
    ],
];