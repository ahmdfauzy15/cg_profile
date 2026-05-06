const supabaseUrl = "https://nxtropnndcgjcoflgnwa.supabase.co";
const supabaseAnonKey = "sb_publishable_RtsY8lfojKcYfteybaumkA_lbxiKeEM";

export const fetchData = async (table) => {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};