"use client";

import Script from "next/script";

/**
 * Embedded GHL form. The widget posts straight to the YSK sub-account, so a
 * submission becomes a contact, a tag, and (for partners) a pipeline card
 * without any server code here. The embed script resizes the iframe.
 */
export default function GhlForm({ id, title, height = 620, className = "" }: { id: string; title: string; height?: number; className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${id}`}
        id={`inline-${id}`}
        title={title}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-id={id}
        data-form-name={title}
        data-layout-iframe-id={`inline-${id}`}
        data-height={height}
        style={{ width: "100%", height, border: "none", display: "block" }}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
