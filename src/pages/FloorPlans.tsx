import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/KPICard';
import { OccupancyHeatmap } from '@/components/OccupancyHeatmap';
import { Building2, Users, MapPin, Zap } from 'lucide-react';

const buildingFloors = {
  north: {
    name: 'North Building',
    floors: [
      { 
        id: 1, 
        name: 'Ground Floor - Lobby & Reception',
        occupancy: 45,
        capacity: 80,
        zones: ['Reception', 'Waiting Area', 'Cafe Corner', 'Info Desk'],
        heatmapData: [
          [85, 92, 78, 65, 45],
          [78, 88, 85, 72, 55],
          [65, 75, 80, 68, 50],
          [55, 68, 75, 65, 48]
        ]
      },
      { 
        id: 2, 
        name: 'Floor 1 - Co-working Space',
        occupancy: 128,
        capacity: 150,
        zones: ['Hot Desks', 'Quiet Zone', 'Collaboration Area', 'Phone Booths'],
        heatmapData: [
          [95, 88, 92, 85, 78],
          [88, 95, 90, 82, 75],
          [85, 90, 88, 80, 72],
          [78, 85, 82, 75, 68]
        ]
      },
      { 
        id: 3, 
        name: 'Floor 2 - Meeting Rooms',
        occupancy: 32,
        capacity: 60,
        zones: ['Large Conference', 'Small Meeting Rooms', 'Brainstorm Pods', 'Breakout Areas'],
        heatmapData: [
          [72, 68, 85, 75, 60],
          [68, 75, 80, 70, 55],
          [65, 72, 78, 68, 52],
          [58, 65, 70, 60, 48]
        ]
      },
      { 
        id: 4, 
        name: 'Floor 3 - Event Space',
        occupancy: 18,
        capacity: 200,
        zones: ['Main Event Hall', 'Staging Area', 'Networking Space', 'Storage'],
        heatmapData: [
          [25, 30, 45, 35, 20],
          [28, 35, 40, 32, 22],
          [22, 28, 35, 28, 18],
          [18, 22, 28, 25, 15]
        ]
      }
    ]
  },
  south: {
    name: 'South Building',
    floors: [
      { 
        id: 1, 
        name: 'Ground Floor - Reception & Cafe',
        occupancy: 38,
        capacity: 70,
        zones: ['Reception', 'Cafe & Bistro', 'Lounge', 'Retail Space'],
        heatmapData: [
          [75, 82, 68, 55, 42],
          [72, 78, 65, 52, 40],
          [68, 75, 62, 48, 38],
          [62, 68, 58, 45, 35]
        ]
      },
      { 
        id: 2, 
        name: 'Floor 1 - Hot Desks',
        occupancy: 85,
        capacity: 120,
        zones: ['Open Workspace', 'Focus Booths', 'Collaboration Tables', 'Print Station'],
        heatmapData: [
          [88, 85, 78, 72, 65],
          [85, 88, 82, 75, 68],
          [78, 82, 85, 78, 70],
          [72, 75, 78, 72, 65]
        ]
      },
      { 
        id: 3, 
        name: 'Floor 2 - Private Offices',
        occupancy: 24,
        capacity: 40,
        zones: ['Executive Suites', 'Team Rooms', 'Manager Offices', 'Assistant Desks'],
        heatmapData: [
          [65, 72, 58, 45, 38],
          [68, 75, 62, 48, 40],
          [62, 68, 65, 52, 42],
          [58, 62, 58, 48, 38]
        ]
      }
    ]
  },
  west: {
    name: 'West Building',
    floors: [
      { 
        id: 1, 
        name: 'Ground Floor - Enterprise Lobby',
        occupancy: 52,
        capacity: 90,
        zones: ['Grand Lobby', 'Security Desk', 'Visitor Center', 'Elevator Bank'],
        heatmapData: [
          [78, 85, 72, 68, 55],
          [75, 82, 78, 72, 58],
          [72, 78, 75, 68, 55],
          [68, 72, 70, 62, 50]
        ]
      },
      { 
        id: 2, 
        name: 'Floor 1-4 - Enterprise Suites',
        occupancy: 245,
        capacity: 280,
        zones: ['Dedicated Desks', 'Team Spaces', 'Executive Floors', 'Client Meeting Areas'],
        heatmapData: [
          [95, 92, 88, 85, 82],
          [92, 95, 90, 88, 85],
          [88, 90, 92, 85, 80],
          [85, 88, 85, 82, 78]
        ]
      },
      { 
        id: 5, 
        name: 'Floor 5 - Conference Center',
        occupancy: 45,
        capacity: 80,
        zones: ['Main Auditorium', 'Breakout Rooms', 'Tech Support', 'Catering Area'],
        heatmapData: [
          [65, 72, 78, 68, 55],
          [68, 75, 75, 65, 58],
          [62, 68, 72, 62, 52],
          [58, 62, 65, 58, 48]
        ]
      },
      { 
        id: 6, 
        name: 'Rooftop - Terrace & Events',
        occupancy: 15,
        capacity: 120,
        zones: ['Outdoor Terrace', 'Garden Area', 'Event Space', 'Bar & Lounge'],
        heatmapData: [
          [25, 32, 28, 22, 18],
          [28, 35, 30, 25, 20],
          [22, 28, 32, 28, 22],
          [18, 22, 25, 22, 18]
        ]
      }
    ]
  },
  east: {
    name: 'East Building',
    floors: [
      { 
        id: 1, 
        name: 'Ground Floor - Startup Hub',
        occupancy: 68,
        capacity: 100,
        zones: ['Innovation Lab', 'Startup Desks', 'Mentor Rooms', 'Demo Area'],
        heatmapData: [
          [85, 88, 82, 75, 68],
          [82, 85, 88, 78, 72],
          [78, 82, 85, 82, 75],
          [72, 78, 80, 75, 68]
        ]
      },
      { 
        id: 2, 
        name: 'Floor 1 - Tech Labs',
        occupancy: 45,
        capacity: 80,
        zones: ['Hardware Lab', 'Software Dev Area', 'Testing Stations', 'Server Room'],
        heatmapData: [
          [68, 75, 85, 78, 65],
          [72, 78, 82, 75, 68],
          [65, 72, 78, 72, 62],
          [58, 65, 72, 68, 58]
        ]
      },
      { 
        id: 3, 
        name: 'Floor 2 - Media Studios',
        occupancy: 28,
        capacity: 50,
        zones: ['Podcast Studios', 'Video Production', 'Editing Suites', 'Sound Booths'],
        heatmapData: [
          [65, 72, 68, 58, 45],
          [68, 75, 72, 62, 48],
          [62, 68, 75, 65, 52],
          [55, 62, 68, 60, 48]
        ]
      },
      { 
        id: 4, 
        name: 'Floor 3 - Gaming & Recreation',
        occupancy: 35,
        capacity: 60,
        zones: ['Gaming Lounge', 'VR Zone', 'Recreation Area', 'Wellness Room'],
        heatmapData: [
          [72, 78, 65, 58, 48],
          [75, 82, 68, 62, 52],
          [68, 75, 72, 65, 55],
          [62, 68, 68, 58, 50]
        ]
      }
    ]
  }
};

