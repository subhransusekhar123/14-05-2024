import axios from "axios";
import * as cheerio from 'cheerio';




async function dataAfterScrapingWebs(url) {

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const bodyText = $('body').text();
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const emails = new Set(); // Using a set to avoid duplicates;


        let match;
        while (match = emailRegex.exec(bodyText)) {
            emails.add(match[0]);
        }

        console.log(Array.from(emails), url);
        console.log(`Data scraped successfully from ${url}`);
        return ([ Array.from(emails) , url ])
        
    } catch (error) {

        if (error.response) {

            console.error(`Error fetching data from ${url}. Status code: ${error.response.status}`);
        } else if (error.request) {

            console.error(`Error fetching data from ${url}. No response received.`);
        } else {

            console.error(`Error fetching data from ${url}:`, error.message);
        }
    }
}




export default dataAfterScrapingWebs ;
