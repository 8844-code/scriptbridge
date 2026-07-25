// Supabase 客户端初始化
// 这个文件在所有需要连接 Supabase 的页面中引入

const SUPABASE_URL = 'https://raschybuopdiqifftabn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_953qD5FwPW4GqAaJyZeIPQ_nugq1L_g';
const SCRIPTBRIDGE_SITE_URL = 'https://scriptbridge.cn';

// 初始化 Supabase 客户端
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 导出供其他文件使用
window.supabase_client = supabaseClient;

const SCRIPTBRIDGE_PUBLIC_SCRIPT_COLUMNS = [
  'id',
  'title',
  'description',
  'script_type',
  'price',
  'created_at',
  'user_id',
  'rights_type',
  'region',
  'rights_years',
  'status',
  'preview_text'
].join(', ');

function scriptbridgeUrl(path = '') {
  const suffix = String(path || '');
  return SCRIPTBRIDGE_SITE_URL + (suffix.startsWith('/') ? suffix : '/' + suffix);
}

function scriptbridgeEscapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function scriptbridgeStoragePathFromValue(value) {
  if (!value) return null;
  const raw = String(value);
  const marker = '/storage/v1/object/public/scripts-files/';
  const markerIndex = raw.indexOf(marker);

  if (markerIndex !== -1) {
    return decodeURIComponent(raw.slice(markerIndex + marker.length));
  }

  try {
    const url = new URL(raw);
    const publicPathIndex = url.pathname.indexOf('/storage/v1/object/public/scripts-files/');
    if (publicPathIndex !== -1) {
      return decodeURIComponent(url.pathname.slice(publicPathIndex + '/storage/v1/object/public/scripts-files/'.length));
    }
  } catch (_) {
    // Plain storage paths are expected for private files.
  }

  return raw;
}

async function scriptbridgeCreateSignedScriptUrl(fileValue, expiresInSeconds = 300) {
  const filePath = scriptbridgeStoragePathFromValue(fileValue);
  if (!filePath) return null;

  const { data, error } = await window.supabase_client.storage
    .from('scripts-files')
    .createSignedUrl(filePath, expiresInSeconds);

  if (error) throw error;
  return data?.signedUrl || null;
}

window.ScriptBridgeData = {
  SITE_URL: SCRIPTBRIDGE_SITE_URL,
  PUBLIC_SCRIPT_COLUMNS: SCRIPTBRIDGE_PUBLIC_SCRIPT_COLUMNS,
  url: scriptbridgeUrl,
  escapeHtml: scriptbridgeEscapeHtml,
  storagePathFromValue: scriptbridgeStoragePathFromValue,
  createSignedScriptUrl: scriptbridgeCreateSignedScriptUrl
};
