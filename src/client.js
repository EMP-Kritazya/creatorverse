import { createClient } from "@supabase/supabase-js";

const URL = "https://wxasdxreuyjaymsvumzl.supabase.co";
const API_KEY = "sb_publishable_Qqde2Y9WQ3heYhCo6Xlu9Q_5zc37BKd";

export const supabase = createClient(URL, API_KEY);
