require('dotenv').config();
const { Client} = require("@notionhq/client")

const notion = new Client({auth: process.env.NOTION_API_KEY})
const databaseId = process.env.NOTION_DATABASE_ID;


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

addToDatabase(databaseId, 'davidjones123', 'David Jones', false, null);
