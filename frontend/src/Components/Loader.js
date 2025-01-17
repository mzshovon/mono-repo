import React from 'react';
import { Flex, Spin } from 'antd';

export default function Loader() {
  return (
    <Flex align="center" gap="middle">
        <Spin size="large" tip="Loading... Have patience" fullscreen/>
    </Flex>
  )
}
