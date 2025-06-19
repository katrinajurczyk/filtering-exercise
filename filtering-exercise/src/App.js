import { useState, useEffect } from 'react';
import quotesData from './assets/quotes.json';
import './App.css';

function App() {

  const [quotes, setQuotes] = useState([]);
  const [quoteFilter, setQuoteFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const SortingQuotes = {
    idAscending: "ID Ascending",
    idDescending: "ID Descending",
    quoteAscending: "Quote Ascending",
    quoteDescending: "Quote Descending",
    authorAscending: "Author Ascending",
    authorDescending: "Author Descending",
  }

  const [selectedSorting, setSelectedSorting] = useState(SortingQuotes.idAscending);

  useEffect(() => {
    setQuotes(quotesData.quotes);
  }, []);

  const handleQuoteFilterChange = (e) => (
    setQuoteFilter(e.target.value)
  );

  const handleAuthorFilterChange = (e) => (
    setAuthorFilter(e.target.value)
  );

  const handleSortingChange = (e) => (
    setSelectedSorting(e.target.value)
  );

  const filteredQuotes = quotes.filter(q => (
    q.quote.toLowerCase().includes(quoteFilter.toLowerCase())
    && q.author.toLowerCase().includes(authorFilter.toLowerCase())
  ));

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    switch (selectedSorting) {
      case "idAscending":
        return a.id - b.id;
      case "idDescending":
        return b.id - a.id;
      case "quoteAscending":
        return a.quote.localeCompare(b.quote);
      case "quoteDescending":
        return b.quote.localeCompare(a.quote);
      case "authorAscending":
        return a.author.localeCompare(b.author);
      case "authorDescending":
        return b.author.localeCompare(a.author);
      default:
        return 0;
    }
  });

  return (
    <div className="App">
      <h1>Quotes</h1>
      <div className="forms">
        <form>
          <label htmlFor="quoteFilterInput">Quote: </label>
          <input
            id="quoteFilterInput"
            value={quoteFilter}
            onChange={handleQuoteFilterChange}
          />
        </form>
        <form>
          <label htmlFor="authorFilterInput">Author: </label>
          <input
            id="authorFilterInput"
            value={authorFilter}
            onChange={handleAuthorFilterChange}
          />
        </form>
        <form>
        <label htmlFor="selectSorting">Sort by: </label>
          <select id="selectSorting" onChange={handleSortingChange}>
            {Object.entries(SortingQuotes).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quote</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {sortedQuotes.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.quote}</td>
              <td>{q.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
