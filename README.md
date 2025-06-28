# Basic To-Do List w/ React.js & Fetch API Integration

Built using React.js & Bootstrap with mild CSS styling. Incorporating Fetch for API integration and data persistence.

This project can be viewed here:<br>
https://fperez028-to-do-list-with-fetch.vercel.app/

Features & Functionality<br>
- On load, list is empty
    - reloading with a populated list will retain the last state of the list. i.e. all tasks will show, completion status will remain, and item/completion counts will remain
- Tasks are added by typing them into the input field and pressing the Enter key
- When a task is added, a task counter will appear in the lower left corner
    - as tasks are added, counter will increment
    - as tasks are removed, counter will decrement
    - "item" vs "items" will change for 1 task vs multiple tasks
- Tasks can be removed from the list using the trash icon on the given task line
    - trash icon is hidden until the pointer hovers over a given line
- Checkbox allows marking of task as "complete" while maintaining the line on the list
    - custom css styling with green checkbox to further signify a "done" status
    - checking a task complete will also add a strike-through to the task description
        - unchecking will remove strike-through
- When a task is checked as "complete" the completed counter will increment
    - if a task is unchecked, completed counter will decrement
    - if a task is removed while checked, completed counter will decrement
- A "Delete All Tasks" button appears once a task has been added to the list and will clear the list of all task items