import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Skeleton, Badge } from 'antd'
import Rating from '../Components/Rating';
import DynamicFields from '../Components/DynamicFields';
import SwitchButton from '../Components/SwitchButton';
import {apiEndPoint} from '../constants/config';
import {useNavigate} from 'react-router-dom'

export default function FormUI() {
  // URL will be pulled from ENV
  const URL = `${apiEndPoint}questions/`;  
  const TOKEN = 'token';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("EN");
  const [formTheme, setFormTheme] = useState({});
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(`${URL}${TOKEN}`);
        result.json().then(json => {
          setResponse(json?.data);
          setFormTheme(json?.data?.theme?.form);
          
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
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      const value = values[key];

      if (value instanceof Blob) {
        // Append blob with original filename
        formData.append(key, value, `audio_${key}.wav`);
      } else {
        formData.append(key, value);
      }
    });

    // Log or send formData
    console.log('Form data entries:', [...formData.entries()]);
    const error = 500;
    navigate('/fail', 
      { 
        state: {
          language : language,
          buttonData : response?.theme?.error[error].submit_button,
          header : response?.theme?.error[error].header,
          content : response?.theme?.error[error].content
        }
      }
    );
    // navigate('/success', 
    //   { 
    //     state: {
    //       language : language,
    //       buttonData : response?.theme?.end?.submit_button,
    //       header : response?.theme?.end?.header,
    //       content : response?.theme?.end?.content
    //     }
    //   }
    // );
  };

  const handleToggleChange = (checked) => {
    const selectedLanguage = checked ? 'EN' : 'BN';
    setLanguage(selectedLanguage);
  };

  return (
    <div style={{
      minHeight: '90vh',
      // marginTop: '50px',
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
            maxWidth: '600px',
            
          }}
          headStyle = {{backgroundColor: formTheme?.header?.bg_color ?? ''}}
          title={language == "BN" ? formTheme?.header?.text_bn : formTheme?.header?.text_en}
          extra={<SwitchButton
            checked={language == 'EN'}
            onChange={handleToggleChange}
          />}
        >
          {isLoading && (
            <Skeleton active />
          )}
          <Form
            form={form}
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
                  setSubmitBtnStatus = {setSubmitBtnStatus}
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
                    type={question?.input_type}
                    min={question?.min}
                    max={question?.max}
                    required={question?.required}
                    form={form}
                  />
                </Form.Item>
              ))
            )}
            <Form.Item>
              <Button
                color= {formTheme?.submit_button?.bg_color ?? 'primary'}
                variant='filled'
                disabled = {submitBtnStatus}
                // type="primary" 
                htmlType="submit" 
                block
                style={{
                  color:formTheme?.submit_button?.text_color ?? 'white',
                  fontWeight: 'bold'
                }}
              >
                  {language == "BN" ? formTheme?.submit_button?.text_bn : formTheme?.submit_button?.text_en}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}
