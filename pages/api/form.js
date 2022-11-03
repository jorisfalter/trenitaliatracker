require('dotenv').config();
const { Client} = require("@notionhq/client")

const notion = new Client({auth: process.env.NOTION_API_KEY})
const databaseId = process.env.NOTION_DATABASE_ID;


// this puts the form information in the Notion DB

export default function handler(req, res) {
    
    // Get data submitted in request's body.
    const body = req.body
    console.log(body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    // if (!body.first || !body.last) {
    //   // Sends a HTTP bad request error code
    //   return res.status(400).json({ data: 'First or last name not found' })
    // }
  
    async function addToDatabase(databaseId, DBID, firstname, emailentry, status, dateoftravel) {
      try {
          const response = await notion.pages.create({
              parent: {
                  database_id: databaseId,
              },
              properties: {
                  'ID': {
                      type: 'title',
                      title: [
                      {
                          type: 'text',
                          text: {
                              content: DBID,
                          },
                      },
                      ],
                  },
                  'FirstName' : {
                      type: 'rich_text',
                      rich_text: [
                      {
                          type: 'text',
                          text: {
                              content: firstname,
                          },
                      }
                      ],
                  },
                  'Email': { 
                      type: 'email',
                      email: emailentry
                      // email: [
                      //   {
                      //     type: 'email',
                      //     text: {
                      //       content: email,
                      //     },
                      //   }
                      // ],
                      // rich_text: email
                  },
                  'Status': {
                      type: 'checkbox',
                      checkbox: status
                  },
                  'DateOfTravel': { // Date is formatted as YYYY-MM-DD or null
                      type: 'date',
                      date: {start: dateoftravel}
                  },
              }    
          });
          // console.log(response);
      } catch (error) {
          console.error(error.body);
      }
    }
  
    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.first} ${body.email}` })



    addToDatabase(databaseId, 'test123', body.first, body.email, false, body.datename);
    // 
  }