// Supabase 客户端初始化
// 这个文件在所有需要连接 Supabase 的页面中引入

const SUPABASE_URL = 'https://raschybuopdiqifftabn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_953qD5FwPW4GqAaJyZeIPQ_nugq1L_g';

// 初始化 Supabase 客户端
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 导出供其他文件使用
window.supabase_client = supabaseClient;
