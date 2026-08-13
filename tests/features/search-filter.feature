Feature: Task search and filter
  As a task manager user
  I want to search and filter tasks
  So that I can quickly find relevant work items

  Background:
    Given the task manager application is running
    And I am on the task manager page

  Scenario: Filter tasks by status
    Given a task exists with title "Filter todo task" and status "todo"
    And a task exists with title "Filter done task" and status "done"
    When I filter tasks by status "todo"
    Then I should see "Filter todo task" in the task list
    And I should not see "Filter done task" in the task list

  Scenario: Search tasks by keyword in title
    Given a task exists with title "UniqueAlphaKeyword task"
    And a task exists with title "Other unrelated task"
    When I search for "UniqueAlphaKeyword"
    Then I should see "UniqueAlphaKeyword task" in the task list
    And I should not see "Other unrelated task" in the task list

  Scenario: Search tasks by keyword in description
    Given a task exists with title "Desc search task" and description "BetaGammaUnique description"
    When I search for "BetaGammaUnique"
    Then I should see "Desc search task" in the task list

  Scenario: Clear filters shows all tasks
    Given a task exists with title "Show all tasks example"
    When I filter tasks by status "done"
    And I clear the status filter
    Then I should see "Show all tasks example" in the task list
