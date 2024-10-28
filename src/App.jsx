import { createSignal } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import ResumeGenerator from './components/ResumeGenerator';

function App() {
  return (
    <Routes>
      <Route path="/" component={ResumeGenerator} />
    </Routes>
  );
}

export default App;