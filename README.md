# Tech-Demo

## Main Project implementations / corrections

- **Deleted old lock.json and cypress packages**

- **Vuetify theme structure was wrong**

- **Store needed type implmentation to work**: Added StoreOptions with the right state structure.

- **Created ToDoItemCard component using vuetify**: Implemented some local logic within the component for the card status toggle and image upload.

- **Created ToDoForm reusable component**: Main logic is implemented in HomeView page, which is passed to the form component for reusability. Form has basic validation.

- **Created Random ToDoTask functionality**: Uses a reusable axios api function validated with typescript. Data object comes with a different property called "completed". Every time the data is fetched the property is replaced for 'isCompleted' to match the Todo structure.
