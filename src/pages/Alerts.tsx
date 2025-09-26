import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { KPICard } from '@/components/KPICard';
import { AlertTriangle, CheckCircle, Clock, Bell, Users, Building2, Thermometer, Wifi } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    type: 'critical',
    title: 'Occupancy Limit Exceeded',
    message: 'North Building Floor 1 has reached 98% capacity (147/150 people)',
    location: 'North Building - Floor 1',
    timestamp: '2 minutes ago',
    status: 'active',
    category: 'occupancy'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Meeting Room Overbooked',
    message: 'Conference Room A has overlapping bookings between 2:00-3:00 PM',
    location: 'South Building - Floor 2',
    timestamp: '15 minutes ago',
    status: 'active',
    category: 'booking'
  },
  {
    id: 3,
    type: 'info',
    title: 'Peak Hour Approaching',
    message: 'Expected 85% occupancy in West Building within next 30 minutes',
    location: 'West Building - All Floors',
    timestamp: '25 minutes ago',
    status: 'active',
    category: 'prediction'
  },
  {
    id: 4,
    type: 'critical',
    title: 'System Maintenance Required',
    message: 'Occupancy sensor offline in East Building Gaming Lounge',
    location: 'East Building - Floor 3',
    timestamp: '1 hour ago',
    status: 'active',
    category: 'technical'
  },
  {
    id: 5,
    type: 'resolved',
    title: 'Fire Exit Blocked',
    message: 'Emergency exit pathway cleared in South Building lobby',
    location: 'South Building - Ground Floor',
    timestamp: '2 hours ago',
    status: 'resolved',
    category: 'safety'
  },
  {
    id: 6,
    type: 'warning',
    title: 'Air Quality Alert',
    message: 'CO2 levels elevated in North Building conference area',
    location: 'North Building - Floor 2',
    timestamp: '3 hours ago',
    status: 'active',
    category: 'environment'
  },
  {
    id: 7,
    type: 'info',
    title: 'Network Performance',
    message: 'WiFi usage at 80% capacity in West Building enterprise floors',
    location: 'West Building - Floors 1-4',
    timestamp: '4 hours ago',
    status: 'monitoring',
    category: 'network'
  },
  {
    id: 8,
    type: 'resolved',
    title: 'Temperature Control Fixed',
    message: 'HVAC system restored to normal operation in East Building',
    location: 'East Building - All Floors',
    timestamp: '6 hours ago',
    status: 'resolved',
    category: 'climate'
  }
];

const alertCategories = [
  { key: 'all', label: 'All Alerts', icon: Bell },
  { key: 'occupancy', label: 'Occupancy', icon: Users },
  { key: 'booking', label: 'Bookings', icon: Clock },
  { key: 'technical', label: 'Technical', icon: Building2 },
  { key: 'safety', label: 'Safety', icon: AlertTriangle },
  { key: 'environment', label: 'Environment', icon: Thermometer },
  { key: 'network', label: 'Network', icon: Wifi }
];

const Alerts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAlerts = alertsData.filter(alert => {
    const categoryMatch = selectedCategory === 'all' || alert.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || alert.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const activeAlerts = alertsData.filter(alert => alert.status === 'active');
  const criticalAlerts = alertsData.filter(alert => alert.type === 'critical' && alert.status === 'active');
  const warningAlerts = alertsData.filter(alert => alert.type === 'warning' && alert.status === 'active');
  const resolvedToday = alertsData.filter(alert => alert.status === 'resolved');

  const getAlertIcon = (type: string, status: string) => {
    if (status === 'resolved') return <CheckCircle className="h-5 w-5 text-green-500" />;
    
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getAlertBorderColor = (type: string, status: string) => {
    if (status === 'resolved') return 'border-green-200 bg-green-50';
    
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-muted bg-background';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring and alert management across all facilities
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Active Alerts"
            value={activeAlerts.length}
            change={-12.5}
            changeLabel="vs. yesterday"
            variant="primary"
            icon={<Bell className="h-5 w-5" />}
          />
          <KPICard
            title="Critical Issues"
            value={criticalAlerts.length}
            variant="secondary"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <KPICard
            title="Warnings"
            value={warningAlerts.length}
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <KPICard
            title="Resolved Today"
            value={resolvedToday.length}
            change={25.0}
            changeLabel="vs. yesterday"
            variant="success"
            icon={<CheckCircle className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Alert Categories</h3>
            <div className="space-y-2">
              {alertCategories.map((category) => {
                const Icon = category.icon;
                const count = category.key === 'all' 
                  ? alertsData.filter(a => a.status === 'active').length
                  : alertsData.filter(a => a.category === category.key && a.status === 'active').length;
                
                return (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                    <span className="text-sm">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus('active')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedStatus === 'active'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setSelectedStatus('resolved')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedStatus === 'resolved'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                Resolved
              </button>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 ${getAlertBorderColor(alert.type, alert.status)}`}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type, alert.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {alert.title}
                        </h4>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          📍 {alert.location}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          alert.status === 'active' 
                            ? 'bg-red-100 text-red-800'
                            : alert.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredAlerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No alerts found for the selected filters</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Alert Trends</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Today</span>
                <span className="text-sm font-medium">{activeAlerts.length} active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Week</span>
                <span className="text-sm font-medium">47 total</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Response Time</span>
                <span className="text-sm font-medium">12 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resolution Rate</span>
                <span className="text-sm font-medium">94%</span>
              </div>
            </div>
          </div>

          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Most Common Issues</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Occupancy Alerts</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Technical Issues</span>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Environment</span>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Booking Conflicts</span>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>

          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                📢 Send Building Announcement
              </button>
              <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                🚨 Trigger Emergency Protocol
              </button>
              <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                🔧 Request Maintenance
              </button>
              <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                📊 Generate Alert Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;