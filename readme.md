# **Odos**

## Introduction

Dans le cadre de notre formation à la HEIG-VD, nous avons réalisé une application mobile. L’application en question est une application de photographies géolocalisées. Un utilisateur peut ajouter les photographies qu’il a prises et indiquer le lieu ci-rapportant. Aussi des listes avec une fonction « favoris » sont disponibles. Le but de ce projet est de mettre en pratique les divers éléments vus lors des cours de « DevMobil » de Mathias Oberson.

Nous avons repris l’API que nous avion réalisé lors du précédent cours de « ArchiOWeb » donné par Simon Oulevay. Nous avons fait ce choix, car malgré des petites erreurs, nous avons su les corriger et nous voulions développer un projet qui nous était propre.

## Utilisation

Cliquez sur...

## Login

Pour pouvoir utiliser notre application avec toutes ses fonctionnalités, un compte utilisateur est nécessaire. C’est pourquoi la première page de notre application est une page de login.

### Logout

Si l’utilisateur souhaite se déconnecter de l’application, il peut le faire, à tout moment, en se rendant sur la page « Home » ou "Profil", en cliquant sur l’icône présente sur le haut droit de l’application.

### Menu

Le menu de l’application est visible sur le bas de l’écran. Il comporte 4 éléments :

1. **Home :** permets     de voir la fée et la carte avec toutes les photographies géolocalisées.
2. **Favoris :** permets d’avoir accès à toutes les listes     favorites avec leurs photographies.
3. **Pictures :** permets de prendre et d’ajouter une photo avec     sa description et son lieu.
4. **Profil :** permets d’avoir un aperçu de toutes les photos     que l’utilisateur a enregistrées comme « favoris » et de pouvoir régler     ses paramètres de connexions.

## Page « Home »

Quand l’utilisateur ouvre l’application et s’il n’est pas logué, il ne pourra seulement voir que le « feed » avec les photos des autres utilisateurs. Donc, il ne pourra pas interagir avec, sauf pour ouvrir la carte afin de voir le lieu d’une photo en particulier.

### Carte

Sur la carte tous les lieux où une photographie a été prise sont indiqués. Autrement, pour une photo précise, la carte se centrera alors sur un lieu, mais tous les autres lieux des autres photos seront tout de même visibles. 

## Page « Liste »

la page « liste » se présente comme ceci :

L’utilisateur à la vue d’ensemble de toutes ces listes.

Sur le haut droit de l’application, un bouton est mis à disposition afin d’ajouter une liste.

### Ajouter une liste

Lors de l’ajout d’une liste, l’utilisateur indique seulement le nom qu’il désire donner à une nouvelle liste.

### Visualisation d’une liste

L’utilisateur à la vue d’ensemble de toutes les photographies se rapportant à une liste.

Sur cette page, sur le haut droit, se trouve un bouton permettant d’ouvrir un modal box pour soit modifier ou soit supprimer une liste.

## Page « Pictures »

Les pages « pictures » fonctionnent en trois étapes :

1. Prise de photo
2. Géolocalisation et description
3. Validation

## Page « Profil »

La page « Profil » se présente comme ceci :

Il a la possibilité de voir toutes ses propres photographies qu’il a enregistrées.

Sur cette page, l’utilisateur a la possibilité de modifier son nom, prénom d’utilisateur et/ou son mot de passe grâce à une modale box. Pour valider les changements effectués, il suffit de cliquer sur le bouton « Valider ».

Il a également la possilbité de supprimer son compte en cliquant sur le lien « Suppression du compte ». Un modal box est proposé dans le cas où l’utilisateur souhaite « confirmer » ou se rétracter en annulant son choix.

## Ressources utilisées

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

 