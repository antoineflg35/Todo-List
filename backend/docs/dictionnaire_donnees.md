# Dictionnaire de données

## Produits (`tasks`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de la tâche|
|name|VARCHAR(64)|NOT NULL|Le nom de la tâche|
|completion|INT|NOT NULL|L'avancement de la tâche, de 0 à 100|
|status|INT|NOT NULL|Le statut de la tâche, incomplète ou complète|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de la tâche|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de la tâche|

## Catégories (`categories`)


|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de la catégorie|
|name|VARCHAR(64)|NOT NULL|Le nom de la catégorie|
|status|INT|NOT NULL|Le statut de la catégorie|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de la tâche|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de la tâche|

