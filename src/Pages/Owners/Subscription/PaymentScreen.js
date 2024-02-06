import React from 'react';
import {View, Button} from 'react-native';
import {useStripe, CardField} from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const {confirmPaymentSheetPayment, initPaymentSheet, presentPaymentSheet} =
    useStripe();

  const initializePaymentSheet = async () => {
    try {
      const result = await initPaymentSheet({
        paymentIntentClientSecret:
          'sk_test_51OerSaSBV6gdBMXrAGr41YffxieUUDm2Rtgc0LHew2XeJSIUDzvtcjOkH8zLOLwTt9oLRDFeSVllNCWgpJXavejL00oGvsrzEj', // Replace with your actual client secret
        merchantDisplayName: 'harshit',
      });

      if (result.error) {
        console.error('Error initializing PaymentSheet:', result.error);
        // Handle the error appropriately in your UI
      } else {
        console.log('PaymentSheet initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing PaymentSheet:', error);
      // Handle the error appropriately in your UI
    }
  };

  const handlePayment = async () => {
    try {
      // Initialize the PaymentSheet
      await initializePaymentSheet();

      // Present the PaymentSheet to collect payment details
      const {paymentOption, error} = await presentPaymentSheet();

      if (error) {
        console.error('Error presenting PaymentSheet:', error);
        // Handle the error appropriately in your UI
        return;
      }

      // Confirm the payment with the server
      const {paymentIntent, paymentIntentError} =
        await confirmPaymentSheetPayment({
          paymentOptionId: paymentOption.id,
        });

      if (paymentIntentError) {
        console.error(
          'Error confirming PaymentSheet payment:',
          paymentIntentError,
        );
        // Handle the error appropriately in your UI
        return;
      }

      // Handle the confirmed paymentIntent
      console.log('Confirmed PaymentIntent:', paymentIntent);
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle the error appropriately in your UI
    }
  };

  return (
    <View>
      {/* Your UI components */}
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
