import React, { memo } from 'react';
import clsx from 'clsx';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    disabled?: boolean;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 22,
        height = 22,
        clickable,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={clsx(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                disabled={props.disabled}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
