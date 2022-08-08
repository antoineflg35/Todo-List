/**
 * Composant task
 */
 const task = {

    // ####################################################################
    //                              EVENTS
    // ####################################################################

    /**
     * Ajout tous les évènements liés à une tâche
     * 
     * @param {HTMLElement} taskElement L'élément du DOM correspondant à la tâche
     */
    bindSingleTaskEvents: function(taskElement) {

       
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
       
        taskTitleLabelElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

      
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);
       
        taskTitleFieldElement.addEventListener('keydown', task.handleValidateNewTaskTitleOnKeyDown);

        const taskCompleteButtonElement = taskElement.querySelector('.task__button--validate');
     
        taskCompleteButtonElement.addEventListener('click', task.handleCompleteTask);

        const taskIncompleteButtonElement = taskElement.querySelector('.task__button--incomplete');
       
        taskIncompleteButtonElement.addEventListener('click', task.handleIncompleteTask);

     
        const taskArchiveButtonElement = taskElement.querySelector('.task__button--archive');

        taskArchiveButtonElement.addEventListener('click', task.handleArchiveTask);

        const taskDesarchiveButtonElement = taskElement.querySelector('.task__button--desarchive');
        taskDesarchiveButtonElement.addEventListener('click', task.handleDesarchiveTask);
       
        const taskDeleteButtonElement = taskElement.querySelector('.task__button--delete');
       
        taskDeleteButtonElement.addEventListener('click', task.handleDeleteTask);
    },

    // ####################################################################
    //                            HANDLERS
    // ####################################################################

    /**
     * Méthode gérant le passage en mode édition du titre de la tâche
     * 
     * @param {Event} evt 
     */
    handleEnableTaskTitleEditMode: function(evt) {
        
        // - Pour passer visuellement en mode édition du titre de la tâche, on va devoir
        // ajouter la classe 'task--edit' sur l'élément tâche.
        // - Pour cela, on a donc besoin d'accéder à l'élément tâche contenant l'élément titre.

        // On commence par récupèrer l'élément titre sur lequel l'évènement click s'est produit
        const taskTitleLabelElement = evt.currentTarget;

        // On cherche ensuite dans les ancêtres de l'élément titre le premier élément du DOM qui
        // possède la classe 'task'.
        // Doc de closest : https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        const taskElement = taskTitleLabelElement.closest('.task');

        // Enfin, on ajoute la classe 'task--edit' sur l'élément tâche
        // Doc de classList : https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        // Question: remove 'task--todo' and 'task--complete' ? 
        // Réponse : pas besoin au niveau des styles, et si on le faisait, il faudrait pouvoir
        // retourner à l'état d'origine une fois l'édition du titre terminée (´･_･`)
        taskElement.classList.add('task--edit');

        // Bonus UX : on met le focus sur le champ input pour pouvoir directement modifier le nom
        // de la tâche sans avoir à cliquer dans le champ
        taskElement.querySelector('.task__title-field').focus();
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'évènement 'blur'
     * 
     * @param {Event} evt 
     */
    handleValidateNewTaskTitle: function(evt) {
     
        const taskTitleFieldElement = evt.currentTarget;

     
        const newTaskTitle = taskTitleFieldElement.value;

        const taskElement = taskTitleFieldElement.closest('.task');

       
        const taskId = taskElement.dataset.id;

        // -------------------------------------------------------------------
        // Requête à l'API pour mettre à jour le titre de la tâche en BDD
        // -------------------------------------------------------------------

  
        const taskData = {
            title: newTaskTitle
        };
     
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
       
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
       
            headers: httpHeaders,
            
            body: JSON.stringify(taskData)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch('http://localhost:8000/api/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
            
                if (response.status == 201) {
                    console.log('La mise à jour en bdd a été effectuée');

                    const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;
                   
                    taskTitleLabelElement.textContent = newTaskTitle;

                  
                    taskElement.classList.remove('task--edit');
                }
                else {
                    alert('La mise à jour a échoué');
                }
            }
        );
    },

   
    handleValidateNewTaskTitleOnKeyDown: function(evt) {
      
        if (evt.key === 'Enter') {
            task.handleValidateNewTaskTitle(evt);
        }
    },

  
    handleCompleteTask: function(evt) {

      
        const taskCompleteButtonElement = evt.currentTarget;
       
        const taskElement = taskCompleteButtonElement.closest('.task');
      
        const taskId = taskElement.dataset.id;
       
        const taskData = {
            completion: 100
        };
        
       
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
       
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            
            headers: httpHeaders,
          
            body: JSON.stringify(taskData)
        };
        
       
        fetch('http://localhost:8000/api/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
               
                if (response.status == 201) {
                    console.log('La mise à jour en bdd a été effectuée');
        
                 
                    task.markTaskAsComplete(taskElement);
                }
                else {
                    alert('La mise à jour a échoué');
                }
            }
        );
    },

    
    handleIncompleteTask: function(evt) {

        const taskIncompleteButtonElement = evt.currentTarget;
        
        const taskElement = taskIncompleteButtonElement.closest('.task');
        
        const taskId = taskElement.dataset.id;

        const taskData = {
            completion: 0
        };
        
     
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
      
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
        
            headers: httpHeaders,
       
            body: JSON.stringify(taskData)
        };
        
  
        fetch('http://localhost:8000/api/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
               
                if (response.status == 201) {
                    console.log('La mise à jour en bdd a été effectuée');
        
                 
                    task.updateTaskCompletion(taskElement, 0);
                }
                else {
                    alert('La mise à jour a échoué');
                }
            }
        )
    },


    handleArchiveTask: function(evt) {

    
        const taskArchiveButtonElement = evt.currentTarget;
      
        const taskElement = taskArchiveButtonElement.closest('.task');
      
        const taskId = taskElement.dataset.id;

        const taskData = {
            status: 2
        };
      
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
      
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(taskData)
        };
        
     
        fetch('http://localhost:8000/api/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
           
                if (response.status == 201) {
                    console.log('La mise à jour en bdd a été effectuée');
        
                    task.updateTaskStatus(taskElement, 2);
                }
                else {
                    alert('La mise à jour a échoué');
                }
            }
        )
    },

    handleDesarchiveTask: function(evt){
        

          const taskArchiveButtonElement = evt.currentTarget;
     
          const taskElement = taskArchiveButtonElement.closest('.task');

          const taskId = taskElement.dataset.id;
  
       
          const taskData = {
              status: 1
          };
          
   
          const httpHeaders = new Headers();
          httpHeaders.append("Content-Type", "application/json");
          
      
          const fetchOptions = {
              method: 'PATCH',
              mode: 'cors',
              cache: 'no-cache',

              headers: httpHeaders,
         
              body: JSON.stringify(taskData)
          };
          
          // Exécuter la requête HTTP avec FETCH
          fetch('http://localhost:8000/api/tasks/' + taskId, fetchOptions)
          .then(
              function(response) {
                 
                  if (response.status == 201) {
                      console.log('La mise à jour en bdd a été effectuée');
        
                      task.updateTaskStatus(taskElement, 2);
                  }
                  else {
                      alert('La mise à jour a échoué');
                  }
              }
          )

    },

    
    handleDeleteTask: function(evt) {

        const taskDeleteButtonElement = evt.currentTarget;
      
        const taskElement = taskDeleteButtonElement.closest('.task');
        
        const taskId = taskElement.dataset.id;

      
        const fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
        };
        
   
        fetch('http://localhost:8000/api/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
            
                if (response.status == 204) {
                    console.log('La suppression en bdd a été effectuée');
        
                    task.deleteTask(taskId);
                }
                else {
                    alert('La suppression a échoué');
                }
            }
        )
    },

   
    markTaskAsComplete: function(taskElement) {
        task.updateTaskCompletion(taskElement, 100);
    },

  
    updateTaskCompletion: function(taskElement, newCompletion) {

        if (newCompletion == 100) {
          
            taskElement.classList.replace('task--todo','task--complete');
        } else {
            taskElement.classList.replace('task--complete','task--todo');
        }

        taskElement.querySelector('.progress-bar__level').style.width = newCompletion + '%';
    },


    updateTaskStatus: function(taskElement, newStatus) {

        if (newStatus == 2) {
          
            taskElement.classList.add('task--archive');
        } else {
            taskElement.classList.remove('task--archive');
        }
    },

 
    createTaskElement: function(newTaskTitle, newTaskCategoryName, newTaskId, newTaskCompletion, newTaskStatus) {

        const taskCloneElement = document.querySelector("#task-template").content.cloneNode(true);
       
        const newTaskElement = taskCloneElement.firstElementChild;

        task.updateTaskTitle(newTaskElement, newTaskTitle);

        task.updateTaskCategoryName(newTaskElement, newTaskCategoryName);

        task.updateTaskId(newTaskElement, newTaskId);

        task.updateTaskCompletion(newTaskElement, newTaskCompletion);

        task.updateTaskStatus(newTaskElement, newTaskStatus);

    
        task.bindSingleTaskEvents(newTaskElement);

      
        return newTaskElement;
    },

   
    updateTaskTitle: function(taskElement, taskTitle) {
     
        const taskTitleElement = taskElement.querySelector('.task__title-label');
  
        taskTitleElement.textContent = taskTitle;

        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
     
        taskTitleFieldElement.value = taskTitle;
    },

   
  
    updateTaskCategoryName: function(taskElement, taskCategoryName) {

        taskElement.dataset.category = taskCategoryName;

        const taskCategoryNameElement = taskElement.querySelector('.task__category > p');
       
        taskCategoryNameElement.textContent = taskCategoryName;
    },

  
    updateTaskId: function(taskElement, taskId) {

        taskElement.dataset.id = taskId;
    },

    hideTask: function(taskElement) {
        
        taskElement.classList.add('is-hidden');
    },

  
    showTask: function(taskElement) {
        taskElement.classList.remove('is-hidden');
    },

 
    deleteTask: function(taskId) {
        
        const taskElementToDelete = document.querySelector('.task[data-id="' + taskId + '"]');
        
        if (taskElementToDelete) {
         
            taskElementToDelete.remove();
        }
    },
};