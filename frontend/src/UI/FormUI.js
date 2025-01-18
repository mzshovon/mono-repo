import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Skeleton } from 'antd'
import Rating from '../Components/Rating';
import DynamicFields from '../Components/DynamicFields';

export default function FormUI() {
  const URL = 'http://172.16.191.16:7000/api/v1/questions/mybl-android/mock-event/';
  const TOKEN = 'nGwKSdFO7KXGQQ3Uc-2SPDAxRFBNUkx3dWtDTVRYZDRvVVhCMmdJSTZvRnY0dTVSSDUxQVU1aW1wRmRDZGNuTEVKYmdjc0hOOGpzZ2xQdDdsY0ZoN2xhOUZ4LzA4cUxEK2Z4MlNUREdyUjk5UFMvaXJzM0R3RTZsdmUwc2ZGbjRTeGpWUlpNWVJtcGdrV2FR';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(`${URL}${TOKEN}`);
        result.json().then(json => {
          setResponse(json?.data)
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
      minHeight: '70vh',
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
          {response?.nps && (
            <Rating
              selectionType={response.nps?.selection_type}
              titleEn={response.nps?.question_en}
              titleBn={response.nps?.question_bn}
              defaultValue={1}
              onChange={handleRatingChange}
            />
          )}

          {response?.questions && Object.entries(response?.questions).map(([range, questionList]) =>
            questionList.map((question) => (
              <Form.Item
                key={question.id}
                label={question.question_en}
                name={`question_${question.id}`}
                rules={[
                  {
                    required: !!question.is_required,
                    message: 'This field is required'
                  }
                ]}
              >
                <DynamicFields
                  selectionType={question.selection_type}
                  options={question.options}
                />
              </Form.Item>
            ))
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
