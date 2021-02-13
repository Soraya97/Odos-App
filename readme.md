# **Odos**

## Introduction

Dans le cadre de notre formation à la HEIG-VD, nous avons réalisé une application mobile. L’application en question est une application de photographies géolocalisées. Un utilisateur peut ajouter les photographies qu’il a prises et indiquer le lieu ci-rapportant. Des listes avec une fonction « favoris » sont aussi disponibles. Le but de ce projet est de mettre en pratique les divers éléments vus lors des cours de « DevMobil » de Mathias Oberson.

Nous avons repris l’API que nous avions réalisée lors du précédent cours de « ArchiOWeb » donné par Simon Oulevay. Nous avons fait ce choix, car malgré des petites erreurs, nous avons su les corriger et nous voulions développer un projet qui nous était propre.

## Utilisation

Pour pouvoir tester l'application il faut : 

1. Dans votre invite de commande exécuter la commande suivante :

```
git clone git@github.com:Soraya97/Odos-App.git
```

2. Toujours dans l'invite de commande, aller à la racine du dossier, soit : Odos-App

```
cd Users/[nom]/Odos-App
```

3. Depuis, Odos-App, Installer tous les modules nécessaire avec la commende suivante :

```
npm install
```

4. Une fois que tout est installer exécuter une dernière commande qui ouvrira une fenêtre sur votre navigateur

```
ionic serve
```

5. Visualiser l'application sur votre navigateur.

## Login

Pour pouvoir utiliser notre application avec toutes ses fonctionnalités, un compte utilisateur est nécessaire. C’est pourquoi la première page de notre application est une page de login.

