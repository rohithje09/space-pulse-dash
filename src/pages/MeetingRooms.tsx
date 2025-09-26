import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MeetingRoomAnalytics } from '@/components/MeetingRoomAnalytics';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const roomUtilizationData = [
  { room: 'Conference A', utilization: 85, bookings: 12, avgDuration: 2.5 },
  { room: 'Conference B', utilization: 72, bookings: 9, avgDuration: 1.8 },
  { room: 'Meeting Pod 1', utilization: 95, bookings: 18, avgDuration: 1.2 },
  { room: 'Meeting Pod 2', utilization: 88, bookings: 15, avgDuration: 1.4 },
  { room: 'Boardroom', utilization: 65, bookings: 6, avgDuration: 3.2 },
  { room: 'Phone Booth 1', utilization: 92, bookings: 24, avgDuration: 0.8 },
  { room: 'Phone Booth 2', utilization: 89, bookings: 22, avgDuration: 0.7 },
  { room: 'Brainstorm Room', utilization: 78, bookings: 10, avgDuration: 2.1 }
];

const weeklyBookings = [
  { day: 'Mon', bookings: 28, duration: 2.3 },
  { day: 'Tue', bookings: 32, duration: 2.1 },
  { day: 'Wed', bookings: 35, duration: 2.4 },
  { day: 'Thu', bookings: 30, duration: 2.2 },
  { day: 'Fri', bookings: 25, duration: 1.9 },
  { day: 'Sat', bookings: 12, duration: 1.5 },
  { day: 'Sun', bookings: 8, duration: 1.2 }
];

const MeetingRooms = () => {
  const totalBookings = roomUtilizationData.reduce((sum, room) => sum + room.bookings, 0);
  const avgUtilization = Math.round(roomUtilizationData.reduce((sum, room) => sum + room.utilization, 0) / roomUtilizationData.length);
  const avgDuration = roomUtilizationData.reduce((sum, room) => sum + room.avgDuration, 0) / roomUtilizationData.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Meeting Rooms</h1>
          <p className="text-muted-foreground mt-1">
            Room utilization, booking analytics, and optimization insights
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Bookings Today"
            value={totalBookings}
            change={15.3}
            changeLabel="vs. yesterday"
            variant="primary"
            icon={<Calendar className="h-5 w-5" />}
          />
          <KPICard
            title="Average Utilization"
            value={`${avgUtilization}%`}
            change={8.7}
            changeLabel="vs. last week"
            variant="secondary"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Avg Meeting Duration"
            value={`${avgDuration.toFixed(1)}h`}
            change={-2.1}
            changeLabel="vs. last week"
            icon={<Clock className="h-5 w-5" />}
          />
          <KPICard
            title="Available Rooms"
            value="3/8"
            subtitle="Currently free"
            variant="success"
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Room Utilization Rates" subtitle="Usage efficiency by room type">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomUtilizationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  dataKey="room" 
                  type="category" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="utilization" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Booking Trends" subtitle="Daily booking volume and duration">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="bookings" />
                <YAxis yAxisId="duration" orientation="right" />
                <Tooltip />
                <Bar yAxisId="bookings" dataKey="bookings" fill="hsl(var(--secondary))" />
                <Line 
                  yAxisId="duration"
                  type="monotone" 
                  dataKey="duration" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <MeetingRoomAnalytics />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Most Popular Rooms</h3>
            <div className="space-y-3">
              {roomUtilizationData
                .sort((a, b) => b.bookings - a.bookings)
                .slice(0, 5)
                .map((room, index) => (
                  <div key={room.room} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{room.room}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{room.bookings} bookings</span>
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-primary' : 
                        index === 1 ? 'bg-secondary' : 'bg-muted'
                      }`} />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Peak Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">9:00 - 10:00 AM</span>
                <span className="text-sm font-medium">28 bookings</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">2:00 - 3:00 PM</span>
                <span className="text-sm font-medium">25 bookings</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">10:00 - 11:00 AM</span>
                <span className="text-sm font-medium">23 bookings</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">1:00 - 2:00 PM</span>
                <span className="text-sm font-medium">22 bookings</span>
              </div>
            </div>
          </div>

          <div className="kpi-card p-6">
            <h3 className="text-lg font-semibold mb-4">Room Optimization</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-800">Efficiency Win</div>
                <div className="text-xs text-green-600 mt-1">Phone booths have 90%+ utilization</div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Optimization Opportunity</div>
                <div className="text-xs text-yellow-600 mt-1">Boardroom underutilized at 65%</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Recommendation</div>
                <div className="text-xs text-blue-600 mt-1">Consider adding more meeting pods</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MeetingRooms;