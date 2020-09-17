import React from "react";
import heart from "./assets/heart.svg";
import "./styles.css";
import { get } from "./api-client";

export default function App() {
  const [catPic, setCatPic] = React.useState(null);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    getACatPic();
  }, []);

  const getACatPic = () => {
    get().then(
      (cats) => {
        setCatPic(cats);
      },
      (error) => {
        alert("errorz are sad");
        console.error(error);
      }
    );
  };

  const addToFavorites = () => {
    setFavorites([...favorites, catPic[0]]);
  };

  const removeFromFavorites = (favoriteToRemove) => {};

  return (
    <div className="App">
      <h1>The Cat Pics App</h1>
      <h2>Why make a to-do list when you could look at cats instead?</h2>
      <div className="buttons">
        <button className="new-cat-btn" onClick={getACatPic}>
          Another One!
        </button>
        <button className="favorite-btn" onClick={addToFavorites}>
          <img src={heart} alt="favorite button" style={{ height: "15px" }} />
        </button>
      </div>
      {catPic ? (
        <div>
          <img src={catPic[0].url} alt="cat pic" />
          <div>{catPic[0].url}</div>
        </div>
      ) : null}
      <FavoritesTable>
        {favorites.map((fav) => (
          <FavoriteRow
            key={fav.id}
            fav={fav}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </FavoritesTable>
    </div>
  );
}

function FavoritesTable({ children }) {
  return (
    <div className="favorites">
      <table>
        <thead>
          <tr>
            <th>Favorites</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function FavoriteRow(fav, removeFromFavorites) {
  return (
    <tr>
      <td>
        <button onClick={() => removeFromFavorites(fav.fav)}>X</button>
      </td>
      <td>{fav.fav.url}</td>
    </tr>
  );
}
