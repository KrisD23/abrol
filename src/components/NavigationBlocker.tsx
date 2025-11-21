// 'use client';

// import { useEffect } from 'react';

// export default function NavigationBlocker() {
//   useEffect(() => {
//     // Only run in production (Vercel)
//     if (process.env.NODE_ENV === 'production') {
      
//       // Comprehensive click blocker
//       const blockAllClicks = (e: MouseEvent) => {
//         const target = e.target as HTMLElement;
        
//         // Find if clicked element or any parent is a navigation element
//         const navElement = target.closest('a, button, [role="button"], .nav, nav, [data-section]');
        
//         if (navElement) {
//           const href = navElement.getAttribute('href');
//           const role = navElement.getAttribute('role');
//           const className = navElement.className;
//           const tagName = navElement.tagName.toLowerCase();
          
//           // Block navigation elements
//           if (
//             href?.startsWith('#') ||
//             href?.includes('section') ||
//             tagName === 'button' ||
//             role === 'button' ||
//             className?.includes('nav') ||
//             navElement.hasAttribute('data-section')
//           ) {
//             e.preventDefault();
//             e.stopPropagation();
//             e.stopImmediatePropagation();
            
//             // Scroll to top instead
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//             return false;
//           }
//         }
//       };

//       // Block hash changes
//       const blockHashChange = (e: HashChangeEvent) => {
//         e.preventDefault();
//         window.history.replaceState(null, '', window.location.pathname);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       };

//       // Allow normal scrolling - only block navigation clicks

//       // Override common navigation functions
//       const originalPushState = window.history.pushState;
//       const originalReplaceState = window.history.replaceState;
      
//       window.history.pushState = function(state, title, url) {
//         // Only allow home page
//         if (url && url !== '/' && url !== window.location.origin + '/') {
//           return originalPushState.call(this, state, title, '/');
//         }
//         return originalPushState.call(this, state, title, url);
//       };

//       window.history.replaceState = function(state, title, url) {
//         // Only allow home page
//         if (url && url !== '/' && url !== window.location.origin + '/') {
//           return originalReplaceState.call(this, state, title, '/');
//         }
//         return originalReplaceState.call(this, state, title, url);
//       };

//       // Add all event listeners
//       document.addEventListener('click', blockAllClicks, true);
//       window.addEventListener('hashchange', blockHashChange, true);

//       // Clear any existing hash immediately
//       if (window.location.hash || window.location.search) {
//         window.history.replaceState(null, '', '/');
//       }

//       // Allow normal scroll behavior

//       // Cleanup
//       return () => {
//         document.removeEventListener('click', blockAllClicks, true);
//         window.removeEventListener('hashchange', blockHashChange, true);
//         window.history.pushState = originalPushState;
//         window.history.replaceState = originalReplaceState;
//       };
//     }
//   }, []);

//   return null;
// }