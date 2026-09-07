import {useAuth} from "@clerk/expo";
import {useMemo} from "react";
import {createClerkSupabaseClient} from "../libs/supabase";

export function useSupabase(){
    const {getToken} = useAuth();

    const client = useMemo(() => {
        return createClerkSupabaseClient(() => getToken());
    }, [getToken]);

    return client;
};