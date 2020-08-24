# Film rolls database
Database for photo films. Currently supporting the following fields (mongoose notation):
   
   + format: { type: String, default: "35mm" }
   + filmType: { type: String, required: true, default: undefined }
   + camera: { type: String, default: "unknown" }
   + colorType: { type: String, enum: ["b/w", "color"], default: "unknown" }
   + scan: { type: String, enum: ["CD", "scan", "none"], default: "none" }
   + date: {
      year: { type: Number, default: undefined },
      month: [{ type: String, enum: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], default: "unknown" }]
    }
   + location: [{ type: String, default: undefined }]
   + comments: { type: String, default: null }

   ## .env model
````
PORT=3000
ENV=development
DBURL="mongodb://localhost/film_db"
BACK_URL="http://localhost:3000"

````
