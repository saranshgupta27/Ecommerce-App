# How to test pages

Current this project is deployed [here](https://ecommerce-frontend-next-js.netlify.app/)
The app for now has 4 screens:

1) Login - Login with email and password (no database yet so api is mocked) - valid format will result into a successful login
2) Signup - Signup with email and password (no database yet so api is mocked) - valid format will result into redirection to verify screen
3) Verify - Verify email with OTP (no database yet so api is mocked) - OTP is 12345678 for now. Valid OTP will result into redirection to Interests screen
4) Interests - Select interests (no database yet so api is mocked) - Selecting interests and play with the paginated mocked api


Logout button is provided in the Navbar with some conditional elements based on the user's login status on signup page.

No frontend design library has been used for styling for now and everything has been written manually.
Appreciate the feedback and suggestions for improvements.

Future work:
1) Add database for storing user data
2) Add more features like forgot password, change password, etc.
3) Add more styling and animations
4) Convert Mock API to real API via Prisma and NestJs
5) Add tests
6) Make responsive for mobile devices



