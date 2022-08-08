/**
 * Composant gérant la liste des catégories
 */
 const categoriesList = {

    init: function() {
        categoriesList.loadCategoriesFromAPI();
    },

    // ####################################################################
    //                              AJAX
    // ####################################################################

    loadCategoriesFromAPI: function() {

     
        const config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

    
        fetch('http://localhost:8000/api/categories', config)
      
        .then(function(response) {
         
            return response.json();
        })
       
        .then(function(categoriesDataFromAPI) {
            

            
            const selectElementForTaskFilters =
                categoriesList.createSelectElement(categoriesDataFromAPI,'Toutes les catégories','filters__choice');
          
            document.querySelector('.filters__task--category').append(selectElementForTaskFilters);

          
            const selectElementForNewTaskForm = 
                categoriesList.createSelectElement(categoriesDataFromAPI,'Choisir une catégorie');
         
            document.querySelector('.task--add .task__category .select').append(selectElementForNewTaskForm);
        });
    },

    // ####################################################################
    //                              DOM
    // ####################################################################
   
     
    createSelectElement: function (categoriesList, defaultLabel, className = '') {
        

        const selectElement = document.createElement('select');
        selectElement.setAttribute("id", "select_category");

 
        if (className !== '') {
            selectElement.classList.add(className);
        }

   
        const defaultOption = document.createElement('option');
        defaultOption.textContent = defaultLabel;
     
        selectElement.append(defaultOption);

        for (const category of categoriesList) {
         
            const optionElement = document.createElement('option');
         
            optionElement.textContent = category.name;
    
            optionElement.value = category.id;
         
            selectElement.append(optionElement);
        }

    
        return selectElement;
    }
};