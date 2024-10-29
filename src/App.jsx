import { Router, Routes, Route } from '@solidjs/router';
import ResumeGenerator from './components/ResumeGenerator';
import ResumeDisplay from './components/ResumeDisplay';
import { createSignal, onMount, createEffect } from 'solid-js';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('app');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('app');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <div class="h-full">
      {currentPage() === 'login' ? (
        <div class="flex items-center justify-center h-full">
          <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">تسجيل الدخول باستخدام ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline mb-6 block text-center"
            >
              المزيد عن ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              view="magic_link"
              showLinks={false}
              authView="magic_link"
            />
          </div>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" component={ResumeGenerator} />
            <Route path="/resume" component={ResumeDisplay} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;