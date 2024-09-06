import clsx from 'clsx';
import type { ReactNode } from 'react'
import React from 'react'
import { Icon } from '../Icon/Icon';
import CheckIcon from '@/shared/assets/icons/check-icon.svg';
import cls from './CircleProgress.module.scss'

interface CircleProgressPorps {
  children?: ReactNode;
  curPercent?: number;
  className?: string;
  width?: number;
  narrowWidth?: number;
  startColor?: string;
  stopColor?: string;
  disabled?: boolean;
  id?: string;
}

export const CircleProgress: React.FC<CircleProgressPorps> = (props) => {
  const {
    children,
    curPercent = 0,
    width = 200,
    className = '',
    startColor = 'var(--highlight-color)',
    stopColor = 'var(--highlight-color)',
    id = 'grad',
    disabled = false,
    ...other
  } = props


  return (
    <div className={clsx(cls.circle, className, {
      [cls.disabled]: disabled
    })} {...other}>
      <svg
        viewBox="0 0 64 64"
        width={width}
        className={cls.svg}
      >
        <defs>
          <linearGradient
            id={id}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" style={{ stopColor: startColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: stopColor, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle
          className={cls.outerCircle}
          r="50%"
          strokeWidth={8}
          cx="50%"
          cy="50%"
        />
        <circle
          className={cls.innerCircle}
          stroke={`url(#${id})`}
          r="50%"
          strokeWidth={8}
          cx="50%"
          cy="50%"
          strokeDasharray="200 200"
          strokeDashoffset={2 * curPercent - 200}
          strokeLinecap="round"
        />
      </svg>
      {
        <div className={cls.content}>
          {
            curPercent >= 100
            ? <Icon width={15} height={15} Svg={CheckIcon} className={cls.checkIcon} />
            : children
          }
        </div>
        
      }


    </div>
  )
}
