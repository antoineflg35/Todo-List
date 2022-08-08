
 const app = {

    
    apiRootUrl: 'http://localhost:8000',

    
    init: function() {
        tasksList.init();
        newTaskForm.init();
        categoriesList.init();
        filters.init();
    }
};


document.addEventListener('DOMContentLoaded', app.init);