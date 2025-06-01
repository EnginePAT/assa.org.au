// Setup Supabase
const supabaseClient = supabase.createClient(
  'https://uxxeialwtsreqjmcreya.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4eGVpYWx3dHNyZXFqbWNyZXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTA5MTYsImV4cCI6MjA2Mzg4NjkxNn0.-GQy54PghgCwXGxKAzMRGTfpDDVNm1dC5omNkYnzSdA'
);

// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error');

    const { error } = await supabaseClient.auth.signIn({ email, password });

    if (error) {
      errorMsg.textContent = "Login failed: " + error.message;
    } else {
      window.location.href = 'user.html';
    }
  });
}


let inactivityTime = () => {
  let timer;
  const logoutTime = 15 * 60 * 1000; // 5 seconds for testing (change to 15 * 60 * 1000 for 15 mins)

  const resetTimer = () => {
    clearTimeout(timer);
    localStorage.setItem("lastActivity", Date.now());
    timer = setTimeout(logout, logoutTime);
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();

    // Only redirect if not already on index.html
    const path = window.location.pathname;
    const isIndex = path.endsWith("/relogin.html") || path === "/" || path.endsWith("assa.org.au/");
    if (!isIndex) {
      window.location.href = "relogin.html";
    }
  };

  window.addEventListener("load", resetTimer);
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keypress", resetTimer);
};

inactivityTime();
