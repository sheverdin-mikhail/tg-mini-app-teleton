import cls from './ViewsIcon.module.scss'

interface ViewsIconProps {
    className?: string;
    width?: number;
    height?: number;
    gradient?: boolean; 
}
import clsx from 'clsx';

export const ViewsIcon: React.FC<ViewsIconProps> = (props) => {
    const { className, width = 20, height = 20, gradient = false } = props;

return (
        <svg 
            className={clsx(cls.icon, {
                [cls.fill]: !gradient 
            }, className)} 
            width={width} 
            height={height}
            viewBox="0 0 22 22" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
                

             <defs>
                <linearGradient id={`views-gradient_${className}`} x1="0%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" style={{
                        stopColor:"rgba(1,86,143,1)", 
                        stopOpacity:"1"
                    }} />
                    <stop offset="38%" style={{
                        stopColor:"rgba(0,179,221,1)", 
                        stopOpacity:"1"
                    }} />
                    <stop offset="78%" style={{
                        stopColor:"rgba(123,92,196,1)", 
                        stopOpacity:"1"
                    }} />
                </linearGradient>
            </defs>
            <path d="M11 4.8125C4.125 4.8125 1.375 11 1.375 11C1.375 11 4.125 17.1875 11 17.1875C17.875 17.1875 20.625 11 20.625 11C20.625 11 17.875 4.8125 11 4.8125Z" stroke={gradient ? `url(#views-gradient_${className})` : 'var(--tg-theme-button-text-color)'} strokeWidth="1.5" strokeLinecap="round" fill='none' strokeLinejoin="round"/>
            <path d="M11 14.4375C12.8985 14.4375 14.4375 12.8985 14.4375 11C14.4375 9.10152 12.8985 7.5625 11 7.5625C9.10152 7.5625 7.5625 9.10152 7.5625 11C7.5625 12.8985 9.10152 14.4375 11 14.4375Z" stroke={gradient ? `url(#views-gradient_${className})` : 'var(--tg-theme-button-text-color)'} fill='none' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}