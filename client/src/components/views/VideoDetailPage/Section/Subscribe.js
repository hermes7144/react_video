import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let vairable = { userTo: props.userTo };

    Axios.post('/api/subscribe/subscribeNumber', vairable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscriberNumber);
      } else {
        alert('구독자 정보를 가져오는데 실패했습니다.');
      }
    });

    let subscribedVariable = { userTo: props.UserTo, userFrom: props.UserFrom };

    Axios.post('/api/subscribe/subscribed', subscribedVariable).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert('정보를 받아오는데 실패했습니다.');
      }
    });
  }, []);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    if (Subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribedVariable).then((response) => {
        if (response.data.success) {
          setSubscribeNumber(SubscribeNumber - 1);
          setSubscribed(!Subscribed);
        } else {
          alert('구독 정보를 가져오는데 실패했습니다.');
        }
      });
    } else {
      Axios.post('/api/subscribe/subscribe', subscribedVariable).then((response) => {
        if (response.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert('구독 정보를 가져오는데 실패했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <button style={{ backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, border: '4px', color: 'white', padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' }} onClick={onSubscribe}>
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
