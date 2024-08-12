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
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
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
            <g>
                <path d="M256,96C144.341,96,47.559,161.021,0,256c47.559,94.979,144.341,160,256,160c111.656,0,208.439-65.021,256-160
                    C464.441,161.021,367.656,96,256,96z M382.225,180.852c30.082,19.187,55.572,44.887,74.719,75.148
                    c-19.146,30.261-44.639,55.961-74.719,75.148C344.428,355.257,300.779,368,256,368c-44.78,0-88.428-12.743-126.225-36.852
                    c-30.08-19.188-55.57-44.888-74.717-75.148c19.146-30.262,44.637-55.962,74.717-75.148c1.959-1.25,3.938-2.461,5.929-3.65
                    C130.725,190.866,128,205.613,128,221c0,70.691,57.308,128,128,128c70.691,0,128-57.309,128-128
                    c0-15.387-2.725-30.134-7.703-43.799C378.285,178.39,380.266,179.602,382.225,180.852z M256,205c0,26.51-21.49,48-48,48
                    s-48-21.49-48-48s21.49-48,48-48S256,178.49,256,205z"
                    fill={gradient ? `url(#views-gradient_${className})` : 'var(--tg-theme-button-text-color)'}
                />
            </g>
        </svg>
    );
}