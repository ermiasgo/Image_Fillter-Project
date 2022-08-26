import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { emitWarning } from 'process';
import fs from "fs";

(async () => {
  // Init the Express application
  const app = express();
  // Set the network port
  const port = process.env.PORT || 3001;
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // app.get("/", async (req, res) => {
  //   res.send("Show the variable query "+filteredimage)
  // } ); 
  // Root Endpoint
  // Displays a simple message to the user

  app.get( "/filteredimage", async ( req, res ) => {

    let {image_url} = req.query;
    // check to make sure the image url is set
    if (!image_url) { 
      // respond with an error if not
      return res.status(400).send(`Image URL is required`);
    }
    let filteredimage =await filterImageFromURL(image_url);

    res.status(200).sendFile(filteredimage);
      fs.readdir(__dirname+'/util/tmp', (err,files)=>{ deleteLocalFiles(files)  }
      )


  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();