![](https://github.com/Soraya97/Odos-App/blob/main/images/login.png)

### Logout

Si l’utilisateur souhaite se déconnecter de l’application, il peut le faire à tout moment, en se rendant sur la page « Home » ou « Profil », en cliquant sur l’icône présente sur le haut droit de l’application.

![](https://github.com/Soraya97/Odos-App/blob/main/images/logout.png)

### Menu

Le menu de l’application est visible sur le bas de l’écran. Il comporte 4 éléments :

1. **Home :** permet de voir le *feed* et la carte avec toutes les photographies géolocalisées.
2. **Favoris :** permet d’avoir accès à toutes les listes favorites avec leurs photographies.
3. **Pictures :** permet de prendre et d’ajouter une photo avec sa description et son lieu.
4. **Profil :** permet d’avoir un aperçu de toutes les photos que l’utilisateur a prises et de pouvoir régler ses paramètres de connexions.

![](https://github.com/Soraya97/Odos-App/blob/main/images/menu.png)

## Page « Home »

Quand l’utilisateur ouvre l’application et s’il n’est pas logué, il ne pourra seulement voir que le *feed* avec les photos des autres utilisateurs. Donc, il ne pourra pas interagir avec, sauf pour ouvrir la carte afin de voir le lieu d’une photo en particulier.

![](https://github.com/Soraya97/Odos-App/blob/main/images/Odos_home_01.png)

### Carte

Sur la carte, tous les lieux où une photographie a été prise sont indiqués. Autrement, pour une photo précise, la carte se centrera alors sur un lieu, mais tous les autres lieux des autres photos sont tout de même visibles.

![](https://github.com/Soraya97/Odos-App/blob/main/images/carte_01.png)

## Page « Liste »

La page « liste » se présente comme ceci :

![](https://github.com/Soraya97/Odos-App/blob/main/images/liste.png)

L’utilisateur à la vue d’ensemble de toutes ses listes.

Sur le haut droit de l’application, un bouton est mis à disposition afin d’ajouter une liste.

![](https://github.com/Soraya97/Odos-App/blob/main/images/button_liste.png)

### Ajouter une liste

Lors de l’ajout d’une liste, l’utilisateur indique seulement le nom qu’il désire donner à une nouvelle liste.

![](https://github.com/Soraya97/Odos-App/blob/main/images/addliste.png)

### Visualisation d’une liste

L’utilisateur à la vue d’ensemble de toutes les photographies se rapportant à une liste.

![](https://github.com/Soraya97/Odos-App/blob/main/images/viewliste.png)

Sur cette page, sur le haut droit, se trouve un bouton permettant d’ouvrir un *modal box* pour, soit modifier, soit supprimer une liste.

![](https://github.com/Soraya97/Odos-App/blob/main/images/modalliste.png)

L'utilisateur peut modifier une liste par son nom ou par ses images en les mettant à la « poubelle ».

![](https://github.com/Soraya97/Odos-App/blob/main/images/modifyliste.png)

Si l'utilisateur souhaite supprimer une liste dans son entièreté, une deuxième *modal box* lui est proposé dans le cas où il souhaite « confirmer » ou se rétracter en annulant son choix.

![](https://github.com/Soraya97/Odos-App/blob/main/images/supprimerliste.png)

## Page « Pictures »

Les pages « pictures » fonctionnent en trois étapes :

1. Prise de photo
2. Géolocalisation et description
3. Validation

![](https://github.com/Soraya97/Odos-App/blob/main/images/pictures_01.png)

![](https://github.com/Soraya97/Odos-App/blob/main/images/pictures_02.png)

![](https://github.com/Soraya97/Odos-App/blob/main/images/pictures_03.png)

Chaque photographie a la possibilité d'être ajoutée à une liste. En cliquant sur le petit cœur en dessous de la photo, l'utilisateur peut choisir dans quelle liste il souhaite intégrer l'image. Il peut l'intégrer dans plusieurs listes.

![](https://github.com/Soraya97/Odos-App/blob/main/images/pictures_04.png)

![](https://github.com/Soraya97/Odos-App/blob/main/images/pictures_05.png)

## Page « Profil »

La page « Profil » se présente comme ceci :

![](https://github.com/Soraya97/Odos-App/blob/main/images/Odos_profil_01.png)

L'utilisateur a la possibilité de voir toutes ses propres photographies qu’il a enregistrées.

### Paramètres

La page des paramètres du compte se présente comme ceci :

![](https://github.com/Soraya97/Odos-App/blob/main/images/Odos_profil_02.png)

Sur cette page, l’utilisateur a la possibilité de modifier son nom, prénom d’utilisateur et/ou son mot de passe grâce à un *modal box*. Pour valider les changements effectués, il suffit de cliquer sur le bouton « Valider ».

![](https://github.com/Soraya97/Odos-App/blob/main/images/Odos_profil_03.png)

![](https://github.com/Soraya97/Odos-App/blob/main/images/Odos_profil_04.png)

Il a également la possibilité de supprimer son compte en cliquant sur le lien « Suppression du compte ». Un *modal box* est proposé dans le cas où l’utilisateur souhaite « confirmer » ou se rétracter en annulant son choix.

![](https://github.com/Soraya97/Odos-App/blob/main/images/Odos_profil_05.png)

## Ressources utilisées

- **User**
    - Username 
    - Email
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

Le lien de l'API utilisée: https://odos-archioweb.herokuapp.com

Il est possible de voir la document de l'API ici: http://odos-archioweb.herokuapp.com/apiDoc

## Améliorations

Les éléments suivants doivent être améliorés:

### Feed

- La mise à jour du *feed* en cas d'ajout, de modification ou de suppression d'une photo, grâce au *refresher*.
- L'icône de la carte disponible sur chaque photo, permettant d'ouvrir la carte sur le point où la photo a été prise.
- L'icône du cœur doit être plein lorsque la photo se trouve en favoris.
- L'icône de connexion doit switcher si l'utilisateur est connecté ou non.

### Lists & Pictures

- La suppression d'une photo d'une liste devrait se voir directement.
- Le code de mise à jour de la liste des listes et des photos devrait être mieux implémenté.
- Il devrait être possible de voir le lieu où la photo a été prise sur chaque photo.

### Forms

- Les validations des formulaires devraient prendre en compte si le nom (d'utilisateur, de photo ou de liste) existe déjà ou non dans la base de données.
