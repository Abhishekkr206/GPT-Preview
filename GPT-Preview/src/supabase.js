import { createClient } from "@supabase/supabase-js";

// Supabase config
const supabaseUrl = "https://fcpmffwoljugugmlxjmk.supabase.co";
const supabaseKey = "sb_publishable_ehJm9GuIAekAOjyNN-JL5g_L975IwVz";

export const supabase = createClient(supabaseUrl, supabaseKey);