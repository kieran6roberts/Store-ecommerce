import * as React from "react";

const getUser = async (cookie = "") => {
    if (typeof window === "undefined" && window.__user) {
        return window.__user;
    }

    const headers = cookie ? { 
        headers: { 
            cookie 
        }
    } : {};

    const response = await fetch("/api/me", headers);

    if (!response.ok) {
        delete window.__user;
        return null;
    }

    const user = await response.json();

    if (typeof window === "undefined") {
        window.__user = user;
    }

    return user;

};

export const useGetUser = () => {
    const [ loading, setLoading ] = React.useState(
        () => !(typeof window !== "undefined" && window.__user)
      );

    const [ profile, setProfile ] = React.useState(() => {
        if (typeof window === "undefined") {
          return null;
        }
    
        return window.__user ?? null;

      });

    React.useEffect(() => {
        if (!loading && profile) {
            return;
        }

        setLoading(true);

        let mounted = true;

        getUser()
            .then(user => {
                if (mounted) {
                    setProfile(user);
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };

    }, []);

    return {
        loading,
        profile
    };
};