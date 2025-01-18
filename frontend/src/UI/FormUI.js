import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Button, Rate } from 'antd'
import Loader from '../Components/Loader';

export default function FormUI() {
  const URL = 'http://172.16.191.16:7000/api/v1/questions/mybl-android/mock-event/';
  const TOKEN = 'pyf7uK6Y-skxWssj6B27I1RFMDRYUTM0L1YzeDl6KzVIa1Q5aDdpWWdpNTFWVnV2dE1uVmhZYlo5ZURldDdVL2o5QkgzUGFhaVd2cWowRnRkakRKQTQyaTZGcVlpSlByVjhIa0hjZWp4OWJQRmtVUXRxVUQzZi9hN3hWcyt0bFJvTjg3NDRIbHoyelp5a0kz';
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(`${URL}${TOKEN}`);
        result.json().then(json => {
          setQuestions(json?.data)
          console.log(json);
        })
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  // if(isLoading) {
  //     return <Loader/>;
  // }
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
        <Card
          style={{ 
            width: '100%',
            maxWidth: '400px'
          }}
          title="Login Form"
        >
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {questions?.nps && (
              <Rate
                count={10}
                defaultValue={1}
              />
            )}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
    </div>
  )
}
