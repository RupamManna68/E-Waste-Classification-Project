import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck,
  Recycle,
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Items', href: '/items', icon: Package },
  { name: 'Vendors', href: '/vendors', icon: Users },
  { name: 'Pickups', href: '/pickups', icon: Truck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border shadow-card">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-eco rounded-lg flex items-center justify-center">
            <Recycle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">EcoTrack</h1>
            <p className="text-xs text-muted-foreground">Smart E-Waste</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-gradient-eco rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">JD</span>
            </div>
            <div>
              <p className="font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Coordinator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};