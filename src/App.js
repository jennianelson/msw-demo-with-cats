import React from "react";
import heart from "./assets/heart.svg";
import "./styles.css";
import { get, create } from "./api-client";

export default function App() {
  const [catPic, setCatPic] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [newFavorite, setNewFavorite] = React.useState(null);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    getACatPic();
  }, []);

  React.useEffect(() => {
    const getFavorites = () => {
      get(`/favourites?sub_id=jenn_favs`).then(
        (favs) => {
          setFavorites(favs);
        },
        (error) => {
          handleError(error);
        }
      );
    };
    getFavorites();
  }, [newFavorite]);

  const handleError = (error) => {
    setError(error);
    console.error(error);
  };

  const getACatPic = () => {
    get("/images/search").then(
      (cat) => {
        setCatPic(cat[0]);
      },
      (error) => {
        handleError(error);
      }
    );
  };

  const addToFavorites = () => {
    create("/favourites", {
      image_id: catPic.id,
      sub_id: "jenn_favs"
    }).then(
      (favoriteId) => {
        setNewFavorite([...favorites, favoriteId]);
        alert("Added!");
      },
      (error) => {
        handleError(error);
      }
    );
  };

  const removeFromFavorites = (favoriteToRemove) => {};

  return (
    <div className="App">
      {error ? <div>Errorz are sad :(</div> : null}
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
          <img src={catPic.url} alt="cat pic" />
          <div>{catPic.url}</div>
        </div>
      ) : null}
      <FavoritesTable>
        {favorites.map((fav) => (
          <FavoriteRow
            key={fav.id}
            fav={fav.image}
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

function FavoriteRow({ fav, removeFromFavorites }) {
  return (
    <tr>
      <td>
        <button onClick={() => removeFromFavorites(fav)}>X</button>
      </td>
      <td>{fav.url}</td>
    </tr>
  );
}
