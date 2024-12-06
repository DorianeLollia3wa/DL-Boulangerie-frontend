46 rue René Clair 75018 PARIS

##

Compte test

Aazerty123

admin@gmail.com
livreur@gmail.com
preparateur@gmail.com
client@gmail.com
client1@gmail.com
client2@gmail.com
client3@gmail.com

## Supprimer la base de donné

DROP TABLE IF EXISTS
Ligne_panier,
Commandes,
Encaissement,
FraisLiv,
Adresses,
Produits,
Categories,
Rapports_Statistiques,
Status_de_commande,
Types_de_livraison,
Type_rapport,
Utilisateurs,
Roles;

## Statuts de Réponse des Routes

| Statut | Description                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------ |
| 201    | Création réussie (adresse ou utilisateur ajouté).                                                |
| 200    | Opération réussie (liste récupérée, données mises à jour, etc.).                                 |
| 403    | Accès refusé (par exemple, tentative d'ajouter une 4ème adresse ou utilisateur non autorisé).    |
| 404    | Ressource non trouvée (par exemple, tentative de modifier ou supprimer une adresse inexistante). |
| 400    | Requête invalide (champs manquants ou mal formatés).                                             |
| 500    | Erreur interne du serveur (par exemple, problème de base de données).                            |

## Routes de l'API

### Utilisateurs Routes

| Méthode | Route                             | Header `auth`<br>`bearer token` | Type de requête | Champs (`Obligatoires`)                                                                                                                    | Middleware                                 | Description                                                     | Statut de réponse | Type de données de réponse             |
| ------- | --------------------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------- | ----------------- | -------------------------------------- |
| POST    | /utilisateurs/inscription         |                                 | body            | `nom`:\_string<br>`email`:\_string <br>`telephone`:\_string <br>`mot_de_passe`:\_string                                                    | `validationMiddleware`                     | Inscription d'un nouvel utilisateur                             | 201 Created       | Détails de l'utilisateur avec un token |
| POST    | /utilisateurs/inscription-employe | `authenticateToken`             | body            | `nom`:\_string<br>`email`:\_string <br>`telephone`:\_string <br>`mot_de_passe`:\_string                                                    | `validationMiddleware`                     | Inscription d'un utilisateur par un administrateur              | 201 Created       | Détails de l'utilisateur créé          |
| POST    | /utilisateurs/connexion           |                                 | body            | `email`:\_string <br> `mot_de_passe`:\_string                                                                                              | `rateLimitLogin`<br>`validationMiddleware` | Met à jour un ou plusieurs détails de l'utilisateur connecté    | 200 OK            | Détails de l'utilisateur avec un token |
| PUT     | /utilisateurs/modifier            | `authenticateToken`             | body            | `nom`:\_string<br>`email`:\_string <br>`telephone`:\_string <br>`mot_de_passe`:\_string <br> ==`userId`:\_string <br>`id_Roles`:\_string== |                                            | Supprime l'utilisateur connecté                                 | 200 OK            | Détails de l'utilisateur mis à jour    |
| GET     | /utilisateurs/auth                | `authenticateToken`             |                 |                                                                                                                                            |                                            | Récupère la liste de tous les utilisateurs (sauf les visiteurs) | 200 OK            | Détails de l'utilisateur connecté      |
| POST    | /utilisateurs/tous                | `authenticateToken`             | body            | role:\_string <br> recherche:\_string                                                                                                      | `checkRole_Administrateur`                 | Récupère un utilisateur spécifique par son ID                   | 200 OK            | Liste des utilisateurs                 |

**Notes:**

- ==Mot surligner en jaune== uniquement pour les admins dans une route accessible au autre role
- Les champs `surligner en gris` sont obligatoires.
- `authenticateToken` est un middleware qui vérifie le token JWT pour authentifier l'utilisateur.
- `checkRole` est un middleware qui verifie le role de l'utilisateur et accorde ou non l'accès.

### Adresses Routes

| Méthode | Route                   | Header `auth`<br>`bearer token` | Type de requête | Champs (`Obligatoires`)                                                               | Middleware             | Description                                               | Statut de réponse     | Type de données de réponse       |
| ------- | ----------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------- | --------------------- | -------------------------------- |
| POST    | /adresses/ajouter       | `authenticateToken`             | body            | `adresse`:\_string<br>`code_postal`:\_string <br>`ville`:\_string <br>`pays`:\_string | `validationMiddleware` | Ajoute une nouvelle adresse pour l'utilisateur connecté   | 201 Created           | Détails de l'adresse créée       |
| PUT     | /adresses/modifier      | `authenticateToken`             | body            | `id_adresse`:\number<br>                                                              | `validationMiddleware` | Modifie une adresse existante                             | 200 OK                | Détails de l'adresse mise à jour |
| GET     | /adresses/connexion     | `authenticateToken`             |                 |                                                                                       |                        | Récupère toutes les adresses de l'utilisateur connecté    | 200 OK                | Liste des adresse                |
| DELETE  | /adresses/supprimer/:id | `authenticateToken`             | params          |                                                                                       |                        | Supprime une adresse appartenant à l'utilisateur connecté | 200 OK, 404 Not Found | Message de confirmation          |

**Notes:**

- ==Mot surligner en jaune== uniquement pour les admins dans une route accessible au autre role
- Les champs `surligner en gris` sont obligatoires.
- `authenticateToken` est un middleware qui vérifie le token JWT pour authentifier l'utilisateur.
- `checkRole` est un middleware qui verifie le role de l'utilisateur et accorde ou non l'accès.

### Commandes Routes

| Méthode | Route                      | Header `auth`<br>`bearer token` | Type de requête | Champs (`Obligatoires`)                                                                                                                    | Middleware                                                             | Description                                                                               | Statut de réponse | Type de données de réponse         |
| ------- | -------------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------- | ---------------------------------- |
| POST    | /commandes/creer           | `authenticateToken`             | body            | `adresseCommande`:\_string<br> `ville_liv`:\_string<br> `panier`:\_array<br> `type_livraison`:\_string<br> `libelle_paiement`:\_string<br> | `validationMiddleware`                                                 | Créer une nouvelle commande                                                               | 201 Created       | Confirmation de la commande créée  |
| POST    | /commandes/calcul-panier   | `authenticateToken`             | body            | `ville_liv`:\_string<br> `panier`:\_array<br> `type_livraison`:\_string<br>                                                                | `validationMiddleware`                                                 | Calculer le coût total du panier pour une commande                                        | 201               | Total calculé et type de livraison |
| GET     | /commandes/listes          | `authenticateToken`             |                 |                                                                                                                                            |                                                                        | Récupérer la liste de toutes les commandes de l'utilisateur connecté                      | 200               | Liste des commandes                |
| POST    | /commandes/details         | `authenticateToken`             | body            | `id_Commandes`:\_string<br>                                                                                                                | `validationMiddleware`                                                 | Obtenir les détails d'une commande spécifique                                             | 200               | Détails de la commande             |
| PUT     | /commandes/modifier-status | `authenticateToken`             | body            | `id_Commandes`:\_number<br> `id_Status_de_commande`:\_number<br>                                                                           | `validationMiddleware` `checkRole= Administrateur Livreur Préparateur` | Modifier le statut d'une commande (réservé aux administrateurs, livreurs ou préparateurs) | 200               | Confirmation de la mise à jour     |

**Notes:**

- ==Mot surligner en jaune== uniquement pour les admins dans une route accessible au autre role
- Les champs `surligner en gris` sont obligatoires.
- `authenticateToken` est un middleware qui vérifie le token JWT pour authentifier l'utilisateur.
- `checkRole` est un middleware qui verifie le role de l'utilisateur et accorde ou non l'accès.

### Produits Routes

| Méthode | Route              | Header `auth`<br>`bearer token` | Type de requête | Champs (`Obligatoires`)                                                                                                                     | Middleware                                         | Description                     | Statut de réponse | Type de données de réponse |
| ------- | ------------------ | ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------- | ----------------- | -------------------------- |
| GET     | /produits          |                                 | param           | nom:\_string<br> categorie:\_string<br>                                                                                                     |                                                    | Récupérer la liste des produits | 200               | Liste des produits         |
| POST    | /produits/creer    | `authenticateToken`             | body            | `nom`:\_string<br> `description`:\_string<br> `prix`:\_number<br> `stock_disponible`:\_number<br> `categorie`:\_string<br>                  | `validationMiddleware` `checkRole= Administrateur` | Créer un nouveau produit        | 201               | Detail du nouveau produit  |
| PUT     | /produits/modifier | `authenticateToken`             | body            | `id_Produits`:\_number<br> nom:\_string<br> description:\_string<br> prix:\_number<br> stock_disponible:\_number<br> categorie:\_string<br> | `validationMiddleware` `checkRole= Administrateur` | Modifier un produit             | 200               | Liste des produits         |

**Notes:**

- ==Mot surligner en jaune== uniquement pour les admins dans une route accessible au autre role
- Les champs `surligner en gris` sont obligatoires.
- `authenticateToken` est un middleware qui vérifie le token JWT pour authentifier l'utilisateur.
- `checkRole` est un middleware qui verifie le role de l'utilisateur et accorde ou non l'accès.

### Categories Routes

| Méthode | Route       | Header `auth`<br>`bearer token` | Type de requête | Champs (`Obligatoires`) | Middleware | Description                                        | Statut de réponse | Type de données de réponse    |
| ------- | ----------- | ------------------------------- | --------------- | ----------------------- | ---------- | -------------------------------------------------- | ----------------- | ----------------------------- |
| GET     | /categories |                                 |                 |                         |            | Recuperer la liste des catégorie pour les produits | 200               | Liste de toute les catégories |

**Notes:**

- ==Mot surligner en jaune== uniquement pour les admins dans une route accessible au autre role
- Les champs `surligner en gris` sont obligatoires.
- `authenticateToken` est un middleware qui vérifie le token JWT pour authentifier l'utilisateur.
- `checkRole` est un middleware qui verifie le role de l'utilisateur et accorde ou non l'accès.

### Routes

| Méthode | Route | Header `auth`<br>`bearer token` | Type de requête | Champs (`Obligatoires`) | Middleware | Description | Statut de réponse | Type de données de réponse |
| ------- | ----- | ------------------------------- | --------------- | ----------------------- | ---------- | ----------- | ----------------- | -------------------------- |
|         |       | `authenticateToken`             | body            | `adresse`:\_string<br>  |            |             |                   |

**Notes:**

- ==Mot surligner en jaune== uniquement pour les admins dans une route accessible au autre role
- Les champs `surligner en gris` sont obligatoires.
- `authenticateToken` est un middleware qui vérifie le token JWT pour authentifier l'utilisateur.
- `checkRole` est un middleware qui verifie le role de l'utilisateur et accorde ou non l'accès.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#   D L - B o u l a n g e r i e - f r o n t e n d 
 
 #   D L - B o u l a n g e r i e - f r o n t e n d 
 
 #   D L - b o u l a n g e r i e - f r o n t e n d 
 
 # D L - B o u l a n g e r i e - f r o n t e n d 
 
 #   D L - B o u l a n g e r i e - f r o n t e n d 
 
 
#   D L - B o u l a n g e r i e - f r o n t e n d 
 
 
