import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToUpcomingEvents = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#upcoming-events') {
            const element = document.getElementById('upcoming-events');
            if (element) {
                const headerOffset = document.querySelector('.header-container').offsetHeight;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                console.log({headerOffset, elementPosition, offsetPosition}); // Debug output

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }
    }, [location]);

    return null;
};

export default ScrollToUpcomingEvents;
