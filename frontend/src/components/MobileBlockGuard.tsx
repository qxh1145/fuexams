import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const MobileBlockGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            const isBlockedPage = location.pathname === "/mobile-blocked";

            if (isMobile && !isBlockedPage) {
                navigate("/mobile-blocked", { replace: true });
            } else if (!isMobile && isBlockedPage) {
                navigate("/", { replace: true });
            }
        };

        // Initial check
        handleResize();

        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [navigate, location.pathname]);

    return null; // This component doesn't render anything
};

export default MobileBlockGuard;
