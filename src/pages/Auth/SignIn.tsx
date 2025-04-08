import React from 'react'

const SignIn = () => {
  return (
    <div className="min-h-screen flex">
      {/* <!-- Left Side - Auth Forms --> */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* <!-- Form Container --> */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* <!-- Logo --> */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <i x-show="isLogin" className="fas fa-sign-in-alt text-red-600 fa-lg"></i>
                <i x-show="!isLogin" className="fas fa-user-plus text-red-600 fa-lg"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                <span x-text="isLogin ? 'Welcome Back!' : 'Create Account'"></span>
              </h2>
              <p className="text-gray-600 mt-2">
                <span x-text="isLogin ? 'Please sign in to continue' : 'Get started with your account'"></span>
              </p>
            </div>

            {/* <!-- Form --> */}

            {/* <!-- Name Field (Register only) --> */}
            <div x-show="!isLogin" className="mb-6 transition-all duration-300 ease-out">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  x-model="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* <!-- Email Field --> */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  x-model="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  placeholder="you@example.com"
                />
                <i className="fas fa-envelope absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
              </div>
              <p x-show="email && !validateEmail(email)" className="mt-2 text-sm text-red-600">
                Please enter a valid email address
              </p>
            </div>

            {/* <!-- Password Field --> */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  // :type="showPassword ? 'text' : 'password'"
                  // x-model="password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  // @click="showPassword = !showPassword"
                >
                  {/* <i :className="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" className="w-6 h-6"></i> */}
                </button>
              </div>
              <p
                x-show="password && !validatePassword(password)"
                className="mt-2 text-sm text-red-600"
              >
                Password must be at least 8 characters
              </p>
            </div>

            {/* <!-- Confirm Password Field (Register only) --> */}
            <div className="mb-6 transition-all duration-300 ease-out">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                ></button>
              </div>
              <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
            </div>

            {/* <!-- Submit Button --> */}
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <span x-show="!loading" x-text="isLogin ? 'Sign In' : 'Create Account'"></span>
            </button>

            {/* <!-- Form Switch --> */}
            <p className="mt-6 text-center text-gray-600">
              <span x-text="isLogin ? 'Don\'t have an account?' : 'Already have an account?'"></span>
              <button
                type="button"
                className="ml-1 text-red-600 hover:text-red-700 font-semibold focus:outline-none"
              >
                <span x-text="isLogin ? 'Sign up' : 'Sign in'"></span>
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* <!-- Right Side - Image --> */}
      <div className="hidden lg:block lg:w-1/2 bg-[url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80)] bg-cover bg-center">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-4xl font-bold mb-6">Your Title</h2>
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, expedita.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
