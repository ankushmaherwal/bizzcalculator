'use client';

import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Label } from './Label';

interface SliderWithInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  unit?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function SliderWithInput({
  value,
  onChange,
  min,
  max,
  step,
  label,
  unit = '',
  formatValue = (val) => val.toString(),
  className = '',
}: SliderWithInputProps) {
  const [inputValue, setInputValue] = useState(formatValue(value));

  useEffect(() => {
    setInputValue(formatValue(value));
  }, [value, formatValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const numericValue = parseFloat(inputVal);
    
    // Only update if it's a valid number within range
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange(numericValue);
    }
    // Always update the display value to allow typing
    setInputValue(inputVal);
  };

  const handleInputBlur = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue) || numericValue < min || numericValue > max) {
      // Reset to current valid value
      setInputValue(formatValue(value));
    } else {
      // Update with the valid value
      setInputValue(formatValue(numericValue));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label htmlFor={`slider-${label}`} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      
      <div className="space-y-2">
        <div className="slider-container">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
            }}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatValue(min)}{unit && ` ${unit}`}</span>
          <span>{formatValue(max)}{unit && ` ${unit}`}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          id={`slider-${label}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-24 text-center"
        />
        {unit && <span className="text-sm text-gray-500 ml-2">{unit}</span>}
      </div>
    </div>
  );
}

