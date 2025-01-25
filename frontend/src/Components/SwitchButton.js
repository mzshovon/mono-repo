import { Switch } from 'antd'
import React from 'react'


export default function SwitchButton({checked, onChange}) {
  return (
    <Switch 
        checked = {checked}
        checkedChildren="EN" 
        unCheckedChildren="BN" 
        onChange={onChange}
        style={{ marginRight: 20 }}
    />
  )
}
