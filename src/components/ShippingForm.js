'use client';

import InputField from './InputField';

export default function ShippingForm({ formData, onChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="shippingFirstName"
          value={formData.shippingFirstName}
          onChange={onChange}
        />
        <InputField
          label="Last Name"
          name="shippingLastName"
          value={formData.shippingLastName}
          onChange={onChange}
        />
        <InputField
          label="Email"
          name="shippingEmail"
          type="email"
          value={formData.shippingEmail}
          onChange={onChange}
        />
        <InputField
          label="Phone"
          name="shippingPhone"
          type="tel"
          value={formData.shippingPhone}
          onChange={onChange}
        />
        <div className="md:col-span-2">
          <InputField
            label="Address"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={onChange}
          />
        </div>
        <InputField
          label="City"
          name="shippingCity"
          value={formData.shippingCity}
          onChange={onChange}
        />
        <InputField
          label="State"
          name="shippingState"
          value={formData.shippingState}
          onChange={onChange}
        />
        <InputField
          label="ZIP Code"
          name="shippingZip"
          value={formData.shippingZip}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
