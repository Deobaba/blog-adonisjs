import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import fs from 'fs'


class Filesystem {

    public async uploadFile({ request, response }: HttpContext ) {

        const file = request.file("file", {
            extnames: ['jpg', 'png', 'jpeg', 'txt']
          })
          
          if (!file?.isValid) {
            return response.badRequest({
              errors: file?.errors
            })
          }

        let uploadDir = env.get('UPLOAD_DIR')

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
            console.log('Directory created', uploadDir)
          }

          file.clientName = "yyyykb.txt"

        await file.move(uploadDir, {
            name: file.clientName,
            overwrite: true
          })
        
        // console.log(file)

       return response.status(200).json({
        message: "successful"
       })
    }

    public async deleteFile ({ response }: HttpContext) {
        let uploadDir = env.get('UPLOAD_DIR')
        let file = uploadDir + '/ykb.txt'
        // let file = uploadDir


        if (fs.existsSync(file)) 
        {
          fs.unlinkSync(file)
            return response.status(200).json({
                message: "File deleted successfully"
          })
        }
    }

    public async readFile ({ response }: HttpContext) {
        let uploadDir = env.get('UPLOAD_DIR')
        let file = uploadDir + '/ykb.txt'
            // let file = uploadDir
        if (fs.existsSync(file)) 
        {
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                  return console.log(err);
                }

                console.log(data);

                return response.status(200).json({

                  message: "File read successfully"
                  
                })
                
            });
        }
    }

}
    


export default new Filesystem()