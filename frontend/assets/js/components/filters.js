
 const filters = {


    showArchivedTasks: false,

    init: function() {
        filters.bindEvents();
    },

    // ####################################################################
    //                              EVENTS
    // ####################################################################

    bindEvents: function() {
      
        const showActiveOrArchivedTasksLink =  document.querySelector('.filters__task--archived .filters__choice');
    
        showActiveOrArchivedTasksLink.addEventListener('click',filters.handleShowActiveOrArchivedTasksLink);

        const showCompleteTask = document.querySelector('#buttonCompleteTask');

        showCompleteTask.addEventListener('click', filters.handleShowOnlyCompleteTask);

        const showIncompleteTask = document.querySelector('#buttonIncompleteTask');

        showIncompleteTask.addEventListener('click', filters.handleShowOnlyIncompleteTask);

        const showAllTask = document.querySelector('#buttonAllTask');

        showAllTask.addEventListener('click', filters.handleShowAllTask);



        const selectCategories = document.querySelector('.filters__task--category');

        selectCategories.addEventListener('click', filters.handleChoiceCategory)
    },

    // ####################################################################
    //                              HANDLERS
    // ####################################################################

    /**
     * Méthode gérant le lien permettant d'afficher soit les tâches actives
     * soit les tâches archivées
     * 
     * @param {Event} evt 
     */
    handleShowActiveOrArchivedTasksLink: function(evt) {

      
        filters.showArchivedTasks = !filters.showArchivedTasks;

        let newTextLink;

    
        if (filters.showArchivedTasks === true) {
         
            tasksList.showOnlyArchivedTasks();
            
            newTextLink = 'Voir les tâches actives';
        } 
        else {
          
            tasksList.showOnlyActiveTasks()
    
            newTextLink = 'Voir les archives';
        }

   
        filters.updateShowActiveOrArchiveTasksLinkText(newTextLink);
    },

    handleShowAllTask: function(event){
     
        const allTask = document.querySelectorAll('.tasks .task')
        for (const task of allTask) {
            task.style.display = "block";
        }

        const showAllTask = document.querySelector('#buttonAllTask');
        filters.updateActiveFilters(showAllTask)
    },
    handleShowOnlyCompleteTask: function(event){
        const categoryElement = document.querySelector('.filters__task select');
        
        const categorySelectText = categoryElement.querySelector('option:checked').textContent;
        
        const allTask = document.querySelectorAll('.tasks .task')
        for (const task of allTask) {
            const categoryTask = task.dataset.category;
            if(categoryTask === categorySelectText){
            task.style.display = "block";
            }
        }
        const incompleteTask = document.querySelectorAll('.tasks .task--todo')
        
        for (const task of incompleteTask) {
            task.style.display = "none";
        }
        

        const showCompleteTask = document.querySelector('#buttonCompleteTask');
        filters.updateActiveFilters(showCompleteTask);
        

    },

   

    handleShowOnlyIncompleteTask: function(event){

        const categoryElement = document.querySelector('.filters__task select');
        
        const categorySelectText = categoryElement.querySelector('option:checked').textContent;
    
        const allTask = document.querySelectorAll('.tasks .task')
        for (const task of allTask) {
            const categoryTask = task.dataset.category;
            if(categoryTask === categorySelectText){
                task.style.display = "block";
                }
        }

        const completeTask = document.querySelectorAll('.tasks .task--complete')
        
        for (const task of completeTask) {
            task.style.display = "none";
            
        } 

        const showIncompleteTask = document.querySelector('#buttonIncompleteTask');
        filters.updateActiveFilters(showIncompleteTask);
        

    },

    handleChoiceCategory: function(event){
        
        const newTaskFormElement = event.currentTarget;

        const categoryElement = newTaskFormElement.querySelector('.filters__task select');

        const categorySelectText = categoryElement.querySelector('option:checked').textContent;
     
        const categorySelectID = categoryElement.value;


        filters.updateCategoriesToShow(categorySelectText);
        filters.showAllCategories(categorySelectText);
    
       

    },

    // ####################################################################
    //                              DOM
    // ####################################################################

    /**
     * Méthode permettant de mettre à jour le texte du lien permettant
     * d'afficher soit les tâches actives soit les tâches archivées
     * 
     * @param {String} newTextLink Le nouveau libellé pour le lien
     * 
     */
    updateShowActiveOrArchiveTasksLinkText: function(newTextLink) {
        const showActiveOrArchivedTasksLink =  document.querySelector('.filters__task--archived .filters__choice');
        showActiveOrArchivedTasksLink.innerText = newTextLink;
    },

    updateActiveFilters: function(buttonActive){

        const allButton = document.querySelectorAll('.filters__task button')
        
        for (const button of allButton) {
            button.classList.remove('is-info')
        }
        buttonActive.classList.add('is-info');
    },

    updateCategoriesToShow: function(textCategory){

        const taskElementsList = document.querySelectorAll('.tasks .task');
        
        for (const task of taskElementsList) {
            const categoryTask = task.dataset.category;
            if (textCategory != categoryTask){
                task.style.display = "none";
            } else {
                task.style.display = "block";
            }
        }
    },
   
    showAllCategories: function(textCategory){
        
        const taskElementsList = document.querySelectorAll('.tasks .task');
            for (const task of taskElementsList){
                if (textCategory === "Toutes les catégories"){
                    task.style.display = "block";
                }
            }
    }
        

    }
