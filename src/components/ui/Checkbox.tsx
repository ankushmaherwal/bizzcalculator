import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  className?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => {
  return (
    <RadixCheckbox.Root
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600',
        className
      )}
      {...props}
      ref={ref}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-current">
        <Check className="h-4 w-4" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});
Checkbox.displayName = 'Checkbox';
