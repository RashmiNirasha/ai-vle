import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<SignupData> = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      case 3:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof SignupData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      // Add your signup logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log('Signup attempted with:', formData);
    } catch (err) {
      setErrors({ email: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What's your name?</h2>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-200'} 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What's your email?</h2>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-200'}
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Create a password</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-200'}
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'}
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center justify-center w-8 h-8 rounded-full
                  ${stepNumber === step ? 'bg-blue-600 text-white' :
                    stepNumber < step ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
              >
                {stepNumber < step ? (
                  <Check className="h-5 w-5" />
                ) : (
                  stepNumber
                )}
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;