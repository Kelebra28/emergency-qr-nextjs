'use client';

import { useState } from 'react';

type Props = {
  value: string;
};

export function CopyPublicUrlButton({ value }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <button
      type="button"
      className="button button-secondary"
      onClick={handleCopy}
    >
      {copied ? 'URL copiada' : 'Copiar URL'}
    </button>
  );
}