import { Button, Card } from 'antd'
import React from 'react'

export default function Success() {
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
                width: '100%',
                maxWidth: '800px',
          }}>
            <div style={{textAlign:'center'}}>
                <h1>Thank You</h1>
                <h3>We have received your feedback.</h3>
                <Button
                    shape='round'
                    size='large'
                    style={{marginTop: 10}}
                >
                    Back
                </Button>
            </div>
            </Card>
    </div>
  )
}
