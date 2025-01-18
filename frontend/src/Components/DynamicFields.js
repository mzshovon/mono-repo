import React, { useState } from 'react'
import { Input, Checkbox, Radio, Rate, Space } from 'antd';
const { TextArea } = Input

const componentMap = {
    text: Input,
    textarea: TextArea,
    checkbox: Radio.Group,
    'radio-button': Radio.Group,
    rate: Rate,
    // Add more mappings as needed
};

export default function DynamicFields({ selectionType, options, ...props }) {
    const Component = componentMap[selectionType] || Input;
    const parsedOptions = options ? JSON.parse(options) : null;
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    switch (selectionType) {
        case 'as':
            return (
                <div className="flex flex-col gap-2">
                    {parsedOptions?.map((opt) => (
                        <Checkbox
                            style={{ display: 'flex', marginLeft: 0, marginBottom: 8 }}
                            key={opt.id}
                            id={opt.id}
                        >
                            {opt.title_en}
                        </Checkbox>
                    ))}
                </div>
            )
        case 'checkbox':
            return (
                <div className="flex flex-col gap-2">
                    {parsedOptions?.map((opt) => (
                        <Radio
                            style={{ display: 'flex', marginLeft: 0, marginBottom: 8 }}
                            key={opt.id}
                            value={opt.id}
                        >
                            {opt.title_en}
                        </Radio>
                    ))}
                </div>
            )

        case 'textarea':
            return (
                <Component {...props} rows={4} />
            )
        default:
            return <Component {...props} />
    }

}
