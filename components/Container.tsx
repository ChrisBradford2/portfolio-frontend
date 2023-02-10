import React from 'react';

interface Props {
    children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {children}
    </div>
  );
};

export default Container;