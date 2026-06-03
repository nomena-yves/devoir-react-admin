# REPONSES.md

## Exercice 1 — Configuration de l'application

**Question 1.1 : Que représente le dataProvider dans React-Admin ? Quel est son rôle ?**

Le `dataProvider` est l'adaptateur qui fait le pont entre React-Admin et une API REST externe. Son rôle est de traduire les actions de l'interface (lister, créer, modifier, supprimer) en requêtes HTTP vers l'API. React-Admin appelle des méthodes abstraites (`getList`, `getOne`, `create`, `update`, `delete`...) et c'est le dataProvider qui sait comment les transformer en appels `GET /employees`, `POST /employees`, `PUT /employees/:id`, etc. Cela permet de changer d'API sans modifier les composants.

**Question 1.2 : Quelle requête HTTP est envoyée au chargement de la liste ?**

Au chargement de la liste, React-Admin envoie une requête :
```
GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=10
```
C'est une requête `GET` avec des paramètres de pagination (`_start`, `_end`) et de tri (`_sort`, `_order`) propres au format JSON Server.

---

## Exercice 2 — Liste des employés

**Question 2.1 : Que fait la prop `rowClick="edit"` sur le Datagrid ?**

La prop `rowClick="edit"` configure le comportement au clic sur une ligne du tableau. Quand l'utilisateur clique sur une ligne, il est redirigé vers le formulaire de modification (`Edit`) de cet employé, à l'URL `/employees/:id`.

**Question 2.2 : Que se passe-t-il si on passe `perPage` à 2 ?**

Seulement 2 employés sont affichés par page. La pagination devient active dès la 3ème entrée : des boutons "Suivant" et "Précédent" apparaissent en bas du tableau. React-Admin envoie des requêtes avec `_start=0&_end=2` pour la première page, `_start=2&_end=4` pour la deuxième, etc.

---

## Exercice 3 — Création d'un employé

**Question 3.1 : Que se passe-t-il si on soumet le formulaire sans remplir le prénom ?**

React-Admin déclenche la validation côté client avant d'envoyer la requête. Un message d'erreur s'affiche sous le champ Prénom : _"Le prénom est obligatoire"_. Le formulaire n'est pas soumis et aucune requête HTTP n'est envoyée à l'API.

**Question 3.2 : Que se passe-t-il si on saisit un salaire de 500 € ?**

La validation `minValue(1500)` est déclenchée. Un message d'erreur s'affiche sous le champ Salaire : _"Le salaire minimum est de 1 500 €"_. Le formulaire est bloqué et aucune requête `POST` n'est envoyée.

---

## Exercice 4 — Modification d'un employé

**Question 4.1 : Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?**

React-Admin avec `ra-data-json-server` utilise la méthode **`PUT`** pour sauvegarder une modification. La requête ressemble à :
```
PUT http://localhost:3002/employees/1
```
avec le corps contenant l'objet employé complet mis à jour. (Certains dataProviders utilisent `PATCH` pour une mise à jour partielle, mais JSON Server attend un `PUT` complet.)

**Question 4.2 : À quel moment `useRecordContext()` est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?**

`useRecordContext()` est disponible uniquement à l'intérieur d'un composant enfant d'un contexte React-Admin qui expose un enregistrement (`Edit`, `Show`, `Datagrid`...). Si l'enregistrement n'est pas encore chargé (données en cours de fetch), il retourne `undefined`. C'est pourquoi il faut toujours vérifier `if (!record) return ...` avant d'accéder à ses propriétés, pour éviter une erreur JavaScript.

---

## Exercice 5 — Fiche détail

**Question 5.1 : Quelle différence y a-t-il entre `SimpleShowLayout` et `TabbedShowLayout` ?**

- **`SimpleShowLayout`** : affiche tous les champs les uns en dessous des autres dans une seule section verticale. Idéal pour les entités avec peu de champs.
- **`TabbedShowLayout`** : organise les champs en plusieurs onglets (`<Tab>`). Chaque onglet est un groupe logique de champs. Idéal pour les entités complexes avec beaucoup de données à structurer (ex : un onglet "Infos générales", un onglet "Contrat", un onglet "Historique").
