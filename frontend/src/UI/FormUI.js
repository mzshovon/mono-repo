import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Typography, Skeleton } from 'antd'
import Rating from '../Components/Rating';

const { Text, Link, Title } = Typography

export default function FormUI() {
  const URL = 'http://172.16.191.16:7000/api/v1/questions/mybl-android/mock-event/';
  const TOKEN = 'Token';
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

  const handleRatingChange = (value) => {
    console.log('Rating changed to:', value);
  };
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
          maxWidth: '600px'
        }}
        title="Questions"
      >
        {isLoading && (
          <Skeleton active />
        )}
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {questions?.nps && (
            <Rating
              selectionType={questions.nps?.selection_type}
              titleEn={questions.nps?.question_en}
              titleBn={questions.nps?.question_bn}
              defaultValue={1}
              onChange={handleRatingChange}
            />
          )}
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
