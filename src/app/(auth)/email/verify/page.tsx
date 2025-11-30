// 'use client';
//
// import { useEffect } from 'react';
//
// import { useVerifyEmailMutation } from '@/store/api/authApi';
//
// export default function EmailVerifyPage({ searchParams }: { searchParams: { token?: string } }) {
//   const token = searchParams.token;
//
//   const [verifyEmail, { data, isLoading, isError, isSuccess }] = useVerifyEmailMutation();
//
//   useEffect(() => {
//     if (token) {
//       verifyEmail({ token });
//     }
//   }, [token, verifyEmail]);
//
//   // Optional: auto-redirect to login after 2 seconds on success
//   useEffect(() => {
//     if (isSuccess && data?.success) {
//       const timeout = setTimeout(() => {
//         window.location.href = '/login';
//       }, 2000);
//       return () => clearTimeout(timeout);
//     }
//   }, [isSuccess, data]);
//
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
//         {isLoading && (
//           <>
//             <div className="animate-spin h-10 w-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full" />
//             <h1 className="text-xl font-semibold mt-4">Verifying your email...</h1>
//             <p className="text-gray-600 mt-2">Please wait a moment.</p>
//           </>
//         )}
//
//         {isSuccess && data?.success && (
//           <>
//             <div className="text-green-500 text-6xl mb-4">✓</div>
//             <h1 className="text-2xl font-semibold">Email Verified!</h1>
//             <p className="text-gray-600 mt-2">You can now log in to your account.</p>
//             <a
//               href="/login"
//               className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
//             >
//               Go to Login
//             </a>
//           </>
//         )}
//
//         {(isError || (!isLoading && !token)) && (
//           <>
//             <div className="text-red-500 text-6xl mb-4">✕</div>
//             <h1 className="text-2xl font-semibold">Invalid or expired token</h1>
//             <p className="text-gray-600 mt-2">Please request a new verification email.</p>
//             <a
//               href="/resend-verification"
//               className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
//             >
//               Resend Email
//             </a>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
