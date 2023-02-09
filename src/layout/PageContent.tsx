import React from 'react';

export const PageContent = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="mt-10">
    <div className="text-center">
      <h1 className="font-bold leading-tight text-4xl mt-0 mb-2">{title}</h1>
    </div>
    <div className="mt-10">{children}</div>
  </div>
);
