import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.error) {
    return (
      <div className="error">{notification.content}</div>
    )
  }
  if (notification.content) {
    return (
      <div className="notification">{notification.content}</div>
    )
  }
  return (<div></div>)
}

export default Notification