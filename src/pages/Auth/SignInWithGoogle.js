import supabase from "../../utils/supabase"

export const loader = async ()=>{
    await supabase.auth.signInWithOAuth({
        provider:"google"
    });

    return null;
}