"use client";
import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export const BlurText = ({
    text,
    delay = 200,
    className = '',
}: {
    text: string;
    delay?: number;
    className?: string;
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    const springs = useSpring({
        from: { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' },
        to: inView
            ? { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' }
            : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' },
        config: { tension: 300, friction: 10 },
        delay,
    });

    return (
        <animated.div ref={ref} style={springs} className={className}>
            {text}
        </animated.div>
    );
};
