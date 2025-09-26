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

interface OccupancyHeatmapProps {
  data?: number[][];
}

export const OccupancyHeatmap: React.FC<OccupancyHeatmapProps> = ({ data }) => {
  // Convert numeric data to proper format if provided, otherwise use mock data
  const displayData = data ? 
    data.map((row, rowIndex) => 
      row.map((value, colIndex) => ({
        label: `Zone ${colIndex + 1}`,
        value: Math.round(value)
      }))
    ) : mockHeatmapData;

  return (
    <div className="space-y-2">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${displayData[0]?.length || 5}, 1fr)` }}>
        {displayData[0]?.map((cell, index) => (
          <div
            key={index}
            className={`h-8 rounded-sm transition-all duration-200 hover:scale-105 ${
              cell.value < 20 ? 'bg-primary/10' :
              cell.value < 40 ? 'bg-primary/25' :
              cell.value < 60 ? 'bg-primary/50' :
              cell.value < 80 ? 'bg-primary/75' : 'bg-primary'
            }`}
            title={`${cell.label}: ${cell.value}%`}
          />
        ))}
      </div>
    </div>
  );
};