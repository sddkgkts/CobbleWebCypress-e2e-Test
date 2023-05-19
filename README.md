# CobbleWebCypress-e2e-Test
This README provides information about the Cypress end-to-end test suite for the login and category management 
functionality. It includes an overview of the tests and instructions for running the tests locally.

Test Overview========>
The end-to-end test suite consists of several positive test cases that validate the functionality of the 
application's login and category management features. Each test case is labeled as positive, indicating a 
successful scenario. The duration of each test case is also mentioned.

Test Cases==========>
Login as admin with valid credentials
Navigate to Products page
Filter products based on product attribute page 
Get product SKU's
Navigate to Category management page
Create a new category related to product SKU 
Check the UI page for the newly created category 
Check active/inactive button functionality 
Check active/inactive button functionality 
Update category that was created newly 
Check the UI page for the newly updated category 
Delete category that was created newly 


Running the Tests Locally=========>
To run the end-to-end tests locally, follow these steps:

Clone the repository:

shell
Copy code
git clone <repository_url>

Install dependencies:
Open terminal and run 
cd <repository_folder>
npm install


How to Start Test =======>

Open Cypress:

npx run cypress open (Cypress Test Runner will open. Click on the test file you want to run, or click 
"Run all specs" to execute all tests. View the test execution results in the Cypress Test Runner interface.)
or
npm run test (to run headlee browser, video record wil be created)
or
npm run test:cy (to run headless chrome browser, video record wil be created)
or
npm run test:headed (to run headed, video record wil be created )




Reporting
Cypress provides detailed test execution reports and screenshots automatically. After running the tests,
 you can find the reports in the cypress/reports directory. These reports include information such as test status, 
 test duration, and any failed assertions. 
 ![REPORT](https://github.com/sddkgkts/CobbleWebCypress-e2e-Test/blob/main/downloads/Execution%20Result.png)

Conclusion
This README provides an overview of the Cypress end-to-end test suite for the login and category management 
functionality. Follow the instructions to run the tests locally and view the test reports. Feel free to modify 
the test cases or expand the test suite as needed.

