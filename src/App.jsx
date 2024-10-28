import { createSignal, onMount, onCleanup } from 'solid-js';
import { Routes, Route, useNavigate } from '@solidjs/router';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import ResumeGenerator from './components/ResumeGenerator';

function App() {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    } else {
      navigate('/login');
    }
  };

  onMount(() => {
    checkUserSignedIn();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    onCleanup(() => {
      authListener?.subscription.unsubscribe();
    });
  });

  return (
    <Routes>
      <Route path="/login" component={Login} />
      <Route path="/" element={<ResumeGenerator user={user} />} />
    </Routes>
  );
}

export default App;