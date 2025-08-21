import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        {children}
      </main>
    </div>
  );
};