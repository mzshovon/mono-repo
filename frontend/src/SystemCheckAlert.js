import {React, useEffect, useState} from 'react'
import {Layout, Alert, theme} from 'antd'
import Loader from './Components/Loader';

export default function SystemCheckAlert({children}) {
    // URL will be pulled from ENV
    const url = "http://localhost:8020/api";
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(0);
    const [isSystemUp, setIsSystemUp] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await fetch(url);
                result.json().then(json => {      
                    if(json?.status == 200) {
                        setData(json)
                        setIsSystemUp(true)
                    } else {
                        setData(json)
                        setIsSystemUp(false)
                    }       
                })
            } catch (error) {
                setData({
                    'status' : 500,
                    'message' : 'Application is unreachable'
                })
                setIsSystemUp(false);
                
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    if(isLoading) {
        return <Loader/>;
    }

    if(!isSystemUp) {
        return (
            <Layout>
            <div 
                style={{
                    background: colorBgContainer,
                    minHeight: 280,
                    padding: 100,
                    borderRadius: borderRadiusLG,
                }}>
                <Alert
                    message={data?.status}
                    description={data?.message}
                    defaultPadding
                    type="error"
                />
            </div>
            </Layout>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}
