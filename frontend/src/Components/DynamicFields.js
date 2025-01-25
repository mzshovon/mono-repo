import React, { useState } from 'react'
import {
    Input,
    Checkbox,
    Radio,
    Rate,
    InputNumber,
    Select,
    Upload,
    notification
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload
const { TextArea } = Input

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


export default function DynamicFields({ 
    id, 
    selectionType, 
    options, 
    language, 
    ...props 
}) {
    const Component = componentMap[selectionType] || Input;
    const parsedOptions = options ? JSON.parse(options) : null;
    const { type, min, max } = { ...props };
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const [api, contextHolder] = notification.useNotification();
    // Notification template import
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            showProgress: true,
            duration: 2
        });
    };
    // Before upload check for format and size
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            openNotificationWithIcon('error', `${file.name} is not a png file`);
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            openNotificationWithIcon('error', 'You can only upload JPG/PNG file!');
        }
        return isJpgOrPng && isLt2M || Upload.LIST_IGNORE;
    };

    switch (selectionType) {
        case 'checkbox':
            return (
                <div className="flex flex-col gap-2"
                    id={id} {...props}>
                    {parsedOptions?.map((opt) => (
                        <Checkbox
                            style={{ display: 'flex', marginLeft: 0, marginBottom: 8 }}
                            key={opt.id}
                            id={opt.id}
                        >
                            {language == "BN" ? opt.title_bn : opt.title_en}
                        </Checkbox>
                    ))}
                </div>
            )
        case 'radio-button':
            return (
                <div className="flex flex-col gap-2">
                    {parsedOptions?.map((opt) => (
                        <Radio
                            {...props}
                            style={{ display: 'flex', marginLeft: 0, marginBottom: 8 }}
                            key={opt.id}
                            value={opt.id}
                        >
                            {language == "BN" ? opt.title_bn : opt.title_en}
                        </Radio>
                    ))}
                </div>
            )
        case 'textarea':
            return (
                <Component {...props} id={id} rows={4} />
            )
        case 'number':
            return (
                <Component
                    {...props}
                    id={id}
                    style={{
                        display: 'flex',
                        marginLeft: 0,
                        marginBottom: 8,
                        width: '100%',
                    }}
                    required
                />
            )
        case 'select':
            return (
                <Component
                    {...props}
                    style={{ textAlign: 'left' }}
                    id={id}
                    {...props}
                    allowClear
                    options={parsedOptions?.map(opt => ({
                        id: opt.id,
                        label: language == "BN" ? opt.title_bn : opt.title_en,
                        value: opt.value
                    }))}
                />
            )
        case 'upload':
            return (
                <Component
                    {...props}
                    fileList={[]}
                    id={id}
                    accept="image/*"
                    beforeUpload={beforeUpload}
                    multiple={false}
                >
                    {contextHolder}
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        {language == "BN" ? 'আপলোড করতে এই এলাকায় ফাইলটি ক্লিক করুন বা টেনে আনুন' : 'Click or drag file to this area to upload'}
                    </p>
                </Component>
            )
        default:
            return <Component
                min={min}
                max={max}
            />
    }

}
