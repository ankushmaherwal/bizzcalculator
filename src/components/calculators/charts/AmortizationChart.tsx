'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AmortizationEntry } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/calculations';

interface AmortizationChartProps {
  schedule: AmortizationEntry[];
}

export function AmortizationChart({ schedule }: AmortizationChartProps) {
  // Sample data for better visualization (every 6 months)
  const chartData = schedule
    .filter((_, index) => index % 6 === 0 || index === schedule.length - 1)
    .map(entry => ({
      month: entry.month,
      principal: entry.principal,
      interest: entry.interest,
      balance: entry.balance,
    }));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: number }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">Month {label}</p>
          {payload.map((entry: { name: string; value: number; color: string }, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={(value) => `M${value}`}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => formatNumber(value / 1000, 0) + 'K'}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="principal" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Principal"
          />
          <Line 
            type="monotone" 
            dataKey="interest" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Interest"
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Remaining Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
