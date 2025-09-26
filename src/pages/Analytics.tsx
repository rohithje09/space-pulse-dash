import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { Building2, TrendingUp, Users, Clock, MapPin } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const buildingData = [
  {
    name: 'North Building',
    totalFootfall: 2847,
    currentOccupancy: 78,
    capacity: 450,
    peakHour: '2:00 PM',
    avgDwellTime: '4.2h',
    utilizationRate: 85,
    zones: ['Lobby', 'Co-working Floor 1-3', 'Meeting Rooms', 'Event Space'],
    weeklyTrend: [
      { day: 'Mon', footfall: 420, occupancy: 82 },
      { day: 'Tue', footfall: 380, occupancy: 75 },
      { day: 'Wed', footfall: 450, occupancy: 89 },
      { day: 'Thu', footfall: 425, occupancy: 84 },
      { day: 'Fri', footfall: 410, occupancy: 81 },
      { day: 'Sat', footfall: 290, occupancy: 58 },
      { day: 'Sun', footfall: 180, occupancy: 35 }
    ]
  },
  {
    name: 'South Building',
    totalFootfall: 1962,
    currentOccupancy: 65,
    capacity: 320,
    peakHour: '11:00 AM',
    avgDwellTime: '3.8h',
    utilizationRate: 72,
    zones: ['Reception', 'Hot Desks', 'Private Offices', 'Cafe'],
    weeklyTrend: [
      { day: 'Mon', footfall: 295, occupancy: 68 },
      { day: 'Tue', footfall: 310, occupancy: 72 },
      { day: 'Wed', footfall: 285, occupancy: 66 },
      { day: 'Thu', footfall: 320, occupancy: 74 },
      { day: 'Fri', footfall: 298, occupancy: 69 },
      { day: 'Sat', footfall: 245, occupancy: 56 },
      { day: 'Sun', footfall: 150, occupancy: 42 }
    ]
  },
  {
    name: 'West Building',
    totalFootfall: 3205,
    currentOccupancy: 92,
    capacity: 520,
    peakHour: '3:30 PM',
    avgDwellTime: '5.1h',
    utilizationRate: 91,
    zones: ['Enterprise Floors 1-4', 'Executive Suites', 'Conference Center', 'Rooftop Terrace'],
    weeklyTrend: [
      { day: 'Mon', footfall: 480, occupancy: 95 },
      { day: 'Tue', footfall: 465, occupancy: 92 },
      { day: 'Wed', footfall: 495, occupancy: 98 },
      { day: 'Thu', footfall: 485, occupancy: 96 },
      { day: 'Fri', footfall: 470, occupancy: 93 },
      { day: 'Sat', footfall: 320, occupancy: 68 },
      { day: 'Sun', footfall: 210, occupancy: 45 }
    ]
  },
  {
    name: 'East Building',
    totalFootfall: 2156,
    currentOccupancy: 71,
    capacity: 380,
    peakHour: '1:15 PM',
    avgDwellTime: '4.5h',
    utilizationRate: 79,
    zones: ['Startup Hub', 'Tech Labs', 'Podcast Studios', 'Gaming Lounge'],
    weeklyTrend: [
      { day: 'Mon', footfall: 325, occupancy: 74 },
      { day: 'Tue', footfall: 340, occupancy: 78 },
      { day: 'Wed', footfall: 315, occupancy: 72 },
      { day: 'Thu', footfall: 355, occupancy: 81 },
      { day: 'Fri', footfall: 330, occupancy: 75 },
      { day: 'Sat', footfall: 280, occupancy: 64 },
      { day: 'Sun', footfall: 190, occupancy: 49 }
    ]
  }
];

const overallData = {
  totalFootfall: buildingData.reduce((sum, building) => sum + building.totalFootfall, 0),
  totalOccupancy: buildingData.reduce((sum, building) => sum + building.currentOccupancy, 0),
  totalCapacity: buildingData.reduce((sum, building) => sum + building.capacity, 0),
  avgUtilization: Math.round(buildingData.reduce((sum, building) => sum + building.utilizationRate, 0) / buildingData.length)
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

const Analytics = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('overview');

  const getCurrentBuildingData = () => {
    if (selectedBuilding === 'overview') return null;
    return buildingData.find(b => b.name.toLowerCase().includes(selectedBuilding));
  };

  const buildingStats = buildingData.map((building, index) => ({
    name: building.name,
    occupancy: building.currentOccupancy,
    utilization: building.utilizationRate,
    fill: COLORS[index]
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights across all buildings and zones
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="north">North Building</TabsTrigger>
            <TabsTrigger value="south">South Building</TabsTrigger>
            <TabsTrigger value="west">West Building</TabsTrigger>
            <TabsTrigger value="east">East Building</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Footfall"
                value={overallData.totalFootfall.toLocaleString()}
                change={12.5}
                changeLabel="vs. last week"
                variant="primary"
                icon={<Users className="h-5 w-5" />}
              />
              <KPICard
                title="Current Occupancy"
                value={`${overallData.totalOccupancy}/${overallData.totalCapacity}`}
                subtitle={`${Math.round((overallData.totalOccupancy / overallData.totalCapacity) * 100)}% capacity`}
                change={8.2}
                variant="secondary"
                icon={<Building2 className="h-5 w-5" />}
              />
              <KPICard
                title="Avg Utilization"
                value={`${overallData.avgUtilization}%`}
                change={5.3}
                variant="success"
                icon={<TrendingUp className="h-5 w-5" />}
              />
              <KPICard
                title="Active Buildings"
                value="4"
                subtitle="All operational"
                icon={<MapPin className="h-5 w-5" />}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard title="Building Occupancy Distribution" subtitle="Current occupancy by building">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={buildingStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="occupancy"
                      label={({name, occupancy}) => `${name.split(' ')[0]}: ${occupancy}`}
                    >
                      {buildingStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Utilization Rates" subtitle="Efficiency across buildings">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={buildingStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          {['north', 'south', 'west', 'east'].map((building) => {
            const data = buildingData.find(b => b.name.toLowerCase().includes(building));
            if (!data) return null;

            return (
              <TabsContent key={building} value={building} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <KPICard
                    title="Total Footfall"
                    value={data.totalFootfall.toLocaleString()}
                    change={Math.random() * 20 - 10}
                    variant="primary"
                    icon={<Users className="h-5 w-5" />}
                  />
                  <KPICard
                    title="Current Occupancy"
                    value={`${data.currentOccupancy}/${data.capacity}`}
                    subtitle={`${Math.round((data.currentOccupancy / data.capacity) * 100)}% capacity`}
                    variant="secondary"
                    icon={<Building2 className="h-5 w-5" />}
                  />
                  <KPICard
                    title="Peak Hour"
                    value={data.peakHour}
                    subtitle="Busiest time today"
                    icon={<Clock className="h-5 w-5" />}
                  />
                  <KPICard
                    title="Utilization Rate"
                    value={`${data.utilizationRate}%`}
                    change={Math.random() * 10 - 5}
                    variant="success"
                    icon={<TrendingUp className="h-5 w-5" />}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <ChartCard title="Weekly Footfall Trend" subtitle="Daily visitor counts">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data.weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="footfall" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard title="Weekly Occupancy Rate" subtitle="Daily capacity utilization">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data.weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="occupancy" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>

                <div className="kpi-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Zone Breakdown - {data.name}</h3>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {data.zones.map((zone, index) => (
                      <div key={zone} className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground">{zone}</div>
                        <div className="text-2xl font-bold mt-1">
                          {Math.floor(Math.random() * 50) + 20}%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">utilization</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;