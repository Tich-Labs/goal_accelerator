import { navigateTo } from '../router.js';
import { signUp, signIn, getCurrentUser } from '../supabase-config.js';

let authState = {
  isLoading: false,
  error: null,
};

export async function renderAuth(container) {
  // Check if already logged in
  const user = await getCurrentUser();
  if (user) {
    navigateTo('onboarding');
    return;
  }

  renderLoginPage(container);
}

function renderLoginPage(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <!-- Logo/Brand -->
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🎯</div>
          <h1 class="text-4xl font-bold text-gray-900">Goal Accelerator</h1>
          <p class="text-gray-600 mt-2">Build habits. Track progress. Achieve goals.</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

          <!-- Error Message -->
          ${authState.error ? `
            <div class="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p class="text-red-700 text-sm">${authState.error}</p>
            </div>
          ` : ''}

          <!-- Email Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Password Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Sign In Button -->
          <button
            id="signin-btn"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mb-4"
            ${authState.isLoading ? 'disabled' : ''}>
            ${authState.isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <!-- Sign Up Link -->
          <p class="text-center text-gray-600 text-sm">
            Don't have an account?
            <button id="to-signup" class="text-blue-600 hover:text-blue-700 font-medium">
              Sign Up
            </button>
          </p>
        </div>

        <!-- Demo Info -->
        <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p class="text-sm text-blue-900">
            <strong>Demo:</strong> Use any email and password to get started. Your data is stored securely with Supabase.
          </p>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('signin-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      authState.error = 'Please enter email and password';
      renderLoginPage(container);
      return;
    }

    authState.isLoading = true;
    const result = await signIn(email, password);

    if (result.success) {
      // Save user data and navigate to onboarding
      localStorage.setItem('authUser', JSON.stringify(result.user));
      navigateTo('onboarding');
    } else {
      authState.error = result.error || 'Sign in failed';
      authState.isLoading = false;
      renderLoginPage(container);
    }
  });

  document.getElementById('to-signup').addEventListener('click', () => {
    renderSignupPage(container);
  });
}

function renderSignupPage(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <!-- Logo/Brand -->
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🎯</div>
          <h1 class="text-4xl font-bold text-gray-900">Goal Accelerator</h1>
          <p class="text-gray-600 mt-2">Build habits. Track progress. Achieve goals.</p>
        </div>

        <!-- Signup Form -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>

          <!-- Error Message -->
          ${authState.error ? `
            <div class="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p class="text-red-700 text-sm">${authState.error}</p>
            </div>
          ` : ''}

          <!-- Email Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Password Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-500 mt-1">At least 6 characters</p>
          </div>

          <!-- Confirm Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Sign Up Button -->
          <button
            id="signup-btn"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mb-4"
            ${authState.isLoading ? 'disabled' : ''}>
            ${authState.isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <!-- Sign In Link -->
          <p class="text-center text-gray-600 text-sm">
            Already have an account?
            <button id="to-signin" class="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </button>
          </p>
        </div>

        <!-- Terms -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p class="text-xs text-gray-600">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validation
    if (!email || !password || !confirmPassword) {
      authState.error = 'Please fill in all fields';
      renderSignupPage(container);
      return;
    }

    if (password.length < 6) {
      authState.error = 'Password must be at least 6 characters';
      renderSignupPage(container);
      return;
    }

    if (password !== confirmPassword) {
      authState.error = 'Passwords do not match';
      renderSignupPage(container);
      return;
    }

    authState.isLoading = true;
    const result = await signUp(email, password);

    if (result.success) {
      // Save user data and navigate to onboarding
      localStorage.setItem('authUser', JSON.stringify(result.user));
      navigateTo('onboarding');
    } else {
      authState.error = result.error || 'Sign up failed';
      authState.isLoading = false;
      renderSignupPage(container);
    }
  });

  document.getElementById('to-signin').addEventListener('click', () => {
    authState.error = null;
    renderLoginPage(container);
  });
}
