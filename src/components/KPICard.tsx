import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success';
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs. last period',
  variant = 'default',
  subtitle,
  icon,
  className = ''
}) => {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus className="h-4 w-4" />;
    return change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return 'trend-neutral';
    return change > 0 ? 'trend-up' : 'trend-down';
  };

  const getCardClass = () => {
    const baseClass = 'kpi-card p-6';
    switch (variant) {
      case 'primary':
        return `${baseClass} kpi-card-primary`;
      case 'secondary':
        return `${baseClass} kpi-card-secondary`;
      case 'success':
        return `${baseClass} kpi-card-success`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={`${getCardClass()} ${className} fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && <div className="text-current opacity-80">{icon}</div>}
            <h3 className="text-sm font-medium opacity-90">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold">{value}</div>
            {subtitle && (
              <div className="text-sm opacity-75">{subtitle}</div>
            )}
          </div>
        </div>
      </div>
      
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-4 text-sm ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="font-medium">
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="opacity-75">{changeLabel}</span>
        </div>
      )}
    </div>
  );
};