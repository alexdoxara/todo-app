## Manual Test Suite Matrix

The following test cases were manually executed to verify the full-stack CRUD functionality of the application.

| Test ID | Feature Tested | Steps to Execute | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_01** | **Create** (POST) | 1. Type a task in the input field.<br>2. Click the "Add Task" button or press Enter. | `"Finish presentation"` | The task is instantly added to the list view; the text input field clears. | **PASSED** |
| **TC_02** | **Validation** | 1. Leave the text input field completely blank.<br>2. Click the "Add Task" button. | `""` (Empty string) | The UI does not change; no empty item is added, and the backend ignores the request. | **PASSED** |
| **TC_03** | **Update** (PUT) | 1. Click directly on an active text task in the list. | Target Item Click | A line-through style is applied, the text turns gray, and the state changes to completed. | **PASSED** |
| **TC_04** | **Delete** (DELETE) | 1. Click the red "Delete" button next to any existing task. | Button Click | The selected task item animate-fades or instantly disappears from the UI completely. | **PASSED** |