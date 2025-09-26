import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';

const SpaceUtilization = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Space Utilization</h1>
          <p className="text-muted-foreground mt-1">
            Detailed zone-based analytics and occupancy insights
          </p>
        </div>
        
        <div className="kpi-card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Zone-based analytics, floor plan heatmaps, and detailed space utilization metrics
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SpaceUtilization;