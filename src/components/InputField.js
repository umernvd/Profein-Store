'use client';

export default function InputField({ label, name, type = 'text', required = true, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-teal-800 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-black"
      />
    </div>
  );
}
