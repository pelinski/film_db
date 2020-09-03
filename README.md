# Film rolls database
Database for photo films. Currently supporting the following fields (mongoose notation):
+ serialNumber: { type: String, required: true },
+ filmId: { album: { type: String, required: true, default: "A" }, number: { type: Number, required: true } },
+ camera: { type: String, default: undefined },
+ colorType: { type: String, enum: ["b/w", "color"], default: undefined },
+ scan: { type: String, enum: ["CD", "scan", "none"], default: undefined },
+ date: {
  * year: { type: Number, default: undefined },
  * month: [{ type: String, enum: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], default: undefined }]
+ },
+ location: [{ type: String, default: undefined }],
+ comments: { type: String, default: null }
.
## .env model

````
PORT=3000
ENV=development
DBURL="mongodb://localhost/film_db"
BACK_URL="http://localhost:3000"
````

### Credits
Icon: https://thenounproject.com/search/?q=35mm&i=14280