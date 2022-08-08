
 const tasksList = {

   
    init: function() {
        tasksList.loadTasksFromAPI();
     
    },

    // ####################################################################
    //                              EVENTS
    // ####################################################################

  
    bindAllTasksEvents: function() {
     
        const taskElementsList = document.querySelectorAll('.tasks .task');
       
       
        for(const taskElement of taskElementsList) {
            task.bindSingleTaskEvents(taskElement); 
        }
    },

    // ####################################################################
    //                              DOM
    // ####################################################################

  
    insertTaskIntoTasksList: function(taskElement) {
        
        const tasksListElement = document.querySelector('.tasks');

        tasksListElement.prepend(taskElement);
    },

    // ####################################################################
    //                              AJAX
    // ####################################################################

    loadTasksFromAPI: function() {

       
        const config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

       
        fetch('http://localhost:8000/api/tasks/', config)
        
        .then(function(response) {
            return response.json();
        })
      
        .then(function(tasksDataFromAPI) {
            

            for (const singleTask of tasksDataFromAPI) {
                
                const newTaskElement = task.createTaskElement(singleTask.title, singleTask.category.name, singleTask.id, singleTask.completion, singleTask.status);
               
                tasksList.insertTaskIntoTasksList(newTaskElement);
            }

          
            tasksList.showOnlyActiveTasks();
        });
    },

   
    showOnlyArchivedTasks: function() {
        
        const allTasksList = document.querySelectorAll('.task:not(.task--add)');
        
        for (const singleTask of allTasksList) {
          
            if (singleTask.classList.contains('task--archive')) {
                task.showTask(singleTask);
            } else {
               
                task.hideTask(singleTask);
            } 
        }
    },

   
    showOnlyActiveTasks: function() {
       
        const allTasksList = document.querySelectorAll('.task:not(.task--add)');
  
        for (const singleTask of allTasksList) {
          
            if (!singleTask.classList.contains('task--archive')) {
                task.showTask(singleTask);
            } else {
              
                task.hideTask(singleTask);
            } 
        }
    },
};