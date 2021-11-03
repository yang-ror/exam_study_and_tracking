import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

import HomeView from './components/HomeView'
import ExamView from './components/ExamView'
import ScoreView from './components/ScoreView'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' exact component={HomeView} />
        <Route path='/e/:examNumber/:mode/:questionNumber' component={ExamView} />
        <Route path='/score' component={ScoreView} />
      </div>
    </Router>
  );
}

export default App;
