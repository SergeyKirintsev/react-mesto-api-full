import React from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
// import Token from '../utils/token';

function App() {
  const history = useHistory();
  const [email, setEmail] = React.useState(null);
  const [isResponseFail, setIsResponseFail] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false,
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false,
  );
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [idCardForDelete, setIdCardForDelete] = React.useState(null);

  // React.useEffect(() => {
  //   auth
  //     .checkToken()
  //     .then(({ data }) => {
  //       setEmail(data.email);
  //       setLoggedIn(true);
  //       // getData();
  //       history.push('/');
  //     })
  //     .catch((err) => console.log(err));
  // }, [history]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);

        setEmail(userData.email);
        setLoggedIn(true);

        history.push('/');
      })
      .catch((err) => {
        console.log('Promise.all', err);
      });
  }, []);

  function getData() {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log('Promise.all', err);
      });
  }

  function handleSignOut() {
    auth.signOut()
      .catch(err => console.log(err))
    setEmail(null);
    setLoggedIn(false);
  }

  function showInfoTooltip(isError, err = null) {
    if (err) console.log(err);
    setIsResponseFail(isError);
    setIsInfoTooltipOpen(true);
  }

  function handleRegister(formData) {
    auth
      .registration(formData)
      .then((res) => {
        if (res.data) {
          showInfoTooltip(false);
          history.push('/sign-in');
        }
      })
      .catch((err) => showInfoTooltip(true, err));
  }

  function handleLogin(formData) {
    auth
      .authorization(formData)
      .then(({ data }) => {
        if (data) {
          // Token.saveToken(token);
          setLoggedIn(true);
          setEmail(data.email);
          getData();
          history.push('/');
        }
      })
      .catch((err) => showInfoTooltip(true, err));
  }

  function handleCardDeleteAfterConfirm() {
    setIsLoading(true);
    api
      .deleteCard(idCardForDelete)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== idCardForDelete));
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleCardDeleteAfterConfirm', err);
      });
  }

  function handleCardDelete(card) {
    setIdCardForDelete(card._id);
    setIsConfirmPopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.log('handleCardLike', err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsLoading(false);
    setIdCardForDelete(null);
    setIsInfoTooltipOpen(false);
  };

  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api
      .setUserInfo(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleUpdateUser', err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleUpdateAvatar', err);
      });
  };

  const handleAddPlaceSubmit = (place) => {
    setIsLoading(true);
    api
      .createCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleAddPlaceSubmit', err);
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={email}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
        />

        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <ProtectedRoute
            // exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDeleteCard={handleCardDeleteAfterConfirm}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isResponseFail={isResponseFail}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
