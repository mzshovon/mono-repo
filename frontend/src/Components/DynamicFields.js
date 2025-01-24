import React, { useState } from 'react'
import { Input, Checkbox, Radio, Rate, InputNumber, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const {Dragger} = Upload
const {TextArea} = Input

const componentMap = {
    text: Input,
    textarea: TextArea,
    checkbox: Radio.Group,
    'radio-button': Radio.Group,
    select: Select,
    number: InputNumber,
    upload: Dragger,
    rate: Rate,
    // Add more mappings as needed
};

export default function DynamicFields({ id, selectionType, options, ...props }) {
    const Component = componentMap[selectionType] || Input;
    const parsedOptions = options ? JSON.parse(options) : null;
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    switch (selectionType) {
        case 'checkbox':
            return (
                <div className="flex flex-col gap-2"
                    id={id}>
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
        case 'radio-button':
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
        case 'number':            
            const {inputType, min, max} = {...props};
            return (
                <Component 
                    id = {id}
                    style={{ 
                        display: 'flex',
                         marginLeft: 0, 
                         marginBottom: 8,
                         width: '100%',
                        }}
                    type = {inputType}
                    min = {min}
                    max = {max}
                />
            )
        case 'select':            
            return (
                <Component
                    style={{ textAlign: 'left' }}
                    id = {id}
                    {...props}
                    allowClear
                    options={parsedOptions?.map(opt => ({
                      id: opt.id,
                      label: opt.title_en,
                      value: opt.value
                    }))}
                />
            )
        case 'upload':
            return (
                <Component 
                    id = {id}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    {/* <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                    </p> */}
                </Component>
            )
        default:
            return <Component {...props} />
    }

}
