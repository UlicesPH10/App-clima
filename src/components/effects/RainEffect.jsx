import React, { useMemo } from 'react';

const RainEffect = () => {
    
    const drops = useMemo(() => {
        const dropCount = 100;
        return Array.from({ length: dropCount }).map((_, i) => {
            const randomLeft = Math.floor(Math.random() * 100);
            const randomDelay = Math.random() * -20;
            const randomDuration = 0.5 + Math.random() * 1.5;
            const randomOpacity = 0.1 + Math.random() * 0.3;

            const isDistant = randomDuration > 1.2;
            const widthClass = isDistant ? 'w-[1px]' : 'w-[2px]';
            const heightClass = isDistant ? 'h-4' : 'h-8';
            const blurClass = isDistant ? 'blur-[1px]' : 'blur-0';

            return {
                id: i,
                style: {
                    left: `${randomLeft}%`,
                    animationDuration: `${randomDuration}s`,
                    animationDelay: `${randomDelay}s`,
                    opacity: randomOpacity,
                },
                className: `absolute top-0 ${widthClass} ${heightClass} ${blurClass} bg-gradient-to-b from-transparent to-blue-200/80 rounded-full animate-rain`
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {drops.map((drop) => (
                <div key={drop.id} className={drop.className} style={drop.style} />
            ))}
        </div>
    );
};

export default RainEffect;
