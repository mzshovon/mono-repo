import React, { useMemo, useState } from 'react'
import { InputNumber, Rate, Typography, Space, ConfigProvider, Flex, Button } from 'antd'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const { Text, Link } = Typography

const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

const parseSelectionType = (selectionType) => {
    const [prop, min, max, type] = selectionType.split('_');    
    return {
        min: parseInt(min),
        max: parseInt(max),
        type: type.toLowerCase()
    };
};

export default function Rating(
    {
        selectionType = 'rating_1_5_emotion',  // default value
        titleEn = '',  // default value
        titleBn = '',  // default value
        defaultValue = 0,
        disabled = false,
        onChange
    }
) {
    const [selected, setSelected] = useState(defaultValue);

    const ratingConfig = useMemo(() => {
        return parseSelectionType(selectionType);
    }, [selectionType]);

    const handleChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };
    const renderRatingComponent = () => {
        const { min, max, type } = ratingConfig;
        const buttons = type === 'number' 
        ? Array.from({ length: max - min + 1 }, (_, index) => min + index)
        : [];
        const handleClick = (value) => {
            setSelected(value);
            if (onChange) {
                onChange(value);
            }
        };

        if (type === 'star') {
            return (
                <Rate
                    count={max - min}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    onChange={handleChange}
                />
            );
        } else if (type === 'number') {            
            return (
                <Flex vertical gap="small">
                    <Flex gap='small' wrap>
                        {buttons.map((number) => (                                  
                            <Button
                                key = {number}
                                color={selected === number ? "primary" : "default"}
                                variant="outlined"
                                onClick={() => handleClick(number)}
                                disabled={disabled}
                                >
                                {number}
                            </Button>
                        ))}
                    </Flex>
                </Flex>
            );
        } else if (type === 'emotion') {            
            return (
                <Flex gap="middle" vertical>
                    <Rate 
                        defaultValue={1} 
                        character={({ index = 0 }) => customIcons[index + 1]} 
                        onChange={handleChange}
                    />
                </Flex>
            );
        }
        return null;
    };
    return (
        <div className="dynamic-rating"
            style={{ marginBottom: 40 }}
        >
            <Space
                direction="horizontal" 
                style={{width: '100%', justifyContent: 'center', marginBottom : 10}}
            >
                <Text>
                    {titleEn}
                </Text>
            </Space>
            <Space
                direction="horizontal" 
                style={{width: '100%', justifyContent: 'center'}}
            >
                {renderRatingComponent()}
            </Space>
        </div>
    )
}
