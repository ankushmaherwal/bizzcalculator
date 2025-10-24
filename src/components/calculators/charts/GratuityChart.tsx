'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface GratuityChartProps {
  data: {
    monthlySalary: number;
    yearsOfService: number;
    gratuityPerYear: number;
    totalGratuity: number;
    maximumLimit: number;
  };
}

export function GratuityChart({ data }: GratuityChartProps) {
  const chartData = [
    {
      name: 'Monthly Salary',
      value: data.monthlySalary,
      color: '#3B82F6',
    },
    {
      name: 'Gratuity per Year',
      value: data.gratuityPerYear,
      color: '#8B5CF6',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600 font-medium">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color || '#000', fontSize: '14px' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Monthly Salary: <span className="font-semibold">{formatCurrency(data.monthlySalary)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Years of Service: <span className="font-semibold">{data.yearsOfService} years</span>
        </p>
      </div>
    </div>
  );
}
