import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import type { WrapperProps } from '@docusaurus/types';
import SimpleChat from '@site/src/components/SimpleChat';

export default function LayoutWrapper(props: WrapperProps<typeof OriginalLayout>): JSX.Element {
  const { children, ...layoutProps } = props;

  return (
    <OriginalLayout {...layoutProps}>
      {children}
      {/* Floating Chatbot - Bottom Right */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <SimpleChat />
      </div>
    </OriginalLayout>
  );
}
