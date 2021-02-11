# Odos

## Introduction

Dans le cadre de notre formation à la HEIG-VD, nous avons rélaisé une application mobile.
L'applicaiton en question est une application de photographies géolocalisées. Un utilisateur peut ajouter les photographies qu'il a prise et iniquer le lieu ci-rapportant. Aussi des listes avec une fonction "favoris" est disponible. Le but de ce projet est de mettre en pratique les divers éléments vu lors des cours de "DevMobil" de Mathias Oberson.

Nous avons repris l'API que nous avion réalisée lors du précédent cours de "ArchiOWeb" donné par Simon Oulevay. Nous avons fait ce choix, car malgré des petites erreurs, nous avons su les corriger et nous voulions développé un projet qui nous était propre.

## Utilisation

Cliquez sur ...

## Login

Pour pouvoir utiliser notre application avec toute ses fonctionnalités, un compte utilisateur est nécessaire. C'est pourquoi, la première page de notre application est une page de login.

#### Logout

Si l'utilisateur souhaite se déconnecter de l'application, il peut le faire, à tout moment, en cliquant sur l'icône présente sur le haut droite de l'application.

#### Menu

1. **Home :** permet de voir le feed et la carte avec toutes les photographies.
2. **Favoris :** permet d'avoir accès à toutes les listes favorites avec leurs photographies.
3. **Pictures :** permet de prendre et d'ajouter une photo avec sa déscritption et son lieu.
4. **Personnel :** permet d'avoir un aprérçu de toutes les photos que l'utilisateur à enregistrer comme "favoris" et de pouvoir régler ses paramètres de connections.

## Page Home

En effet, quand quelqu'un ouvre l'application, s'il n'est pas logué, il pourra seulement voir le feed avec les photos des autres utilisateurs. Il ne pourra pas intéragir avec, sauf pour ouvrir la carte afin de voir le lieu d'une photo en particulier.

#### Carte

La carte se centrera alors sur ce lieu mais tous les autres lieux des autres photos seront tout de même visibles. 

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