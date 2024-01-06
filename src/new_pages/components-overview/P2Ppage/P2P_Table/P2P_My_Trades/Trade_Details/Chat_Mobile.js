import React from 'react'
import Chat_Appeal_Tab from './Chat_Screen_Tabs';
import { useLocation } from 'react-router';

const Chat_Mobile = () => {
  const location = useLocation();
  const SUPERData = location.state?.SUPERData;
  const counterPart = location.state?.counterPart;
  return (
    <Chat_Appeal_Tab SUPERData={SUPERData} counterPart={counterPart} />
  )
}

export default Chat_Mobile;
