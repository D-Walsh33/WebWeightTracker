# WebWeightTracker Manual Test Cases

## 1. User Registration and Login

| Test Case ID | Description                   | Steps                                                                                   | Expected Result                              | Status |
| ------------ | ----------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------- | ------ |
| TC_REG_001   | Register with valid data      | 1. Go to registration page<br>2. Enter valid email, username, and password<br>3. Submit | Account is created, user redirected to login |        |
| TC_REG_002   | Register with existing email  | 1. Go to registration page<br>2. Enter email already in use<br>3. Submit                | Error message: "Email already registered"    |        |
| TC_REG_003   | Register with invalid email   | 1. Go to registration page<br>2. Enter invalid email format<br>3. Submit                | Error message: "Please enter a valid email"  |        |
| TC_LOGIN_001 | Login with valid credentials  | 1. Go to login page<br>2. Enter registered email and password<br>3. Submit              | User logged in, redirected to dashboard      |        |
| TC_LOGIN_002 | Login with incorrect password | 1. Go to login page<br>2. Enter registered email and wrong password<br>3. Submit        | Error message: "Invalid email or password"   |        |
| TC_LOGIN_003 | Login with blank fields       | 1. Go to login page<br>2. Leave email or password blank<br>3. Submit                    | Error message: "Fields cannot be empty"      |        |

## 2. Adding and Updating Weight Entries

| Test Case ID  | Description                        | Steps                                                                                                     | Expected Result                                       | Status |
| ------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------ |
| TC_WEIGHT_001 | Add new weight entry               | 1. Log in<br>2. Navigate to “Add Weight” page<br>3. Enter valid weight and date<br>4. Submit              | New weight entry is saved and appears on dashboard    |        |
| TC_WEIGHT_002 | Add weight entry with invalid data | 1. Log in<br>2. Navigate to “Add Weight” page<br>3. Enter non-numeric weight or invalid date<br>4. Submit | Error message: "Please enter a valid weight and date" |        |
| TC_WEIGHT_003 | Update existing weight entry       | 1. Log in<br>2. Navigate to dashboard<br>3. Select existing entry<br>4. Change weight or date<br>5. Save  | Entry updated with new values                         |        |
| TC_WEIGHT_004 | View weight progress chart         | 1. Log in<br>2. Navigate to dashboard                                                                     | Weight progress chart displays correct data           |        |
