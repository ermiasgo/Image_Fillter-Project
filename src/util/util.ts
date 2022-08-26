import { response } from "express";
import fs from "fs";
import Jimp = require("jimp");
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS ==>   inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
   console.log("This filterImageFromURL is inputURL==>"+inputURL);
    try {
      const photo = await Jimp.read(inputURL);
      const outpath = "/tmp/filteredLions." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo 
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        }); 
    } catch (error) {
     // reject(error);
     console.log("Somthing wrong with the Image URL "+error);
     //response.status(404).send("Somthing wrong with the Image URL "+error)
     
    }
    //console.log("This is outpath in filterImageFromURL function==>"+outpath);
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(__dirname+'/tmp/'+file);
  }
}
