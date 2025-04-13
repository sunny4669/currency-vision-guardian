
import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 animate-fade-in">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-genuine" />
          <h1 className="text-2xl font-bold">Currency Vision Guardian</h1>
        </div>
        <div className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-md">
          <ShieldAlert className="w-5 h-5 text-fake" />
          <span className="text-sm text-muted-foreground">
            Powered by CNN Technology
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
