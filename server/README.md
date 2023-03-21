****AUTHORIZATION****
The token response from [GET /[...]/login] is appended as "Authorization" header for every next request.
Header format : [Basic <Token>]

****ADDING AUTHORITY ENTRY****
Only use 
	ci [CLASS-INCHARGE]
	hod [HEAD-OF-DEPARTMENT]
	ah [ACADEMIC-HEAD]
as "authority" request parameter in authority.route.js

****SAMPLE REQUESTS JSON BODY****
GET /student/login
{
	"register_number": 210701095,
	"password": "admin"
}

POST /student/signup
{
	"name": "Jeyapriyan M",
	"register_number": 210701097,
	"year_of_study": 2,
	"department": "CSE",
	"section": "B",
	"password": "adminjeyapriyan"
}

POST /od-application/new-entry
{
    "event": "Technical Symposium",
	"organization": "REC",
	"start_date": "March 18 2023 08:00:00 GMT+0530",
	"end_date": "March 18 2023 15:00:00 GMT+0530",
	"proof": "none"
}

POST /od-application/modify-entry/<_id>
{
	"outcome": "WINNER",
	"proof": "done"
}

POST /faculty/signup
{
	"name": "Kumar P",
	"faculty_code": "106",
	"authority": "HEAD-OF-DEPARTMENT",
	"password": "adminkumar"
}

GET /faculty/login
{
	"faculty_code": "106",
	"password": "adminkumar"
}

POST /authority/new-authority/hod
{
	"year_of_study": 2,
	"department": "CSE"
}

POST /authority/new-authority/ah
{
	"year_of_study": 2,
	"department": "CSE"
}

POST /authority/new-authority/ci
{
	"year_of_study": 2,
	"section": "B",
	"department": "CSE"
}

POST /od-approval/modify-entry/<_id>
{
	"status": "APPROVED"
}