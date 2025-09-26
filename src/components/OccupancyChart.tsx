import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockData = [
  { time: '06:00', footfall: 12, occupancy: 8 },
  { time: '07:00', footfall: 28, occupancy: 18 },
  { time: '08:00', footfall: 65, occupancy: 45 },
  { time: '09:00', footfall: 120, occupancy: 89 },
  { time: '10:00', footfall: 180, occupancy: 145 },
  { time: '11:00', footfall: 195, occupancy: 165 },
  { time: '12:00', footfall: 210, occupancy: 180 },
  { time: '13:00', footfall: 185, occupancy: 155 },
  { time: '14:00', footfall: 175, occupancy: 145 },
  { time: '15:00', footfall: 160, occupancy: 125 },
  { time: '16:00', footfall: 140, occupancy: 110 },
  { time: '17:00', footfall: 95, occupancy: 75 },
  { time: '18:00', footfall: 45, occupancy: 35 }
];

export const OccupancyChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="footfall"
          stroke="hsl(var(--warning))"
          strokeWidth={3}
          name="Footfall"
          dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="occupancy"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          name="Occupancy"
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};