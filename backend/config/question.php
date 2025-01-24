<?php

return [
    'nps' => [
        "question_en" => "How likely are you to recommend MyBL App to a friends or family member?",
        "question_bn" => " আপনি MyBL অ্যাপ ব্যবহার করতে আপনার বন্ধু বা পরিবারের সদস্যকে কতটুকু উৎসাহিত করবেন?",
        "selection_type" => "rating_0_10_number",
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
        "range" => "0-0",
        "status" => 1,
        "children" => [],
        "nps_rating_mapping" => [
            "en" => [
                "low" => "Not at all likely",
                "high" => "Extremely likely"
            ],
            "bn" => [
                "low" => "মোটেই না",
                "high" => "অবশ্যই"
            ]
        ]
    ],
    'questions' => [
        '9-10' => [
            [
                'id' => 9,
                'question_en' => 'Please choose from below the reason for above rating:',
                'question_bn' => 'নিচের কোন বিষয়টির উপর ভিত্তি করে আপনি উপরের রেটিংটি করেছেন:',
                'selection_type' => 'upload',
                'nps_rating_mapping' => null,
                'options' => "[{\"id\": \"1\", \"value\": \"app_offer\", \"title_bn\": \"অ্যাপ অফার\", \"title_en\": \"App Offer\"}, {\"id\": \"2\", \"value\": \"app_feature\", \"title_bn\": \"অ্যাপ ফিচার\", \"title_en\": \"App Feature\"}, {\"id\": \"3\", \"value\": \"app_performance\", \"title_bn\": \"অ্যাপ পারফর্মেন্স\", \"title_en\": \"App Performance\"}, {\"id\": \"4\", \"value\": \"easy_to_use\", \"title_bn\": \"সহজে ব্যবহার করা যায়\", \"title_en\": \"Easy to Use\"}]",
                'is_required' => 0,
                'range' => '9-10',
                'parent_id' => null,
                'order' => 9,
                'status' => 1,
                'exceptional' => null,
                'rfu_1' => null,
                'rfu_2' => null,
                'deleted_at' => null,
                'created_by' => null,
                'updated_by' => null,
                'children' => [],
            ],
        ],
        '0-0' => [
            [
                'id' => 10,
                'question_en' => 'Share your contact number with us-',
                'question_bn' => 'আরও কোন মতামত থাকলে অনুগ্রহপূর্বক জানাবেন',
                'selection_type' => 'number',
                'input_type' => 'number',
                'min' => 1,
                'max' => 11,
                'nps_rating_mapping' => null,
                'options' => null,
                'is_required' => 0,
                'range' => '0-0',
                'parent_id' => null,
                'order' => 11,
                'status' => 1,
                'exceptional' => null,
                'rfu_1' => null,
                'rfu_2' => null,
                'deleted_at' => null,
                'created_by' => null,
                'updated_by' => null,
                'children' => [],
            ],
            [
                'id' => 11,
                'question_en' => 'Is there anything else you would like to share with us?',
                'question_bn' => 'আরও কোন মতামত থাকলে অনুগ্রহপূর্বক জানাবেন',
                'selection_type' => 'textarea',
                'nps_rating_mapping' => null,
                'options' => null,
                'is_required' => 0,
                'range' => '0-0',
                'parent_id' => null,
                'order' => 11,
                'status' => 1,
                'exceptional' => null,
                'rfu_1' => null,
                'rfu_2' => null,
                'deleted_at' => null,
                'created_by' => null,
                'updated_by' => null,
                'children' => [],
            ],
        ],
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
