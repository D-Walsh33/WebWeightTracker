# WebWeightTracker Test Plan

## 1. Introduction

This test plan outlines the strategy and scope for testing the WebWeightTracker application, a full-stack web app allowing users to register, log in, and track their weight progress.

## 2. Objectives

- Verify all core functionalities work as expected
- Ensure data integrity between frontend UI and backend database
- Identify and report defects early in development
- Automate key regression test cases to support Agile sprints

## 3. Scope

- User registration and authentication
- Weight entry creation, update, and display
- Dashboard data visualization
- Form validations and error handling
- Cross-browser compatibility on Chrome, Firefox, Edge
- Responsive design on desktop and mobile

## 4. Testing Types

- **Manual Testing:** Exploratory testing, test case execution for UI and workflows
- **Regression Testing:** Manual and automated tests to verify new changes do not break existing features
- **Automation Testing:** Selenium-based scripts for critical user flows (login, weight entry)

## 5. Test Deliverables

- Manual test cases documented in `/qa/manual/test-cases.md`
- Bug reports logged and tracked in `/qa/manual/bug-reports.md`
- Automated test scripts stored in `/qa/automation/`
- Test execution reports (to be generated after automation runs)

## 6. Tools & Environments

- **Tools:** Selenium WebDriver, ChromeDriver, VS Code, Git
- **Environments:** Local development server, test staging server
- **Browsers:** Chrome (latest), Firefox, Edge

## 7. Schedule

- Initial manual testing: 1 week
- Automation script development: 2 weeks
- Regression testing before each sprint release

## 8. Roles & Responsibilities

- Tester (You): Write and execute test cases, report bugs, develop automation scripts
- Developer: Fix defects, assist with environment setup
- Product Owner: Clarify requirements, prioritize bug fixes

## 9. Risks & Mitigation

- Changing requirements — mitigate by frequent backlog grooming
- Limited test data — create mock data sets for testing
- Test environment availability — coordinate with developers for stable test environments

---
