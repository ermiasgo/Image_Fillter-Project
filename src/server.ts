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

  app.get( "/filteredimage", async ( req : express.Request , res : express.Response ) => {

      let image_url: string = req.query;
      // check to make sure the image url is set
      if (!image_url) { 
        return res.sendStatus(404).send("Image url is required");
      }
      let filteredimage =await filterImageFromURL(image_url);

      res.sendStatus(200).sendFile(filteredimage);
        fs.readdir(__dirname+'/util/tmp', (err,files)=>{ deleteLocalFiles(files)  }
        )
  } );
  
  app.get( "/", async ( req : express.Request , res : express.Response ) => {
      res.status(200).send("Please try GET /filteredimage?image_url={{}}")
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();