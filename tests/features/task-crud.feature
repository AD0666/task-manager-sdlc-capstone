Feature: Task CRUD Operations
  As a task manager user
  I want to create, view, update, and delete tasks
  So that I can track my work items

  Background:
    Given the task manager application is running
    And I am on the task manager page

  Scenario: Create a new task
    When I create a task with title "Buy groceries"
    And I set the status to "todo"
    Then I should see "Buy groceries" in the task list

  Scenario: Update an existing task
    Given a task exists with title "Old title"
    When I edit the task and change the title to "New title"
    Then I should see "New title" in the task list
    And I should not see "Old title" in the task list

  Scenario: Delete a task
    Given a task exists with title "Task to delete"
    When I delete the task "Task to delete"
    Then I should not see "Task to delete" in the task list

  Scenario: Change task status
    Given a task exists with title "Status test task" and status "todo"
    When I change the task status to "done"
    Then the task "Status test task" should show status "done"
