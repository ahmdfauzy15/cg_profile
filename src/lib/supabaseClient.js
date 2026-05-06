import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nxtropnndcgjcoflgnwa.supabase.co";
const supabaseAnonKey = "sb_publishable_RtsY8lfojKcYfteybaumkA_lbxiKeEM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("master_kategori_pksi")
      .select("*", { count: 'exact', head: true });
    
    if (error) throw error;
    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    console.error("Supabase connection failed:", error.message);
    return false;
  }
};