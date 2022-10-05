import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import asyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../environment';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import {
  Wrapper,
  Title,
  StyledButton,
  PaymentItem,
  StyledText,
} from '../shared/index';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

const PaymentScreen = () => {
  const [token, setToken] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await asyncStorage.getItem('token');

      setToken(token);
      setPaymentInfo(MY_INFO_OPTIONS.PAYMENT_INFO[0]);
    })();
  }, []);

  const jsCodeForPayment = `
    const handleClickPaymentButton = (e) => {
      e.target.disabled = true;
      e.target.style.backgroundColor = 'gray';

      fetch('${REACT_NATIVE_ANDROID_SERVER_URL}/payment?authToken=${token}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productInfo: {
            name: '${paymentInfo.name}',
            amount: ${paymentInfo.amount}
          },
          amount: ${paymentInfo.price}
        })
      })
      .then(res => res.json())
      .then(data => {
        const { _id: merchant_uid, buyer, amount, productInfo } = data;

        IMP.init('imp42855025');
        IMP.request_pay({
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid,
          name: "${paymentInfo.name} ${paymentInfo.amount}개",
          amount: ${paymentInfo.price},
          buyer_email: "coin46@naver.com",
          buyer_name: "김찬중",
          buyer_tel: "010-5056-6756",
          m_redirect_url: "${REACT_NATIVE_ANDROID_SERVER_URL}/payment?authToken=${token}"
        });
      })
      .catch(err => alert(err));

    };

    const paymentButton = document.getElementById('paymentButton');

    paymentButton.addEventListener('click', handleClickPaymentButton);
  `;

  return (
    <>
      {!isPaymentSelected ? (
        <>
          <Wrapper>
            <Title>결제 선택</Title>
            {MY_INFO_OPTIONS.PAYMENT_INFO.map((item, index) => {
              return (
                <PaymentItem
                  onPress={() => setPaymentInfo(item)}
                  key={index}
                  disabled={item === paymentInfo ? true : false}
                >
                  <StyledText>{`${item.name} ${item.amount}개  -  ₩${item.price}`}</StyledText>
                </PaymentItem>
              );
            })}

            <StyledButton onPress={() => setIsPaymentSelected(true)}>
              <StyledText>다음</StyledText>
            </StyledButton>
          </Wrapper>
        </>
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{ html: paymentView }}
          style={{ marginHorizontal: 10, marginVertical: 10 }}
          injectedJavaScript={jsCodeForPayment}
          autoFocus={true}
        />
      )}
    </>
  );
};

const paymentView =
  '<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" /><style> div { display: flex; justify-content: center; align-items: center; height: 100%; } button { padding: 20px; color: white; background-color: blue; border-radius: 10px; }</style><script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script><script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script></head><div><button id="paymentButton">결제하기</button></div>';

export default PaymentScreen;
