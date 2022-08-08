/**
 * Composant newTaskForm gérant le formulaire d'ajout d'une tâche
 */
 const newTaskForm = {

    /**
     * Initialisation du composant
     */
    init: function() {
        newTaskForm.bindNewTaskFormEvents();
    },

    // ####################################################################
    //                              EVENTS
    // ####################################################################

    /**
     * Ajout tous les évènements liés au formulaire d'ajout d'une tâche
     * 
     */
    bindNewTaskFormEvents: function() {

        const newTaskFormElement = document.querySelector('.task--add form');
     
        newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    // ####################################################################
    //                            HANDLERS
    // ####################################################################

    /**
     * Méthode gérant la soumission du formulaire d'ajout d'une tâche
     * 
     * @param {Event} evt 
     */
    handleNewTaskFormSubmit: function(evt) {

        evt.preventDefault();


        const newTaskFormElement = evt.currentTarget;

        const taskTitleFieldElement = newTaskFormElement.querySelector('.task__title-field');

        const newTaskTitle = taskTitleFieldElement.value;

        const categoryElement = newTaskFormElement.querySelector('.task__category select');
     
        const newTaskCategoryName = categoryElement.querySelector('option:checked').textContent;

        const newTaskCategoryId = categoryElement.value;

        // -------------------------------------------------------------------
        // Appel à l'API pour créer la tâche en BDD
        // -------------------------------------------------------------------

      
        const newTaskData = {
            title: newTaskTitle,
            categoryId: newTaskCategoryId,
            completion: 0,
            status: 1,
        };

        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let httpHeaders = new Headers();
        httpHeaders.append('Content-Type', 'application/json');
        httpHeaders.append('Accept', 'application/json');


        // On prépare la configuration de la requête HTTP
        const config = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(newTaskData)
        };

        fetch('http://localhost:8000/api/tasks', config)
      
        .then(function(response) {
          
             console.log(response);

          
            if (response.status !== 201) {
            
                throw 'Erreur avec la requête code retour : ' + response.status;
            }

            return response.json();
        })
      
        .then(function(newTaskObject) {
            
            const newTaskElement = task.createTaskElement(newTaskObject.title, newTaskCategoryName, newTaskObject.id, newTaskObject.completion, newTaskObject.status);
            
        
            tasksList.insertTaskIntoTasksList(newTaskElement);
        })
     
        .catch(function(errorMessage) {
            alert(errorMessage);
        });
    },

};