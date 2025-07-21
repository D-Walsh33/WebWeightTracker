# WebWeightTracker Bug Reports

---

## Bug ID: BUG_LOGIN_001

**Title:** Login page allows submission with empty password field  
**Environment:** Chrome 114, Windows 10, WebWeightTracker v1.0  
**Steps to Reproduce:**

1. Navigate to the login page
2. Enter a registered email address
3. Leave the password field blank
4. Click the "Login" button

**Expected Result:**  
The system should display an error message indicating that the password field cannot be empty and prevent login.

**Actual Result:**  
The form submits, and the page reloads without logging in or displaying an error message.

**Severity:** Medium  
**Priority:** High

**Notes:**  
This issue can confuse users and may lead to failed login attempts without proper feedback.

---

## Bug ID: BUG_WEIGHT_002

**Title:** Application accepts non-numeric values for weight entry  
**Environment:** Firefox 112, macOS Monterey, WebWeightTracker v1.0  
**Steps to Reproduce:**

1. Log in with valid credentials
2. Navigate to the “Add Weight” page
3. Enter “abc” in the weight input field
4. Select a valid date
5. Click "Submit"

**Expected Result:**  
An error message should be shown stating that the weight must be a numeric value, and submission should be blocked.

**Actual Result:**  
The system accepts the input and creates a new weight entry with the value “abc,” causing the dashboard chart to break.

**Severity:** High  
**Priority:** High

**Notes:**  
This could lead to inaccurate data tracking and potential crashes in data visualization components.

---

## Bug ID: BUG_REG_003

**Title:** Registration page does not validate email format correctly  
**Environment:** Edge 115, Windows 11, WebWeightTracker v1.0  
**Steps to Reproduce:**

1. Navigate to the registration page
2. Enter “userexample.com” (missing '@') as email
3. Fill other fields with valid data
4. Click "Register"

**Expected Result:**  
The system should show an error message requesting a valid email address and prevent registration.

**Actual Result:**  
The registration completes successfully, but the user cannot log in later due to invalid email format.

**Severity:** Medium  
**Priority:** Medium

**Notes:**  
Email validation needs to be improved to prevent invalid accounts.

---

## Bug ID: BUG_WEIGHT_004

**Title:** Weight progress chart does not update after new entry  
**Environment:** Chrome 114, Windows 10, WebWeightTracker v1.0  
**Steps to Reproduce:**

1. Log in with valid credentials
2. Add a new weight entry with today’s date and valid weight
3. Navigate to dashboard page

**Expected Result:**  
The weight progress chart should display the newly added weight data point.

**Actual Result:**  
The chart shows outdated data and does not include the latest entry until the page is refreshed twice.

**Severity:** Low  
**Priority:** Low

**Notes:**  
This may confuse users; consider implementing automatic refresh or notification after data entry.
