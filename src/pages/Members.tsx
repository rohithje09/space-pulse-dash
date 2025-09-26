import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';

const Members = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Members & Visitors</h1>
          <p className="text-muted-foreground mt-1">
            Visitor analytics, member insights, and conversion metrics
          </p>
        </div>
        
        <div className="kpi-card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Member vs visitor analytics, dwell time analysis, and conversion funnels
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Members;