Feature: User authentication
  As a task manager user
  I want to register and log in
  So that my tasks are private and secure

  Background:
    Given the task manager application is running
    And I am on the task manager page

  Scenario: Register a new account
    When I register with name "Alice" email "alice@example.com" and password "password123"
    Then I should be logged in as "Alice"

  Scenario: Login with valid credentials
    Given a user exists with email "bob@example.com" and password "password123"
    When I log in with email "bob@example.com" and password "password123"
    Then I should be logged in

  Scenario: Reject unauthenticated task access
    When I request tasks without authentication
    Then I should receive an unauthorized response
