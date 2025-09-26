import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Building2, 
  Users, 
  TrendingUp, 
  Settings, 
  Calendar,
  Map,
  AlertTriangle
} from 'lucide-react';

const navItems = [
  { title: 'Dashboard', icon: BarChart3, href: '/' },
  { title: 'Space Utilization', icon: Building2, href: '/space' },
  { title: 'Members & Visitors', icon: Users, href: '/members' },
  { title: 'Analytics', icon: TrendingUp, href: '/analytics' },
  { title: 'Meeting Rooms', icon: Calendar, href: '/meetings' },
  { title: 'Floor Plans', icon: Map, href: '/floorplans' },
  { title: 'Alerts', icon: AlertTriangle, href: '/alerts' },
  { title: 'Settings', icon: Settings, href: '/settings' }
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          WorkSpace Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Footfall & Occupancy</p>
      </div>
      
      <nav className="px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Need Help?</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Access our analytics guide and support resources
          </p>
          <button className="text-xs text-primary hover:underline">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};