const FloorPlans = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('north');
  const [selectedFloor, setSelectedFloor] = useState(1);

  const currentBuilding = buildingFloors[selectedBuilding as keyof typeof buildingFloors];
  const currentFloor = currentBuilding.floors.find(f => f.id === selectedFloor);

  const totalOccupancy = currentBuilding.floors.reduce((sum, floor) => sum + floor.occupancy, 0);
  const totalCapacity = currentBuilding.floors.reduce((sum, floor) => sum + floor.capacity, 0);
  const utilizationRate = Math.round((totalOccupancy / totalCapacity) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Floor Plans</h1>
          <p className="text-muted-foreground mt-1">
            Interactive floor layouts with real-time occupancy heatmaps
          </p>
        </div>

        <Tabs defaultValue="north" onValueChange={setSelectedBuilding} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="north">North Building</TabsTrigger>
            <TabsTrigger value="south">South Building</TabsTrigger>
            <TabsTrigger value="west">West Building</TabsTrigger>
            <TabsTrigger value="east">East Building</TabsTrigger>
          </TabsList>

          {Object.entries(buildingFloors).map(([key, building]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                  title="Total Occupancy"
                  value={`${building.floors.reduce((sum, floor) => sum + floor.occupancy, 0)}`}
                  subtitle={`/ ${building.floors.reduce((sum, floor) => sum + floor.capacity, 0)} capacity`}
                  variant="primary"
                  icon={<Users className="h-5 w-5" />}
                />
                <KPICard
                  title="Utilization Rate"
                  value={`${Math.round((building.floors.reduce((sum, floor) => sum + floor.occupancy, 0) / building.floors.reduce((sum, floor) => sum + floor.capacity, 0)) * 100)}%`}
                  change={Math.random() * 10 - 5}
                  variant="secondary"
                  icon={<Zap className="h-5 w-5" />}
                />
                <KPICard
                  title="Active Floors"
                  value={building.floors.length}
                  subtitle="All operational"
                  icon={<Building2 className="h-5 w-5" />}
                />
                <KPICard
                  title="Total Zones"
                  value={building.floors.reduce((sum, floor) => sum + floor.zones.length, 0)}
                  subtitle="Monitored areas"
                  variant="success"
                  icon={<MapPin className="h-5 w-5" />}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="kpi-card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Floor Selection</h3>
                      <div className="text-sm text-muted-foreground">
                        Click on a floor to view detailed heatmap
                      </div>
                    </div>
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      {building.floors.map((floor) => (
                        <button
                          key={floor.id}
                          onClick={() => setSelectedFloor(floor.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedFloor === floor.id 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-sm">{floor.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {floor.occupancy}/{floor.capacity} people
                              </div>
                            </div>
                            <div className={`text-xs px-2 py-1 rounded ${
                              (floor.occupancy / floor.capacity) > 0.8 
                                ? 'bg-red-100 text-red-800' 
                                : (floor.occupancy / floor.capacity) > 0.6 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {Math.round((floor.occupancy / floor.capacity) * 100)}%
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            {floor.zones.map((zone, index) => (
                              <div key={zone} className="text-xs text-muted-foreground">
                                {zone}
                              </div>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {currentFloor && (
                    <>
                      <div className="kpi-card p-6">
                        <h3 className="text-lg font-semibold mb-4">{currentFloor.name}</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Occupancy</span>
                              <span className="font-medium">
                                {currentFloor.occupancy}/{currentFloor.capacity}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${(currentFloor.occupancy / currentFloor.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Zones</div>
                            {currentFloor.zones.map((zone, index) => (
                              <div key={zone} className="flex justify-between text-sm">
                                <span>{zone}</span>
                                <span className="text-muted-foreground">
                                  {Math.floor(Math.random() * 30) + 60}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="kpi-card p-6">
                        <h3 className="text-lg font-semibold mb-4">Occupancy Heatmap</h3>
                        <OccupancyHeatmap data={currentFloor.heatmapData} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-4">
                          <span>Low Density</span>
                          <span>High Density</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FloorPlans;