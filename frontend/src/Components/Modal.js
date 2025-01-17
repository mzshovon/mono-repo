import {React, useEffect, useState} from 'react'
import {Layout, Alert, theme} from 'antd'

export default function Modal() {
    const url = "http://localhost:8020/api";
    const [data, setData] = useState(0);
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            result.json().then(json => {                
                setData(json)
            })
        }
        fetchData();
    }, [])

    return (
        <div>
            <Layout>
            <div 
                style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
                }}>
                <Alert
                    message={data?.status}
                    description={data?.message}
                    type="success"
                    showIcon
                />
            </div>
            </Layout>
        </div>
    )
}
