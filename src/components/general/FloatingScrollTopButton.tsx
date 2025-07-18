import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react'; // Or any icon

export default function FloatingScrollTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setShow(window.scrollY > 300);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 rounded-full p-3 bg-black/70 text-white shadow-lg hover:bg-black transition-opacity ${
                show ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
}
