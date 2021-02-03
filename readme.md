# Odos

Application for sharing geotagged travel photos with favorites list function. 

Quand quelqu'un ouvre l'application, s'il n'est pas logué, il pourra seulement voir le feed avec les photos des autres utilisateurs. Il ne pourra pas intéragir avec, sauf pour ouvrir la carte afin de voir le lieu d'une photo en particulier. La carte se centrera alors sur ce lieu mais tous les autres lieux des autres photos seront tout de même visibles. 

Il peut ensuite choisir de s'enregistrer et de se loguer. Il aura alors accès au reste de l'app. Il pourra par exemple prendre une photo et y ajouter une description avant de la publier. La détermination du lieu de la prise de photo est faite automatiquement grâce à la géolocalisation. 

S'il va dans son compte, il aura accès à toutes ses photos, ses listes de favoris et ses paramètres. Il pourra alors modifier ou supprimer une photo, ajouter, modifier ou supprimer une liste, modifier ou supprimer son compte ou encore ajouter ou supprimer une photo d'une liste.

Dans le feed, il pourra à présent mettre des photos d'autres utilisateurs dans une de ses listes. 

## Ressources

- **User**
  - Username and/or email
  - Password
  - Registration date
- **Pictures of places**
  - Description
  - Geolocation
  - Picture
  - Creation date
  - Last modification date
  - Necessarily linked with a user
- **Favorites list**
  - List name
  - Creation date
  - Last modification date
  - Linked with pictures of places
  - Necessarily linked with a user
  - Public or private

## API
https://odos-archioweb.herokuapp.com

It is possible to see the documentation of the API there: http://odos-archioweb.herokuapp.com/apiDoc