import { Router, Routes, Route } from '@solidjs/router';
import ResumeGenerator from './components/ResumeGenerator';
import ResumeDisplay from './components/ResumeDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={ResumeGenerator} />
        <Route path="/resume" component={ResumeDisplay} />
      </Routes>
    </Router>
  );
}

export default App;