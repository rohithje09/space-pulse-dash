import React from 'react';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';

interface MeetingRoom {
  name: string;
  capacity: number;
  utilizationRate: number;
  avgMeetingDuration: string;
  totalBookings: number;
  status: 'high' | 'medium' | 'low';
}

const mockMeetingRooms: MeetingRoom[] = [
  {
    name: 'Conference Room A',
    capacity: 12,
    utilizationRate: 87,
    avgMeetingDuration: '1h 15m',
    totalBookings: 28,
    status: 'high'
  },
  {
    name: 'Meeting Room B',
    capacity: 6,
    utilizationRate: 72,
    avgMeetingDuration: '45m',
    totalBookings: 35,
    status: 'high'
  },
  {
    name: 'Phone Booth 1',
    capacity: 2,
    utilizationRate: 58,
    avgMeetingDuration: '25m',
    totalBookings: 42,
    status: 'medium'
  },
  {
    name: 'Phone Booth 2',
    capacity: 2,
    utilizationRate: 43,
    avgMeetingDuration: '20m',
    totalBookings: 31,
    status: 'medium'
  },
  {
    name: 'Board Room',
    capacity: 16,
    utilizationRate: 34,
    avgMeetingDuration: '2h 10m',
    totalBookings: 12,
    status: 'low'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'high':
      return 'text-success';
    case 'medium':
      return 'text-warning';
    case 'low':
      return 'text-error';
    default:
      return 'text-muted-foreground';
  }
};

const getUtilizationBarColor = (rate: number) => {
  if (rate >= 80) return 'bg-success';
  if (rate >= 60) return 'bg-warning';
  return 'bg-error';
};

export const MeetingRoomAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="kpi-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">148</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </div>
          </div>
        </div>
        
        <div className="kpi-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">58m</div>
              <div className="text-sm text-muted-foreground">Avg Duration</div>
            </div>
          </div>
        </div>
        
        <div className="kpi-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-sm text-muted-foreground">Occupancy Rate</div>
            </div>
          </div>
        </div>
        
        <div className="kpi-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold">+12%</div>
              <div className="text-sm text-muted-foreground">vs Last Week</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="data-table">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold">Meeting Room Utilization</h3>
          <p className="text-sm text-muted-foreground">Detailed breakdown by room</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Room Name</th>
                <th className="text-left p-4 font-medium">Capacity</th>
                <th className="text-left p-4 font-medium">Utilization</th>
                <th className="text-left p-4 font-medium">Avg Duration</th>
                <th className="text-left p-4 font-medium">Bookings</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockMeetingRooms.map((room, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/25 transition-colors">
                  <td className="p-4 font-medium">{room.name}</td>
                  <td className="p-4">{room.capacity} people</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUtilizationBarColor(room.utilizationRate)}`}
                          style={{ width: `${room.utilizationRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{room.utilizationRate}%</span>
                    </div>
                  </td>
                  <td className="p-4">{room.avgMeetingDuration}</td>
                  <td className="p-4">{room.totalBookings}</td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${getStatusColor(room.status)}`}>
                      {room.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};