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
1. GET /student/login
{
	"register_number": 210701095,
	"password": "admin"
}

2. POST /student/signup
{
	"name": "Jeyapriyan M",
	"register_number": 210701097,
	"year_of_study": 2,
	"department": "CSE",
	"section": "B",
	"password": "adminjeyapriyan"
}

3. GET /faculty/login
{
	"faculty_code": "106",
	"password": "adminkumar"
}

4. POST /faculty/signup 
{
	"name": "Jananee V",
	"faculty_code": "108",
	"password": "adminjananee",
	"authority": {
		"title": "CLASS-INCHARGE",
		"department": "CSE",
		"year_of_study": "2",
		"section": "B"
	}
}

5. POST /od-application/new-entry
{
    "event": "Technical Symposium",
	"organization": "REC",
	"start_date": "March 18 2023 08:00:00 GMT+0530",
	"end_date": "March 18 2023 15:00:00 GMT+0530",
	"proof": "none"
}

6. GET /od-application/

7. POST /od-application/modify-entry/<_id>
{
	"outcome": "WINNER",
	"proof": "done"
}

8. POST /od-application/delete-entry/<_id>

9. GET /od-approval/

10. POST /od-approval/modify-entry/<_id>
{
	"status": "APPROVED"
}