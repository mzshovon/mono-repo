import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Skeleton, Badge } from 'antd'
import Rating from '../Components/Rating';
import DynamicFields from '../Components/DynamicFields';

export default function FormUI() {
  // URL will be pulled from ENV
  const URL = 'http://localhost:8020/api/questions/';
  const TOKEN = 'gWYGm7K7qqW2_KvoQ_IPl2RLRjR0Z1ZtSmwva1NpS09vQWdEQVMwcm5ZS1o1TFI4NTJIbWYyazFuNGt0ZnU3cldGdjdUNXRwMDBNYkhWUzIwZWtLS3FsYUZRdDRIWUVLS1htcG04dDZ1MmdqWjJGdlB3YS9McEpHZE83eCt4K1RUUmNqK2dUUjNJVllkck5C';
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
      <Badge.Ribbon
        text='Beta'
        color='volcano'
      >
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
                  id={question.id}
                  selectionType={question.selection_type}
                  options={question.options}
                  inputType = {question?.input_type}
                  min = {question?.min}
                  max = {question?.max}
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
      </Badge.Ribbon>
    </div>
  )
}
