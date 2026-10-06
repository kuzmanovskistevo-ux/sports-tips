import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ubprpztvekjtsgaoakud.supabase.co'
const supabaseKey = 'sb_publishable_3GDzr7KmuNchWzhrGBCPpw_9vzgKJ_e'

export const supabase = createClient(supabaseUrl, supabaseKey)