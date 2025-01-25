import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Skeleton, Badge } from 'antd'
import Rating from '../Components/Rating';
import DynamicFields from '../Components/DynamicFields';
import SwitchButton from '../Components/SwitchButton';

export default function FormUI() {
  // URL will be pulled from ENV
  const URL = 'http://localhost:8020/api/questions/';
  const TOKEN = 'token';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("EN");

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
    console.log('Form values:', JSON.stringify(values));
  };

  const handleRatingChange = (value) => {
    console.log('Rating changed to:', value);
  };

  const handleToggleChange = (checked) => {
    const selectedLanguage = checked ? 'EN' : 'BN';
    setLanguage(selectedLanguage);
    console.log('Language changed to:', selectedLanguage);
  };

  return (
    <div style={{
      minHeight: '90vh',
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
        extra={<SwitchButton 
          checked = {language == 'EN'}
          onChange = {handleToggleChange}
        />}
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
            <Form.Item
              key={response.nps?.id}
              name={`question_${response.nps?.id}`}
            >
              <Rating
                selectionType={response.nps?.selection_type}
                titleEn={response.nps?.question_en}
                titleBn={response.nps?.question_bn}
                initialValues={1}
                language={language}
                options={response.nps?.options}
                onChange={handleRatingChange}
              />
            </Form.Item>
          )}

          {response?.questions && Object.entries(response?.questions).map(([range, questionList]) =>
            questionList.map((question) => (
              <Form.Item
                key={question.id}
                label={language == "BN" ? question.question_bn : question.question_en}
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
                  language={language}
                  type = {question?.input_type}
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
