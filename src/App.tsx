import "./App.css"
import Dashboard from './features/Dashboard';
import StockSubscriptions from './features/StockSubscriptions/StockSubscriptions';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <StockSubscriptions />
      </header>
      <Dashboard />
    </div>
  )
}

export default App
