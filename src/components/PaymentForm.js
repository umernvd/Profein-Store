'use client';

import InputField from './InputField';

export default function PaymentForm({ formData, onChange }) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">Payment Method</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={formData.paymentMethod === 'COD'}
              onChange={onChange}
              className="h-4 w-4 text-orange-400 focus:ring-orange-400 border-teal-300 text-black"
            />
            <label htmlFor="cod" className="text-teal-800">
              Cash on Delivery (COD)
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="online"
              name="paymentMethod"
              value="ONLINE"
              checked={formData.paymentMethod === 'ONLINE'}
              onChange={onChange}
              className="h-4 w-4 text-orange-400 focus:ring-orange-400 border-teal-300 text-black"
            />
            <label htmlFor="online" className="text-teal-800">
              Online Payment (Credit/Debit Card)
            </label>
          </div>
        </div>
      </div>

      {formData.paymentMethod === 'ONLINE' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Card Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={onChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <InputField
              label="Expiry Date"
              name="cardExpiry"
              placeholder="MM/YY"
              value={formData.cardExpiry}
              onChange={onChange}
            />
            <InputField
              label="CVC"
              name="cardCvc"
              placeholder="123"
              value={formData.cardCvc}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
