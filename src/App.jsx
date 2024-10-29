import { Router, Routes, Route } from '@solidjs/router';
import ResumeGenerator from './components/ResumeGenerator';
import ResumeDisplay from './components/ResumeDisplay';
import HowToUse from './components/HowToUse';

function App() {
  return (
    <div class="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" component={ResumeGenerator} />
          <Route path="/resume" component={ResumeDisplay} />
          <Route path="/how-to-use" component={HowToUse} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;