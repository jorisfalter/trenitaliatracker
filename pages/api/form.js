require('dotenv').config();
const { Client} = require("@notionhq/client")

const notion = new Client({auth: process.env.NOTION_API_KEY})
const databaseId = process.env.NOTION_DATABASE_ID;

export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // // Optional logging to see the responses
    // // in the command line where next.js app is running.
    // console.log('body: ', body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.first || !body.last) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'First or last name not found' })
    }
  


    async function addToDatabase(databaseId, username, name, status, date) {
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
                              content: username,
                          },
                      },
                      ],
                  },
                  'Name' : {
                          type: 'rich_text',
                          rich_text: [
                          {
                              type: 'text',
                              text: {
                                  content: name,
                              },
                          }
                          ],
                  },
                  'Status': {
                      type: 'checkbox',
                      checkbox: status
                  },
                  'Date': { // Date is formatted as YYYY-MM-DD or null
                      type: 'date',
                      date: date
                  },
              }    
          });
          console.log(response);
      } catch (error) {
          console.error(error.body);
      }
    }
  
    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.first} ${body.last}` })

    addToDatabase(databaseId, 'test123', body.first, false, null);


  }