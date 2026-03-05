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
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Main Header -->
        <div class="text-center mb-12">
          <div class="text-6xl mb-4">🎯</div>
          <h1 class="text-5xl font-bold text-gray-900">Goal Accelerator</h1>
          <p class="text-xl text-gray-600 mt-2">Build habits. Track progress. Achieve your goals.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column: Login Form -->
          <div>
            <div class="bg-white rounded-xl shadow-lg p-8 sticky top-8">
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
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    title="Show/hide password">
                    👁️
                  </button>
                </div>
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

              <!-- Demo Info -->
              <div class="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p class="text-xs text-blue-900">
                  <strong>Demo:</strong> Use any email and password. Data stored securely with Supabase.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: App Overview -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>

            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="flex gap-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 font-bold text-lg">1</div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">Define Your Success</h3>
                  <p class="text-gray-600 text-sm mt-1">Write down what a successful year looks like for you</p>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="flex gap-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 text-purple-600 font-bold text-lg">2</div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">Assess Your Life Areas</h3>
                  <p class="text-gray-600 text-sm mt-1">Rate yourself on 8 life categories (Health, Career, Relationships, etc.)</p>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex gap-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 font-bold text-lg">3</div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">Set Your Goals</h3>
                  <p class="text-gray-600 text-sm mt-1">Choose up to 6 yearly goals from your life areas</p>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="flex gap-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-100 text-amber-600 font-bold text-lg">4</div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">Plan & Track</h3>
                  <p class="text-gray-600 text-sm mt-1">Break goals into monthly milestones and daily habits</p>
                </div>
              </div>

              <!-- Step 5 -->
              <div class="flex gap-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-pink-100 text-pink-600 font-bold text-lg">5</div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">Reflect & Grow</h3>
                  <p class="text-gray-600 text-sm mt-1">Weekly, monthly, and yearly reflections to track progress</p>
                </div>
              </div>

              <!-- CTA -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 mt-6">
                <p class="text-gray-900 font-semibold">Ready to achieve your goals?</p>
                <p class="text-gray-600 text-sm mt-2">Sign up above and start your journey today!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('toggle-password');

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });

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
      console.log('✅ Sign in successful, navigating to onboarding');

      // Check if user already completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');
      if (hasCompletedOnboarding) {
        navigateTo('month');
      } else {
        navigateTo('onboarding');
      }
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
            <div class="relative">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                id="toggle-password"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Show/hide password">
                👁️
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">At least 6 characters</p>
          </div>

          <!-- Confirm Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                id="toggle-confirm-password"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Show/hide password">
                👁️
              </button>
            </div>
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

  // Event listeners for password toggles
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const toggleConfirmBtn = document.getElementById('toggle-confirm-password');

  togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.textContent = '👁️';
    }
  });

  toggleConfirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      toggleConfirmBtn.textContent = '🙈';
    } else {
      confirmPasswordInput.type = 'password';
      toggleConfirmBtn.textContent = '👁️';
    }
  });

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
