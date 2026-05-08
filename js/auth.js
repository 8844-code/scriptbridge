// 认证管理（会话、登出等）

// 检查用户是否已登录
async function checkAuthStatus() {
  try {
    const { data, error } = await window.supabase_client.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return null;
  }
}

// 获取当前登录用户
async function getCurrentUser() {
  try {
    const { data, error } = await window.supabase_client.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// 获取用户信息（从 users 表）
async function getUserProfile(userId) {
  try {
    const { data, error } = await window.supabase_client
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// 登出
async function logout() {
  try {
    const { error } = await window.supabase_client.auth.signOut();
    if (error) throw error;
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error logging out:', error);
    alert('Failed to log out: ' + error.message);
  }
}

// 检查用户是否已登录，如果未登录则重定向到登录页
async function requireAuth() {
  const session = await checkAuthStatus();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

// 在需要显示导航栏的页面上，自动生成登出按钮
async function setupAuthNav() {
  const session = await checkAuthStatus();
  const navRight = document.querySelector('.nav-right');

  if (!navRight) return;

  if (session) {
    // 用户已登录，显示登出按钮
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn btn-logout';
    logoutBtn.textContent = 'Log Out';
    logoutBtn.onclick = logout;
    navRight.appendChild(logoutBtn);
  } else {
    // 用户未登录，显示登录链接
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.className = 'btn btn-outline';
    loginLink.textContent = 'Sign In';
    navRight.appendChild(loginLink);
  }
}
