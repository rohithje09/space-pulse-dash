import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { OccupancyChart } from '@/components/OccupancyChart';
import { OccupancyHeatmap } from '@/components/OccupancyHeatmap';
import { MeetingRoomAnalytics } from '@/components/MeetingRoomAnalytics';
import { 
  Users, 
  Building, 
  Clock, 
  TrendingUp, 
  Calendar,
  UserCheck,
  Filter,
  Download
} from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">
              Real-time footfall and occupancy analytics for WeWork Cherry Hills
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="dashboard-grid">
          <KPICard
            title="Total Footfall Today"
            value="3,294"
            change={23}
            variant="primary"
            icon={<Users className="h-5 w-5" />}
            subtitle="Visitors & Members"
          />
          
          <KPICard
            title="Current Occupancy"
            value="287"
            change={-5}
            variant="secondary"
            icon={<Building className="h-5 w-5" />}
            subtitle="72% of capacity"
          />
          
          <KPICard
            title="Peak Hour Traffic"
            value="328"
            changeLabel="at 2:00 PM"
            icon={<TrendingUp className="h-5 w-5" />}
            subtitle="Today's maximum"
          />
          
          <KPICard
            title="Avg. Dwell Time"
            value="4h 25m"
            change={8}
            variant="success"
            icon={<Clock className="h-5 w-5" />}
            subtitle="Member average"
          />
          
          <KPICard
            title="Meeting Room Utilization"
            value="68%"
            change={12}
            icon={<Calendar className="h-5 w-5" />}
            subtitle="148 bookings today"
          />
          
          <KPICard
            title="Visitor-to-Member Ratio"
            value="28:72"
            change={2}
            icon={<UserCheck className="h-5 w-5" />}
            subtitle="28% visitors"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Today's Footfall & Occupancy"
            subtitle="Real-time traffic patterns throughout the day"
            actions={
              <div className="flex gap-1">
                <button className="px-3 py-1 text-xs bg-muted rounded">5min</button>
                <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded">15min</button>
              </div>
            }
          >
            <OccupancyChart />
          </ChartCard>
          
          <ChartCard
            title="Space Utilization Heatmap"
            subtitle="Zone-wise occupancy patterns by time period"
          >
            <OccupancyHeatmap />
          </ChartCard>
        </div>

        {/* Meeting Room Analytics */}
        <ChartCard
          title="Meeting Room Analytics"
          subtitle="Detailed utilization and booking statistics"
        >
          <MeetingRoomAnalytics />
        </ChartCard>

        {/* Real-time Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="kpi-card p-6">
            <h3 className="font-semibold mb-4">Live Building Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ground Floor</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">Normal (78%)</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">First Floor</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm">Busy (92%)</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Second Floor</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">Normal (65%)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="kpi-card p-6">
            <h3 className="font-semibold mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-warning">Capacity Alert</div>
                <div className="text-muted-foreground">First Floor at 95% capacity</div>
                <div className="text-xs text-muted-foreground">2 minutes ago</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-success">Peak Period</div>
                <div className="text-muted-foreground">Lunch hour traffic spike detected</div>
                <div className="text-xs text-muted-foreground">15 minutes ago</div>
              </div>
            </div>
          </div>
          
          <div className="kpi-card p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm p-2 hover:bg-muted rounded transition-colors">
                📊 View Live Cameras
              </button>
              <button className="w-full text-left text-sm p-2 hover:bg-muted rounded transition-colors">
                📈 Generate Report
              </button>
              <button className="w-full text-left text-sm p-2 hover:bg-muted rounded transition-colors">
                ⚠️ Send Alert
              </button>
              <button className="w-full text-left text-sm p-2 hover:bg-muted rounded transition-colors">
                🔍 Space Optimization
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
