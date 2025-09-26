import React from 'react';

interface HeatmapCellProps {
  value: number;
  label: string;
  maxValue: number;
}

const HeatmapCell: React.FC<HeatmapCellProps> = ({ value, label, maxValue }) => {
  const intensity = Math.min(value / maxValue, 1);
  const getColor = () => {
    if (intensity < 0.2) return 'bg-primary/10';
    if (intensity < 0.4) return 'bg-primary/25';
    if (intensity < 0.6) return 'bg-primary/50';
    if (intensity < 0.8) return 'bg-primary/75';
    return 'bg-primary';
  };

  const getTextColor = () => {
    return intensity > 0.6 ? 'text-white' : 'text-foreground';
  };

  return (
    <div 
      className={`${getColor()} ${getTextColor()} p-3 rounded-lg text-center transition-all duration-200 hover:scale-105 cursor-pointer`}
    >
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs opacity-75">{value}%</div>
    </div>
  );
};

const mockHeatmapData = [
  // Morning (6-12)
  [
    { label: 'Lobby', value: 15 },
    { label: 'Hot Desk', value: 35 },
    { label: 'Meeting 1', value: 60 },
    { label: 'Meeting 2', value: 40 },
    { label: 'Private', value: 80 },
    { label: 'Lounge', value: 25 }
  ],
  // Afternoon (12-18)
  [
    { label: 'Lobby', value: 45 },
    { label: 'Hot Desk', value: 85 },
    { label: 'Meeting 1', value: 95 },
    { label: 'Meeting 2', value: 75 },
    { label: 'Private', value: 90 },
    { label: 'Lounge', value: 65 }
  ],
  // Evening (18-24)
  [
    { label: 'Lobby', value: 20 },
    { label: 'Hot Desk', value: 30 },
    { label: 'Meeting 1', value: 25 },
    { label: 'Meeting 2', value: 15 },
    { label: 'Private', value: 45 },
    { label: 'Lounge', value: 35 }
  ]
];

const timeLabels = ['Morning\n(6AM-12PM)', 'Afternoon\n(12PM-6PM)', 'Evening\n(6PM-12AM)'];

export const OccupancyHeatmap: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Space Utilization by Time Period</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            {[10, 25, 50, 75, 100].map((intensity) => (
              <div
                key={intensity}
                className={`w-3 h-3 rounded-sm bg-primary/${intensity === 100 ? '' : intensity}`}
                style={{ 
                  backgroundColor: intensity === 100 ? 'hsl(var(--primary))' : `hsl(var(--primary) / 0.${intensity})` 
                }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockHeatmapData.map((period, periodIndex) => (
          <div key={periodIndex}>
            <h5 className="text-sm font-medium mb-2 text-muted-foreground">
              {timeLabels[periodIndex]}
            </h5>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {period.map((zone, zoneIndex) => (
                <HeatmapCell
                  key={zoneIndex}
                  value={zone.value}
                  label={zone.label}
                  maxValue={100}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};