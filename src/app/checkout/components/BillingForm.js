'use client';

import InputField from './InputField';

export default function BillingForm({ formData, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="First Name"
        name="billingFirstName"
        value={formData.billingFirstName}
        onChange={onChange}
      />
      <InputField
        label="Last Name"
        name="billingLastName"
        value={formData.billingLastName}
        onChange={onChange}
      />
      <InputField
        label="Email"
        name="billingEmail"
        type="email"
        value={formData.billingEmail}
        onChange={onChange}
      />
      <InputField
        label="Phone"
        name="billingPhone"
        type="tel"
        value={formData.billingPhone}
        onChange={onChange}
      />
      <div className="md:col-span-2">
        <InputField
          label="Address"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={onChange}
        />
      </div>
      <InputField
        label="City"
        name="billingCity"
        value={formData.billingCity}
        onChange={onChange}
      />
      <InputField
        label="State"
        name="billingState"
        value={formData.billingState}
        onChange={onChange}
      />
      <InputField
        label="ZIP Code"
        name="billingZip"
        value={formData.billingZip}
        onChange={onChange}
      />
    </div>
  );
}
