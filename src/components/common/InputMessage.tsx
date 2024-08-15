import React from 'react';

export default function InputMessage({
  errorMessage
}: {
  errorMessage?: string;
}) {
  if (!errorMessage) return null;
  return <p className="text-error text-[14px]">{errorMessage}</p>;
}
