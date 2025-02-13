import { Button, Card } from 'antd'
import React from 'react'
import { useLocation } from 'react-router'
import { CheckCircleFilled } from '@ant-design/icons';


export default function Success() {
  const location = useLocation();
  // parsed data
  const header = location.state?.header;
  const content = location.state?.content;
  const buttonData = location.state?.buttonData;
  const language = location.state?.language;

  console.log(buttonData, 'btn');
  
  return (
    <div style={{
        minHeight: '30vh',
        // marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
      }}>
            <Card style={{
                marginTop: '25%',
                width: '100%',
                maxWidth: '600px',
                padding: '20px',
          }}>
            <div style={{textAlign:'center'}}>
                <CheckCircleFilled
                  style={{ fontSize: '56px', color: '#70c287' }} 
                />
                <div
                  style={{
                    marginTop: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                <h1>{language == "BN" ? header?.text_bn :  header?.text_en}</h1>
                <h3>{language == "BN" ? content?.text_bn :  content?.text_en}</h3>
                <Button
                    shape='round'
                    size='large'
                    style={{
                      marginTop: 10,
                      backgroundColor: buttonData?.bg_color ?? '',
                      color: buttonData?.text_color ?? ''
                    }}
                >
                    {language == "BN" ? buttonData?.text_bn :  buttonData?.text_en}
                </Button>
                </div>
            </div>
            </Card>
    </div>
  )
}
