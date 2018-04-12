This project is for the dashboard of Coursera - made by WING@NUS for MOOC Intervention Project.
The project has a 'Node/Express' Backend with 'React' Frontend.
The project uses 'Webpack' to bundle required files, and 'Babel' to transpile for all the browsers.

Run the project by running 'npm start' in the Terminal.
If running for the first time - run 'npm install' first
The project runs on the link - 'http://localhost:8080' by default.

External Dependencies -<br>
1. courses.json - list of courses with fields - name, univ(university), id, linkName. <br>
2. threads directory - which contains the list of threads of each course in the {coursename}.txt files.<br>
3. coursera.db - The database containing the crawled data from coursera discussion forums. refer to 'CourseraScraper' repository.<br>

The React Componenets are :<br>
1. Courses(in courses.js) - This is the home page which lists the available courses. It uses other sub-components-CourseList(courseList.js) and CourseItem(courseItem.js) rendering the courses.<br>
2. CourseThreads(courseThreads.js) - This is the next page - after navigating into one of the courses. It uses other sub-components - ThreadList(threadList.js) and ThreadItem(threadItem.js) to render the list of threads.<br>
3. App(app.js) This is the component which manages the routes for the React application.<br>
4. Other helper components like - Loading(loading.js) for the loading page, NotFound(notFound.js) for the '404-Error' page when the requested url is not found by the server, Navbar(navbar.js) for the navigation bar, Pagination(pagination.js) for pagination on the CourseThreads component.<br>

All the server side coding for the Express(Node) app resides in the 'server.js' in the root directory.

The index.html - the html file which we render the react SPA on - resides in ./dist.
